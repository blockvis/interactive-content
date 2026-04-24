---
layout: content
title: Seven digits for the complex plane
subtitle: Positional system with base $\beta = 2 - \omega$
sourceHash: sha256-1b95fe867729d2b1a1890ce71e7b5988369e4cc1bc86afdfcc9acb5d92a87dd9
translatedBy: claude-opus-4-7
---

$$
\beta = 2 - \omega, \quad N(\beta) = 7, \quad D = \{0, 1, 2, 3, 4, 5, 6\}
$$

*Every Eisenstein integer has a **unique finite** representation in digits $D$ to base $\beta$.*

<!-- backstage -->

## Full paragraph (abstract translation)

**Knuth (1960)**, then still a high-school student, observed that an imaginary number can be used as the base of a positional numeral system — the **quater-imaginary base** $2i$ for Gaussian integers. The same idea on the **Eisenstein** lattice gives rise to something even more elegant.

Take $\beta = 2 - \omega$; then
$$
N(\beta) = 2^2 - 2 \cdot 1 + 1^2 = 7,
$$
so there are exactly **seven** residue classes modulo $\beta$, and the digit set is $D = \{0, 1, 2, 3, 4, 5, 6\}$. **Every** Eisenstein integer admits a **unique finite** representation:

$$
z = d_n \cdot \beta^n + d_{n-1} \cdot \beta^{n-1} + \dots + d_0, \qquad d_k \in D. \qquad\text{(1)}
$$

**Addition, multiplication, and carry** become **geometric** operations on the hexagonal lattice. The talk shows complete **addition and multiplication tables** for $D$ and a worked example of **long addition** with hexagonal carry — an operation accessible to any child who can do long addition in base ten.

## Digit palette (solid version)

:::seven-digits-solid{units}
Colour carries the algebra: green / blue / red — $\{+1,\ +\omega,\ +\omega^{-1}\}$ (the RGB triple), magenta / yellow / cyan — $\{-1,\ -\omega,\ -\omega^{-1}\}$ (the CMY triple); pairs on opposite clock positions are pairwise complementary, and **negation = switching to the complementary colour**.
:::

## What deserves special attention

- The number $7$ is $|B|^2$ for the base $\beta$, which means that this is exactly **how many** digits **must** belong to any self-consistent numeral system on $\mathbb{Z}[\omega]$. Not a designer's choice, but an **arithmetic necessity**.
- The carry rule is fully determined by the equation $\omega^2 + \omega + 1 = 0$ — it can be drawn as a triangle of three hexagons that "fold up" into zero.
- This septenary system is the direct arithmetic predecessor of the GQ128 format (slide 8).

## Reference

- **Knuth, D. E. (1960)** An imaginary number system. *Communications of the ACM*, 3(4), 245–247. DOI:10.1145/367177.367233. [dl.acm.org](https://dl.acm.org/doi/10.1145/367177.367233)
