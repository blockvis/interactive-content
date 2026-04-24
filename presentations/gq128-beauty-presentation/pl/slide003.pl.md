---
layout: content
title: Osie narysowane bokiem
subtitle: 'Dług №1: Argand kontra Wessel'
sourceHash: sha256-4e64a61f69d4f94f2938f6c10999dd5a3e8856c1274466998cbd4b9d72c0e63d
translatedBy: claude-opus-4-7
---

![Po lewej — Argand: Re poziomo, Im pionowo, dodatni obrót przeciwnie do ruchu wskazówek zegara. Po prawej — Wessel: Re w górę, Im w prawo, dodatni obrót zgodnie z ruchem wskazówek zegara, jak na kompasie.](../assets/abstract/fig_axes.svg)

*Obróć osie według Wessela — i $e^{i\theta}$ zaczyna obracać się **zgodnie z ruchem wskazówek zegara**, jak kompas, koło sterowe i kurs statku.*

<!-- backstage -->

## Pełny akapit (przekład abstraktu)

Płaszczyznę zespoloną po raz pierwszy wyposażył w formę geometryczną **Caspar Wessel** (1799), a jego pochodzenie wiele wyjaśnia: Wessel był **norweskim geodetą**, a jego motywacją było analityczne przedstawienie *kierunku*. W świecie geodety naturalna orientacja jest **nawigacyjna**: naprzód to *w górę*, „na bok” to *w prawo*, a dodatni obrót podąża za ruchem wskazówki zegara.

Jednak diagram Arganda, który trafił do podręczników, wybrał orientację **kartezjańską**: oś rzeczywista jest pozioma, a dodatni obrót idzie **przeciwnie** do ruchu wskazówek zegara.

Przywróć układ Wessela: skieruj oś rzeczywistą **w górę**, urojoną — **w prawo**. Dodatni obrót od $\mathrm{Re}$ do $\mathrm{Im}$, **algebraicznie ten sam**, staje się obrotem **zgodnym z ruchem wskazówek zegara**. Zespolona funkcja wykładnicza $e^{i\theta}$ obraca się teraz wraz ze wskazówką zegara, z kompasem biegnącym od północy do wschodu, i z kursem statku skręcającego na sterburtę. Gaussowskie *direct* i *lateral* zostają odtworzone jako **naprzód** i **w bok**.

**Dług kątowy**, odziedziczony po diagramach kartezjańskich, a nie po samej geometrii, **znika**.

## Dlaczego to ważne

- W nawigacji, robotyce i sterowaniu silnikami „kąt” niemal zawsze oznacza **zgodnie z ruchem wskazówek zegara od północy**. Natomiast fizyka matematyczna z przyzwyczajenia wymaga przeliczenia na „przeciwnie do zegara od wschodu”. Każde takie przeliczenie to źródło błędów znaku.
- Konwencja Wessela sprawia, że $\cos\theta + i\sin\theta$ jest **tym samym** ruchem co $\mathrm{heading}(t)$ na kompasie, bez poprawek.
- Algebra $\mathbb{C}$ się nie zmienia: zmienia się tylko obrazek na tablicy.

## Odnośnik

- **Wessel, C. (1799)** *Om directionens analytiske betegning*. Nye samling af det Kongelige Danske Videnskabernes Selskabs Skrifter, 5, 469–518. [sophiararebooks.com](https://www.sophiararebooks.com/pages/books/6397/caspar-wessel/om-directionens-analytiske-betegning-et-forsog-anvendt-fornemmelig-til-plane-og-sphaeriske)
