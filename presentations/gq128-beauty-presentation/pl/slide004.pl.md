---
layout: content
title: 'Lustro, a nie kwadrat'
subtitle: 'Dług №2: hermitowskość jako geometria'
sourceHash: sha256-e710c2f1d78fd613f80cc73cf2aaeb688f85c3844990ba09934ddf1de0fbea55
translatedBy: claude-opus-4-7
---

![Po lewej — macierz $N\times N$ w postaci kwadratu: przekątna biegnie z lewego górnego do prawego dolnego rogu. Po prawej — ta sama macierz postawiona na rogu: przekątna staje się pionową osią symetrii, elementy $(i,j)$ i $(j,i)$ leżą symetrycznie względem niej.](../assets/abstract/fig_mirror.svg)

*Postaw macierz na rogu, a warunek $H = H^{\dagger}$ staje się dosłownym odbiciem lustrzanym.*

<!-- backstage -->

## Pełny akapit (tłumaczenie abstraktu)

Macierzowa reprezentacja liczby zespolonej niesie w sobie drugą ukrytą symetrię. W standardowym układzie macierz $N \times N$ to **kwadrat**, którego przekątna biegnie z lewego górnego rogu do prawego dolnego, a warunek hermitowskości $H = H^{\dagger}$ wygląda jak **czysto algebraiczne** stwierdzenie.

Postaw macierz na rogu, niczym **romb**, — tak, aby przekątna stała się **pionowa**. Rzeczywiste elementy diagonalne znajdują się dokładnie na osi symetrii; element $(i, j)$ i jego sprzężony partner $(j, i)$ trafiają w **dosłownie zwierciadlanie symetryczne** pozycje względem tej osi. Hermitowskość, **niewidoczna** w układzie kwadratowym, staje się **geometrycznym odbiciem widocznym gołym okiem**.

:::callout{tone=primary}
Dziecko kiedyś zapytało, dlaczego lustro zamienia *lewo* i *prawo*, ale nie *górę* i *dół*; odpowiedź brzmi — **nie robi ani jednego, ani drugiego**: to my sami narzucamy permutację, obracając się do niego. Standardowy układ macierzy wykonuje dokładnie ten sam obrót, ukrywając symetrię, która zawsze tam była.
:::

## Po co nam to w narracji referatu

- Geometryczna interpretacja hermitowskości to propedeutyka do $\mathbb{Z}[\omega]$: gdy krata zmieni kwadrat na sześciokąt (slajd 5), ten trik „postawienia na rogu" stanie się domyślnym układem współrzędnych.
- Ona też — przygotowanie do **izotropii kwantyzacji błędów** w GQ128: tam standardowy „kwadrat" IEEE 754 również przeszkadza zobaczyć prawdziwą symetrię.
