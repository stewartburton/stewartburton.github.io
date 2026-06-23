# Backups

Point-in-time backups of the live site (https://www.stewart-burton.com), kept here so any
visual change that breaks the site can be rolled back to a known-good state.

Each backup is a self-contained `.zip` named `stewart-burton.com_backup_<date>.zip` containing:

- `source/` - full Astro source, rebuildable on its own (`npm install && npm run build`)
- `rendered/` - the built `dist/` (exactly what GitHub Pages serves)
- `live-served/` - the HTML the live site returned at capture time
- `MANIFEST.md` - capture details + restore instructions

Each backup is also pinned as a git tag (`backup/live-<date>`) for a clean source-level revert.
See the `MANIFEST.md` inside each zip for full restore steps.

> The unzipped working folders are git-ignored; only the `.zip` files and this README are tracked.
> Backups are additive and do not affect the deployed site (the GitHub Actions deploy only builds `site/`).

| Date | Archive | Git tag | Live commit |
|---|---|---|---|
| 2026-06-23 | `stewart-burton.com_backup_2026-06-23.zip` | `backup/live-2026-06-23` | `5f11928` |
