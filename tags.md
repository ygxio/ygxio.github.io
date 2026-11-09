---
title: Tags
permalink: /tags/
---

{% assign tags = site.tags | sort %}
<p class="tag-cloud">
{% for tag in tags %}<a class="tag" href="#{{ tag[0] | slugify }}">{{ tag[0] }} <small>{{ tag[1].size }}</small></a>{% endfor %}
</p>

{% for tag in tags %}
{% assign tagged = tag[1] %}
<h2 id="{{ tag[0] | slugify }}" class="year">#{{ tag[0] }}</h2>
{% include post-list.html posts=tagged %}
{% endfor %}
