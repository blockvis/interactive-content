# Как сделать класс презентации

Playbook для агента. Автор говорит «сделай класс для моей конфы / курса»
— агент читает этот документ и действует по нему. Ничего руками автор
писать не должен, исходник (pptx / beamer / brandbook) — опционален.

## Когда использовать

- Автор готовит презентацию под конференцию, у которой есть свой
  pptx-шаблон или brandbook, и хочет, чтобы веб-версия сидела рядом
  с коллегами на том же проекторе как родная.
- Автор читает курс и хочет единый визуальный язык для серии лекций
  (`presentation-classes/<course>/` → все лекции курса ссылаются на
  этот класс).
- Автор не привязан к внешнему шаблону, но хочет собственный стиль
  для своей серии выступлений.

## На входе

Один из следующих источников (в порядке убывания частоты):

1. **`.pptx`** — основной случай. 99% конференций.
2. **Beamer / `.tex`** — редкий, академический. Извлекаем цвета и
   шрифты из `\definecolor`, `\usetheme`, `\setbeamercolor`,
   `\usepackage`. В остальном workflow совпадает с pptx.
3. **Brandbook в PDF / изображение** — есть палитра и логотипы,
   но нет готовой раскладки. Работаем как с pptx, только geometry
   chrome приходится придумывать.
4. **Ничего** — автор описывает пожелания словами. Делаем плейсхолдер-
   класс, честно помечаем токены как временные.

Исходник, если он есть, **всегда** кладётся в
`presentation-classes/<slug>/source/` — это наш first-source-of-truth
(см. манифест, раздел «Evolution, not revolution»).

## Структура класса

```
presentation-classes/<slug>/
  class.md             ← токены + метадата (YAML frontmatter + описание)
  index.tsx            ← ClassModule: { layouts, components? }
  layouts/
    title.tsx          ← layout для slide.layout = "title"
    content.tsx        ← для "content" (и обычно для "section")
    section.tsx        ← опционально (часто = content.tsx)
  chrome/              ← классовые chrome-элементы (полосы, логотип, фон)
  components/          ← директив-компоненты, доступные из markdown класса
  lib/                 ← внутренняя кухня класса (форматтеры, слоты, хелперы)
  source/              ← первоисточник: template.pptx, brandbook.pdf, тема.tex, скриншоты
  assets/              ← веб-готовые ассеты (логотипы в svg, фоны в webp, шрифтовые файлы)
```

Контракт `ClassModule` — в `src/lib/class-module.ts`. **Не отходи от
него**: платформа импортирует активный класс через
`src/generated/class.tsx` и ожидает ровно эту форму.

Готовые референсы:

- **`presentation-classes/example/`** — минимально-валидный класс.
  Удобно копировать как скелет.
- **`presentation-classes/ratsif-2026-spring/`** — полноценный
  портированный pptx-класс: брендовые полосы, форматтеры дат и
  лейблов, два layout-а.

## Пошаговый процесс

### 1. Согласовать slug

Агент спрашивает у автора короткий kebab-case идентификатор
(`ratsif-2026-spring`, `mipt-complex-analysis-2026`). Slug — имя
папки под `presentation-classes/` и значение `class:` во frontmatter
презентаций.

### 2. Принять исходник

- Автор прикладывает pptx / tex / pdf — агент кладёт **оригинальный
  файл** в `presentation-classes/<slug>/source/` (имя сохранять,
  например `template.pptx`).
- Если исходника нет — `source/` остаётся пустым, переход к «плейсхолдер»
  режиму.

### 3. Извлечь визуальные токены

#### 3a. Из pptx

`.pptx` — это zip с XML. Минимум того, что нужно достать:

- **Палитра** — `ppt/theme/theme1.xml`, элементы `<a:clrScheme>`:
  `lt1`, `dk1`, `lt2`, `dk2`, `accent1..6`, `hlink`, `folHlink`.
  Маппинг на токены `class.md`:
  - `lt1` → `colors.background`
  - `dk1` → `colors.foreground`
  - `dk2` → `colors.primary` (обычно заголовки)
  - `accent1` → `colors.accent`
  - `lt2` → `colors.muted`
  - `accent2..6` + `hlink` + `folHlink` → `extraAccents:` (на будущее).
