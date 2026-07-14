(function () {
  var root = document.querySelector("[data-publications]");
  if (!root) {
    return;
  }

  var searchInput = root.querySelector("[data-publications-search]");
  var filters = Array.prototype.slice.call(root.querySelectorAll("[data-publications-filter]"));
  var entries = Array.prototype.slice.call(root.querySelectorAll("[data-publication-entry]"));
  var count = root.querySelector("[data-publications-count]");
  var empty = root.querySelector("[data-publications-empty]");
  var featured = root.querySelector("[data-publications-featured]");
  var groups = Array.prototype.slice.call(root.querySelectorAll("[data-publication-year-group]"));
  var sections = Array.prototype.slice.call(root.querySelectorAll("[data-publication-section]"));

  function normalize(value) {
    return (value || "").toLowerCase();
  }

  function activeFilter() {
    var active = filters.find(function (button) {
      return button.getAttribute("aria-pressed") === "true";
    });
    return active ? active.getAttribute("data-publications-filter") : "all";
  }

  function updateGroups() {
    groups.forEach(function (group) {
      var visible = group.querySelector("[data-publication-entry]:not([hidden])");
      group.hidden = !visible;
    });

    sections.forEach(function (section) {
      var visible = section.querySelector("[data-publication-entry]:not([hidden])");
      section.hidden = !visible;
    });
  }

  function applyFilters() {
    var query = normalize(searchInput ? searchInput.value : "");
    var filter = activeFilter();
    var shown = 0;

    entries.forEach(function (entry) {
      var text = normalize(entry.getAttribute("data-search"));
      var type = entry.getAttribute("data-type");
      var matchesQuery = !query || text.indexOf(query) !== -1;
      var matchesType = filter === "all" || filter === type;
      var visible = matchesQuery && matchesType;
      entry.hidden = !visible;
      if (visible) {
        shown += 1;
      }
    });

    updateGroups();

    if (featured) {
      featured.hidden = query || filter !== "all";
    }

    if (count) {
      count.textContent = shown + " of " + entries.length + " shown";
    }
    if (empty) {
      empty.hidden = shown !== 0;
    }
  }

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      filters.forEach(function (item) {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  applyFilters();
})();
