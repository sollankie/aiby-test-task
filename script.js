const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") || "en";

const availableLangs = ["en", "ru", "de", "es", "fr", "pt", "ja"];
const selectedLang = availableLangs.includes(lang) ? lang : "en";

fetch(`./lang/${selectedLang}.json`)
  .then((res) => res.json())
  .then((t) => {
    // Статичный текст
    document.getElementById("title").innerHTML = t["Get Unlimited <br>Access"] || '';
    document.getElementById("description").innerHTML = t["Magic Avatars <br>With 20% Off"] || '';
    document.getElementById("continue-btn").innerHTML = t["Continue"] || '';
    document.getElementById("restore").innerHTML = t["Restore"] || '';
    document.getElementById("terms").innerHTML = t["Terms of Use"] || '';
    document.getElementById("privacy").innerHTML = t["Privacy Policy"] || '';

    // Динамика тарифов
    const yearlyPrice = "39.99";
    const weeklyPrice = "6.99";
    const showBestOffer = true;

    document.getElementById("yearly-label").textContent = t["YEARLY ACCESS"];
    document.getElementById("yearly-price").textContent =
      t["Just {{price}} per year"].replace("{{price}}", yearlyPrice);

    document.getElementById("weekly-label").textContent = t["WEEKLY ACCESS"];
    document.getElementById("weekly-price").textContent =
      t["{{price}}/week"].replace("{{price}}", weeklyPrice);

    const tag = document.getElementById("yearly-tag");
    if (showBestOffer && t["BEST OFFER"]) {
      tag.textContent = t["BEST OFFER"];
      tag.style.display = "block";
    } else {
      tag.style.display = "none";
    }
  })
  .catch((err) => {
    console.error("Ошибка загрузки языка:", err);
  });

