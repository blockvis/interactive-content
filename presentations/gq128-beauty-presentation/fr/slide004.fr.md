---
layout: content
title: 'Un miroir, pas un carré'
subtitle: 'Dette n°2 : l''hermiticité comme géométrie'
sourceHash: sha256-e710c2f1d78fd613f80cc73cf2aaeb688f85c3844990ba09934ddf1de0fbea55
translatedBy: claude-opus-4-7
---

![À gauche — une matrice $N\times N$ sous forme de carré : la diagonale va du coin supérieur gauche au coin inférieur droit. À droite — la même matrice posée sur son coin : la diagonale devient un axe de symétrie vertical, les éléments $(i,j)$ et $(j,i)$ se trouvent en positions symétriques par rapport à cet axe.](../assets/abstract/fig_mirror.svg)

*Posez la matrice sur son coin, et la condition $H = H^{\dagger}$ devient une réflexion miroir au sens littéral.*

<!-- backstage -->

## Paragraphe complet (traduction de l'abstract)

La représentation matricielle d'un nombre complexe porte en elle une seconde symétrie cachée. Dans la disposition standard, une matrice $N \times N$ est un **carré**, dont la diagonale va du coin supérieur gauche au coin inférieur droit, et la condition d'hermiticité $H = H^{\dagger}$ apparaît comme un énoncé **purement algébrique**.

Posez la matrice sur son coin, comme un **losange**, — de sorte que la diagonale devienne **verticale**. Les éléments diagonaux réels se retrouvent exactement sur l'axe de symétrie ; l'élément $(i, j)$ et son partenaire conjugué $(j, i)$ occupent des positions **littéralement symétriques en miroir** par rapport à cet axe. L'hermiticité, **invisible** dans la disposition carrée, devient une **réflexion géométrique visible à l'œil nu**.

:::callout{tone=primary}
Un enfant a un jour demandé pourquoi le miroir échange la *gauche* et la *droite* mais pas le *haut* et le *bas* ; la réponse : **il ne fait ni l'un ni l'autre** — c'est nous-mêmes qui imposons la permutation en nous tournant vers lui. La disposition standard d'une matrice effectue exactement la même rotation, dissimulant une symétrie qui a toujours été là.
:::

## Pourquoi cela nous concerne dans le fil du propos

- L'interprétation géométrique de l'hermiticité est une propédeutique à $\mathbb{Z}[\omega]$ : lorsque le réseau passera du carré à l'hexagone (slide 5), cette astuce du « poser sur le coin » deviendra le système de coordonnées par défaut.
- Elle prépare également à l'**isotropie de la quantification des erreurs** dans GQ128 : là aussi, le « carré » standard d'IEEE 754 empêche de voir la véritable symétrie.
