---
layout: content
title: Septiņi cipari kompleksajai plaknei
subtitle: Pozicionālā sistēma ar bāzi $\beta = 2 - \omega$
sourceHash: sha256-1b95fe867729d2b1a1890ce71e7b5988369e4cc1bc86afdfcc9acb5d92a87dd9
translatedBy: claude-opus-4-7
---

$$
\beta = 2 - \omega, \quad N(\beta) = 7, \quad D = \{0, 1, 2, 3, 4, 5, 6\}
$$

*Katram Eizenšteina veselajam skaitlim ir **unikāls galīgs** attēlojums ciparos $D$ ar bāzi $\beta$.*

<!-- backstage -->

## Pilna rindkopa (abstrakta tulkojums)

**Knūts (1960)**, toreiz vēl vidusskolēns, pamanīja, ka iedomāto skaitli var izmantot kā pozicionālās skaitīšanas sistēmas bāzi — **quater-imaginary base** $2i$ Gausa veselajiem skaitļiem. Tā pati ideja **Eizenšteina** režģī rada kaut ko vēl elegantāku.

Ņemsim $\beta = 2 - \omega$; tad
$$
N(\beta) = 2^2 - 2 \cdot 1 + 1^2 = 7,
$$
tātad atlikuma klases pēc moduļa $\beta$ ir tieši **septiņas**, un ciparu kopa ir $D = \{0, 1, 2, 3, 4, 5, 6\}$. **Katram** Eizenšteina veselajam skaitlim ir **unikāls galīgs** attēlojums:

$$
z = d_n \cdot \beta^n + d_{n-1} \cdot \beta^{n-1} + \dots + d_0, \qquad d_k \in D. \qquad\text{(1)}
$$

**Saskaitīšana, reizināšana un pārnese** kļūst par **ģeometriskām** operācijām sešstūra režģī. Prezentācijā parādītas pilnas **saskaitīšanas un reizināšanas tabulas** $D$ kopai un izstrādāts **saskaitīšanas kolonnā** piemērs ar sešstūra pārnesi — operācija, kas pieejama bērnam, kurš prot saskaitīt decimālskaitļus kolonnā.

## Ciparu palete (solid-versija)

:::seven-digits-solid{units}
Krāsa nes algebru: zaļš / zils / sarkans — $\{+1,\ +\omega,\ +\omega^{-1}\}$ (RGB trijnieks), purpursarkans / dzeltens / tirkīza — $\{-1,\ -\omega,\ -\omega^{-1}\}$ (CMY trijnieks); pāri pretējos pulksteņa rādītājos ir pa pāriem komplementāri, un **negācija = pāreja uz komplementāro krāsu**.
:::

## Kas pelna īpašu uzmanību

- Skaitlis $7$ ir $|B|^2$ bāzei $\beta$, kas nozīmē, ka tieši **tik** ciparu **ir spiests** būt katrai paškonsistentai skaitīšanas sistēmai uz $\mathbb{Z}[\omega]$. Tā nav dizaina izvēle, bet **aritmētiska nepieciešamība**.
- Pārneses likumu pilnībā nosaka vienādojums $\omega^2 + \omega + 1 = 0$ — to var uzzīmēt kā trīsstūri no trim sešstūriem, kas «saloka» par nulli.
- Šī septinārā sistēma ir tiešs GQ128 formāta aritmētiskais priekštecis (8. slaids).

## Atsauce

- **Knuth, D. E. (1960)** An imaginary number system. *Communications of the ACM*, 3(4), 245–247. DOI:10.1145/367177.367233. [dl.acm.org](https://dl.acm.org/doi/10.1145/367177.367233)
