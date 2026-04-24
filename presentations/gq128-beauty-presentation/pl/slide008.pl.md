---
layout: content
title: GQ128 i demonstracja na żywo
subtitle: 'Zespolony float, którego mantysa żyje w $\mathbb{Z}[\omega]$'
sourceHash: sha256-f3363d6cb8138e910172c76e8fd7a2275da7b962d3cae1f5b13e3bc3ccf5ce53
translatedBy: claude-opus-4-7
---

:::callout{tone=accent}
**GQ128** — 128-bitowy zespolony format zmiennoprzecinkowy, którego mantysa leży w $\mathbb{Z}[\omega]$, a **nie** w $\mathbb{Z}$. Rezultat: **izotropowy** błąd kwantyzacji — własność strukturalnie **niemożliwa** na kwadratowej kracie standardowego IEEE 754 complex.
:::

*Wszystkie koncepcje referatu są demonstrowane poprzez interaktywne wizualizacje generowane przez AI w czasie rzeczywistym, **bez tradycyjnych slajdów**.*

<!-- backstage -->

## Pełny akapit (tłumaczenie abstraktu)

Referat kończy się **pierwszą publiczną prezentacją GQ128** — zespolonego formatu zmiennoprzecinkowego, którego **mantysa** żyje w $\mathbb{Z}[\omega]$, a nie w $\mathbb{Z}$. Daje to **izotropowy** błąd kwantyzacji — własność **strukturalnie niemożliwą** na kwadratowej kracie standardowej reprezentacji IEEE 754 complex.

**Wszystkie koncepcje są demonstrowane poprzez interaktywne wizualizacje generowane przez AI w czasie rzeczywistym, bez tradycyjnych slajdów.**

## Co warto wiedzieć o GQ128

- **Podstawa.** $Z = 3 + \omega$, $|Z|^2 = 7$. Zgodna z systemem siódemkowym ze slajdu 6: ta sama geometria, ale w formacie zmiennoprzecinkowym.
- **Mantysa.** 42-slotowa, cyfry 3-bitowe. Liczba $42 = \varphi(7^2)$ — to nie przypadek; to właśnie ona zapewnia samozgodność dokładnego **98-punktowego NTT** nad $\mathbb{Z}/343\mathbb{Z}$, używanego do mnożenia bez strat.
- **Wykładnik.** Nie stały, lecz „pływający marker END” — współrzędna spiralna z krokiem $\arg(Z) \approx 19{,}1°$, niewymiernym względem $\pi$.
- **Arytmetyka.** Dodawanie **carry-bounded** poprzez 343-elementowy LUT; mnożenie przez $\omega$ — **przesunięcie cykliczne**; negacja — *two's complement* w kodowaniu Doppler-EGA.
- **Serializacja.** Wartości są rozmieszczane w pamięci wzdłuż krzywej Gospera — tej samej, która ogranicza fraktal ze slajdu 7. Lokalność na krzywej = bliskość w płaszczyźnie $\mathbb{C}$.

## Dlaczego „izotropowy błąd" jest istotny

Na kwadratowej kracie $\mathbb{Z}[i]$ błąd kwantyzacji ma różną skalę wzdłuż osi i po przekątnej: mnożnik $\sqrt{2}$ w narożniku, mnożnik $1$ na osi. To czyni IEEE 754 complex **anizotropowym**: błąd zależy od argumentu. Na $\mathbb{Z}[\omega]$ sześciu najbliższych sąsiadów jest równoodległych — **błąd jest jednakowy we wszystkich kierunkach**.

## Miejsce GQ128 w hierarchii upakowań kul

GQ128 to 2D-owy członek szerszej rodziny „liczba całowania + 1 = liczba cyfr", którą rozwijamy osobno w dyskusji:

| $d$ | Krata | $\kappa$ | $p = \kappa + 1$ | Format |
|-----|-------|----------|------------------|--------|
| 1 | $\mathbb{Z}$ | 2 | 3 | **Setuń** (Brusencow, MGU, 1959) |
| **2** | $A_2$ hex | **6** | **7** | **GQ128** (128 bitów) |
| 3 | FCC $A_3$ | 12 | 13 | G626 (626 bitów) |
| 8 | $E_8$ | 240 | 241 | — (Viazovska, 2016) |
| 24 | Leech $\Lambda_{24}$ | 196 560 | 196 561 | — (Cohn–Kumar–Miller–Radchenko–Viazovska, 2016) |

**GQ128 to jedyny członek rodziny mieszczący się w całości w standardowym 128-bitowym rejestrze.** I jedyny, którego wszystkie operacje arytmetyczne są $O(1)$ na odpowiedniej architekturze AXR.
