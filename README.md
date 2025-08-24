- **Stack:** HTML5, CSS3, JS 
- **Devices:** iPhone SE/8/8+/X/12 (portrait)
- **Languages:** en, de, es, fr, ja, pt, ru 
- **Live:** https://sollankie.github.io/aiby-test-task/ 

- Retina: background@2x/@3x - i18n: query ?lang=xx, fallback → en 
- Legal links: Terms→apple.com, Privacy→google.com, Restore→#
- Pricing logic: - Weekly plan: $6.99 / week - Yearly plan: $39.99 / year + equivalent weekly price (yearly/52)


- ## 🖥 How to run locally 1. Clone repository:
bash
   git clone https://github.com/sollankie/aiby-test-task.git
   cd aiby-test-task

На реальных устройствах iOS может появлятся скролл. т.к vh учитывает динамические панели браузера поэтому высота страницы может выходить за пределы экрана

В текущей реализации оставлено как в макете,
но при необходимости этот код можно добавить для идеального поведения на iOS-устройствах.

Это можно пофиксить с помощью:

```css
.banner {
  min-height: 100dvh; или 100svh
}

@supports (-webkit-touch-callout: none) {
  html, body { height: -webkit-fill-available; }
  .banner { min-height: -webkit-fill-available; }
}
