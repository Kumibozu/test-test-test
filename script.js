// ------------------------------
// DOM helpers
// ------------------------------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// ------------------------------
// Navigation & panels
// ------------------------------
const navItems = $$(".nav-item");
const panels = $$(".panel");

navItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    navItems.forEach((b) => b.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    const target = btn.getAttribute("data-target");
    const panel = document.getElementById(target);
    if (panel) panel.classList.add("active");
  });
});

// ------------------------------
// Sidebar collapse
// ------------------------------
const sidebar = $("#sidebar");
const sidebarBar = $("#sidebar-bar");
const sidebarToggle = $("#sidebar-toggle");

function toggleSidebar() {
  sidebar.classList.toggle("collapsed");
}

sidebarBar.addEventListener("click", toggleSidebar);
sidebarToggle.addEventListener("click", toggleSidebar);

// Optional hover reveal on desktop
sidebarBar.addEventListener("mouseenter", () => {
  if (window.innerWidth > 720 && sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (window.innerWidth > 720 && !sidebar.classList.contains("collapsed")) {
    sidebar.classList.add("collapsed");
  }
});

// ------------------------------
// Lore helpers
// ------------------------------
function groupTimeline(entries) {
  const eras = {};
  entries.forEach((e) => {
    const eraKey = e.tags && e.tags[0] ? e.tags[0] : "General";
    if (!eras[eraKey]) eras[eraKey] = [];
    eras[eraKey].push(e);
  });
  return eras;
}

function findRelated(data, entry) {
  if (!entry || !entry.tags) return {};
  const tagSet = new Set(entry.tags);

  function match(list) {
    return list.filter(
      (item) => item.tags && item.tags.some((t) => tagSet.has(t))
    );
  }

  return {
    regions: match(data.regions || []),
    factions: match(data.factions || []),
    cultures: match(data.cultures || data.culture || []),
    characters: match(data.characters || []),
    timeline: match(data.timeline || []),
    encyclopedia: match(data.encyclopedia || []),
  };
}

// ------------------------------
// Load lore.json
// ------------------------------
fetch("lore.json")
  .then((res) => res.json())
  .then((data) => {
    window.LORE_DATA = data;

    renderTimeline(data.timeline || []);
    renderRegions(data.regions || [], data);
    renderFactions(data.factions || []);
    renderCulture(data.cultures || data.culture || []);
    renderCharacters(data.characters || [], data);
    renderEncyclopedia(data.encyclopedia || []);
    enableGlobalSearch(data);
  })
  .catch((err) => {
    console.error("Error loading lore.json:", err);
  });

// ------------------------------
// Timeline
// ------------------------------
function renderTimeline(entries) {
  const container = $("#timeline-container");
  container.innerHTML = "";

  const eras = groupTimeline(entries);

  Object.keys(eras).forEach((eraKey) => {
    const eraDiv = document.createElement("article");
    eraDiv.className = "timeline-era";

    const prettyName =
      eraKey.charAt(0).toUpperCase() + eraKey.slice(1).replace(/_/g, " ");

    const h3 = document.createElement("h3");
    h3.textContent = prettyName;
    eraDiv.appendChild(h3);

    eras[eraKey].forEach((e) => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = e.name;
      details.appendChild(summary);

      const pDesc = document.createElement("p");
      pDesc.textContent = e.description || "";
      details.appendChild(pDesc);

      const pTags = document.createElement("p");
      pTags.className = "entry-tags";
      pTags.textContent = (e.tags || []).join(" • ");
      details.appendChild(pTags);

      eraDiv.appendChild(details);
    });

    container.appendChild(eraDiv);
  });
}

