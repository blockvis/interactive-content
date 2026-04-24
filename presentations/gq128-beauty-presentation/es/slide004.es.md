---
layout: content
title: 'Un espejo, no un cuadrado'
subtitle: 'Deuda №2: hermiticidad como geometría'
sourceHash: sha256-e710c2f1d78fd613f80cc73cf2aaeb688f85c3844990ba09934ddf1de0fbea55
translatedBy: claude-opus-4-7
---

![A la izquierda, una matriz $N\times N$ en forma de cuadrado: la diagonal va desde la esquina superior izquierda hasta la inferior derecha. A la derecha, la misma matriz puesta de canto: la diagonal se convierte en el eje vertical de simetría, y los elementos $(i,j)$ y $(j,i)$ quedan simétricamente dispuestos respecto a él.](../assets/abstract/fig_mirror.svg)

*Pon la matriz de canto, y la condición $H = H^{\dagger}$ se vuelve un reflejo especular literal.*

<!-- backstage -->

## Párrafo completo (traducción del abstract)

La representación matricial de un número complejo alberga una segunda simetría oculta. En la disposición estándar, una matriz $N \times N$ es un **cuadrado** cuya diagonal va de la esquina superior izquierda a la inferior derecha, y la condición de hermiticidad $H = H^{\dagger}$ aparece como una afirmación **puramente algebraica**.

Pon la matriz de canto, como un **rombo**, de modo que la diagonal quede **vertical**. Los elementos diagonales reales caen justo sobre el eje de simetría; el elemento $(i, j)$ y su compañero conjugado $(j, i)$ ocupan posiciones **literalmente simétricas respecto a un espejo** alrededor de dicho eje. La hermiticidad, **invisible** en la disposición cuadrada, se convierte en un **reflejo geométrico visible a simple vista**.

:::callout{tone=primary}
Un niño preguntó una vez por qué el espejo intercambia *izquierda* y *derecha*, pero no *arriba* y *abajo*; la respuesta es que **no hace ni lo uno ni lo otro**: somos nosotros quienes imponemos esa permutación al girarnos hacia él. La disposición estándar de la matriz realiza exactamente el mismo giro, ocultando una simetría que siempre estuvo ahí.
:::

## Por qué nos importa en el hilo del informe

- La interpretación geométrica de la hermiticidad es propedéutica para $\mathbb{Z}[\omega]$: cuando la red cambie el cuadrado por un hexágono (slide 5), este truco de «poner de canto» se convertirá en el sistema de coordenadas por defecto.
- Y también es preparación para la **isotropía de la cuantización de errores** en GQ128: allí el «cuadrado» estándar de IEEE 754 también estorba para ver la simetría real.
