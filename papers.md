---
title: Papers
permalink: /papers/
layout: papers
description: DeepPhe publications, presentations, talks, and panels.
extra_bottom_air: true
extra_css:
  - /assets/css/publications.css
extra_js:
  - /assets/js/publications.js
---

{% assign publication_types = "journal,preprint,conference" | split: "," %}
{% assign presentation_types = "talk,panel" | split: "," %}
{% assign publication_entries = site.data.publications | where_exp: "item", "publication_types contains item.type" %}
{% assign presentation_entries = site.data.publications | where_exp: "item", "presentation_types contains item.type" %}
{% assign featured_entries = site.data.publications | where: "featured", true | sort: "title" %}

<div class="publications" data-publications>
  <header class="publications-header">
    <h1>Publications</h1>
    <p>DeepPhe publications, conference papers, presentations, talks, and panels.</p>
  </header>

  <div class="publications-controls" aria-label="Publication search and filters">
    <div class="publications-search">
      <label for="publications-search">Search publications</label>
      <div class="publications-search-field">
        <span class="publications-search-icon" aria-hidden="true">&#128269;</span>
        <input id="publications-search" type="search" placeholder="Search title, author, venue..." data-publications-search>
      </div>
    </div>
    <div class="publications-filters" aria-label="Filter by publication type">
      <button class="publications-filter" type="button" data-publications-filter="all" aria-pressed="true">All</button>
      <button class="publications-filter" type="button" data-publications-filter="journal" aria-pressed="false">Journal</button>
      <button class="publications-filter" type="button" data-publications-filter="conference" aria-pressed="false">Conference</button>
      <button class="publications-filter" type="button" data-publications-filter="preprint" aria-pressed="false">Preprint</button>
      <button class="publications-filter" type="button" data-publications-filter="talk" aria-pressed="false">Talk</button>
      <button class="publications-filter" type="button" data-publications-filter="panel" aria-pressed="false">Panel</button>
    </div>
  </div>

  <p class="publications-count" aria-live="polite" data-publications-count>{{ site.data.publications | size }} of {{ site.data.publications | size }} shown</p>
  <p class="publications-empty" data-publications-empty hidden>No matches.</p>

  <section class="publications-featured" data-publications-featured aria-labelledby="featured-publications-heading">
    <h2 id="featured-publications-heading">Cite this for general background</h2>
    <div class="publications-featured-grid">
{% for item in featured_entries %}
{% include publication-entry.html item=item track=false heading_level=3 %}
{% endfor %}
    </div>
  </section>

  <section class="publications-section" data-publication-section aria-labelledby="publications-heading">
    <h2 id="publications-heading">Publications</h2>
{% assign publication_groups = publication_entries | group_by: "year" | sort: "name" | reverse %}
{% for group in publication_groups %}
{% assign entries = group.items | sort: "title" %}
    <div class="publication-year-group" data-publication-year-group aria-labelledby="publications-{{ group.name }}">
      <h3 class="publication-year" id="publications-{{ group.name }}">{{ group.name }}</h3>
{% for item in entries %}
{% include publication-entry.html item=item heading_level=4 %}
{% endfor %}
    </div>
{% endfor %}
  </section>

  <section class="publications-section" data-publication-section aria-labelledby="presentations-heading">
    <h2 id="presentations-heading">Presentations, talks &amp; panels</h2>
{% assign presentation_groups = presentation_entries | group_by: "year" | sort: "name" | reverse %}
{% for group in presentation_groups %}
{% assign entries = group.items | sort: "title" %}
    <div class="publication-year-group" data-publication-year-group aria-labelledby="presentations-{{ group.name }}">
      <h3 class="publication-year" id="presentations-{{ group.name }}">{{ group.name }}</h3>
{% for item in entries %}
{% include publication-entry.html item=item heading_level=4 %}
{% endfor %}
    </div>
{% endfor %}
  </section>
</div>
