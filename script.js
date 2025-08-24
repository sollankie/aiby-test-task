document.addEventListener("DOMContentLoaded", () => {
  const planItems = document.querySelectorAll(".plan");

  planItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) return;
      planItems.forEach((p) => p.classList.remove("active"));
      item.classList.add("active");
    });
  });

  const lang = getLanguage();
  document.documentElement.lang = lang;
  document.body.classList.add(`lang-${lang}`);
  applyTranslations();
});

function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  const langParam = (params.get("lang") || "").toLowerCase();
  const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
  const supportedLanguages = ["de", "en", "es", "fr", "ja", "pt"];

  if (langParam && supportedLanguages.includes(langParam)) {
    return langParam;
  }
  return supportedLanguages.includes(browserLang) ? browserLang : "en";
}

async function loadTranslations(lang) {
  try {
    const response = await fetch(`./lang/${lang}.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Не удалось загрузить файл перевода");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    if (lang !== "en") return loadTranslations("en");
    return null;
  }
}

async function applyTranslations() {
  const lang = getLanguage();
  const translations = await loadTranslations(lang);

  const prices = {
    weekly: 6.99,     
    yearly: 39.99,    
    currency: "USD",
  };

  if (!translations) return;

  const fmt = new Intl.NumberFormat(
    lang === "de" ? "de-DE" : "en-US",   
    { style: "currency", currency: prices.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );

  // helper
  const money = (n) => fmt.format(n);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    let text = translations[key] ?? el.innerHTML;

    const isYearKey = /year/i.test(key);
    const isWeekKey = /week/i.test(key);

    if (isYearKey) {
      text = text.replaceAll("{{price}}", money(prices.yearly));
    }

    if (isWeekKey) {
      const inYearlyPlan  = el.closest(".plan")?.classList.contains("plan--yearly");
      const inWeeklyPlan  = el.closest(".plan")?.classList.contains("plan--weekly");

      if (inYearlyPlan) {
        const weeklyFromYearly = prices.yearly / 52;
        text = text.replaceAll("{{price}}", money(weeklyFromYearly));
      } else if (inWeeklyPlan) {
        text = text.replaceAll("{{price}}", money(prices.weekly));
      } else {
        text = text.replaceAll("{{price}}", money(prices.weekly));
      }
    }

    if (text.includes("<br")) el.innerHTML = text;
    else el.textContent = text;
  });
}
