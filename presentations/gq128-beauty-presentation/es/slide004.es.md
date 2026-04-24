---
layout: content
title: 'Un espejo, no un cuadrado'
subtitle: 'Deuda №2: la hermiticidad como geometría'
sourceHash: sha256-e710c2f1d78fd613f80cc73cf2aaeb688f85c3844990ba09934ddf1de0fbea55
translatedBy: claude-opus-4-7
---

![A la izquierda — una matriz $N\times N$ en forma de cuadrado: la diagonal va del vértice superior izquierdo al inferior derecho. A la derecha — la misma matriz apoyada sobre una esquina: la diagonal se convierte en el eje vertical de simetría, y los elementos $(i,j)$ y $(j,i)$ quedan dispuestos simétricamente respecto a ella.](../assets/abstract/fig_mirror.svg)

*Apoya la matriz sobre una esquina y la condición $H = H^{\dagger}$ se vuelve un reflejo literalmente especular.*

<!-- backstage -->

## Párrafo completo (traducción del resumen)

La representación matricial del número complejo encierra una segunda simetría oculta. En la disposición estándar, la matriz $N \times N$ es un **cuadrado** cuya diagonal va del vértice superior izquierdo al inferior derecho, y la condición de hermiticidad $H = H^{\dagger}$ aparece como una afirmación **puramente algebraica**.

Apoya la matriz sobre una esquina, como un **rombo**, de modo que la diagonal quede **vertical**. Los elementos diagonales reales caen exactamente sobre el eje de simetría; el elemento $(i, j)$ y su compañero conjugado $(j, i)$ ocupan posiciones **literalmente simétricas como en un espejo** respecto a ese eje. La hermiticidad, **invisible** en la disposición cuadrada, se convierte en un **reflejo geométrico visible a simple vista**.

:::callout{tone=primary}
Un niño preguntó una vez por qué el espejo intercambia *izquierda* y *derecha*, pero no *arriba* y *abajo*; la respuesta es que **no hace ni lo uno ni lo otro**: somos nosotros quienes imponemos esa permutación al girarnos hacia él. La disposición estándar de la matriz realiza exactamente el mismo giro, ocultando una simetría que siempre estuvo allí.
:::

## Por qué nos interesa esto en el hilo de la charla

- La interpretación geométrica de la hermiticidad es una propedéutica hacia $\mathbb{Z}[\omega]$: cuando la red cambie el cuadrado por un hexágono (diapositiva 5), este truco de «apoyar sobre la esquina» se convertirá en el sistema de coordenadas por defecto.
- También es una preparación para la **isotropía de la cuantización de errores** en GQ128: allí el «cuadrado» estándar de IEEE 754 también estorba para ver la simetría real.
