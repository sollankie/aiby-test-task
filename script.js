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
    weekly: "$3.99",
    yearly: "$39.99",
  };

  if (!translations) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    let text = translations[key];

    // если перевода нет, оставляем исходный текст элемента
    if (!text) text = element.innerHTML;

    if (key.toLowerCase().includes("year")) {
      text = text.replaceAll("{{price}}", prices.yearly);
    } else if (key.toLowerCase().includes("week")) {
      text = text.replaceAll("{{price}}", prices.weekly);
    }

    element.innerHTML = text;
  });
}
