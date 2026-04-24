---
layout: content
title: L'intervalle unité est une fractale
subtitle: L'île de Gosper comme domaine fondamental
sourceHash: sha256-e2d4da62b5635ff3f1f11f54b63d6ed12ee529eb0d11cf90984fe479db6b2bf3
translatedBy: claude-opus-4-7
---

![Île de Gosper : sept copies auto-similaires avec un facteur $1/\sqrt{7}$, pavage du plan sans interstices](../assets/abstract/fig_gosper.png)

*L'attracteur du système de numération de base $\beta = 2 - \omega$ est l'**île de Gosper**.*

<!-- backstage -->

## Paragraphe complet (traduction de l'abstract)

À quoi ressemble l'« intervalle unité » dans ce système de numération ?

En base décimale, toutes les chaînes infinies de chiffres $0.d_1 d_2 \dots$ remplissent $[0, 1]$. L'attracteur analogue en base $(2 - \omega)$ est quelque chose de **totalement différent** : une fractale formée de **sept copies auto-similaires** avec un facteur de contraction $1/\sqrt{7}$.

Elle a été découverte par **Bill Gosper** en 1973 ; elle a été **décrite publiquement** pour la première fois par **Martin Gardner** dans la rubrique *Mathematical Games* du magazine *Scientific American* (décembre 1976), puis **Benoît Mandelbrot** (1977) l'a nommée **île de Gosper** (*Gosper island*).

Elle **pave le plan par translations** — **sans interstices, sans chevauchements** — et sa **frontière n'est lisse nulle part**. Voilà le **domaine fondamental** naturel de l'arithmétique complexe sur le réseau hexagonal : la forme que l'intervalle unité a toujours voulu avoir.

## Pourquoi ce n'est pas qu'une belle image

- La frontière de l'île de Gosper est précisément la **courbe de Gosper**, qui donne son nom à l'un des parcours canoniques space-filling du plan. Dans GQ128, ce parcours est utilisé comme **sérialisation** des valeurs — la localité sur la courbe correspond à la proximité dans le plan complexe.
- La dimension de Hausdorff de la frontière est $\dim_H \partial G = \log 3 / \log \sqrt{7} \approx 1{,}1291$. Autrement dit, la frontière est une courbe, mais « plus épaisse » qu'une courbe ordinaire ; c'est la source géométrique d'une **isotropic quantization error**, absente sur un réseau carré.

## Références

- **Gardner, M. (1976)** Mathematical games: In which *« monster »* curves force redefinition of the word *« curve »*. *Scientific American*, 235(6), 124–129. [scientificamerican.com](https://www.scientificamerican.com/article/mathematical-games-1976-12/)
- **Mandelbrot, B. B. (1977)** *Fractals: Form, Chance, and Dimension*. San Francisco: W. H. Freeman. [archive.org](https://archive.org/details/fractalsformchan0000mand)
