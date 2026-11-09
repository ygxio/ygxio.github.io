---
title: Subscribe
permalink: /subscribe/
---

Get new posts in your feed reader. Paste this URL into any RSS reader (Feedly, Inoreader, NetNewsWire, Miniflux, Thunderbird, etc.):

<div class="feed-url">
  <code id="feed-url">{{ '/feed.xml' | absolute_url }}</code>
  <button type="button" class="copy-btn" id="copy-feed">Copy</button>
</div>

The feed includes the full text of every post. You can also [open the raw feed]({{ '/feed.xml' | relative_url }}).

New to RSS? It's a way to follow blogs without email or social media: your reader checks the feed and shows new posts as they come out.

<script>
  document.getElementById('copy-feed').addEventListener('click', function () {
    var b = this;
    navigator.clipboard.writeText(document.getElementById('feed-url').textContent).then(function () {
      b.textContent = 'Copied'; b.classList.add('done');
      setTimeout(function () { b.textContent = 'Copy'; b.classList.remove('done'); }, 1500);
    });
  });
</script>
