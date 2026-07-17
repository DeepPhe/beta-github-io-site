# AGENTS.md

## Project Overview

This repository is the Jekyll static site for DeepPhe. Netlify builds it with `jekyll build` and publishes `_site`.

The publications page lives at `/papers/` and in `papers.md`, but user-facing navigation should call it `Publications`.

## Canonical Names

- Use `DeepPhe` for the overall project, platform, and organization-level umbrella.
- Use `DeepPhe Translational` for the translational research product/release in user-facing copy.
- Use `DeepPhe-CR` for the cancer registry product/workflow in user-facing copy.
- Use `DeepPhe-CR Final` only when referring specifically to the final software release or a page/release artifact that is already named that way.
- Avoid introducing alternate spellings such as `DeepPhe CR`, `DeepPhe-Translational`, or `DeepPhe XN` in new user-facing copy unless quoting an existing release name, file name, URL, or historical title.

## Publications Page Rules

- Keep the route as `/papers/`, but keep the menu label as `Publications`.
- The default view is `All`, showing the old long wall-of-text publications list from `https://deepphe.github.io/papers/`.
- The secondary view is `Search`, showing the searchable structured publications display.
- Search categories should use these unified labels:
  - `Journal` includes `journal` and `preprint`.
  - `Presentation` includes `conference`, `talk`, `panel`, and `pres`.
- Do not feature the old `DeepPhe-CR: Natural Language Processing Software Services for Cancer Registrar Case Abstraction` medRxiv preprint in the `Cite this for general background` area.
- Keep citation export controls available on structured publication entries.

## Key Files

- `_config.yml` controls the Jekyll site configuration, including `baseurl`.
- `_data/menus.yml` controls the main navigation labels.
- `papers.md` contains the publications page layout and view controls.
- `_data/publications.yml` contains structured publication records.
- `_includes/publication-entry.html` renders structured publication cards.
- `assets/js/publications.js` powers publications search, filters, and citation export.
- `assets/css/publications.css` styles the publications page.
- `_site/` is generated output and is tracked in this repository.

## Build And Verify

Use these checks after publication-page changes:

```bash
bundle exec jekyll build
node --check assets/js/publications.js
node scripts/check-links.mjs _site
```

Use `node scripts/check-links.mjs _site --external` when you also want to check external URLs. Some publishers and LinkedIn block automated checks with 401/403/429/999 responses; the script counts those as blocked instead of broken.

Useful publication count checks:

```bash
sed -n '/id="publications-all-panel"/,/id="publications-search-panel"/p' _site/papers/index.html | rg -c '<li>'
rg -c 'data-publication-entry' _site/papers/index.html
```

Expected counts after the current publications work:

- Old `All` list: `85` list items.
- Structured `Search` entries: `74` publication entries.
- `Journal`: `22` entries from `journal` and `preprint`.
- `Presentation`: `52` entries from `conference`, `talk`, `panel`, and `pres`.

## Generated Files

Prefer editing source files first, then rebuild with Jekyll when generated output needs to match. Because `_site/` is tracked here, include rebuilt `_site/` files when the user asks for a deployable or committed site state.

Do not commit `.jekyll-cache`, `.bundle`, or `vendor` unless the user explicitly asks for dependency artifacts.

## Git Workflow

Check `git status -sb` before editing or committing. The worktree may contain user changes; do not revert unrelated changes. If the user asks for an exact commit message, use that message exactly. Push `main` when the user asks to push.

## Local Server

Run the local site with:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

The local publications page is usually available at:

```text
http://127.0.0.1:4000/beta-github-io-site/papers/
```
