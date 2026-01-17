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
// Load lore.json
// ------------------------------
fetch("lore.json")
  .then((res) => res.json())
  .then((data) => {
    console.log("LORE DATA:", data);
    renderTimeline(data.timeline);
    renderRegions(data.regions);
    renderFactions(data.factions);
    renderCultures(data.cultures);
    renderCharacters(data.characters);
    renderEncyclopedia(data.encyclopedia);
  })
  .catch((err) => {
    console.error("Error loading lore.json:", err);
  });

// ------------------------------
// Timeline (flat list of entries)
// ------------------------------
function renderTimeline(timeline) {
  const container = document.getElementById("timeline-container");
  container.innerHTML = "";

  timeline.forEach((entry) => {
    const div = document.createElement("div");
    div.className = "timeline-era";

    div.innerHTML = `
      <h3>${entry.name}</h3>
      <p class="era-range">${entry.tags.join(" • ")}</p>
      <p>${entry.description}</p>
    `;

    container.appendChild(div);
  });
}

// ------------------------------
// Regions (Atlas) – now an array
// ------------------------------
function renderRegions(regions) {
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
      document.querySelectorAll(".region-item").forEach((i) =>
        i.classList.remove("active")
      );
      li.classList.add("active");
      showRegionDetail(r);
    });

    list.appendChild(li);

    if (index === 0) showRegionDetail(r);
  });

  function showRegionDetail(r) {
    detail.innerHTML = `
      <h3>${r.name}</h3>
      <p><strong>Tags:</strong> ${r.tags.join(" • ")}</p>
      <p>${r.description}</p>
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
// Characters – no notes, has tags
// ------------------------------
function renderCharacters(chars) {
  const container = document.getElementById("character-cards");
  container.innerHTML = "";

  chars.forEach((ch) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${ch.name}</h3>
      <p class="tagline">${ch.role}</p>
      <p>${ch.description}</p>
      <p><strong>Tags:</strong> ${ch.tags.join(" • ")}</p>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Encyclopedia – name/description
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
