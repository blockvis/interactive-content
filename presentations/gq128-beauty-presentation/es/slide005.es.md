---
layout: content
title: Retículo óptimo para números complejos
subtitle: 'Deuda №3: $\mathbb{Z}[i]$ no es el límite'
sourceHash: sha256-895965e3b7fb15ce347cf8aae26552c1dff5648ddb7fbf77185714c375596686
translatedBy: claude-opus-4-7
---

$$
\omega = e^{2\pi i / 3}, \qquad \omega^2 + \omega + 1 = 0
$$

*El retículo cuadrado da **4** vecinos por punto; el hexagonal, **6**. El objeto aritmético correcto es el anillo de Eisenstein $\mathbb{Z}[\omega]$.*

<!-- backstage -->

## Párrafo completo (traducción del abstract)

El tratado de Gauss de 1831, además de la famosa queja, introdujo también los **enteros gaussianos** $\mathbb{Z}[i]$ — un retículo cuadrado codificado por ese mismo convenio de 90°. Pero este retículo **no es geométricamente óptimo**: el retículo **hexagonal** es **más denso**, con **seis** vecinos equidistantes por punto en lugar de cuatro.

El objeto aritmético correcto es el anillo de los **enteros de Eisenstein** $\mathbb{Z}[\omega]$, donde $\omega = e^{2\pi i / 3}$ satisface $\omega^2 + \omega + 1 = 0$. Fue introducido por **Eisenstein** (1844) en su demostración de la **ley de reciprocidad cúbica** (para los detalles, véase Ireland & Rosen, 1990).

Su norma
$$
N(a + b\omega) = a^2 - ab + b^2
$$
es la forma cuadrática natural de la **geometría de 60°**; y, al igual que $\mathbb{Z}[i]$, es un **anillo euclídeo**.

:::callout{tone=accent}
El retículo hexagonal no es una *generalización* del retículo cuadrado de Gauss. Es su **corrección**.
:::

## Quién notó primero que el empaquetamiento es hexagonal

**Thue (1910)** — el empaquetamiento hexagonal de círculos en el plano es más denso que cualquier otro. Es el análogo bidimensional de la misma intuición que más tarde llevará a la jerarquía de empaquetamientos de esferas en 3D, 8D y 24D — la tocaremos en la parte final.

## Referencias

- **Eisenstein, G. (1844)** Beweis des Reciprocitätssatzes für die cubischen Reste… *Journal für die reine und angewandte Mathematik*, 27, 289–310. [degruyterbrill.com](https://www.degruyterbrill.com/document/doi/10.1515/crll.1844.27.289/html)
- **Ireland, K. & Rosen, M. (1990)** *A Classical Introduction to Modern Number Theory*, 2nd ed. New York: Springer. [link.springer.com](https://link.springer.com/book/10.1007/978-1-4757-2103-4)
