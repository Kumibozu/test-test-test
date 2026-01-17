// Simple tab navigation
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

// Atlas data
const regions = {
  commonwealth: {
    name: "The Commonwealth",
    summary:
      "A revolutionary republic born from the Montague uprisings, obsessed with charters, assemblies, and the management of dissent.",
    politics:
      "Layered assemblies, civic councils, and a powerful security apparatus. Elections are real, but heavily curated.",
    culture:
      "Pamphlets, public debates, and civic festivals. The Urban Tithe funds both libraries and surveillance.",
    conflicts:
      "Cold War with Ryenarkia, proxy support for revolutionary cells, and constant tension with merchant houses and militias."
  },
  ryenarkia: {
    name: "Ryenarkia",
    summary:
      "An imperial state bound together by the cult of Darwues, claiming divine mandate through Halphadite prophecy.",
    politics:
      "Centralized imperial court, regional governors, and temple hierarchies. Law and liturgy are intertwined.",
    culture:
      "Processions, imperial hymns, and shrine pilgrimages. Loyalty is framed as both civic duty and sacred obligation.",
    conflicts:
      "Supports monarchist restorations, funds loyalist militias, and wages a narrative war against Commonwealth ideology."
  },
  indros: {
    name: "Indros",
    summary:
      "An industrial powerhouse built on river‑heat, coal seams, and the ruthless efficiency of its militias.",
    politics:
      "Industrial councils, militia commanders, and merchant‑engineers share power uneasily.",
    culture:
      "Foundry hymns, worker festivals, and relic‑excavation cults around Mi’yam artifacts.",
    conflicts:
      "Arms both sides of the Cold War, fights over relic sites, and occasionally turns its militias inward."
  },
  jindu: {
    name: "Jindu / Southriver",
    summary:
      "A river‑spanning region of trade cities, barges, and contested tariffs, where every bridge is a checkpoint.",
    politics:
      "City councils, river guilds, and foreign consuls all claim overlapping authority.",
    culture:
      "Flood festivals, river oaths, and graffiti that changes faster than the tides.",
    conflicts:
      "Site of the Wifuni Zulun City War, a long ledger of skirmishes over tariffs, relic smuggling, and influence."
  },
  gap: {
    name: "The Gap",
    summary:
      "A mountain corridor controlled by merchant houses who tax passage like a sacrament.",
    politics:
      "Merchant princes, private armies, and ledgers that function as law.",
    culture:
      "Oaths sworn over contracts, fortress‑inns, and a culture of calculated hospitality.",
    conflicts:
      "Gap Pass Campaign, sieges of citadels, and constant pressure from both Commonwealth and Ryenarkia."
  },
  drezbaeryn: {
    name: "Drezbaeryn (Urban Heartlands)",
    summary:
      "Dense city‑clusters where history is written, erased, and rewritten in the same streets.",
    politics:
      "City councils, state governors, and shadow archives all competing to define the official record.",
    culture:
      "Graffiti slogans, underground salons, and relic‑lit shrines in abandoned stations.",
    conflicts:
      "Urban Tithe riots, secret police purges, and proxy struggles between foreign patrons."
  },
  tribal: {
    name: "Tribal Territories",
    summary:
      "Regions beyond formal borders, where kinship, land, and memory matter more than charters or edicts.",
    politics:
      "Clan councils, warbands, and negotiators who treat Commonwealth and Ryenarkia as temporary weather.",
    culture:
      "Oral epics, seasonal rites, and relics treated as ancestors rather than artifacts.",
    conflicts:
      "Raids, defensive wars, and occasional alliances with outside powers when it suits survival."
  }
};

const regionDetailEl = document.getElementById("region-detail");
const regionItems = document.querySelectorAll(".region-item");

function renderRegion(key) {
  const r = regions[key];
  if (!r) return;
  regionDetailEl.innerHTML = `
    <h3>${r.name}</h3>
    <p><strong>Summary:</strong> ${r.summary}</p>
    <p><strong>Politics:</strong> ${r.politics}</p>
    <p><strong>Culture:</strong> ${r.culture}</p>
    <p><strong>Conflicts:</strong> ${r.conflicts}</p>
  `;
}

regionItems.forEach((item) => {
  item.addEventListener("click", () => {
    regionItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    const key = item.getAttribute("data-region");
    renderRegion(key);
  });
});

// initial atlas render
renderRegion("commonwealth");

