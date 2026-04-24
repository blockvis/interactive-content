---
layout: content
title: The optimal lattice for complex numbers
subtitle: 'Debt #3: $\mathbb{Z}[i]$ is not the limit'
sourceHash: sha256-895965e3b7fb15ce347cf8aae26552c1dff5648ddb7fbf77185714c375596686
translatedBy: claude-opus-4-7
---

$$
\omega = e^{2\pi i / 3}, \qquad \omega^2 + \omega + 1 = 0
$$

*The square lattice gives **4** neighbours per point; the hexagonal one gives **6**. The right arithmetic object is the Eisenstein ring $\mathbb{Z}[\omega]$.*

<!-- backstage -->

## Full paragraph (abstract expanded)

Gauss's 1831 treatise, beyond its famous complaint, also introduced the **Gaussian integers** $\mathbb{Z}[i]$ — a square lattice encoded by that very 90°-convention. But this lattice is **not geometrically optimal**: the **hexagonal** lattice is **denser**, with **six** equidistant neighbours per point instead of four.

The right arithmetic object is the ring of **Eisenstein integers** $\mathbb{Z}[\omega]$, where $\omega = e^{2\pi i / 3}$ satisfies $\omega^2 + \omega + 1 = 0$. It was introduced by **Eisenstein** (1844) in his proof of the **law of cubic reciprocity** (for details, see Ireland & Rosen, 1990).

Its norm
$$
N(a + b\omega) = a^2 - ab + b^2
$$
is the natural quadratic form of **60°-geometry**; and, just like $\mathbb{Z}[i]$, it is a **Euclidean ring**.

:::callout{tone=accent}
The hexagonal lattice is not a *generalization* of Gauss's square lattice. It is its **correction**.
:::

## Who first noticed the packing is hexagonal

**Thue (1910)** — the hexagonal circle packing in the plane is denser than any other. This is the 2D analogue of the same intuition that will later lead to the hierarchy of sphere packings in 3D, 8D and 24D — we will touch on it in the final part.

## References

- **Eisenstein, G. (1844)** Beweis des Reciprocitätssatzes für die cubischen Reste… *Journal für die reine und angewandte Mathematik*, 27, 289–310. [degruyterbrill.com](https://www.degruyterbrill.com/document/doi/10.1515/crll.1844.27.289/html)
- **Ireland, K. & Rosen, M. (1990)** *A Classical Introduction to Modern Number Theory*, 2nd ed. New York: Springer. [link.springer.com](https://link.springer.com/book/10.1007/978-1-4757-2103-4)
