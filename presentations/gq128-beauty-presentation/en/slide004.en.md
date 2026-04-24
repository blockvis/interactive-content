---
layout: content
title: 'A mirror, not a square'
subtitle: 'Debt #2: Hermiticity as geometry'
sourceHash: sha256-e710c2f1d78fd613f80cc73cf2aaeb688f85c3844990ba09934ddf1de0fbea55
translatedBy: claude-opus-4-7
---

![On the left — an $N\times N$ matrix laid out as a square: the diagonal runs from the top-left to the bottom-right corner. On the right — the same matrix stood on its corner: the diagonal becomes a vertical axis of symmetry, and the entries $(i,j)$ and $(j,i)$ sit symmetrically across it.](../assets/abstract/fig_mirror.svg)

*Stand the matrix on its corner, and the condition $H = H^{\dagger}$ becomes a literal mirror reflection.*

<!-- backstage -->

## Full paragraph (abstract translation)

The matrix representation of a complex number carries a second hidden symmetry. In the standard layout, an $N \times N$ matrix is a **square** whose diagonal runs from the top-left corner to the bottom-right, and the Hermiticity condition $H = H^{\dagger}$ looks like a **purely algebraic** statement.

Stand the matrix on its corner, as a **rhombus** — so that the diagonal becomes **vertical**. The real diagonal entries end up exactly on the axis of symmetry; the entry $(i, j)$ and its conjugate partner $(j, i)$ land in **literally mirror-symmetric** positions across that axis. Hermiticity, **invisible** in the square layout, becomes a **geometric reflection visible to the naked eye**.

:::callout{tone=primary}
A child once asked why a mirror swaps *left* and *right* but not *up* and *down*; the answer is that **it does neither**: we ourselves impose the permutation by turning to face it. The standard matrix layout performs exactly the same turn, hiding a symmetry that was always there.
:::

## Why this matters for the talk's storyline

- A geometric interpretation of Hermiticity is propaedeutic to $\mathbb{Z}[\omega]$: when the lattice swaps the square for the hexagon (slide 5), this "stand it on its corner" trick will become the default coordinate system.
- It is also preparation for **isotropy of error quantization** in GQ128: there, too, the standard IEEE 754 "square" gets in the way of seeing the real symmetry.