- **Шрифты** — `<a:fontScheme>` → `majorFont` (заголовочный),
  `minorFont` (тело). Проприетарные MS-шрифты (Calibri, Segoe UI,
  Arial) **подменяются** на ближайший гумастист-санс из
  `next/font/google`: обычно **Open Sans** или **Inter**. Подмена
  фиксируется в теле `class.md`.
- **Chrome** — `slideMasters/slideMaster1.xml` и `slideLayouts/*.xml`:
  цветные полосы, позиция номера слайда, логотип. В pptx величины
  — EMU (914400 на дюйм, 7.5″ высота слайда). Пересчёт в CSS-px:
  `px = EMU / 914400 * 96`.
- **Логотипы и медиа** — `ppt/media/`. Раст (png/jpeg) кладётся в
  `assets/` как есть; если нужен svg — просим у автора или
  рисуем заглушку.

Инструментарий: агент выбирает сам (распаковать и прочитать XML
вручную; `python-pptx` для программного обхода; `markitdown` для
быстрого текстового слепка). Мы документируем **что** извлечь, не **чем**.

#### 3b. Из beamer / .tex

- Цвета — `\definecolor{...}{RGB}{...}` и `\setbeamercolor`.
- Шрифты — `\usepackage{...}` (особенно `fontspec`, `sourcesanspro`,
  `libertine`).
- Тема — `\usetheme{...}` подсказывает geometry (Warsaw, Frankfurt,
  Madrid и т.д.); если тема стандартная — можно не копировать
  layout 1-в-1, достаточно палитры.

#### 3c. Без исходника

- Автор описывает словами («синий, академичный, с белым фоном»).
- Берём `example` как скелет, меняем `colors.primary` и
  `colors.accent` под описание.
- В теле `class.md` явно пишем: «токены — временные плейсхолдеры,
  ожидают импорта исходника».

### Локализуемые строки

Любая user-facing строка в `class.md` (caption у QR, подписи в chrome,
метки кнопок) может быть либо обычной строкой — тогда она используется
как есть независимо от языка, — либо **локалей-мапой**:

```yaml
qrTitle:
  caption:
    ru: "Откройте презентацию на своём телефоне"
    en: "Open the presentation on your phone"
    lv: "Atveriet prezentāciju savā tālrunī"
```

Платформа (`src/lib/i18n.ts` → `resolveI18n`) подбирает значение по
цепочке: **текущий язык слайда → канонический язык презентации (первый
в `languages`) → первый доступный ключ карты**. Если автор класса
положил просто строку — она используется как есть (backward-compat,
удобно для служебных лейблов, которые одинаковы во всех языках, или
для классов, обслуживающих одноязычные презентации).

**Когда использовать мапу, а когда строку:**

- **Мапа** — всё, что читает живой человек из аудитории: «Откройте
  презентацию на телефоне», «Section», «Agenda», «Next». Рука об руку
  с языком доклада.
- **Строка** — технические / брендовые / универсальные значения:
  `shortLabel: "RaTSiF, Riga, Latvia"`, имя конференции, даты в ISO.

Автор класса обязан покрыть мапой **все языки из `presentation.languages`**
той презентации, которую он обслуживает, — иначе на «пропущенном» языке
пользователь увидит текст из fallback-языка (канонический), что
воспринимается как баг.

### 4. Заполнить `class.md`

Обязательные поля frontmatter:

- `spec: 0.1` — ревизия формата (см. манифест → «Версионирование»).
- `name`, `slug`.
- `event:` — метаданные мероприятия (`name`, `date`, `host`,
  `location`, `url`, `shortLabel`). `shortLabel` — короткий текст
  для chrome-полос / нижнего колонтитула.
- `colors:` — 5 семантических токенов (`background`, `foreground`,
  `primary`, `accent`, `muted`). Всё остальное — в `extraAccents:`.
- `fonts:` — `heading` + `body`, каждый с `family`, `source: google`,
  `weights: [...]`.
