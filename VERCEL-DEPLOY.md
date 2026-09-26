# Deploying to Vercel — Step by Step

This portfolio is a **Vite + React static site**. Vercel detects it automatically, so there's
**no `vercel.json` and no configuration required** — the defaults just work:

| Setting | Value (auto-detected) |
| --- | --- |
| Framework preset | **Vite** |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

Verified locally: `npm run build` succeeds and outputs to `dist/`.

---

## Option A — Import from GitHub (recommended)

Best long-term setup: connect the repo and every `git push` to `main` deploys automatically.

1. **Push this repo to GitHub** (already done):
   ```bash
   git remote -v   # → https://github.com/deepakrai9813/deepak-rai-portfolio.git
   git push -u origin main
   ```

2. **Sign up / log in** at https://vercel.com with your **GitHub** account
   (Settings → Add GitHub account if not linked yet).

3. Click **Add New… → Project** (or **Add New Project** on the dashboard).

4. Find **deepak-rai-portfolio** in the list of your repos and click **Import**.

5. Vercel auto-fills the settings (table above). Leave everything as-is and click **Deploy**.

6. Wait ~1 minute for the build. You'll get:
   - A production URL like `https://deepak-rai-portfolio.vercel.app`
   - A preview URL for every future pull request / branch push

7. **(Optional) Custom domain**: Project → **Settings → Domains** → add `yourdomain.com`
   and follow Vercel's DNS instructions at your domain registrar.

**Deploying updates:** just `git push` — Vercel rebuilds automatically. No manual steps.

---

## Option B — Vercel CLI

Use this when you don't want to (or can't) use the GitHub integration.

1. **Install the CLI** (one time):
   ```bash
   npm install -g vercel
   ```

2. **Log in** (opens a browser):
   ```bash
   vercel login
   ```

3. **Link the project** (creates `.vercel/`; uses the GitHub remote to match the project):
   ```bash
   vercel link --repo
   ```
   Follow the prompts to pick your account and create/select the project.

4. **Deploy a preview**:
   ```bash
   vercel deploy -y
   ```

5. **Deploy to production**:
   ```bash
   vercel deploy --prod -y
   ```

---

## Option C — Drag & drop (one-off, no repo)

1. Run `npm run build`.
2. Go to https://vercel.com → **Add New → Project**.
3. Skip the repo import and use the **drag-and-drop** upload box to drop the `dist/` folder.
4. Click **Deploy**.

> Note: this option does **not** auto-redeploy on future code changes.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| "Project not found" when importing | Make sure the repo is pushed and Vercel's GitHub app can access it (Vercel → Settings → GitHub → unlink/relink if needed). |
| Build fails | Run `npm run build` locally; check the error in Vercel's build logs. This project builds cleanly out of the box. |
| Old version showing after push | Confirm the push landed on `main` (the production branch). Check Project → **Deployments** for the latest build status. |
| Assets 404 after deploy | Not an issue here — `vite.config.js` uses `base: "./"` and Vercel serves from the site root. |
| Want a staging environment | Push to any non-`main` branch — Vercel gives it its own preview URL. |

No environment variables are required for this portfolio (GitHub data is fetched client-side).
