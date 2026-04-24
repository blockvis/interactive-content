---
layout: content
title: Asis uzzīmētas sāniski
subtitle: 'Parāds Nr. 1: Argands pret Veselu'
sourceHash: sha256-4e64a61f69d4f94f2938f6c10999dd5a3e8856c1274466998cbd4b9d72c0e63d
translatedBy: claude-opus-4-7
---

![Pa kreisi — Argands: Re horizontāli, Im vertikāli, pozitīva rotācija pretēji pulksteņrādītāja virzienam. Pa labi — Vesels: Re uz augšu, Im pa labi, pozitīva rotācija pulksteņrādītāja virzienā, kā kompasam.](../assets/abstract/fig_axes.svg)

*Pārorientējiet asis pēc Vesela — un $e^{i\theta}$ sāk griezties **pulksteņrādītāja virzienā**, kā kompass, stūres rats un kuģa kurss.*

<!-- backstage -->

## Pilns rindkopas (abstrakta tulkojums)

Kompleksajai plaknei ģeometrisku formu pirmais piešķīra **Kaspars Vesels** (1799), un viņa izcelsme daudz ko izskaidro: Vesels bija **norvēģu mērnieks**, un viņa motivācija bija *virziena* analītiska reprezentācija. Mērnieka pasaulē dabiskā orientācija ir **navigācijas**: uz priekšu — tas ir *uz augšu*, «uz sāniem» — tas ir *pa labi*, un pozitīva rotācija seko pulksteņrādītāja kustībai.

Tomēr Arganda diagramma, kas nonāca mācību grāmatās, izvēlējās **Dekarta** orientāciju: reālā ass — horizontāla, pozitīva rotācija notiek **pretēji** pulksteņrādītāja virzienam.

Atjaunojiet Vesela sistēmu: vērsiet reālo asi **uz augšu**, imagināro — **pa labi**. Pozitīva rotācija no $\mathrm{Re}$ uz $\mathrm{Im}$, **algebriski tā pati**, kļūst par rotāciju **pulksteņrādītāja virzienā**. Kompleksā eksponente $e^{i\theta}$ tagad griežas kopā ar pulksteņa rādītāju, ar kompasu, kas iet no ziemeļiem uz austrumiem, un ar kuģa kursu, kas dodas uz stūrbordu. Gausa *direct* un *lateral* atjaunojas kā **uz priekšu** un **uz sāniem**.

**Leņķa parāds**, mantots no Dekarta diagrammām, nevis no pašas ģeometrijas, **izgaist**.

## Kāpēc tas ir svarīgi

- Navigācijā, robotikā un motoru vadībā «leņķis» gandrīz vienmēr ir **pulksteņrādītāja virzienā no ziemeļiem**. Matemātiskā fizika savukārt pēc ieraduma prasa tulkojumu uz «pretēji pulksteņrādītājam no austrumiem». Katrs šāds tulkojums ir zīmju kļūdu avots.
- Vesela konvencija padara $\cos\theta + i\sin\theta$ par **to pašu** kustību, kas $\mathrm{heading}(t)$ kompasam, bez korekcijām.
- $\mathbb{C}$ algebra nemainās: mainās tikai attēls uz tāfeles.

## Atsauce

- **Wessel, C. (1799)** *Om directionens analytiske betegning*. Nye samling af det Kongelige Danske Videnskabernes Selskabs Skrifter, 5, 469–518. [sophiararebooks.com](https://www.sophiararebooks.com/pages/books/6397/caspar-wessel/om-directionens-analytiske-betegning-et-forsog-anvendt-fornemmelig-til-plane-og-sphaeriske)
