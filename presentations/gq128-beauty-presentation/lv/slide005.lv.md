---
layout: content
title: Optimālais režģis kompleksajiem skaitļiem
subtitle: 'Parāds Nr. 3: $\mathbb{Z}[i]$ — tā nav robeža'
sourceHash: sha256-895965e3b7fb15ce347cf8aae26552c1dff5648ddb7fbf77185714c375596686
translatedBy: claude-opus-4-7
---

$$
\omega = e^{2\pi i / 3}, \qquad \omega^2 + \omega + 1 = 0
$$

*Kvadrātiskais režģis dod pa **4** kaimiņiem uz punktu; sešstūra — pa **6**. Pareizais aritmētikas objekts ir Eizenšteina gredzens $\mathbb{Z}[\omega]$.*

<!-- backstage -->

## Pilns rindkopas teksts (abstrakta tulkojums)

Gausa 1831. gada traktāts līdzās slavenajai sūdzībai ieviesa arī **Gausa veselos skaitļus** $\mathbb{Z}[i]$ — kvadrātisko režģi, kas iekodēts tajā pašā 90° vienošanās. Taču šis režģis **nav ģeometriski optimāls**: **sešstūra** režģis ir **blīvāks**, ar **sešiem** vienādā attālumā esošiem kaimiņiem uz punktu četru vietā.

Pareizais aritmētiskais objekts ir **Eizenšteina veselo skaitļu** gredzens $\mathbb{Z}[\omega]$, kur $\omega = e^{2\pi i / 3}$ apmierina $\omega^2 + \omega + 1 = 0$. To ieviesa **Eizenšteins** (1844) savā **kubiskās reciprocitātes likuma** pierādījumā (sīkāk sk. Ireland & Rosen, 1990).

Tā norma
$$
N(a + b\omega) = a^2 - ab + b^2
$$
ir dabiskā **60° ģeometrijas** kvadrātiskā forma; un, tāpat kā $\mathbb{Z}[i]$, tas ir **Eiklīda gredzens**.

:::callout{tone=accent}
Sešstūra režģis nav Gausa kvadrātiskā režģa *vispārinājums*. Tā ir tā **korekcija**.
:::

## Kurš pirmais pamanīja, ka iepakojums ir sešstūra

**Thue (1910)** — sešstūra riņķu iepakojums plaknē ir blīvāks par jebkuru citu. Tas ir divdimensiju analogs tai pašai intuīcijai, kas vēlāk novedīs pie lodīšu iepakojumu hierarhijas 3D, 8D un 24D — pie tās pieskarsimies noslēguma daļā.

## Atsauces

- **Eisenstein, G. (1844)** Beweis des Reciprocitätssatzes für die cubischen Reste… *Journal für die reine und angewandte Mathematik*, 27, 289–310. [degruyterbrill.com](https://www.degruyterbrill.com/document/doi/10.1515/crll.1844.27.289/html)
- **Ireland, K. & Rosen, M. (1990)** *A Classical Introduction to Modern Number Theory*, 2nd ed. New York: Springer. [link.springer.com](https://link.springer.com/book/10.1007/978-1-4757-2103-4)
