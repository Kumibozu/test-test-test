// ------------------------------
// Navigation
// ------------------------------
const navButtons = document.querySelectorAll(".nav-btn");
const panels = document.querySelectorAll(".panel");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    const target = btn.getAttribute("data-target");
    document.getElementById(target).classList.add("active");
  });
});

// ------------------------------
// Helper: group timeline into eras
// ------------------------------
function groupTimeline(entries) {
  const eras = {};

  entries.forEach((e) => {
    // Use the first tag as a rough "era" bucket
    const eraKey = e.tags[0] || "General";

    if (!eras[eraKey]) eras[eraKey] = [];
    eras[eraKey].push(e);
  });

  return eras;
}

// ------------------------------
// Helper: find related lore by shared tags
// ------------------------------
function findRelated(data, entry) {
  if (!entry || !entry.tags) return {};

  const tagSet = new Set(entry.tags);

  function match(list) {
    return list.filter((item) =>
      item.tags && item.tags.some((t) => tagSet.has(t))
    );
  }

  return {
    nations: match(data.nations),
    regions: match(data.regions),
    factions: match(data.factions),
    cultures: match(data.cultures),
    religions: match(data.religions),
    characters: match(data.characters),
    timeline: match(data.timeline),
    encyclopedia: match(data.encyclopedia),
    artifacts: match(data.artifacts),
  };
}

// ------------------------------
// Load lore.json
// ------------------------------
fetch("lore.json")
  .then((res) => res.json())
  .then((data) => {
    console.log("LORE DATA:", data);
    window.LORE_DATA = data;

    renderTimeline(data.timeline);
    renderRegions(data.regions, data);
    renderFactions(data.factions);
    renderCultures(data.cultures);
    renderCharacters(data.characters, data);
    renderEncyclopedia(data.encyclopedia);
    enableGlobalSearch(data);
  })
  .catch((err) => {
    console.error("Error loading lore.json:", err);
  });

// ------------------------------
// Timeline (grouped into eras)
// ------------------------------
function renderTimeline(entries) {
  const container = document.getElementById("timeline-container");
  container.innerHTML = "";

  const eras = groupTimeline(entries);

  Object.keys(eras).forEach((eraKey) => {
    const eraDiv = document.createElement("div");
    eraDiv.className = "timeline-era";

    const prettyName =
      eraKey.charAt(0).toUpperCase() + eraKey.slice(1).replace(/_/g, " ");

    eraDiv.innerHTML = `<h2>${prettyName}</h2>`;

    eras[eraKey].forEach((e) => {
      const details = document.createElement("details");
      details.innerHTML = `
        <summary>${e.name}</summary>
        <p>${e.description}</p>
        <p class="entry-tags">${e.tags.join(" • ")}</p>
      `;
      eraDiv.appendChild(details);
    });

    container.appendChild(eraDiv);
  });
}

// ------------------------------
// Regions (Atlas) – array + related
// ------------------------------
function renderRegions(regions, data) {
  const list = document.getElementById("region-list");
  const detail = document.getElementById("region-detail");

  list.innerHTML = "";
  detail.innerHTML = "<p>Select a region.</p>";

  regions.forEach((r, index) => {
    const li = document.createElement("li");
    li.className = "region-item";
    li.textContent = r.name;

    if (index === 0) li.classList.add("active");

    li.addEventListener("click", () => {
      document
        .querySelectorAll(".region-item")
        .forEach((i) => i.classList.remove("active"));
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
      <p><strong>Tags:</strong> ${r.tags.join(" • ")}</p>
      <p>${r.description}</p>

      <details>
        <summary>Related Lore</summary>
        <p><strong>Nations:</strong> ${related.nations
          .map((n) => n.name)
          .join(", ") || "None"}</p>
        <p><strong>Factions:</strong> ${related.factions
          .map((f) => f.name)
          .join(", ") || "None"}</p>
        <p><strong>Characters:</strong> ${related.characters
          .map((c) => c.name)
          .join(", ") || "None"}</p>
        <p><strong>Timeline:</strong> ${related.timeline
          .map((t) => t.name)
          .join(", ") || "None"}</p>
      </details>
    `;
  }
}

// ------------------------------
// Factions – new schema
// ------------------------------
function renderFactions(factions) {
  const container = document.getElementById("faction-cards");
  container.innerHTML = "";

  factions.forEach((f) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${f.name}</h3>
      <p class="tagline">${f.type}</p>
      <p>${f.description}</p>
      <p><strong>Tags:</strong> ${f.tags.join(" • ")}</p>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Cultures – plural, new schema
// ------------------------------
function renderCultures(items) {
  const container = document.getElementById("culture-cards");
  container.innerHTML = "";

  items.forEach((c) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${c.name}</h3>
      <p><strong>Tags:</strong> ${c.tags.join(" • ")}</p>
      <p>${c.description}</p>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Characters – with related lore
// ------------------------------
function renderCharacters(chars, data) {
  const container = document.getElementById("character-cards");
  container.innerHTML = "";

  chars.forEach((ch) => {
    const card = document.createElement("article");
    card.className = "card";

    const related = findRelated(data, ch);

    card.innerHTML = `
      <h3>${ch.name}</h3>
      <p class="tagline">${ch.role}</p>
      <p>${ch.description}</p>
      <p><strong>Tags:</strong> ${ch.tags.join(" • ")}</p>

      <details>
        <summary>Related Lore</summary>
        <p><strong>Nations:</strong> ${related.nations
          .map((n) => n.name)
          .join(", ") || "None"}</p>
        <p><strong>Regions:</strong> ${related.regions
          .map((r) => r.name)
          .join(", ") || "None"}</p>
        <p><strong>Factions:</strong> ${related.factions
          .map((f) => f.name)
          .join(", ") || "None"}</p>
        <p><strong>Timeline:</strong> ${related.timeline
          .map((t) => t.name)
          .join(", ") || "None"}</p>
      </details>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Encyclopedia – name/description + local search
// ------------------------------
function renderEncyclopedia(entries) {
  const container = document.getElementById("encyclopedia-results");
  const search = document.getElementById("encyclopedia-search");

  function display(list) {
    container.innerHTML = "";
    list.forEach((e) => {
      const div = document.createElement("article");
      div.className = "encyclopedia-entry";
      div.innerHTML = `
        <h3>${e.name}</h3>
        <p class="entry-tags">${e.tags.join(" • ")}</p>
        <p>${e.description}</p>
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
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
    display(filtered);
  });
}

// ------------------------------
// Global Search – across all lore
// ------------------------------
function buildSearchIndex(data) {
  const index = [];

  Object.keys(data).forEach((category) => {
    if (!Array.isArray(data[category])) return;

    data[category].forEach((item) => {
      index.push({
        category,
        name: item.name,
        description: item.description,
        tags: item.tags || [],
      });
    });
  });

  return index;
}

function enableGlobalSearch(data) {
  const search = document.getElementById("global-search");
  const results = document.getElementById("global-results");
  if (!search || !results) return;

  const index = buildSearchIndex(data);

  search.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    if (!q) {
      results.innerHTML = "";
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
        <strong>${i.name}</strong> <em>(${i.category})</em>
        <p>${i.description}</p>
      </div>
    `
      )
      .join("");
  });
}
