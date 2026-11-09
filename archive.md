---
title: Archive
permalink: /archive/
---

{% assign by_year = site.posts | group_by_exp: "p", "p.date | date: '%Y'" %}
{% for year in by_year %}
<h2 class="year">{{ year.name }}</h2>
{% include post-list.html posts=year.items %}
{% endfor %}
