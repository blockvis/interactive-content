---
layout: content
title: 'Spogulis, nevis kvadrāts'
subtitle: 'Parāds Nr. 2: ermitiskums kā ģeometrija'
sourceHash: sha256-e710c2f1d78fd613f80cc73cf2aaeb688f85c3844990ba09934ddf1de0fbea55
translatedBy: claude-opus-4-7
---

![Pa kreisi — $N\times N$ matrica kvadrāta formā: diagonāle iet no augšējā kreisā uz apakšējo labo stūri. Pa labi — tā pati matrica, nolikta uz stūra: diagonāle kļūst par vertikālu simetrijas asi, elementi $(i,j)$ un $(j,i)$ atrodas simetriski attiecībā pret to.](../assets/abstract/fig_mirror.svg)

*Nolieciet matricu uz stūra, un nosacījums $H = H^{\dagger}$ kļūst par burtisku spoguļatspulgu.*

<!-- backstage -->

## Pilnais abzacs (abstrakta tulkojums)

Kompleksā skaitļa matricas reprezentācija nes sevī otru slēptu simetriju. Standarta izkārtojumā $N \times N$ matrica ir **kvadrāts**, kura diagonāle iet no augšējā kreisā stūra uz apakšējo labo, un ermitiskuma nosacījums $H = H^{\dagger}$ izskatās kā **tīri algebrisks** apgalvojums.

Nolieciet matricu uz stūra kā **rombu** — tā, lai diagonāle kļūtu **vertikāla**. Reālie diagonāles elementi atrodas tieši uz simetrijas ass; elements $(i, j)$ un tā saistītais partneris $(j, i)$ nokļūst **burtiski spoguļsimetriskās** pozīcijās attiecībā pret šo asi. Ermitiskums, **neredzams** kvadrātiskajā izkārtojumā, kļūst par **ģeometrisku atspulgu, kas redzams ar aci**.

:::callout{tone=primary}
Reiz bērns jautāja, kāpēc spogulis maina *pa kreisi* un *pa labi*, bet ne *augšu* un *apakšu*; atbilde — **tas nedara ne vienu, ne otru**: mēs paši uzspiežam permutāciju, pagriežoties pret to. Standarta matricas izkārtojums veic tieši tādu pašu pagriezienu, paslēpjot simetriju, kas vienmēr tur bijusi.
:::

## Kāpēc tas mums svarīgi referāta sižetā

- Ermitiskuma ģeometriskā interpretācija — propedeitika uz $\mathbb{Z}[\omega]$: kad režģis nomainīs kvadrātu pret sešstūri (5. slaids), šis paņēmiens «nolikt uz stūra» kļūs par koordinātu sistēmu pēc noklusējuma.
- Tā ir arī sagatavošanās **kvantēšanas kļūdu izotropijai** GQ128: tur standarta IEEE 754 «kvadrāts» arī traucē ieraudzīt īsto simetriju.
