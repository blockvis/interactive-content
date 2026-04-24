---
layout: content
title: Vienības intervāls ir fraktāls
subtitle: Gospera sala kā fundamentālais apgabals
sourceHash: sha256-e2d4da62b5635ff3f1f11f54b63d6ed12ee529eb0d11cf90984fe479db6b2bf3
translatedBy: claude-opus-4-7
---

![Gospera sala: septiņas pašlīdzīgas kopijas ar koeficientu $1/\sqrt{7}$, plaknes flīzējums bez spraugām](../assets/abstract/fig_gosper.png)

*Skaitīšanas sistēmas ar bāzi $\beta = 2 - \omega$ atraktors ir **Gospera sala**.*

<!-- backstage -->

## Pilnā rindkopa (abstrakta tulkojums)

Kā izskatās "vienības intervāls" šajā skaitīšanas sistēmā?

Decimālajā sistēmā visas bezgalīgās ciparu virknes $0.d_1 d_2 \dots$ aizpilda $[0, 1]$. Analogais atraktors bāzē $(2 - \omega)$ ir **pavisam kas cits**: fraktāls no **septiņām pašlīdzīgām kopijām** ar saspiešanas koeficientu $1/\sqrt{7}$.

To atklāja **Bils Gospers** 1973. gadā; pirmo reizi tas tika **publiski aprakstīts** **Mārtina Gārdnera** slejā *Mathematical Games* žurnālā *Scientific American* (1976. gada decembris), un vēlāk **Benuā Mandelbrots** (1977) to nosauca par **Gospera salu** (*Gosper island*).

Tā **flīzē plakni ar translācijām** — **bez spraugām, bez pārklāšanās**, un tās **robeža nekur nav gluda**. Tieši tā ir dabīgā komplekso aritmētikas **fundamentālā apgabals** uz sešstūru režģa: tā forma, kādu vienības intervāls vienmēr vēlējās iegūt.

## Kāpēc tas nav vienkārši skaista bildīte

- Gospera salas robeža ir tā pati **Gospera līkne**, pēc kuras nosaukts viens no kanoniskajiem telpu aizpildošajiem (space-filling) plaknes apgaitas veidiem. GQ128 šī apgaita tiek izmantota kā vērtību **serializācija** — lokalitāte uz līknes atbilst tuvumam kompleksajā plaknē.
- Robežas Hausdorfa dimensija $\dim_H \partial G = \log 3 / \log \sqrt{7} \approx 1{,}1291$. Tātad robeža ir līkne, bet "biezāka" par parasto; tas ir ģeometriskais **isotropic quantization error** avots, kāda nav kvadrātiskajam režģim.

## Atsauces

- **Gardner, M. (1976)** Mathematical games: In which *«monster»* curves force redefinition of the word *«curve»*. *Scientific American*, 235(6), 124–129. [scientificamerican.com](https://www.scientificamerican.com/article/mathematical-games-1976-12/)
- **Mandelbrot, B. B. (1977)** *Fractals: Form, Chance, and Dimension*. San Francisco: W. H. Freeman. [archive.org](https://archive.org/details/fractalsformchan0000mand)
