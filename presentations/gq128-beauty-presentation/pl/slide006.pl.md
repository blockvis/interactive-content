---
layout: content
title: Siedem cyfr dla płaszczyzny zespolonej
subtitle: System pozycyjny o podstawie $\beta = 2 - \omega$
sourceHash: sha256-1b95fe867729d2b1a1890ce71e7b5988369e4cc1bc86afdfcc9acb5d92a87dd9
translatedBy: claude-opus-4-7
---

$$
\beta = 2 - \omega, \quad N(\beta) = 7, \quad D = \{0, 1, 2, 3, 4, 5, 6\}
$$

*Każda liczba całkowita Eisensteina ma **jednoznaczne skończone** przedstawienie w cyfrach $D$ przy podstawie $\beta$.*

<!-- backstage -->

## Pełny akapit (tłumaczenie abstraktu)

**Knuth (1960)**, wówczas jeszcze licealista, zauważył, że liczbę urojoną można wykorzystać jako podstawę pozycyjnego systemu liczbowego — **quater-imaginary base** $2i$ dla liczb całkowitych Gaussa. Ta sama idea na kracie **Eisensteina** rodzi coś jeszcze bardziej eleganckiego.

Weźmy $\beta = 2 - \omega$; wtedy
$$
N(\beta) = 2^2 - 2 \cdot 1 + 1^2 = 7,
$$
zatem klas reszt modulo $\beta$ jest dokładnie **siedem**, a zestaw cyfr to $D = \{0, 1, 2, 3, 4, 5, 6\}$. **Każda** liczba całkowita Eisensteina dopuszcza **jednoznaczne skończone** przedstawienie:

$$
z = d_n \cdot \beta^n + d_{n-1} \cdot \beta^{n-1} + \dots + d_0, \qquad d_k \in D. \qquad\text{(1)}
$$

**Dodawanie, mnożenie i przeniesienie** stają się **geometrycznymi** operacjami na kracie heksagonalnej. W referacie pokazano pełne **tabliczki dodawania i mnożenia** dla $D$ oraz dopracowany przykład **dodawania pisemnego** z heksagonalnym przeniesieniem — operacja dostępna dla dziecka umiejącego dodawać dziesiętnie w słupku.

## Paleta cyfr (wersja solid)

:::seven-digits-solid{units}
Kolor niesie algebrę: zielony / niebieski / czerwony — $\{+1,\ +\omega,\ +\omega^{-1}\}$ (trójka RGB), purpurowy / żółty / turkusowy — $\{-1,\ -\omega,\ -\omega^{-1}\}$ (trójka CMY); pary na przeciwległych godzinach są parami komplementarne, a **negacja = przejście do koloru dopełniającego**.
:::

## Co zasługuje na szczególną uwagę

- Liczba $7$ to $|B|^2$ przy podstawie $\beta$, co oznacza, że właśnie **tyle** cyfr **musi** mieć każdy samozgodny system liczbowy na $\mathbb{Z}[\omega]$. Nie wybór projektanta, lecz **arytmetyczna konieczność**.
- Reguła przeniesienia jest całkowicie zdeterminowana równaniem $\omega^2 + \omega + 1 = 0$ — można ją narysować jako trójkąt z trzech sześciokątów „składających się” do zera.
- Ten siódemkowy system to bezpośredni arytmetyczny prekursor formatu GQ128 (slajd 8).

## Odnośnik

- **Knuth, D. E. (1960)** An imaginary number system. *Communications of the ACM*, 3(4), 245–247. DOI:10.1145/367177.367233. [dl.acm.org](https://dl.acm.org/doi/10.1145/367177.367233)
