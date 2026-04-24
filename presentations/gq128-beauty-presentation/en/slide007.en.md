---
layout: content
title: The unit interval is a fractal
subtitle: The Gosper island as a fundamental domain
sourceHash: sha256-e2d4da62b5635ff3f1f11f54b63d6ed12ee529eb0d11cf90984fe479db6b2bf3
translatedBy: claude-opus-4-7
---

![The Gosper island: seven self-similar copies at ratio $1/\sqrt{7}$, tiling the plane without gaps](../assets/abstract/fig_gosper.png)

*The attractor of the positional system with base $\beta = 2 - \omega$ is the **Gosper island**.*

<!-- backstage -->

## Full paragraph (translation of the abstract)

What does the "unit interval" look like in this number system?

In decimal, all infinite digit strings $0.d_1 d_2 \dots$ fill $[0, 1]$. The analogous attractor in base $(2 - \omega)$ is something **entirely different**: a fractal made of **seven self-similar copies** with contraction ratio $1/\sqrt{7}$.

It was discovered by **Bill Gosper** in 1973; it was first **publicly described** by **Martin Gardner** in the *Mathematical Games* column of *Scientific American* (December 1976), and later **Benoît Mandelbrot** (1977) named it the **Gosper island** (*Gosper island*).

It **tiles the plane by translations** — **no gaps, no overlaps** — and its **boundary is nowhere smooth**. This is the natural **fundamental domain** of complex arithmetic on the hexagonal lattice: the shape the unit interval always wanted to be.

## Why this isn't just a pretty picture

- The boundary of the Gosper island is the **Gosper curve**, one of the canonical space-filling traversals of the plane. In GQ128 this traversal is used as a **serialization** of values — locality on the curve corresponds to proximity in the complex plane.
- The Hausdorff dimension of the boundary is $\dim_H \partial G = \log 3 / \log \sqrt{7} \approx 1.1291$. In other words, the boundary is a curve, but "thicker" than usual; this is the geometric source of the **isotropic quantization error** that a square lattice lacks.

## References

- **Gardner, M. (1976)** Mathematical games: In which *"monster"* curves force redefinition of the word *"curve"*. *Scientific American*, 235(6), 124–129. [scientificamerican.com](https://www.scientificamerican.com/article/mathematical-games-1976-12/)
- **Mandelbrot, B. B. (1977)** *Fractals: Form, Chance, and Dimension*. San Francisco: W. H. Freeman. [archive.org](https://archive.org/details/fractalsformchan0000mand)
