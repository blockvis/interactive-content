---
layout: content
title: Siete dígitos para el plano complejo
subtitle: Sistema posicional con base $\beta = 2 - \omega$
sourceHash: sha256-1b95fe867729d2b1a1890ce71e7b5988369e4cc1bc86afdfcc9acb5d92a87dd9
translatedBy: claude-opus-4-7
---

$$
\beta = 2 - \omega, \quad N(\beta) = 7, \quad D = \{0, 1, 2, 3, 4, 5, 6\}
$$

*Cada entero de Eisenstein tiene una representación **finita y única** en los dígitos $D$ con base $\beta$.*

<!-- backstage -->

## Párrafo completo (traducción del abstract)

**Knuth (1960)**, aún estudiante de secundaria, notó que un número imaginario puede utilizarse como base de un sistema posicional — la **quater-imaginary base** $2i$ para los enteros gaussianos. La misma idea sobre la red de **Eisenstein** genera algo aún más elegante.

Tomemos $\beta = 2 - \omega$; entonces
$$
N(\beta) = 2^2 - 2 \cdot 1 + 1^2 = 7,
$$
de modo que hay exactamente **siete** clases de residuos módulo $\beta$, y el conjunto de dígitos es $D = \{0, 1, 2, 3, 4, 5, 6\}$. **Todo** entero de Eisenstein admite una representación **finita y única**:

$$
z = d_n \cdot \beta^n + d_{n-1} \cdot \beta^{n-1} + \dots + d_0, \qquad d_k \in D. \qquad\text{(1)}
$$

**La suma, la multiplicación y el acarreo** se convierten en operaciones **geométricas** sobre la red hexagonal. En la charla se muestran las **tablas completas de suma y multiplicación** para $D$ y un ejemplo desarrollado de **suma en columna** con acarreo hexagonal — una operación accesible para un niño que sepa sumar en columna números decimales.

## Paleta de dígitos (versión solid)

:::seven-digits-solid{units}
El color codifica el álgebra: verde / azul / rojo — $\{+1,\ +\omega,\ +\omega^{-1}\}$ (tríada RGB), magenta / amarillo / cian — $\{-1,\ -\omega,\ -\omega^{-1}\}$ (tríada CMY); los pares en horas opuestas son complementarios entre sí, y **la negación = paso al color complementario**.
:::

## Lo que merece especial atención

- El número $7$ es $|B|^2$ para la base $\beta$, lo que significa que exactamente **ese número** de dígitos es **forzoso** en cualquier sistema posicional autoconsistente sobre $\mathbb{Z}[\omega]$. No es una elección de diseño, sino una **necesidad aritmética**.
- La regla de acarreo está completamente determinada por la ecuación $\omega^2 + \omega + 1 = 0$ — puede dibujarse como un triángulo de tres hexágonos que «se suman» a cero.
- Este sistema en base siete es el predecesor aritmético directo del formato GQ128 (slide 8).

## Referencia

- **Knuth, D. E. (1960)** An imaginary number system. *Communications of the ACM*, 3(4), 245–247. DOI:10.1145/367177.367233. [dl.acm.org](https://dl.acm.org/doi/10.1145/367177.367233)
