---
layout: content
title: Le réseau optimal pour les nombres complexes
subtitle: 'Dette n°3 : $\mathbb{Z}[i]$ n''est pas la limite'
sourceHash: sha256-895965e3b7fb15ce347cf8aae26552c1dff5648ddb7fbf77185714c375596686
translatedBy: claude-opus-4-7
---

$$
\omega = e^{2\pi i / 3}, \qquad \omega^2 + \omega + 1 = 0
$$

*Le réseau carré donne **4** voisins par point ; l'hexagonal en donne **6**. Le bon objet arithmétique est l'anneau d'Eisenstein $\mathbb{Z}[\omega]$.*

<!-- backstage -->

## Paragraphe complet (traduction de l'abstract)

Le traité de Gauss de 1831, outre sa célèbre plainte, a également introduit les **entiers de Gauss** $\mathbb{Z}[i]$ — un réseau carré codé par cette même convention à 90°. Mais ce réseau **n'est pas géométriquement optimal** : le réseau **hexagonal** est **plus dense**, avec **six** voisins équidistants par point au lieu de quatre.

Le bon objet arithmétique est l'anneau des **entiers d'Eisenstein** $\mathbb{Z}[\omega]$, où $\omega = e^{2\pi i / 3}$ satisfait $\omega^2 + \omega + 1 = 0$. Il a été introduit par **Eisenstein** (1844) dans sa démonstration de la **loi de réciprocité cubique** (pour les détails, voir Ireland & Rosen, 1990).

Sa norme
$$
N(a + b\omega) = a^2 - ab + b^2
$$
est la forme quadratique naturelle de la **géométrie à 60°** ; et, comme $\mathbb{Z}[i]$, c'est un **anneau euclidien**.

:::callout{tone=accent}
Le réseau hexagonal n'est pas une *généralisation* du réseau carré de Gauss. C'est sa **correction**.
:::

## Qui a remarqué le premier que l'empilement est hexagonal

**Thue (1910)** — l'empilement hexagonal de cercles dans le plan est plus dense que tout autre. C'est l'analogue bidimensionnel de la même intuition qui conduira plus tard à la hiérarchie des empilements de sphères en 3D, 8D et 24D — que nous aborderons dans la partie finale.

## Références

- **Eisenstein, G. (1844)** Beweis des Reciprocitätssatzes für die cubischen Reste… *Journal für die reine und angewandte Mathematik*, 27, 289–310. [degruyterbrill.com](https://www.degruyterbrill.com/document/doi/10.1515/crll.1844.27.289/html)
- **Ireland, K. & Rosen, M. (1990)** *A Classical Introduction to Modern Number Theory*, 2nd ed. New York: Springer. [link.springer.com](https://link.springer.com/book/10.1007/978-1-4757-2103-4)
