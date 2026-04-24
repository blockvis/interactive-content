---
layout: content
title: 'A mirror, not a square'
subtitle: 'Debt №2: Hermiticity as geometry'
sourceHash: sha256-e710c2f1d78fd613f80cc73cf2aaeb688f85c3844990ba09934ddf1de0fbea55
translatedBy: claude-opus-4-7
---

![On the left — an $N\times N$ matrix as a square: the diagonal runs from the top-left to the bottom-right corner. On the right — the same matrix stood on its corner: the diagonal becomes a vertical axis of symmetry, elements $(i,j)$ and $(j,i)$ lie symmetrically with respect to it.](../assets/abstract/fig_mirror.svg)

*Stand the matrix on its corner, and the condition $H = H^{\dagger}$ becomes a literal mirror reflection.*

<!-- backstage -->

## Full paragraph (abstract translation)

The matrix representation of a complex number carries a second hidden symmetry. In the standard layout, an $N \times N$ matrix is a **square** whose diagonal runs from the top-left corner to the bottom-right, and the Hermiticity condition $H = H^{\dagger}$ looks like a **purely algebraic** statement.

Stand the matrix on its corner, like a **rhombus**, so that the diagonal becomes **vertical**. The real diagonal entries land exactly on the axis of symmetry; the element $(i, j)$ and its conjugate partner $(j, i)$ end up in **literally mirror-symmetric** positions with respect to that axis. Hermiticity, **invisible** in the square layout, becomes a **geometric reflection visible to the eye**.

:::callout{tone=primary}
A child once asked why a mirror swaps *left* and *right* but not *up* and *down*; the answer is — **it does neither**: we ourselves impose the permutation by turning to face it. The standard matrix layout performs exactly the same rotation, hiding a symmetry that was always there.
:::

## Why this matters for the storyline of the talk

- The geometric interpretation of Hermiticity is a propaedeutic for $\mathbb{Z}[\omega]$: when the lattice swaps a square for a hexagon (slide 5), this "stand it on its corner" trick will become the default coordinate system.
- It is also preparation for the **isotropy of error quantization** in GQ128: there, too, the standard IEEE 754 "square" obscures the true symmetry.
