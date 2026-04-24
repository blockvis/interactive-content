---
layout: content
title: Les axes sont dessinés de travers
subtitle: 'Dette n°1 : Argand contre Wessel'
sourceHash: sha256-4e64a61f69d4f94f2938f6c10999dd5a3e8856c1274466998cbd4b9d72c0e63d
translatedBy: claude-opus-4-7
---

![À gauche — Argand : Re horizontal, Im vertical, rotation positive dans le sens antihoraire. À droite — Wessel : Re vers le haut, Im vers la droite, rotation positive dans le sens horaire, comme sur une boussole.](../assets/abstract/fig_axes.svg)

*Tournez les axes à la Wessel — et $e^{i\theta}$ se met à tourner **dans le sens des aiguilles d'une montre**, comme une boussole, une barre de gouvernail et le cap d'un navire.*

<!-- backstage -->

## Paragraphe complet (traduction de l'abstract)

C'est **Caspar Wessel** (1799) qui, le premier, a donné une forme géométrique au plan complexe, et ses origines expliquent beaucoup : Wessel était un **arpenteur norvégien**, et sa motivation était la représentation analytique de la *direction*. Dans le monde de l'arpenteur, l'orientation naturelle est **celle de la navigation** : vers l'avant, c'est *vers le haut*, « sur le côté », c'est *vers la droite*, et la rotation positive suit le mouvement de l'aiguille d'une montre.

Pourtant, le diagramme d'Argand, qui s'est imposé dans les manuels, a adopté une orientation **cartésienne** : l'axe réel est horizontal, la rotation positive se fait **dans le sens antihoraire**.

Rétablissez le système de Wessel : orientez l'axe réel **vers le haut**, l'axe imaginaire **vers la droite**. La rotation positive de $\mathrm{Re}$ vers $\mathrm{Im}$, **algébriquement identique**, devient une rotation **dans le sens horaire**. L'exponentielle complexe $e^{i\theta}$ tourne désormais avec l'aiguille de la montre, avec la boussole qui va du nord à l'est, et avec le cap d'un navire virant à tribord. Les *direct* et *lateral* de Gauss se retrouvent comme **avant** et **côté**.

La **dette angulaire**, héritée des diagrammes cartésiens et non de la géométrie elle-même, **s'évapore**.

## Pourquoi c'est important

- En navigation, en robotique et en commande de moteurs, l'« angle » est presque toujours **horaire depuis le nord**. La physique mathématique, par habitude, exige une conversion en « antihoraire depuis l'est ». Chacune de ces conversions est une source d'erreurs de signe.
- La convention de Wessel fait de $\cos\theta + i\sin\theta$ **le même mouvement** que $\mathrm{heading}(t)$ d'une boussole, sans correction.
- L'algèbre de $\mathbb{C}$ ne change pas : seule l'image au tableau change.

## Référence

- **Wessel, C. (1799)** *Om directionens analytiske betegning*. Nye samling af det Kongelige Danske Videnskabernes Selskabs Skrifter, 5, 469–518. [sophiararebooks.com](https://www.sophiararebooks.com/pages/books/6397/caspar-wessel/om-directionens-analytiske-betegning-et-forsog-anvendt-fornemmelig-til-plane-og-sphaeriske)
