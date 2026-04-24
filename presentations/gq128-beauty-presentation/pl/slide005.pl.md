---
layout: content
title: Optymalna krata dla liczb zespolonych
subtitle: 'Dług nr 3: $\mathbb{Z}[i]$ — to nie granica'
sourceHash: sha256-895965e3b7fb15ce347cf8aae26552c1dff5648ddb7fbf77185714c375596686
translatedBy: claude-opus-4-7
---

$$
\omega = e^{2\pi i / 3}, \qquad \omega^2 + \omega + 1 = 0
$$

*Krata kwadratowa daje po **4** sąsiadów na punkt; heksagonalna — po **6**. Właściwym obiektem arytmetyki jest pierścień Eisensteina $\mathbb{Z}[\omega]$.*

<!-- backstage -->

## Pełny akapit (tłumaczenie abstraktu)

Rozprawa Gaussa z 1831 roku, oprócz słynnej skargi, wprowadziła także **liczby całkowite Gaussa** $\mathbb{Z}[i]$ — kratę kwadratową zakodowaną w tej samej konwencji 90°. Ale ta krata **nie jest geometrycznie optymalna**: krata **heksagonalna** jest **gęstsza**, z **sześcioma** równoodległymi sąsiadami na punkt zamiast czterech.

Właściwym obiektem arytmetycznym jest pierścień **liczb całkowitych Eisensteina** $\mathbb{Z}[\omega]$, gdzie $\omega = e^{2\pi i / 3}$ spełnia $\omega^2 + \omega + 1 = 0$. Został wprowadzony przez **Eisensteina** (1844) w jego dowodzie **prawa wzajemności sześciennej** (szczegóły — zob. Ireland & Rosen, 1990).

Jego norma
$$
N(a + b\omega) = a^2 - ab + b^2
$$
— to naturalna forma kwadratowa **geometrii 60°**; i podobnie jak $\mathbb{Z}[i]$, jest to **pierścień euklidesowy**.

:::callout{tone=accent}
Krata heksagonalna to nie *uogólnienie* kwadratowej kraty Gaussa. To jej **korekta**.
:::

## Kto pierwszy zauważył, że upakowanie jest heksagonalne

**Thue (1910)** — heksagonalne upakowanie okręgów na płaszczyźnie jest gęstsze od dowolnego innego. To dwuwymiarowy odpowiednik tej samej intuicji, która później doprowadzi do hierarchii upakowań kul w 3D, 8D i 24D — poruszymy ją w końcowej części.

## Bibliografia

- **Eisenstein, G. (1844)** Beweis des Reciprocitätssatzes für die cubischen Reste… *Journal für die reine und angewandte Mathematik*, 27, 289–310. [degruyterbrill.com](https://www.degruyterbrill.com/document/doi/10.1515/crll.1844.27.289/html)
- **Ireland, K. & Rosen, M. (1990)** *A Classical Introduction to Modern Number Theory*, 2nd ed. New York: Springer. [link.springer.com](https://link.springer.com/book/10.1007/978-1-4757-2103-4)
