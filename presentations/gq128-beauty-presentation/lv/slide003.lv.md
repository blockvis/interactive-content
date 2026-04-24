---
layout: content
title: Asis uzzīmētas sāniski
subtitle: 'Parāds Nr. 1: Argand pret Wessel'
sourceHash: sha256-4e64a61f69d4f94f2938f6c10999dd5a3e8856c1274466998cbd4b9d72c0e63d
translatedBy: claude-opus-4-7
---

![Pa kreisi — Argand: Re horizontāli, Im vertikāli, pozitīvā rotācija pretēji pulksteņrādītāju virzienam. Pa labi — Wessel: Re uz augšu, Im pa labi, pozitīvā rotācija pulksteņrādītāju virzienā, kā kompasam.](../assets/abstract/fig_axes.svg)

*Pagrieziet asis pēc Vesela — un $e^{i\theta}$ sāk griezties **pulksteņrādītāju virzienā**, kā kompass, stūre un kuģa kurss.*

<!-- backstage -->

## Pilns rindkopas teksts (abstrakta tulkojums)

Kompleksajai plaknei ģeometrisku formu pirmais piešķīra **Kaspars Vesels** (1799), un viņa izcelsme daudz ko izskaidro: Vesels bija **norvēģu zemmērnieks**, un viņa motivācija — analītiski attēlot *virzienu*. Zemmērnieka pasaulē dabiskā orientācija ir **navigācijas**: uz priekšu ir *augšup*, «uz sāniem» ir *pa labi*, un pozitīvā rotācija seko pulksteņrādītāja kustībai.

Tomēr Arganda diagramma, kas nonākusi mācību grāmatās, izvēlējās **Dekarta** orientāciju: reālā ass — horizontāla, pozitīvā rotācija iet **pretēji** pulksteņrādītāju virzienam.

Atjaunojiet Vesela sistēmu: vērsiet reālo asi **uz augšu**, imagināro — **pa labi**. Pozitīvā rotācija no $\mathrm{Re}$ uz $\mathrm{Im}$, **algebriski tā pati**, kļūst par rotāciju **pulksteņrādītāju virzienā**. Kompleksā eksponente $e^{i\theta}$ tagad griežas kopā ar pulksteņrādītāju, ar kompasu, kas iet no ziemeļiem uz austrumiem, un ar kuģa kursu, kas dodas uz štirbortu. Gausa *direct* un *lateral* atjaunojas kā **uz priekšu** un **uz sāniem**.

**Leņķa parāds**, kas mantots no Dekarta diagrammām, nevis no pašas ģeometrijas, **izgaist**.

## Kāpēc tas ir svarīgi

- Navigācijā, robotikā un motoru vadībā «leņķis» gandrīz vienmēr ir **pulksteņrādītāju virzienā no ziemeļiem**. Matemātiskā fizika savukārt pēc ieraduma prasa pārvēršanu uz «pretēji pulksteņrādītājam no austrumiem». Katra šāda pārvēršana ir zīmju kļūdu avots.
- Vesela konvencija padara $\cos\theta + i\sin\theta$ par **to pašu** kustību, kas $\mathrm{heading}(t)$ kompasam, bez korekcijām.
- $\mathbb{C}$ algebra nemainās: mainās tikai attēls uz tāfeles.

## Atsauce

- **Wessel, C. (1799)** *Om directionens analytiske betegning*. Nye samling af det Kongelige Danske Videnskabernes Selskabs Skrifter, 5, 469–518. [sophiararebooks.com](https://www.sophiararebooks.com/pages/books/6397/caspar-wessel/om-directionens-analytiske-betegning-et-forsog-anvendt-fornemmelig-til-plane-og-sphaeriske)
