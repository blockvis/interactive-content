---
# Ревизия формата class.md (см. meta/MANIFEST.ru.md → «Версионирование формата»).
spec: 0.1

name: "RaTSiF-2026 Spring"
slug: ratsif-2026-spring

event:
  name: "RaTSiF-2026 · Research and Technology – Step into the Future"
  edition: "49th, Spring"
  date: 2026-04-24
  host: "Transport and Telecommunication Institute (TSI)"
  location: "Lauvas 2, Riga, Latvia"
  url: "https://ratsif.tsi.lv/ratsif-2026-spring/"
  officialLanguages: [lv, en]
  # Короткий лейбл для правой половины нижней брендовой полосы.
  shortLabel: "RaTSiF, Riga, Latvia"

# ─── Стиль ──────────────────────────────────────────────────────────────
# Портировано из source/template.pptx. Шаблон конференции использует
# стандартную PowerPoint-тему «Retrospect» без кастомизации (color scheme
# + font scheme тоже зовутся «Retrospect»).
#
# Наше отображение PP-терминов → токенов манифеста:
#   lt1 (#FFFFFF) → background
#   dk1 (#000000) → foreground
#   dk2 (#344068) → primary  — тёмный navy для заголовков и кнопок
#   lt2 (#D9E0E6) → muted    — светло-серая «заливка» сабфонов
#   accent1 (#1CADE4) → accent — яркий синий хайлайт
#
# Остальные accent2..6 из темы сохранены в поле extraAccents на случай
# будущих шаблонов слайдов (таблицы, диаграммы).
#
# Логотип конференции придёт позже в SVG и ляжет в source/ + assets/.

colors:
  background: "#FFFFFF"
  foreground: "#000000"
  primary:    "#344068"
  accent:     "#1CADE4"
  muted:      "#D9E0E6"

# Полная палитра Retrospect (кроме core), для будущих секций/диаграмм.
extraAccents:
  accent2: "#2683C6"
  accent3: "#28C4CC"
  accent4: "#42BA97"
  accent5: "#3E8853"
  accent6: "#62A39F"
  hlink:   "#6EAC1C"
  folHlink: "#B26B02"

# В теме: majorFont=«Calibri Light», minorFont=«Calibri».
# Calibri — проприетарный шрифт Microsoft, недоступный в next/font/google,
# поэтому используем ближайший по метрикам humanist-sans с кириллицей —
# Open Sans. Заголовки пойдут в 300-м весе (≈ Calibri Light), тело в 400-м.
fonts:
  heading:
    family: "Open Sans"
    source: google
    weights: [300, 600, 700]
  body:
    family: "Open Sans"
    source: google
    weights: [400, 500]

typography:
  baseSize: "20px"
  headingScale: 1.333
  leading: 1.45

# ─── Chrome ─────────────────────────────────────────────────────────────
chrome:
  # Двухцветные фирменные полосы — главный визуальный «бренд» шаблона.
  # В pptx-мастерах: полоса высотой 0.28″ (≈3.7% высоты слайда), разделённая
  # вертикально пополам; левая — TSI navy #214673, правая — Retrospect accent2.
  # На title-мастере полоса только снизу; на content-мастере — сверху и снизу.
  # Поведение по слайдам задаётся платформой: non-title = top+bottom, title = bottom-only.
  brandStripe:
    enabled: true
    height:   "48px"      # pptx-мастер: 0.28″/7.5″ ≈ 3.7% высоты; в вебе 48px даёт воздух под читаемый шрифт
    fontSize: "20px"      # презентационный размер: читается с задних рядов проектора
    dark:     "#214673"   # TSI navy, left half
    light:    "#2683C6"   # Retrospect accent2, right half

  # Sticky footer-навигация — обязательна на каждом слайде (платформа).
  nav:
    height: "56px"
    showSlideNumber: true
    showLanguageSwitcher: true

  # Большой QR на титульном слайде — обязателен в presentation mode.
  # URL: корень презентации.
  qrTitle:
    size: 320
    position: right
    caption: "Откройте презентацию на своём телефоне"

  # Маленький QR в углу на каждом слайде (URL — URL текущего слайда).
  # Активируется ТОЛЬКО если класс задал этот блок; иначе углового QR нет.
  # Пока не включаем — конференция не требует.
  #
  # qrPerSlide:
  #   size: 128
  #   position: bottom-right
  #   caption: null
  #   opacity: 0.9
---

Класс-«порт» фирменного стиля весенней сессии RaTSiF-2026, проводимой
Transport and Telecommunication Institute в Риге. Визуальные токены
извлечены из `source/template.pptx` (стандартная PowerPoint-тема
«Retrospect»). Calibri подменён на Open Sans как открытый веб-аналог;
остальные значения (палитра, раскладка chrome) — копии темы.

Источник правды о конференции: <https://ratsif.tsi.lv/ratsif-2026-spring/>
