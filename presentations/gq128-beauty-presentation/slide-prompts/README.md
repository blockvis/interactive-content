# Slide prompts — индекс

Папка содержит 15 заданий на визуальную разработку слайдов презентации
«Технический долг и красота комплекснозначной геометрии и арифметики»
(RaTSiF-2026 Spring).

## Порядок чтения агентом

1. **`_shared.md`** — общие соглашения, контракт компонентов, цветовые
   токены, reader mode, a11y. Читается один раз.
2. **`../BRIEF.ru.md`** — сюжет, факты, авторские формулировки.
3. **`../../../meta/MANIFEST.ru.md` §«Встраивание компонентов»** — синтаксис
   директив, резолв, ассеты, бэкстейдж-маркер.
4. Конкретный файл `slide-NN-*.md` — задание на этот слайд.

## 15 слайдов и их компоненты

| # | Слайд | Layout | Компонент | Файл промпта |
|---|---|---|---|---|
| 1 | Заглавный: QR, логотипы, демо табов | title | `SlideTabsDemo` | [`slide-01-title.md`](./slide-01-title.md) |
| 2 | Эпиграф Гаусса 1831 + таймлайн 1748 → 1799 → 1831 → 1959 | section | `EpigraphTimeline` | [`slide-02-section-gauss.md`](./slide-02-section-gauss.md) |
| 3 | Пифагорейская катастрофа: два треугольника | content | `PythagoreanTriangles` | [`slide-03-pythagorean-catastrophe.md`](./slide-03-pythagorean-catastrophe.md) |
| 4 | Евдокс: перемножение отрезков циркулем | content | `EudoxusCompass` | [`slide-04-eudoxus-compass.md`](./slide-04-eudoxus-compass.md) |
| 5 | Декарт: сетка на плоскости | content | `CartesianGrid` | [`slide-05-descartes-grid.md`](./slide-05-descartes-grid.md) |
| 6 | Комплексные числа в действии (**якорный слайд**) | content | `ComplexAction` | [`slide-06-complex-action.md`](./slide-06-complex-action.md) |
| 7 | Долг №1: Argand ↔ Wessel, стрелка компаса | content | `ArgandWesselSwitch` | [`slide-07-argand-wessel.md`](./slide-07-argand-wessel.md) |
| 8 | Долг №2: зеркало и эрмитовость | content | `MirrorSwap` | [`slide-08-mirror-swap.md`](./slide-08-mirror-swap.md) |
| 9 | Позиционные системы с комплексным основанием | content | `ComplexBaseExplorer` | [`slide-09-complex-bases.md`](./slide-09-complex-bases.md) |
| 10 | Долг №3: $\mathbb Z[i]$ ↔ $\mathbb Z[\omega]$ | content | `LatticeSwitch` | [`slide-10-lattice-switch.md`](./slide-10-lattice-switch.md) |
| 11 | 7 цифр Госпера, умножение в столбик | content | `GosperDigitMultiplier` | [`slide-11-gosper-digits.md`](./slide-11-gosper-digits.md) |
| 12 | Остров Госпера, IFS с ползунком глубины | content | `GosperIsland` | [`slide-12-gosper-island.md`](./slide-12-gosper-island.md) |
| 13 | Лестница миров — иерархия упаковок шаров | content | `PackingLadder` | [`slide-13-packing-ladder.md`](./slide-13-packing-ladder.md) |
| 14 | GQ128: живой регистр + стена 240 Гбит/с | content | `GQ128Register` | [`slide-14-gq128-register.md`](./slide-14-gq128-register.md) |
| 15 | Эпилог: схема Platform / Class / Slide | section | `PlatformArchitecture` | [`slide-15-epilogue-platform.md`](./slide-15-epilogue-platform.md) |

## Принципы, которые держат связность

- **Цветовая рифма.** Слайды 6, 10, 11, 12, 14 используют общий набор
  токенов цифр Эйзенштейна (`_shared.md` §5). Любая «минус-операция» —
  переход в дополнительный цвет, а не просто оттенок.
- **Якорный компонент — `ComplexAction` (слайд 6).** На нём отлаживаются
  все соглашения о props, анимациях, reader mode и a11y. Остальные 14
  слайдов ложатся в его колею.
- **Кульминация — слайд 13 + слайд 14.** Слайд 13 показывает иерархию,
  слайд 14 — инженерную реализацию единственного члена, который влез в
  регистр.
- **Эпилог (слайд 15)** — не про GQ128, а про то, что сама эта
  презентация есть reference implementation платформы из
  `meta/MANIFEST.ru.md`.

## Порядок реализации (BRIEF §13)

Рекомендация — не писать слайды подряд 1 → 15. Сначала:

1. Отладить `ComplexAction` (слайд 6) end-to-end.
2. Проверить токены цифр Эйзенштейна (§6.5 BRIEF) и зафиксировать в
   `class.md`, если автор подтвердит.
3. Написать «простые» слайды 3, 4, 5 — там нет алгебры, только геометрия.
4. Дальше — кульминационная линия 10 → 11 → 12 → 13 → 14.
5. Последним — title (1), section-Gauss (2), epilogue (15).