// ------------------------------
// Atlas (Regions)
// ------------------------------
function renderRegions(regions, data) {
  const list = $("#region-list");
  const detail = $("#region-detail");

  list.innerHTML = "";
  detail.innerHTML = "Select a region to view its dossier.";

  regions.forEach((r, index) => {
    const li = document.createElement("li");
    li.className = "region-item";
    li.textContent = r.name;

    if (index === 0) li.classList.add("active");

    li.addEventListener("click", () => {
      $$(".region-item").forEach((i) => i.classList.remove("active"));
      li.classList.add("active");
      showRegionDetail(r, data);
    });

    list.appendChild(li);

    if (index === 0) showRegionDetail(r, data);
  });

  function showRegionDetail(r, data) {
    const related = findRelated(data, r);

    detail.innerHTML = `
      <h3>${r.name}</h3>
      <p>${r.description || ""}</p>
      <p><strong>Tags:</strong> ${(r.tags || []).join(" • ")}</p>

      <details>
        <summary>Related Lore</summary>
        <p><strong>Factions:</strong> ${
          related.factions.map((f) => f.name).join(", ") || "None"
        }</p>
        <p><strong>Characters:</strong> ${
          related.characters.map((c) => c.name).join(", ") || "None"
        }</p>
        <p><strong>Timeline:</strong> ${
          related.timeline.map((t) => t.name).join(", ") || "None"
        }</p>
      </details>
    `;
  }
}

// ------------------------------
// Factions
// ------------------------------
function renderFactions(factions) {
  const container = $("#faction-cards");
  container.innerHTML = "";

  factions.forEach((f) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${f.name}</h3>
      <p class="tagline">${f.type || ""}</p>
      <p>${f.description || ""}</p>
      <p><strong>Tags:</strong> ${(f.tags || []).join(" • ")}</p>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Culture
// ------------------------------
function renderCulture(items) {
  const container = $("#culture-cards");
  container.innerHTML = "";

  items.forEach((c) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${c.name}</h3>
      <p class="tagline">${c.type || ""}</p>
      <p>${c.description || ""}</p>
      <p><strong>Tags:</strong> ${(c.tags || []).join(" • ")}</p>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Characters
// ------------------------------
function renderCharacters(chars, data) {
  const container = $("#character-cards");
  container.innerHTML = "";

  chars.forEach((ch) => {
    const card = document.createElement("article");
    card.className = "card";

    const related = findRelated(data, ch);

    card.innerHTML = `
      <h3>${ch.name}</h3>
      <p class="tagline">${ch.role || ""}</p>
      <p>${ch.description || ""}</p>
      <p><strong>Tags:</strong> ${(ch.tags || []).join(" • ")}</p>

      <details>
        <summary>Related Lore</summary>
        <p><strong>Regions:</strong> ${
          related.regions.map((r) => r.name).join(", ") || "None"
        }</p>
        <p><strong>Factions:</strong> ${
          related.factions.map((f) => f.name).join(", ") || "None"
        }</p>
        <p><strong>Timeline:</strong> ${
          related.timeline.map((t) => t.name).join(", ") || "None"
        }</p>
      </details>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Encyclopedia
// ------------------------------
function renderEncyclopedia(entries) {
  const container = $("#encyclopedia-results");
  const search = $("#encyclopedia-search");

  function display(list) {
    container.innerHTML = "";
    list.forEach((e) => {
      const div = document.createElement("article");
      div.className = "encyclopedia-entry";
      div.innerHTML = `
        <h3>${e.name}</h3>
        <p class="entry-tags">${(e.tags || []).join(" • ")}</p>
        <p>${e.description || ""}</p>
      `;
      container.appendChild(div);
    });
  }

  display(entries);

  search.addEventListener("input", () => {
    const q = search.value.toLowerCase();
    const filtered = entries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        (e.description || "").toLowerCase().includes(q) ||
        (e.tags || []).some((t) => t.toLowerCase().includes(q))
    );
    display(filtered);
  });
}

// ------------------------------
// Global search
// ------------------------------
function buildSearchIndex(data) {
  const index = [];

  Object.keys(data).forEach((category) => {
    if (!Array.isArray(data[category])) return;

    data[category].forEach((item) => {
      index.push({
        category,
        name: item.name,
        description: item.description || "",
        tags: item.tags || [],
      });
    });
  });

  return index;
}

function enableGlobalSearch(data) {
  const search = $("#global-search");
  const results = $("#global-results");
  if (!search || !results) return;

  const index = buildSearchIndex(data);

  search.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    if (!q) {
      results.innerHTML = `<p class="hint">Type in the search bar above to query all indexed lore.</p>`;
      return;
    }

    const filtered = index.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
    );

    results.innerHTML = filtered
      .map(
        (i) => `
      <div class="search-result">
        <strong>${i.name}</strong> <span>(${i.category})</span>
        <p>${i.description}</p>
      </div>
    `
      )
      .join("");
  });
}
