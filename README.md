# Blog

Plain Jekyll, no theme, built by GitHub Pages. Custom layouts in `_layouts/`, all styling in `assets/css/main.css`, small enhancements in `assets/js/main.js`.

## New post

```bash
./scripts/new-post.sh "My post title"           # _posts/YYYY-MM-DD-my-post-title.md
./scripts/new-post.sh "Half-baked idea" --draft  # _drafts/half-baked-idea.md
```

Commit and push to `main`; GitHub Pages rebuilds. URL is `/<slug>/`.

## Front matter

```yaml
title: "Large futures in Rust"
description: "One line shown under the title, on the home page and in link previews."
date: 2026-09-01 22:00:00 +0530
updated: 2026-09-10        # optional, shows "Updated ..."
tags: [rust, performance]
math: true                 # optional, loads KaTeX
mermaid: true              # optional, renders ```mermaid blocks
toc: false                 # optional, hides "On this page"
image: /assets/img/x.png   # optional, social preview card
```

## Writing features

- **Code**: fenced blocks with a language (```` ```rust ````) get syntax highlighting, a language label and a copy button. Use ```` ```diff ```` for diffs.
- **Images**: `![Caption text](url)` on its own line becomes a figure with the alt text as caption; click to zoom. Add `{: .wide}` on the next line for a wider image. Put local images in `assets/img/`.
- **Callouts**:
  ```markdown
  > **Note:** something worth flagging.
  {: .note }
  ```
  Also `.tip` and `.warning`.
- **Footnotes**: `text[^1]` and `[^1]: the note`.
- **Tables**: GFM tables; wide ones scroll horizontally.
- **Math** (`math: true`): `\( inline \)` and `$$ display $$`.
- **TOC**: built from `##` and `###` headings, shown on wide screens. Headings get `#` anchor links.
- Dark mode, reading time, reading progress bar, RSS (`/feed.xml`), sitemap, SEO/OpenGraph tags.

## Config

`_config.yml`: `title`, `tagline`, `author`, `url`, `baseurl`.

If the repo is named `<user>.github.io`, keep `baseurl: ""`. For a project repo, set `baseurl: "/<repo-name>"`.

## Local preview

```bash
bundle install
bundle exec jekyll serve --drafts --livereload
```
