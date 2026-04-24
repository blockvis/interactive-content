---
layout: content
title: Przedział jednostkowy to fraktal
subtitle: Wyspa Gospera jako obszar fundamentalny
sourceHash: sha256-e2d4da62b5635ff3f1f11f54b63d6ed12ee529eb0d11cf90984fe479db6b2bf3
translatedBy: claude-opus-4-7
---

![Wyspa Gospera: siedem samopodobnych kopii o współczynniku $1/\sqrt{7}$, parkietaż płaszczyzny bez szczelin](../assets/abstract/fig_gosper.png)

*Atraktor systemu pozycyjnego o podstawie $\beta = 2 - \omega$ to **wyspa Gospera**.*

<!-- backstage -->

## Pełny akapit (tłumaczenie abstraktu)

Jak wygląda „przedział jednostkowy" w tym systemie pozycyjnym?

W systemie dziesiętnym wszystkie nieskończone ciągi cyfr $0.d_1 d_2 \dots$ wypełniają $[0, 1]$. Analogiczny atraktor w bazie $(2 - \omega)$ to coś **zupełnie innego**: fraktal złożony z **siedmiu samopodobnych kopii** o współczynniku kontrakcji $1/\sqrt{7}$.

Odkrył go **Bill Gosper** w 1973 roku; po raz pierwszy został **publicznie opisany** przez **Martina Gardnera** w rubryce *Mathematical Games* czasopisma *Scientific American* (grudzień 1976), a później **Benoît Mandelbrot** (1977) nazwał go **wyspą Gospera** (*Gosper island*).

**Parkietuje on płaszczyznę translacjami** — **bez szczelin, bez nakładek**, a jego **brzeg nigdzie nie jest gładki**. To właśnie naturalny **obszar fundamentalny** arytmetyki zespolonej na kracie sześciokątnej: kształt, którym przedział jednostkowy zawsze chciał być.

## Dlaczego to nie tylko ładny obrazek

- Brzeg wyspy Gospera to właśnie **krzywa Gospera**, od której wzięła nazwę jedna z kanonicznych space-filling obchodów płaszczyzny. W GQ128 ten obchód jest używany jako **serializacja** wartości — lokalność na krzywej odpowiada bliskości w płaszczyźnie zespolonej.
- Wymiar Hausdorffa brzegu $\dim_H \partial G = \log 3 / \log \sqrt{7} \approx 1{,}1291$. Czyli brzeg jest krzywą, ale „grubszą" niż zwykle; to geometryczne źródło **isotropic quantization error**, którego nie ma krata kwadratowa.

## Odnośniki

- **Gardner, M. (1976)** Mathematical games: In which *«monster»* curves force redefinition of the word *«curve»*. *Scientific American*, 235(6), 124–129. [scientificamerican.com](https://www.scientificamerican.com/article/mathematical-games-1976-12/)
- **Mandelbrot, B. B. (1977)** *Fractals: Form, Chance, and Dimension*. San Francisco: W. H. Freeman. [archive.org](https://archive.org/details/fractalsformchan0000mand)