// Faction data
const factions = [
  {
    name: "City Council Government",
    tagline: "Custodians of order in the urban heartlands.",
    symbol: "A stylized tower over a ledger.",
    slogan: "Order is the price of survival.",
    ideology:
      "Pragmatic governance, bureaucratic control, and a belief that chaos is worse than quiet injustice.",
    figures: "Archivist‑Mayors, Tithe Commissioners, and the Office of Urban Security."
  },
  {
    name: "State Government",
    tagline: "Provincial stewards balancing local needs and distant patrons.",
    symbol: "A divided shield, half civic, half martial.",
    slogan: "Between the city and the frontier.",
    ideology:
      "Maintaining stability between city councils, tribal territories, and foreign influence.",
    figures: "State Governors, Border Marshals, and Provincial Assemblies."
  },
  {
    name: "Revolutionary Commonwealth of Montague",
    tagline: "The idea that the governed may govern.",
    symbol: "A broken chain encircling a ballot.",
    slogan: "No crown above the crowd.",
    ideology:
      "Revolutionary republicanism, civic duty, and the belief that charters can outlast empires.",
    figures: "Montague, early pamphleteers, and the Red‑Gold Assemblies."
  },
  {
    name: "Ryenarkian Imperial Cult",
    tagline: "Faith and empire as a single blade.",
    symbol: "A sunburst crown over a sword.",
    slogan: "Darwues wills, the world obeys.",
    ideology:
      "Divine mandate, hierarchical order, and the fusion of liturgy with law.",
    figures: "Darwues the Emperor, High Halphadite Priests, and Imperial Legates."
  },
  {
    name: "Gap Merchant Houses",
    tagline: "The toll‑keepers of the world’s throat.",
    symbol: "A key crossed with a ledger quill.",
    slogan: "All must pass. All must pay.",
    ideology:
      "Profit as power, neutrality as leverage, and contracts as sacred scripture.",
    figures: "Merchant Princes, Ledger‑Knights, and Contract Scribes."
  },
  {
    name: "Indros Militias",
    tagline: "Steel, steam, and stubborn autonomy.",
    symbol: "A cog encircling a spearhead.",
    slogan: "We forge our own fate.",
    ideology:
      "Industrial self‑determination, worker‑soldier identity, and control of the means of war.",
    figures: "Foundry Captains, Militia Councils, and Relic‑Engineers."
  }
];

const factionContainer = document.getElementById("faction-cards");
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
  factionContainer.appendChild(card);
});

// Cultural archive
const cultureItems = [
  {
    name: "Montague’s Pamphlets",
    type: "Propaganda / Political Text",
    description:
      "Cheaply printed leaflets arguing that sovereignty belongs to assemblies, not garrisons. Smuggled in bread carts and relic crates.",
    notes: "Often annotated in the margins by later readers, turning them into layered conversations across decades."
  },
  {
    name: "Urban Tithe Posters",
    type: "Graffiti / Civic Notice",
    description:
      "Official posters demanding payment of the Urban Tithe, defaced with counter‑slogans like “No coin for cowards.”",
    notes: "Historians use surviving posters to map zones of resistance and compliance."
  },
  {
    name: "Halphadite Hymns of Coronation",
    type: "Religious Hymn",
    description:
      "Chanted during Darwues’s coronation, blending old Halphadite prophecy with new imperial doctrine.",
    notes: "Melodies are reused for later war marches, blurring worship and warfare."
  },
  {
    name: "Gap Ledger‑Relics",
    type: "Relic / Artifact",
    description:
      "Ledgers bound in relic‑treated leather, said to record every toll ever paid through the Gap.",
    notes: "Some pages are written in inks that only appear under relic‑light."
  },
  {
    name: "Mi’yam Excavation Festivals",
    type: "Festival",
    description:
      "Indros workers celebrate each major relic find with processions, steam whistles, and offerings to the unknown makers.",
    notes: "The line between reverence and exploitation is thin and often crossed."
  }
];

