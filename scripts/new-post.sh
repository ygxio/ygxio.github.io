#!/usr/bin/env bash
# Usage: ./scripts/new-post.sh "Post title" [--draft]
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 \"Post title\" [--draft]" >&2
  exit 1
fi

title="$1"
draft=0
[ "${2:-}" = "--draft" ] && draft=1

slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
[ -z "$slug" ] && { echo "Could not derive slug from title." >&2; exit 1; }

if [ "$draft" -eq 1 ]; then
  file="_drafts/${slug}.md"
else
  file="_posts/$(date +%Y-%m-%d)-${slug}.md"
fi
mkdir -p "$(dirname "$file")"
[ -e "$file" ] && { echo "File already exists: $file" >&2; exit 1; }

cat > "$file" <<POST
---
title: "${title}"
description: ""
date: $(date +"%Y-%m-%d %H:%M:%S %z")
tags: []
# math: true      # enable KaTeX: \\( inline \\) and \$\$ display \$\$
# mermaid: true   # render \`\`\`mermaid code blocks as diagrams
# toc: false      # hide the table of contents
---

## Introduction

Write here.
POST

echo "Created $file"
