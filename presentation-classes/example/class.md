---
spec: 0.1

name: "Example"
slug: example

# Минимальный класс-«заглушка». Используется как fallback, если
# presentation.md не объявляет `class:` или объявленный класс не найден.
# Также служит reference implementation — отсюда удобно копировать
# структуру для своего класса.

colors:
  background: "#FFFFFF"
  foreground: "#111111"
  primary:    "#111111"
  accent:     "#2563EB"
  muted:      "#E5E7EB"

fonts:
  heading:
    family: "Inter"
    source: google
    weights: [600, 700]
  body:
    family: "Inter"
    source: google
    weights: [400, 500]

typography:
  baseSize: "18px"
  headingScale: 1.25
  leading: 1.5

chrome:
  nav:
    height: "48px"
    showSlideNumber: true
    showLanguageSwitcher: true

  qrTitle:
    size: 280
    position: right
    caption: "Open on your phone"
---

Дефолтный минималистичный класс. Без брендовых полос, без логотипа —
чистый белый фон, Inter, простой chrome. Презентация без собственного
класса рендерится через него.
