---
layout: content
title: The axes are drawn sideways
subtitle: 'Debt #1: Argand vs Wessel'
sourceHash: sha256-4e64a61f69d4f94f2938f6c10999dd5a3e8856c1274466998cbd4b9d72c0e63d
translatedBy: claude-opus-4-7
---

![Left — Argand: Re horizontal, Im vertical, positive rotation counter-clockwise. Right — Wessel: Re up, Im right, positive rotation clockwise, like a compass.](../assets/abstract/fig_axes.svg)

*Flip the axes to Wessel's convention — and $e^{i\theta}$ starts rotating **clockwise**, like a compass, a helm, and a ship's heading.*

<!-- backstage -->

## Full paragraph (abstract translation)

The complex plane was first given geometric form by **Caspar Wessel** (1799), and his background explains a lot: Wessel was a **Norwegian surveyor**, and his motivation was the analytic representation of *direction*. In a surveyor's world, the natural orientation is **navigational**: forward is *up*, "sideways" is *to the right*, and positive rotation follows the hands of the clock.

Yet the Argand diagram that trickled down into textbooks chose the **Cartesian** orientation: the real axis horizontal, positive rotation **counter**-clockwise.

Restore Wessel's system: point the real axis **up**, the imaginary axis **to the right**. Positive rotation from $\mathrm{Re}$ to $\mathrm{Im}$, **algebraically the same**, becomes **clockwise** rotation. The complex exponential $e^{i\theta}$ now turns with the clock hand, with a compass going from north to east, and with a ship's heading bearing to starboard. Gauss's *direct* and *lateral* are restored as **forward** and **sideways**.

The **angular debt** inherited from Cartesian diagrams, not from the geometry itself, **evaporates**.

## Why it matters

- In navigation, robotics and motor control, "angle" is almost always **clockwise from north**. Mathematical physics, by habit, demands translation into "counter-clockwise from east". Every such translation is a source of sign errors.
- Wessel's convention makes $\cos\theta + i\sin\theta$ **the same** motion as a compass's $\mathrm{heading}(t)$, with no corrections.
- The algebra of $\mathbb{C}$ does not change: only the picture on the board does.

## Reference

- **Wessel, C. (1799)** *Om directionens analytiske betegning*. Nye samling af det Kongelige Danske Videnskabernes Selskabs Skrifter, 5, 469–518. [sophiararebooks.com](https://www.sophiararebooks.com/pages/books/6397/caspar-wessel/om-directionens-analytiske-betegning-et-forsog-anvendt-fornemmelig-til-plane-og-sphaeriske)
