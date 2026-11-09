(function () {
  var root = document.documentElement;

  // ---- Theme toggle ----
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var prose = document.querySelector('.post .prose');
  if (!prose) return;

  // ---- Heading anchors ----
  var headings = prose.querySelectorAll('h2[id], h3[id]');
  headings.forEach(function (h) {
    var a = document.createElement('a');
    a.className = 'anchor';
    a.href = '#' + h.id;
    a.setAttribute('aria-label', 'Link to this section');
    a.textContent = '#';
    h.prepend(a);
  });

  // ---- Table of contents ----
  var tocEl = document.getElementById('toc');
  if (tocEl && headings.length >= 2) {
    var ul = document.createElement('ul');
    var currentSub = null;
    headings.forEach(function (h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.innerHTML = h.innerHTML.replace(/<a class="anchor"[^>]*>#<\/a>/, '');
      li.appendChild(a);
      if (h.tagName === 'H3' && ul.lastElementChild) {
        if (!currentSub) { currentSub = document.createElement('ul'); ul.lastElementChild.appendChild(currentSub); }
        currentSub.appendChild(li);
      } else {
        currentSub = null;
        ul.appendChild(li);
      }
    });
    tocEl.appendChild(ul);

    var links = tocEl.querySelectorAll('a');
    var byId = {};
    links.forEach(function (l) { byId[decodeURIComponent(l.hash.slice(1))] = l; });
    var setActive = function () {
      var active = null;
      headings.forEach(function (h) { if (h.getBoundingClientRect().top <= 140) active = h; });
      links.forEach(function (l) { l.classList.remove('active'); });
      if (active && byId[active.id]) byId[active.id].classList.add('active');
    };
    window.addEventListener('scroll', setActive, { passive: true });
    window.addEventListener('resize', setActive);
    setActive();
  }

  // ---- Reading progress ----
  var bar = document.querySelector('.progress span');
  if (bar) {
    var post = document.querySelector('.post');
    var update = function () {
      var total = post.offsetTop + post.offsetHeight - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 1;
      bar.style.width = (p * 100) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---- Code blocks: language label + copy ----
  prose.querySelectorAll('div.highlighter-rouge').forEach(function (block) {
    var lang = (block.className.match(/language-(\S+)/) || [])[1];
    if (lang === 'plaintext' || lang === 'text') lang = '';
    var bar = document.createElement('div');
    bar.className = 'code-bar';
    var label = document.createElement('span');
    label.textContent = lang || 'code';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var code = block.querySelector('pre code') || block.querySelector('pre');
      var done = function () {
        btn.textContent = 'Copied'; btn.classList.add('done');
        setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1500);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(code.innerText).then(done);
    });
    bar.appendChild(label);
    bar.appendChild(btn);
    block.prepend(bar);
  });

  // ---- Images: alt text becomes caption; click to zoom ----
  prose.querySelectorAll('p > img:only-child').forEach(function (img) {
    var p = img.parentElement;
    if (p.textContent.trim() !== '') return;
    var fig = document.createElement('figure');
    if (p.classList.contains('wide')) fig.classList.add('wide');
    fig.appendChild(img);
    var caption = img.getAttribute('title') || img.getAttribute('alt');
    if (caption) {
      var fc = document.createElement('figcaption');
      fc.textContent = caption;
      fig.appendChild(fc);
    }
    p.replaceWith(fig);
  });
  prose.querySelectorAll('figure img').forEach(function (img) {
    img.loading = 'lazy';
    img.addEventListener('click', function () {
      var box = document.createElement('div');
      box.className = 'lightbox';
      var big = document.createElement('img');
      big.src = img.src; big.alt = img.alt;
      box.appendChild(big);
      var close = function () { box.remove(); document.removeEventListener('keydown', onKey); };
      var onKey = function (e) { if (e.key === 'Escape') close(); };
      box.addEventListener('click', close);
      document.addEventListener('keydown', onKey);
      document.body.appendChild(box);
    });
  });

  // ---- Wide tables scroll horizontally ----
  prose.querySelectorAll('table').forEach(function (t) {
    var w = document.createElement('div');
    w.className = 'table-wrap';
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });
})();
