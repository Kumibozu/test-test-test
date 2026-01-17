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
    renderTimeline(data.timeline);
    renderRegions(data.regions);
    renderFactions(data.factions);
    renderCulture(data.culture);
    renderCharacters(data.characters);
    renderEncyclopedia(data.encyclopedia);
  })
  .catch((err) => {
    console.error("Error loading lore.json:", err);
  });

// ------------------------------
// Timeline
// ------------------------------
function renderTimeline(timeline) {
  const container = document.getElementById("timeline-container");
  container.innerHTML = "";

  timeline.forEach((era) => {
    const eraDiv = document.createElement("div");
    eraDiv.className = "timeline-era";

    eraDiv.innerHTML = `
      <h3>${era.era}</h3>
      <p class="era-range">${era.range}</p>
    `;

    era.events.forEach((ev) => {
      const details = document.createElement("details");
      details.innerHTML = `
        <summary>${ev.title}</summary>
        <p>${ev.text}</p>
      `;
      eraDiv.appendChild(details);
    });

    container.appendChild(eraDiv);
  });
}

// ------------------------------
// Regions (Atlas)
// ------------------------------
function renderRegions(regions) {
  const list = document.getElementById("region-list");
  const detail = document.getElementById("region-detail");

  list.innerHTML = "";
  detail.innerHTML = "<p>Select a region.</p>";

  Object.keys(regions).forEach((key, index) => {
    const r = regions[key];
    const li = document.createElement("li");
    li.className = "region-item";
    li.textContent = r.name;
    li.dataset.region = key;

    if (index === 0) li.classList.add("active");

    li.addEventListener("click", () => {
      document.querySelectorAll(".region-item").forEach((i) => i.classList.remove("active"));
      li.classList.add("active");
      showRegionDetail(r);
    });

    list.appendChild(li);

    if (index === 0) showRegionDetail(r);
  });

  function showRegionDetail(r) {
    detail.innerHTML = `
      <h3>${r.name}</h3>
      <p><strong>Summary:</strong> ${r.summary}</p>
      <p><strong>Politics:</strong> ${r.politics}</p>
      <p><strong>Culture:</strong> ${r.culture}</p>
      <p><strong>Conflicts:</strong> ${r.conflicts}</p>
    `;
  }
}

// ------------------------------
// Factions
// ------------------------------
function renderFactions(factions) {
  const container = document.getElementById("faction-cards");
  container.innerHTML = "";

  factions.forEach((f) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${f.name}</h3>
      <p class="tagline">${f.tagline}</p>
      <ul>
        <li><strong>Symbol:</strong> ${f.symbol}</li>
        <li><strong>Slogan:</strong> ${f.slogan}</li>
        <li><strong>Ideology:</strong> ${f.ideology}</li>
        <li><strong>Key Figures:</strong> ${f.figures}</li>
      </ul>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Culture
// ------------------------------
function renderCulture(items) {
  const container = document.getElementById("culture-cards");
  container.innerHTML = "";

  items.forEach((c) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <h3>${c.name}</h3>
      <p class="tagline">${c.type}</p>
      <p>${c.description}</p>
      <p><strong>Notes:</strong> ${c.notes}</p>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Characters
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
      <p><strong>Notes:</strong> ${ch.notes}</p>
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Encyclopedia
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
        <h3>${e.term}</h3>
        <p class="entry-tags">${e.tags.join(" • ")}</p>
        <p>${e.text}</p>
      `;
      container.appendChild(div);
    });
  }

  display(entries);

  search.addEventListener("input", () => {
    const q = search.value.toLowerCase();
    const filtered = entries.filter((e) =>
      e.term.toLowerCase().includes(q) ||
      e.text.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q))
    );
    display(filtered);
  });
}
