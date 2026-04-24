---
layout: content
title: GQ128 et démonstration en direct
subtitle: 'Un float complexe dont la mantisse vit dans $\mathbb{Z}[\omega]$'
sourceHash: sha256-f3363d6cb8138e910172c76e8fd7a2275da7b962d3cae1f5b13e3bc3ccf5ce53
translatedBy: claude-opus-4-7
---

:::callout{tone=accent}
**GQ128** — format complexe à virgule flottante de 128 bits, dont la mantisse vit dans $\mathbb{Z}[\omega]$, et **non** dans $\mathbb{Z}$. Résultat : une erreur de quantification **isotrope** — propriété **structurellement impossible** sur le réseau carré du complex IEEE 754 standard.
:::

*Tous les concepts de l'exposé sont démontrés via des visualisations interactives générées par l'IA en temps réel, **sans diapositives traditionnelles**.*

<!-- backstage -->

## Paragraphe complet (traduction de l'abstract)

L'exposé se conclut par la **première présentation publique de GQ128** — un format complexe à virgule flottante dont la **mantisse** vit dans $\mathbb{Z}[\omega]$ et non dans $\mathbb{Z}$. Cela donne une erreur de quantification **isotrope** — propriété **structurellement impossible** sur le réseau carré de la représentation complex IEEE 754 standard.

**Tous les concepts sont démontrés via des visualisations interactives générées par l'IA en temps réel, sans diapositives traditionnelles.**

## Ce qu'il faut savoir sur GQ128

- **Base.** $Z = 3 + \omega$, $|Z|^2 = 7$. Cohérent avec le système septénaire du slide 6 : même géométrie, mais en format à virgule flottante.
- **Mantisse.** 42 emplacements, chiffres sur 3 bits. Le nombre $42 = \varphi(7^2)$ n'est pas une coïncidence ; c'est précisément lui qui assure l'auto-cohérence de la **NTT exacte à 98 points** sur $\mathbb{Z}/343\mathbb{Z}$, utilisée pour la multiplication sans perte.
- **Exposant.** Non fixe, mais « marqueur END flottant » — coordonnée spiralée de pas $\arg(Z) \approx 19{,}1°$, irrationnel par rapport à $\pi$.
- **Arithmétique.** Addition **carry-bounded** via LUT à 343 éléments ; multiplication par $\omega$ = **décalage cyclique** ; négation = *two's complement* en codage Doppler-EGA.
- **Sérialisation.** Les valeurs sont disposées en mémoire le long de la courbe de Gosper — la même qui borde la fractale du slide 7. Localité sur la courbe = proximité dans le plan $\mathbb{C}$.

## Pourquoi une « erreur isotrope » est important

Sur le réseau carré $\mathbb{Z}[i]$, l'erreur de quantification a une échelle différente selon les axes et la diagonale : facteur $\sqrt{2}$ dans le coin, facteur $1$ sur l'axe. Cela rend le complex IEEE 754 **anisotrope** : l'erreur dépend de l'argument. Sur $\mathbb{Z}[\omega]$, les six plus proches voisins sont équidistants — **l'erreur est la même dans toutes les directions**.

## Place de GQ128 dans la hiérarchie des empilements de sphères

GQ128 est le membre 2D d'une famille plus large « kissing number + 1 = nombre de chiffres », que nous développons séparément dans la discussion :

| $d$ | Réseau | $\kappa$ | $p = \kappa + 1$ | Format |
|-----|--------|----------|------------------|--------|
| 1 | $\mathbb{Z}$ | 2 | 3 | **Setun** (Broussentsov, MGU, 1959) |
| **2** | $A_2$ hex | **6** | **7** | **GQ128** (128 bits) |
| 3 | FCC $A_3$ | 12 | 13 | G626 (626 bits) |
| 8 | $E_8$ | 240 | 241 | — (Viazovska, 2016) |
| 24 | Leech $\Lambda_{24}$ | 196 560 | 196 561 | — (Cohn–Kumar–Miller–Radchenko–Viazovska, 2016) |

**GQ128 est le seul membre de la famille à tenir entièrement dans un registre 128 bits standard.** Et le seul dont toutes les opérations arithmétiques sont en $O(1)$ sur une architecture AXR adaptée.
