---
layout: content
title: Sept chiffres pour le plan complexe
subtitle: Système positionnel de base $\beta = 2 - \omega$
sourceHash: sha256-1b95fe867729d2b1a1890ce71e7b5988369e4cc1bc86afdfcc9acb5d92a87dd9
translatedBy: claude-opus-4-7
---

$$
\beta = 2 - \omega, \quad N(\beta) = 7, \quad D = \{0, 1, 2, 3, 4, 5, 6\}
$$

*Chaque entier d'Eisenstein admet une **unique représentation finie** en chiffres $D$ dans la base $\beta$.*

<!-- backstage -->

## Paragraphe complet (traduction de l'abstract)

**Knuth (1960)**, alors encore lycéen, a remarqué qu'un nombre imaginaire peut servir de base à un système de numération positionnel — la **quater-imaginary base** $2i$ pour les entiers de Gauss. La même idée appliquée au réseau **d'Eisenstein** engendre quelque chose d'encore plus élégant.

Prenons $\beta = 2 - \omega$ ; alors
$$
N(\beta) = 2^2 - 2 \cdot 1 + 1^2 = 7,
$$
de sorte qu'il y a exactement **sept** classes de résidus modulo $\beta$, et l'ensemble des chiffres est $D = \{0, 1, 2, 3, 4, 5, 6\}$. **Tout** entier d'Eisenstein admet une **unique représentation finie** :

$$
z = d_n \cdot \beta^n + d_{n-1} \cdot \beta^{n-1} + \dots + d_0, \qquad d_k \in D. \qquad\text{(1)}
$$

**L'addition, la multiplication et la retenue** deviennent des opérations **géométriques** sur le réseau hexagonal. L'exposé présente les **tables d'addition et de multiplication** complètes pour $D$ ainsi qu'un exemple détaillé d'**addition posée** avec retenue hexagonale — une opération accessible à un enfant sachant poser une addition décimale.

## Palette des chiffres (version solid)

:::seven-digits-solid{units}
La couleur porte l'algèbre : vert / bleu / rouge — $\{+1,\ +\omega,\ +\omega^{-1}\}$ (triplet RGB), magenta / jaune / cyan — $\{-1,\ -\omega,\ -\omega^{-1}\}$ (triplet CMY) ; les paires situées aux heures opposées sont complémentaires deux à deux, et **la négation = passage à la couleur complémentaire**.
:::

## Ce qui mérite une attention particulière

- Le nombre $7$ est $|B|^2$ pour la base $\beta$, ce qui signifie que c'est **exactement** le nombre de chiffres **imposé** à tout système de numération auto-cohérent sur $\mathbb{Z}[\omega]$. Ce n'est pas un choix de designer, mais une **nécessité arithmétique**.
- La règle de retenue est entièrement déterminée par l'équation $\omega^2 + \omega + 1 = 0$ — on peut la représenter comme un triangle de trois hexagones « se combinant » en zéro.
- Ce système septénaire est le prédécesseur arithmétique direct du format GQ128 (diapositive 8).

## Référence

- **Knuth, D. E. (1960)** An imaginary number system. *Communications of the ACM*, 3(4), 245–247. DOI:10.1145/367177.367233. [dl.acm.org](https://dl.acm.org/doi/10.1145/367177.367233)
