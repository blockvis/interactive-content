import type { ReactNode } from "react";

/**
 * Solid-fill palette chart of the seven digits of the base-(2 − ω)
 * positional system (slide 6 backstage).
 *
 * Layout — a «flower» of seven flat-top hexagons:
 *   0 in the centre, and the six nonzero units of ℤ[ω] arranged at
 *   clock positions {12h, 2h, 4h, 6h, 8h, 10h} in the Wessel-oriented
 *   frame adopted by the talk (slide 3): real axis pointing up, positive
 *   rotation clockwise. Opposite-clock pairs are complementary colours
 *   (RGB vs CMY), which makes negation = «flip to the complement».
 *
 * Colour tokens follow BRIEF §6.5 / slide-prompts/_shared.md §5. They
 * are intentionally inlined here rather than in the class tokens: per
 * the shared spec, the digit palette is «pending author confirmation»
 * and MUST be injected locally until it's lifted into
 * presentation-classes/ratsif-2026-spring/class.md.
 *
 * Digit → unit assignment (1-based, clockwise from 12h):
 *   1 → +1      (12h, green)
 *   2 → −ω⁻¹   (2h,  cyan)
 *   3 → +ω      (4h,  blue)
 *   4 → −1      (6h,  magenta)
 *   5 → +ω⁻¹   (8h,  red)
 *   6 → −ω      (10h, yellow)
 *
 * This is the natural presentation order (colours alternate RGB↔CMY
 * going clockwise); it is *not* the residue-class lift. The precise
 * residue-lift is a separate story told by the addition / multiplication
 * tables further down the backstage, and does not affect the palette.
 */

const R = 40; // hex circumradius
const D = R * Math.sqrt(3); // centre-to-centre distance for flat-top hexes

type Digit = {
  digit: number;
  // Relative position in units of the centre-to-centre distance D.
  pos: readonly [number, number];
  fill: string;
  fg: string; // number colour — picked for contrast against fill
  unit: string;
};

// Clock positions in (x, y) with screen-y pointing down:
//   12h → (0, −1), 2h → (sin 60°, −cos 60°), 4h → (sin 60°, +cos 60°),
//   6h → (0, +1),  8h → (−sin 60°, +cos 60°), 10h → (−sin 60°, −cos 60°).
const S = Math.sin(Math.PI / 3); // ≈ 0.866
const C = Math.cos(Math.PI / 3); // = 0.5

const DIGITS: readonly Digit[] = [
  { digit: 0, pos: [0, 0], fill: "transparent", fg: "currentColor", unit: "0" },
  { digit: 1, pos: [0, -1], fill: "#00A651", fg: "#fff", unit: "+1" },
  { digit: 2, pos: [S, -C], fill: "#00B3BE", fg: "#000", unit: "−ω⁻¹" },
  { digit: 3, pos: [S, C], fill: "#0072CE", fg: "#fff", unit: "+ω" },
  { digit: 4, pos: [0, 1], fill: "#D6007F", fg: "#fff", unit: "−1" },
  { digit: 5, pos: [-S, C], fill: "#E4002B", fg: "#fff", unit: "+ω⁻¹" },
  { digit: 6, pos: [-S, -C], fill: "#FFD100", fg: "#000", unit: "−ω" },
];

function hexPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `M${pts.join(" L")}Z`;
}

function asBool(v: unknown): boolean {
  return v === true || v === "" || v === "true" || v === "1";
}

/**
 * Usage in markdown:
 *
 *     :::seven-digits-solid
 *     Optional markdown caption below the figure.
 *     :::
 *
 * Props:
 *   - `units` — if truthy, add a small label under each digit naming
 *     its Eisenstein-unit role (+ω, −1, …). Off by default: the digit
 *     number alone carries the identifier, and the colour carries the
 *     algebra.
 */
export function SevenDigitsSolid({
  units,
  children,
}: {
  units?: string | boolean;
  children?: ReactNode;
}) {
  const showUnits = asBool(units);
  const stroke = "var(--class-foreground, currentColor)";

  return (
    <figure className="my-6 flex flex-col items-center gap-3">
      <svg
        role="img"
        aria-label="Семь цифр системы счисления по основанию β = 2 − ω: нулевая цифра в центре и шесть единиц {+1, −ω⁻¹, +ω, −1, +ω⁻¹, −ω} в клок-раскладке 12h/2h/4h/6h/8h/10h."
        viewBox="-110 -110 220 220"
        className="block h-auto w-full max-w-sm"
      >
        {DIGITS.map(({ digit, pos, fill, fg, unit }) => {
          const [dx, dy] = pos;
          const cx = dx * D;
          const cy = dy * D;
          return (
            <g key={digit}>
              <path
                d={hexPath(cx, cy, R)}
                fill={fill}
                stroke={stroke}
                strokeWidth={2}
                strokeLinejoin="round"
              />
              <text
                x={cx}
                y={showUnits ? cy - 4 : cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={showUnits ? 22 : 28}
                fontWeight={700}
                fill={fg}
              >
                {digit}
              </text>
              {showUnits && digit !== 0 && (
                <text
                  x={cx}
                  y={cy + 16}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  fontSize={11}
                  fontWeight={500}
                  fill={fg}
                  opacity={0.85}
                >
                  {unit}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {children && (
        <figcaption className="max-w-prose text-center text-sm italic opacity-70">
          {children}
        </figcaption>
      )}
    </figure>
  );
}
