---
layout: content
title: GQ128 un dzīvā demonstrācija
subtitle: 'Komplekss float, kura mantisa dzīvo $\mathbb{Z}[\omega]$'
sourceHash: sha256-f3363d6cb8138e910172c76e8fd7a2275da7b962d3cae1f5b13e3bc3ccf5ce53
translatedBy: claude-opus-4-7
---

:::callout{tone=accent}
**GQ128** — 128 bitu komplekss peldošā punkta formāts, kura mantisa atrodas $\mathbb{Z}[\omega]$, nevis $\mathbb{Z}$. Rezultāts: **izotropa** kvantēšanas kļūda — īpašība, kas standarta IEEE 754 complex kvadrātiskajā režģī ir strukturāli **neiespējama**.
:::

*Visi referāta jēdzieni tiek demonstrēti caur interaktīvām vizualizācijām, ko MI ģenerē reāllaikā, **bez tradicionālajiem slaidiem**.*

<!-- backstage -->

## Pilns rindkopa (abstrakta tulkojums)

Referāts noslēdzas ar **pirmo publisko GQ128 prezentāciju** — kompleksa peldošā punkta formāta, kura **mantisa** dzīvo $\mathbb{Z}[\omega]$, nevis $\mathbb{Z}$. Tas dod **izotropu** kvantēšanas kļūdu — īpašību, kas ir **strukturāli neiespējama** standarta IEEE 754 complex representation kvadrātiskajā režģī.

**Visi jēdzieni tiek demonstrēti caur interaktīvām vizualizācijām, ko MI ģenerē reāllaikā, bez tradicionālajiem slaidiem.**

## Ko svarīgi zināt par GQ128

- **Bāze.** $Z = 3 + \omega$, $|Z|^2 = 7$. Saskan ar 6. slaida septiņskaitļa sistēmu: tā pati ģeometrija, bet peldošā punkta formātā.
- **Mantisa.** 42 slotu, cipari 3 bitu. Skaitlis $42 = \varphi(7^2)$ nav sagadīšanās; tieši tas nodrošina precīzas **98 punktu NTT** pašsaskaņotību pār $\mathbb{Z}/343\mathbb{Z}$, ko izmanto reizināšanai bez zudumiem.
- **Eksponente.** Nav fiksēta, bet «peldošs END-marķieris» — spirālā koordināte ar soli $\arg(Z) \approx 19{,}1°$, kas ir iracionāls attiecībā pret $\pi$.
- **Aritmētika.** Saskaitīšana **carry-bounded** caur 343 elementu LUT; reizināšana ar $\omega$ — **cikliska nobīde**; negācija — *two's complement* Doppler-EGA kodējumā.
- **Serializācija.** Vērtības tiek izkārtotas atmiņā gar Gospera līkni — to pašu, kas ierobežo fraktāli no 7. slaida. Lokalitāte uz līknes = tuvums $\mathbb{C}$ plaknē.

## Kāpēc «izotropa kļūda» ir svarīga

Kvadrātiskajā režģī $\mathbb{Z}[i]$ kvantēšanas kļūdai ir dažāds mērogs gar asīm un pa diagonāli: reizinātājs $\sqrt{2}$ stūrī, reizinātājs $1$ uz ass. Tas padara IEEE 754 complex **anizotropu**: kļūda ir atkarīga no argumenta. $\mathbb{Z}[\omega]$ seši tuvākie kaimiņi ir vienādi attālināti — **kļūda ir vienāda visos virzienos**.

## GQ128 vieta bumbu iepakojumu hierarhijā

GQ128 ir 2D loceklis plašākā «kiss number + 1 = ciparu skaits» saimē, ko atsevišķi izvēršam diskusijā:

| $d$ | Režģis | $\kappa$ | $p = \kappa + 1$ | Formāts |
|-----|---------|----------|------------------|--------|
| 1 | $\mathbb{Z}$ | 2 | 3 | **Setuņ** (Brusencovs, MGU, 1959) |
| **2** | $A_2$ hex | **6** | **7** | **GQ128** (128 biti) |
| 3 | FCC $A_3$ | 12 | 13 | G626 (626 biti) |
| 8 | $E_8$ | 240 | 241 | — (Viazovska, 2016) |
| 24 | Leech $\Lambda_{24}$ | 196 560 | 196 561 | — (Cohn–Kumar–Miller–Radchenko–Viazovska, 2016) |

**GQ128 ir vienīgais saimes loceklis, kas pilnībā ietilpst standarta 128 bitu reģistrā.** Un vienīgais, kuram visas aritmētiskās operācijas ir $O(1)$ uz atbilstošas AXR arhitektūras.
