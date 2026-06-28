# For Purva 🌻

A premium, cinematic one-page site — pure HTML/CSS/JS, ready for GitHub Pages.

## Before you publish

This code references the following files, which **you need to add yourself**
(I can't generate real photos or audio):

```
images/hero.jpg        — hero background (full-screen, cinematic)
images/background.jpg  — used in the gallery (e.g. a sunflower field)
images/sunflower.png   — used in the gallery (ideally transparent PNG)
images/petals.png      — not required by the current CSS (petals are pure
                          CSS shapes), kept here in case you want to swap
                          in a real petal texture later
images/flower.jpg       — used in the gallery
images/ending.jpg      — background for the final "I'll be here" section
music/piano.mp3        — soft piano track for the floating player
```

Drop files with those exact names into `images/` and `music/`, then push the
whole folder to a GitHub repo and enable GitHub Pages — no build step needed.

## Notes
- Music never autoplays; it only starts when the person clicks the play button.
- The final section's sunflower bloom is pure CSS — no image required for that.
- All animations respect `prefers-reduced-motion`.