- `typography:` — `baseSize`, `headingScale`, `leading`.
- `chrome:` — как минимум `nav:` (платформенный инвариант); далее
  опционально `brandStripe:`, `qrTitle:`, `qrPerSlide:`.

Тело `class.md` — короткое человеческое описание: откуда взяты
токены, какие замены сделаны (Calibri → Open Sans и т.п.), что
является временным плейсхолдером и ждёт уточнения.

### 5. Написать layouts

Каждый layout — это `ComponentType<LayoutProps>` из
`src/lib/class-module.ts`. Платформа передаёт:

- `slide` — данные слайда (`title`, `subtitle`, `body`, `layout`, `lang`).
- `presentation` — мета презентации (`title`, `authors`, `languages`).
- `classMeta` — мета класса (`name`, `event`, …).
- `platform.nav` — **обязан** быть отрендерен (контракт платформы).
- `platform.languageSwitcher`, `platform.titleQr`, `platform.cornerQr` —
  рендерятся, когда не `null`.

Минимум: `title.tsx` и `content.tsx`. `section.tsx` — часто просто
тот же `ContentLayout` (см. `example/index.tsx`).

### 6. Chrome-компоненты

Всё, что рисует брендовое окружение слайда (полосы, рамки,
логотипы, фоны), живёт в `chrome/`. Не импортируется напрямую в
платформу — только из своих же `layouts/`. Пример:
`presentation-classes/ratsif-2026-spring/chrome/brand-stripe.tsx`.

### 7. `components/` (опционально)

Директив-компоненты уровня класса, доступные из markdown любой
презентации этого класса. Регистрируются в `ClassModule.components`.
Резолв в `markdown-slide.tsx`:
`presentation.components` → `classModule.components` → platform defaults.

### 8. `index.tsx` — сборка модуля

```tsx
import type { ClassModule } from "@/lib/class-module";
import TitleLayout from "./layouts/title";
import ContentLayout from "./layouts/content";

const module_: ClassModule = {
  layouts: {
    title: TitleLayout,
    section: ContentLayout,
    content: ContentLayout,
  },
  // components: { "my-directive": MyComponent },
};

export default module_;
```

### 9. Привязать презентацию

Во frontmatter `presentations/<slug>/presentation.md`:

```yaml
class: <class-slug>
```

Если поле отсутствует или класс не найден — `scripts/compile.mjs`
откатывается на `example` и печатает предупреждение.

## Чек-лист готовности

- [ ] `class.md` валиден (frontmatter парсится, обязательные поля на месте).
- [ ] `index.tsx` экспортирует `ClassModule` с хотя бы `title` и `content` layout-ами.
- [ ] Каждый layout рендерит `platform.nav`.
- [ ] `npm run dev` поднимается без ошибок, презентация класса открывается.
- [ ] Палитра визуально совпадает с оригиналом (или явно помечена как плейсхолдер).
- [ ] Логотипы / брендовые полосы видны там, где должны.
- [ ] QR-слоты работают: большой QR на title, corner QR (если включён).
- [ ] Reader mode (узкий вьюпорт) не ломает chrome — QR скрываются, nav остаётся.
- [ ] Тело `class.md` описывает, что портировано 1-в-1, а что — замена (шрифт, цвет, размер).

## Границы ответственности

- **Не делать «революцию».** Цель — гармония с соседним pptx-докладом,
  не «сделать красивее оригинала». Расхождения от pptx фиксируются в
  теле `class.md` и по возможности уменьшаются.
- **Не трогать платформенные инварианты.** Nav, language switcher,
  QR-слоты и режимы рендеринга — платформа. Класс размещает их, но
  не подменяет логику.
- **Не изобретать токены.** Если нужен новый параметр chrome —
  сначала обсудить в чате: скорее всего, речь про расширение
  платформенного контракта, а не про локальное поле в `class.md`.
- **Все проприетарные MS-шрифты заменяются открытыми аналогами.**
  Подмена явно документируется в теле `class.md`. Точно не `Calibri`,
  не `Segoe UI`, не `Arial` как таковые.
