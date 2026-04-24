---
layout: content
title: Les axes sont dessinés de travers
subtitle: 'Dette n°1 : Argand contre Wessel'
sourceHash: sha256-4e64a61f69d4f94f2938f6c10999dd5a3e8856c1274466998cbd4b9d72c0e63d
translatedBy: claude-opus-4-7
---

![À gauche — Argand : Re horizontal, Im vertical, rotation positive dans le sens anti-horaire. À droite — Wessel : Re vers le haut, Im vers la droite, rotation positive dans le sens horaire, comme une boussole.](../assets/abstract/fig_axes.svg)

*Retournez les axes à la Wessel — et $e^{i\theta}$ se met à tourner **dans le sens horaire**, comme une boussole, une barre et le cap d'un navire.*

<!-- backstage -->

## Paragraphe complet (traduction de l'abstract)

Le premier à munir le plan complexe d'une forme géométrique fut **Caspar Wessel** (1799), et son origine explique beaucoup de choses : Wessel était **arpenteur norvégien**, et sa motivation était la représentation analytique de la *direction*. Dans le monde de l'arpenteur, l'orientation naturelle est **de navigation** : vers l'avant, c'est *vers le haut*, « de côté » c'est *vers la droite*, et la rotation positive suit le mouvement des aiguilles d'une montre.

Cependant, le diagramme d'Argand, qui s'est imposé dans les manuels, a choisi l'orientation **cartésienne** : l'axe réel est horizontal, la rotation positive va dans le sens **anti-horaire**.

Restaurez le système de Wessel : orientez l'axe réel **vers le haut**, l'axe imaginaire **vers la droite**. La rotation positive de $\mathrm{Re}$ vers $\mathrm{Im}$, **algébriquement identique**, devient une rotation **dans le sens horaire**. L'exponentielle complexe $e^{i\theta}$ tourne maintenant avec l'aiguille d'une horloge, avec la boussole allant du nord vers l'est, et avec le cap d'un navire virant à tribord. Les *direct* et *lateral* de Gauss retrouvent leur sens d'**avant** et de **côté**.

**La dette angulaire**, héritée des diagrammes cartésiens et non de la géométrie elle-même, **s'évapore**.

## Pourquoi c'est important

- En navigation, robotique et commande de moteurs, « l'angle » est presque toujours **horaire depuis le nord**. Or la physique mathématique exige par habitude une conversion en « anti-horaire depuis l'est ». Chacune de ces conversions est une source d'erreurs de signe.
- La convention de Wessel fait de $\cos\theta + i\sin\theta$ **le même mouvement** que $\mathrm{heading}(t)$ d'une boussole, sans correction.
- L'algèbre de $\mathbb{C}$ ne change pas : seule change l'image au tableau.

## Référence

- **Wessel, C. (1799)** *Om directionens analytiske betegning*. Nye samling af det Kongelige Danske Videnskabernes Selskabs Skrifter, 5, 469–518. [sophiararebooks.com](https://www.sophiararebooks.com/pages/books/6397/caspar-wessel/om-directionens-analytiske-betegning-et-forsog-anvendt-fornemmelig-til-plane-og-sphaeriske)
