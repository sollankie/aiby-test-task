const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") || "en";

const availableLangs = ["en", "ru", "de", "es", "fr", "pt", "ja"];
const selectedLang = availableLangs.includes(lang) ? lang : "en";

fetch(`./lang/${selectedLang}.json`)
  .then((res) => res.json())
  .then((t) => {
    document.getElementById("title").innerHTML = t["Get Unlimited <br>Access"] || '';
    document.getElementById("feature-1").innerHTML = t["Unlimited Art <br>Creation"] || '';
    document.getElementById("feature-2").innerHTML = t["Exclusive <br>Styles"] || '';
    document.getElementById("feature-3").innerHTML = t["Magic Avatars <br>With 20% Off"] || '';
    document.getElementById("continue-btn").innerHTML = t["Continue"] || '';
    document.getElementById("restore").innerHTML = t["Restore"] || '';
    document.getElementById("terms").innerHTML = t["Terms of Use"] || '';
    document.getElementById("privacy").innerHTML = t["Privacy Policy"] || '';

    const yearlyPrice = "$39.99";
    const weeklyPrice = "$6.99";
    const yearlySubPrice = "$0.48";

    document.getElementById("yearly-label").textContent = t["YEARLY ACCESS"];
    document.getElementById("yearly-fullprice").textContent =
      t["Just {{price}} per year"].replace("{{price}}", yearlyPrice);
    document.getElementById("yearly-subprice").innerHTML =
  t["{{price}} <br>per week"].replace("{{price}}", yearlySubPrice);

    document.getElementById("weekly-label").textContent = t["WEEKLY ACCESS"];
    document.getElementById("weekly-price").innerHTML =
      t["{{price}} <br>per week"].replace("{{price}}", weeklyPrice);

    const tag = document.getElementById("yearly-tag");
    if (t["BEST OFFER"]) {
      tag.textContent = t["BEST OFFER"];
      tag.style.display = "block";
    } else {
      tag.style.display = "none";
    }
  })
  .catch((err) => {
    console.error("Ошибка загрузки языка:", err);
  });

// Выбор активного тарифа
const yearly = document.getElementById("yearly-plan");
const weekly = document.getElementById("weekly-plan");

yearly.addEventListener("click", () => {
  yearly.classList.add("active");
  weekly.classList.remove("active");
});

weekly.addEventListener("click", () => {
  weekly.classList.add("active");
  yearly.classList.remove("active");
});

