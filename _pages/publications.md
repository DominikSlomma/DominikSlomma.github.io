---
title: "Publications"
layout: gridlay
permalink: /publications/
years: [2016, 2017, 2018, 2019, 2020, 2021]
math: true
description: "Peer-reviewed publications, conference papers, and journal articles authored by Dominik Slomma on visual SLAM, surgical robotics, and rescue robotics."
image: /images/profilPic-800.jpg
last_modified_at: 2026-06-03
changefreq: weekly
priority: 0.9
---

# Publications

<div class="pub-toolbar" markdown="0">
  <label for="publication-search" class="visually-hidden">Search publications</label>
  <input type="search" id="publication-search" placeholder="Search publications…" aria-label="Search publications">
</div>

<div class="jumbotron pub-section" data-section="conference">
### Conference
<div class="pub-controls" markdown="0">
  <span class="pub-controls__label">Sort:</span>
  <div class="btn-group btn-group-sm" role="group" aria-label="Conference sorting">
    <button type="button" class="btn btn-outline-secondary active" data-sort="year" data-order="desc">Date ↓</button>
    <button type="button" class="btn btn-outline-secondary" data-sort="year" data-order="asc">Date ↑</button>
    <button type="button" class="btn btn-outline-secondary" data-sort="title" data-order="asc">Title A–Z</button>
    <button type="button" class="btn btn-outline-secondary" data-sort="title" data-order="desc">Title Z–A</button>
  </div>
</div>
{% bibliography --query @INPROCEEDINGS %}
</div>


<div class="jumbotron pub-section" data-section="journal">
### Journal articles
<div class="pub-controls" markdown="0">
  <span class="pub-controls__label">Sort:</span>
  <div class="btn-group btn-group-sm" role="group" aria-label="Journal sorting">
    <button type="button" class="btn btn-outline-secondary active" data-sort="year" data-order="desc">Date ↓</button>
    <button type="button" class="btn btn-outline-secondary" data-sort="year" data-order="asc">Date ↑</button>
    <button type="button" class="btn btn-outline-secondary" data-sort="title" data-order="asc">Title A–Z</button>
    <button type="button" class="btn btn-outline-secondary" data-sort="title" data-order="desc">Title Z–A</button>
  </div>
</div>
{% bibliography --query @article %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const sections = Array.from(document.querySelectorAll('.pub-section'));
  const allItems = [];

  sections.forEach(section => {
    const list = section.querySelector('ol.bibliography');
    if (!list) { return; }
    const items = Array.from(list.querySelectorAll('li'));
    items.forEach(item => {
      const meta = item.querySelector('.pub-meta');
      if (!meta) { return; }
      item.classList.add('publication-item');
      Object.keys(meta.dataset).forEach(key => {
        item.dataset[key] = meta.dataset[key] || '';
      });
      item.dataset.search = (item.dataset.search || '').toLowerCase();
      meta.remove();
      allItems.push(item);
    });
  });

  const searchInput = document.getElementById('publication-search');
  const filterItems = () => {
    const query = (searchInput?.value || '').trim().toLowerCase();
    allItems.forEach(item => {
      const haystack = item.dataset.search || '';
      const matches = !query || haystack.includes(query);
      item.style.display = matches ? '' : 'none';
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', filterItems);
  }

  const sortItems = (list, key, order) => {
    const items = Array.from(list.querySelectorAll('.publication-item'));
    items.sort((a, b) => {
      if (key === 'year') {
        const yearA = parseInt(a.dataset.year || '0', 10);
        const yearB = parseInt(b.dataset.year || '0', 10);
        return order === 'asc' ? yearA - yearB : yearB - yearA;
      }
      if (key === 'title') {
        const titleA = (a.dataset.title || '').toLowerCase();
        const titleB = (b.dataset.title || '').toLowerCase();
        return order === 'desc' ? titleB.localeCompare(titleA) : titleA.localeCompare(titleB);
      }
      return 0;
    });
    if (key === 'year') {
      if (order === 'desc') {
        list.setAttribute('reversed', 'reversed');
      } else {
        list.removeAttribute('reversed');
      }
    } else {
      list.removeAttribute('reversed');
    }
    items.forEach(item => list.appendChild(item));
  };

  document.querySelectorAll('.pub-controls button[data-sort]').forEach(button => {
    button.addEventListener('click', function() {
      const controls = this.closest('.pub-controls');
      const section = this.closest('.pub-section');
      const list = section?.querySelector('ol.bibliography');
      if (!controls || !list) { return; }
      controls.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const sortKey = this.dataset.sort;
      const sortOrder = this.dataset.order || 'asc';
      sortItems(list, sortKey, sortOrder);
    });
  });

  // Apply default sorting (newest first) for each section after metadata setup
  sections.forEach(section => {
    const list = section.querySelector('ol.bibliography');
    if (!list) { return; }
    sortItems(list, 'year', 'desc');
  });

  filterItems();
});
</script>
