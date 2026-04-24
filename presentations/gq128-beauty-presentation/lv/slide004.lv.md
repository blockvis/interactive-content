---
layout: content
title: 'Spogulis, nevis kvadrāts'
subtitle: 'Parāds Nr. 2: ermitiskums kā ģeometrija'
sourceHash: sha256-e710c2f1d78fd613f80cc73cf2aaeb688f85c3844990ba09934ddf1de0fbea55
translatedBy: claude-opus-4-7
---

![Pa kreisi — $N\times N$ matrica kvadrāta veidā: diagonāle iet no kreisā augšējā uz labo apakšējo stūri. Pa labi — tā pati matrica, nolikta uz stūra: diagonāle kļūst par vertikālu simetrijas asi, elementi $(i,j)$ un $(j,i)$ atrodas simetriski attiecībā pret to.](../assets/abstract/fig_mirror.svg)

*Nolieciet matricu uz stūra, un nosacījums $H = H^{\dagger}$ kļūst par burtisku spoguļattēlu.*

<!-- backstage -->

## Pilns rindkopas (abstrakta tulkojums)

Kompleksā skaitļa matricu attēlojumā slēpjas otra apslēpta simetrija. Standarta izkārtojumā $N \times N$ matrica ir **kvadrāts**, kura diagonāle iet no augšējā kreisā stūra uz apakšējo labo, un ermitiskuma nosacījums $H = H^{\dagger}$ izskatās kā **tīri algebrisks** apgalvojums.

Nolieciet matricu uz stūra, kā **rombu**, — tā, lai diagonāle kļūtu **vertikāla**. Reālie diagonāles elementi nonāk tieši uz simetrijas ass; elements $(i, j)$ un tā saistītais partneris $(j, i)$ nokļūst **burtiski spoguļsimetriskās** pozīcijās attiecībā pret šo asi. Ermitiskums, **neredzams** kvadrātiskajā izkārtojumā, kļūst par **ģeometrisku atspoguļojumu, redzamu ar aci**.

:::callout{tone=primary}
Bērns reiz pajautāja, kāpēc spogulis maina *kreiso* un *labo*, bet ne *augšu* un *apakšu*; atbilde — **tas nedara ne vienu, ne otru**: mēs paši uzliekam pārkārtojumu, pagriežoties pret to. Matricas standarta izkārtojums veic tieši to pašu pagriezienu, slēpjot simetriju, kas vienmēr tur ir bijusi.
:::

## Kāpēc tas mums ir svarīgi referāta sižetā

- Ermitiskuma ģeometriskā interpretācija — propedeitika pirms $\mathbb{Z}[\omega]$: kad režģis nomainīs kvadrātu pret sešstūri (5. slaids), šis paņēmiens «nolikt uz stūra» kļūs par noklusējuma koordinātu sistēmu.
- Tā pati — sagatavošanās **kļūdu kvantēšanas izotropijai** GQ128: tur standarta IEEE 754 «kvadrāts» arī traucē saskatīt patieso simetriju.
