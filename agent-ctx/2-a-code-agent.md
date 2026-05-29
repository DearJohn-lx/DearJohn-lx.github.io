# Task 2-a: Update navbar.tsx and hero.tsx with new color scheme and logo image

**Agent**: Code Agent
**Status**: ✅ Completed

## Summary

Applied comprehensive color scheme migration from amber/yellow/orange to violet/purple/fuchsia/pink across both `navbar.tsx` and `hero.tsx`, and replaced logo/avatar images with `/logo.jpg`.

## Detailed Changes

### navbar.tsx
- Replaced LX logo div with `<img src="/logo.jpg">` tag, kept glow effect (updated to violet)
- All `amber-*` → `violet-*`, `yellow-*` → `purple-*` Tailwind classes
- Updated Daily Quote dialog: gradient bar, glow, borders, icon, author text, refresh button all to violet/purple
- Updated theme toggle and nav button icon colors to violet
- Updated hover backgrounds to `hover:bg-violet-500/10`

### hero.tsx
- Changed avatar from `/avatar.png` to `/logo.jpg`
- Rotating gradient ring: `from-violet-400 via-purple-500 to-violet-400`
- Online badge: `from-violet-400 to-purple-600` with `shadow-violet-500/30`
- Badge span: violet/purple gradient with violet border
- CTA buttons: violet/purple gradients and shadows
- GitHub button: violet borders and hover states
- Scroll indicator: `text-violet-400/30`
- Morphing blobs: all amber → violet gradients
- Grid overlay: `rgba(139,92,246,0.2)` replacing `rgba(251,191,36,0.2)`

## Verification
- `bun run lint` — passes with no errors
- Dev server compiles successfully
