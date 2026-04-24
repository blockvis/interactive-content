---
layout: content
title: GQ128 y demostración en vivo
subtitle: 'Float complejo cuya mantisa vive en $\mathbb{Z}[\omega]$'
sourceHash: sha256-f3363d6cb8138e910172c76e8fd7a2275da7b962d3cae1f5b13e3bc3ccf5ce53
translatedBy: claude-opus-4-7
---

:::callout{tone=accent}
**GQ128** — formato complejo de punto flotante de 128 bits cuya mantisa reside en $\mathbb{Z}[\omega]$, y **no** en $\mathbb{Z}$. Resultado: error de cuantización **isotrópico** — una propiedad estructuralmente **imposible** en la retícula cuadrada del complex IEEE 754 estándar.
:::

*Todos los conceptos de la charla se demuestran mediante visualizaciones interactivas generadas por IA en tiempo real, **sin diapositivas tradicionales**.*

<!-- backstage -->

## Párrafo completo (traducción del abstract)

La charla culmina con la **primera presentación pública de GQ128** — un formato complejo de punto flotante cuya **mantisa** vive en $\mathbb{Z}[\omega]$, no en $\mathbb{Z}$. Esto proporciona un error de cuantización **isotrópico** — una propiedad **estructuralmente imposible** en la retícula cuadrada de la representación complex estándar IEEE 754.

**Todos los conceptos se demuestran mediante visualizaciones interactivas generadas por IA en tiempo real, sin diapositivas tradicionales.**

## Lo que importa saber sobre GQ128

- **Base.** $Z = 3 + \omega$, $|Z|^2 = 7$. Concuerda con el sistema septimal de la diapositiva 6: la misma geometría, pero en formato de punto flotante.
- **Mantisa.** De 42 slots, dígitos de 3 bits. El número $42 = \varphi(7^2)$ no es casualidad; es precisamente lo que garantiza la autoconsistencia de la **NTT exacta de 98 puntos** sobre $\mathbb{Z}/343\mathbb{Z}$, usada para multiplicación sin pérdidas.
- **Exponente.** No fijo, sino un «marcador END flotante» — una coordenada espiral con paso $\arg(Z) \approx 19{,}1°$, irracional respecto a $\pi$.
- **Aritmética.** Suma **carry-bounded** mediante una LUT de 343 elementos; multiplicación por $\omega$ — **desplazamiento cíclico**; negación — *two's complement* en codificación Doppler-EGA.
- **Serialización.** Los valores se disponen en memoria a lo largo de la curva de Gosper — la misma que delimita el fractal de la diapositiva 7. Localidad en la curva = cercanía en el plano $\mathbb{C}$.

## Por qué «error isotrópico» es importante

En la retícula cuadrada $\mathbb{Z}[i]$ el error de cuantización tiene escalas distintas a lo largo de los ejes y en la diagonal: factor $\sqrt{2}$ en la esquina, factor $1$ sobre el eje. Esto hace que el complex IEEE 754 sea **anisótropo**: la precisión depende del argumento. En $\mathbb{Z}[\omega]$ los seis vecinos más próximos son equidistantes — **la precisión es igual en todas las direcciones**.

## Lugar de GQ128 en la jerarquía de empaquetamientos de esferas

GQ128 es el miembro 2D de una familia más amplia «kissing number + 1 = número de dígitos», que desplegamos por separado en la discusión:

| $d$ | Retícula | $\kappa$ | $p = \kappa + 1$ | Formato |
|-----|----------|----------|------------------|---------|
| 1 | $\mathbb{Z}$ | 2 | 3 | **Setun** (Brusentsov, MGU, 1959) |
| **2** | $A_2$ hex | **6** | **7** | **GQ128** (128 bits) |
| 3 | FCC $A_3$ | 12 | 13 | G626 (626 bits) |
| 8 | $E_8$ | 240 | 241 | — (Viazovska, 2016) |
| 24 | Leech $\Lambda_{24}$ | 196 560 | 196 561 | — (Cohn–Kumar–Miller–Radchenko–Viazovska, 2016) |

**GQ128 es el único miembro de la familia que cabe íntegramente en un registro estándar de 128 bits.** Y el único en el que todas las operaciones aritméticas son $O(1)$ sobre una arquitectura AXR adecuada.