const cultureContainer = document.getElementById("culture-cards");
cultureItems.forEach((c) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${c.name}</h3>
    <p class="tagline">${c.type}</p>
    <p>${c.description}</p>
    <p><strong>Notes:</strong> ${c.notes}</p>
  `;
  cultureContainer.appendChild(card);
});

// Characters
const characters = [
  {
    name: "Darwues the Emperor",
    role: "Ryenarkian Emperor",
    description:
      "A commander turned sovereign, crowned under Halphadite prophecy and battlefield smoke.",
    notes:
      "Official chronicles present him as inevitable; private diaries suggest a man haunted by the cost of inevitability."
  },
  {
    name: "Montague the Revolutionary",
    role: "Commonwealth Founder",
    description:
      "A minor clerk whose anonymous pamphlets ignited assemblies and toppled councils.",
    notes:
      "Later Commonwealth factions claim different versions of Montague, each tailored to their own agenda."
  },
  {
    name: "Khynmour Civic Triumvirs",
    role: "Republican Leaders",
    description:
      "Three rotating magistrates who guided Khynmour from city‑state to republic.",
    notes:
      "Their disagreements are as important as their agreements; the archives show a republic built on argument."
  },
  {
    name: "Indros Foundry‑Captain Sereth",
    role: "Militia Commander",
    description:
      "A worker‑soldier who rose from furnace floors to command entire districts.",
    notes:
      "Known for treating relic‑weapons as tools, not miracles, and for refusing to sell certain designs to foreign patrons."
  },
  {
    name: "Gap Merchant Prince Halvar",
    role: "Merchant Prince",
    description:
      "A ledger‑knight who turned a single tollhouse into a chain of fortress‑inns.",
    notes:
      "Rumored to keep a private archive of every secret traded for safe passage."
  }
];

const characterContainer = document.getElementById("character-cards");
characters.forEach((ch) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${ch.name}</h3>
    <p class="tagline">${ch.role}</p>
    <p>${ch.description}</p>
    <p><strong>Notes:</strong> ${ch.notes}</p>
  `;
  characterContainer.appendChild(card);
});

// Encyclopedia
const encyclopediaEntries = [
  {
    term: "Urban Tithe",
    tags: ["Economy", "Commonwealth", "Drezbaeryn"],
    text:
      "A mandatory levy on city dwellers, originally framed as a civic contribution to reconstruction. Over time, it became a symbol of both shared burden and state overreach."
  },
  {
    term: "Halphadites",
    tags: ["Religion", "Ryenarkia"],
    text:
      "A prophetic tradition that predates the Ryenarkian Empire, later co‑opted to legitimize Darwues’s coronation and the Imperial Cult."
  },
  {
    term: "Mi’yam relics",
    tags: ["Relics", "Indros", "Technology"],
    text:
      "Ancient devices unearthed beneath Indros and other regions, blending unknown engineering with ritual significance. No consensus exists on their origin."
  },
  {
    term: "Wifuni Zulun City War",
    tags: ["Conflict", "Jindu / Southriver"],
    text:
      "A long, undeclared conflict fought through tariffs, blockades, and street skirmishes in river‑cities, driven by control of trade and relic smuggling."
  },
  {
    term: "Revolutionary Commonwealth of Montague",
    tags: ["Faction", "Commonwealth"],
    text:
      "The movement that toppled hereditary councils and established assemblies, named after the anonymous pamphleteer who first articulated its principles."
  },
  {
    term: "Ryenarkian Imperial Cult",
    tags: ["Faction", "Religion", "Ryenarkia"],
    text:
      "A fusion of state and faith that treats loyalty to Darwues as both civic duty and sacred vow."
  },
  {
    term: "Gap Merchant Houses",
    tags: ["Faction", "Economy", "The Gap"],
    text:
      "Powerful trading families who control the mountain passes, turning geography into a permanent tollbooth."
  }
];

const encyclopediaContainer = document.getElementById("encyclopedia-results");
const encyclopediaSearch = document.getElementById("encyclopedia-search");

function renderEncyclopedia(list) {
  encyclopediaContainer.innerHTML = "";
  if (!list.length) {
    encyclopediaContainer.innerHTML =
      '<p class="panel-intro">No entries match that search. Try another term or a broader phrase.</p>';
    return;
  }
  list.forEach((entry) => {
    const div = document.createElement("article");
    div.className = "encyclopedia-entry";
    div.innerHTML = `
      <h3>${entry.term}</h3>
      <p class="entry-tags">${entry.tags.join(" • ")}</p>
      <p>${entry.text}</p>
    `;
    encyclopediaContainer.appendChild(div);
  });
}

// initial encyclopedia render
renderEncyclopedia(encyclopediaEntries);

encyclopediaSearch.addEventListener("input", () => {
  const q = encyclopediaSearch.value.trim().toLowerCase();
  if (!q) {
    renderEncyclopedia(encyclopediaEntries);
    return;
  }
  const filtered = encyclopediaEntries.filter((e) => {
    return (
      e.term.toLowerCase().includes(q) ||
      e.text.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
  renderEncyclopedia(filtered);
});
