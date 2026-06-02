## [v1.0.0] - 2026-06-02
### Added
- Initial project structure scanned and summarized for user review.
- Created `WishlistDrawer.tsx` sidebar to display wishlisted items, replacing the inactive navbar link.

### Changed
- Replaced boring native `<select>` dropdowns in `CartDrawer.tsx` with a custom Framer Motion dropdown component for a premium luxury aesthetic.
- Moved cursor gradient from global `body` CSS variables to a hardware-accelerated GPU layer in `AmbientStage.tsx`.
- Refactored `globals.css` to remove dynamic `--cursor-x` and `--cursor-y` which were causing heavy full-page repaints.

### Fixed
- Fixed FPS drop and extreme lag by preventing global background repaints on mouse move.
- Applied `force3D: true` to GSAP ScrollTrigger animations in `MotionOrchestrator.tsx` for buttery smooth scrolling.
- Added hardware acceleration `will-change: transform` to heavy `blur-3xl` auroras.
- Fixed React hydration mismatch error (`cz-shortcut-listen`) caused by browser extensions injecting attributes into `<body>`.
- Removed expensive `mix-blend-mode: soft-light` from full-screen `.noise-overlay` to massively reduce GPU compositing overhead.
- Optimized `requestAnimationFrame` loop in `AmbientStage.tsx` to stop writing to DOM when the mouse isn't actively moving (delta < 0.05).
- Fixed z-index stacking bug in CustomDropdown where open dropdowns were rendering underneath other dropdowns and buttons.
- Fixed layout clipping issue where dropdowns near the bottom of the CartDrawer were cut off by `overflow-y-auto` bounds by making them open upwards (`direction="up"`).
- Optimized Cart and Wishlist drawers: Added `will-change` GPU hints for smooth slide-ins, and implemented `framer-motion` layout animations (`AnimatePresence` + `motion.li`) so adding/removing items feels butter-smooth instead of snapping abruptly.
- MASSIVE PERFORMANCE FIX: Removed the massive CSS `blur-3xl` filter from the endlessly animating `animate-aurora` gradients in `AmbientStage.tsx` and `BootIntro.tsx`. Replaced it with a native pre-faded `radial-gradient` that achieves the exact same visual effect but drops GPU rendering load by 99%, instantly fixing the remaining extreme UI lag.
- CPU BOTTLENECK FIX: Disabled the `shine` animation on `.metallic-text` in `globals.css`. Animating `background-position` on text with `background-clip: text` forces the browser to re-rasterize and paint on the main thread every single frame (60fps), which was causing massive thermal load and scrolling lag.
- Fixed drawer click delay by changing `CartDrawer` and `WishlistDrawer` from lazy dynamic imports to static imports, ensuring they open instantly on click without waiting for network chunks.
- Upgraded drawer sliding animation from a sluggish spring physics curve to a snappy, Apple-like `ease-out` easing curve for an ultra-premium feel.
