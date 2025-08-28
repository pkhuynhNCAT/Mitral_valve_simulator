Here’s a clean, drop-in **README.md** you can paste into your repo.

---

# Mitral\_valve\_simulator

A **web-based, single-file** simulator for **mitral valve repair/replacement training**.
It focuses on realistic leaflet biomechanics (XPBD), chordae dynamics, leaflet–leaflet **coaptation**, a **needle driver** instrument, and quick **hemodynamic** estimates (EOA & mean gradient) — all running entirely in the browser.

> **Education only**. This is **not** a medical device and must not be used for diagnosis or patient care.

---

## ✨ Highlights

* **Single file**: `index.html` contains everything (engine + physics + UI).
* **Real-time physics**: XPBD leaflet surfaces with anisotropy, shear, area preservation, long-range “bend” constraints.
* **Chordae**: Nonlinear tension elements with slack and failure thresholds.
* **Coaptation**: Anterior/posterior leaflet non-penetration with a target coaptation gap.
* **Instrument**: Needle-driver with screen-plane control, jaw grab, and soft contact/friction.
* **Hemodynamics**: Geometric **EOA** via annular-plane aperture sampling → **mean ΔP** (mmHg) using an orifice equation.
* **Zero install**: Works from any static host (GitHub Pages, local server).
* **No PHI**: Ships with synthetic assets only.

---

## 🚀 Quick Start (local)

1. Save the provided **single-file** app as `index.html` in the repo root.
2. Serve it locally (avoid opening via `file://` to prevent module/CORS issues):

```bash
# Python 3
python -m http.server 8000
# then open:
# http://localhost:8000/
```

(Alternatively: VS Code “Live Server” extension.)

---

## 🌐 Deploy on GitHub Pages (no Actions, simplest)

1. Push `index.html` to the **main** branch.
2. Go to **Settings → Pages**

   * **Source:** *Deploy from a branch*
   * **Branch:** `main`
   * **Folder:** `/ (root)` → **Save**
3. Your site will be at:

```
https://<your-username>.github.io/Mitral_valve_simulator/
```

> If the repo is private, ensure your plan allows Pages for private repos or switch it to public.

---

## 🌐 Deploy via GitHub Actions (optional CI)

Create **`.github/workflows/deploy.yml`**:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          enablement: true   # create/enable Pages for this repo
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then in **Settings → Pages** set **Source = GitHub Actions**.
Also in **Settings → Actions → General**, set **Workflow permissions = Read and write**.

### Fix for common error

If you see:

> `Error: Get Pages site failed... consider exploring the enablement parameter`

* Ensure the workflow includes `enablement: true`.
* Ensure **Source = GitHub Actions** in **Settings → Pages**.
* Ensure **Read and write** workflow permissions.

---

## 🎮 Controls

**Camera**

* Orbit: **Left-drag**
* Zoom: **Wheel**
* Pan: **Shift + Left-drag**

**Instrument (Needle Driver)**

* Move (screen plane): **Right-drag**
* Depth: **Wheel**
* Jaw open/close: **Left-click** or **F**
* Roll: **Q/E**
* Pitch: **W/S**
* Yaw: **A/D**
* Reset tool pose: **R**

**Simulator**

* Pause/Resume: **P** or HUD button
* Reset scene: HUD **Reset**

**Hemodynamics**

* Adjust **Flow (L/min)** via the **Hemodynamics** panel (bottom-right).

---

## 🧠 How it works (brief)

* **Physics**: XPBD (Extended Position-Based Dynamics) on triangulated leaflet meshes with:

  * Anisotropic in-plane stiffness (fiber vs. cross-fiber), shear constraints, area preservation.
  * Long-range distances as a stable bending surrogate.
  * Chordae as distance constraints with slack/tension & failure.
  * Anterior–posterior **coaptation** via a Y-axis gap constraint (non-penetration).
* **Tool–tissue**: Soft spherical contact at the needle tip (push-out + tangential damping); vertex “grab” when jaws close.
* **Hemodynamics**: Ray-sample the annular plane; compute **open fraction → EOA**; apply **orifice equation** for **mean gradient**.

---

## 📁 Repo layout

Single-file setup (recommended for now):

```
Mitral_valve_simulator/
└─ index.html   # everything inline (engine, physics, instrument, hemo, UI)
```

Optionally later you can expand into `/src` modules; the code is structured so it’s easy to split.

---

## ⚙️ Browser support & performance

* **Chrome/Edge/Firefox** (recent versions). Uses WebGPU when available; otherwise **WebGL2** fallback.
* For smooth 60 FPS: keep the tab in focus, reduce OS/browser animations, and avoid power-saving modes.

---

## ⚠️ Limitations

* Educational realism only; **not validated** as a surgical device or digital twin.
* Hemodynamics is a fast geometric proxy (EOA/ΔP); not a full 0D/3D CFD coupling (yet).
* Cutting, suturing knots with true frictional tightening, ring implantation, Doppler synthesis, and SAM risk modeling are on the roadmap.

---

## 🗺️ Roadmap (next steps)

* Cutting & topological resection (triangular/quadrangular).
* Running sutures & knot tightening model (sliding knots, slippage).
* Annuloplasty ring sizing/implantation and effect on gradients.
* 0D elastance model & **TEE** (grayscale + color Doppler) synthesis.
* SAM/LVOT risk proxy and guidance overlays.
* WebXR and controller presets (MIS ports & RCM).

---

## 🤝 Contributing

Issues and PRs are welcome:

* Keep the app **static** (no server dependencies).
* Favor clean, documented code and small, testable additions.
* Avoid vendor/device trademarks in assets; use generic look-alikes.

---

## 🛡️ License & use

* Suggested code license: **MIT** (choose your preferred OSI license).
* **Educational/Training Use Only** — no clinical use, no PHI.

---

## 🙏 Acknowledgments

Built with **Three.js** and modern web APIs. Thanks to the cardiac surgery and simulation communities whose published biomechanical insights inspired this prototype architecture.

---

## 📣 Questions?

* Can’t deploy? Double-check **Pages** settings as above, or use the *branch* method first.
* Want a modular, multi-file version or a CI build (Vite/TypeScript)? Open an issue and we’ll scaffold it.
