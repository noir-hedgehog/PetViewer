const CELL_WIDTH = 192;
const CELL_HEIGHT = 208;
const COLUMNS = 8;
const V2_ROWS = 11;
const V1_ROWS = 9;

const STATES = [
  { id: "idle", label: "Idle", row: 0, frames: 8 },
  { id: "running-right", label: "Running right", row: 1, frames: 8 },
  { id: "running-left", label: "Running left", row: 2, frames: 8 },
  { id: "waving", label: "Waving", row: 3, frames: 8 },
  { id: "jumping", label: "Jumping", row: 4, frames: 8 },
  { id: "failed", label: "Failed", row: 5, frames: 8 },
  { id: "waiting", label: "Waiting", row: 6, frames: 8 },
  { id: "running", label: "Working", row: 7, frames: 8 },
  { id: "review", label: "Review", row: 8, frames: 8 },
  { id: "look-a", label: "Look 000-157.5", row: 9, frames: 8, v2: true },
  { id: "look-b", label: "Look 180-337.5", row: 10, frames: 8, v2: true },
];

const ACTION_STATES = [
  { id: "idle", label: "Idle", shortcut: "1" },
  { id: "running-right", label: "Run right", shortcut: "2" },
  { id: "running-left", label: "Run left", shortcut: "3" },
  { id: "waving", label: "Wave", shortcut: "4" },
  { id: "jumping", label: "Jump", shortcut: "5" },
  { id: "failed", label: "Fail", shortcut: "6" },
  { id: "waiting", label: "Wait", shortcut: "7" },
  { id: "running", label: "Work", shortcut: "8" },
  { id: "review", label: "Review", shortcut: "9" },
];

const DIRECTION_LABELS = [
  "000",
  "022.5",
  "045",
  "067.5",
  "090",
  "112.5",
  "135",
  "157.5",
  "180",
  "202.5",
  "225",
  "247.5",
  "270",
  "292.5",
  "315",
  "337.5",
];

const elements = {
  urlImport: document.querySelector("#urlImport"),
  urlInput: document.querySelector("#urlInput"),
  directoryInput: document.querySelector("#directoryInput"),
  fileInput: document.querySelector("#fileInput"),
  dropZone: document.querySelector("#dropZone"),
  petList: document.querySelector("#petList"),
  petCount: document.querySelector("#petCount"),
  actionGrid: document.querySelector("#actionGrid"),
  stateSelect: document.querySelector("#stateSelect"),
  playButton: document.querySelector("#playButton"),
  speedRange: document.querySelector("#speedRange"),
  speedOutput: document.querySelector("#speedOutput"),
  zoomRange: document.querySelector("#zoomRange"),
  zoomOutput: document.querySelector("#zoomOutput"),
  checkerButton: document.querySelector("#checkerButton"),
  previewStage: document.querySelector("#previewStage"),
  mouseReticle: document.querySelector("#mouseReticle"),
  previewCanvas: document.querySelector("#previewCanvas"),
  frameStrip: document.querySelector("#frameStrip"),
  petId: document.querySelector("#petId"),
  petName: document.querySelector("#petName"),
  petDescription: document.querySelector("#petDescription"),
  metaGrid: document.querySelector("#metaGrid"),
  statusList: document.querySelector("#statusList"),
  atlasSize: document.querySelector("#atlasSize"),
  atlasGrid: document.querySelector("#atlasGrid"),
};

const ctx = elements.previewCanvas.getContext("2d");

const app = {
  pets: [],
  activePetId: null,
  stateId: "idle",
  frame: 0,
  playing: true,
  fps: 8,
  zoom: 2,
  checker: true,
  mousePreview: null,
  lastTick: 0,
  animationHandle: 0,
};

initialize();

async function initialize() {
  elements.stateSelect.innerHTML = STATES.map(
    (state) => `<option value="${state.id}">${state.label}</option>`,
  ).join("");

  wireEvents();
  await addSamplePet();
  await loadPetFromUrlParams();
  selectPet(app.pets[0].id);
  animationLoop(0);
}

function wireEvents() {
  elements.urlImport.addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = elements.urlInput.value.trim();
    if (!url) return;

    try {
      const pet = await buildPetFromJsonUrl(url);
      app.pets = [...app.pets.filter((candidate) => !candidate.sample), pet];
      selectPet(pet.id);
    } catch (error) {
      showStatusMessage(error.message, "fail");
    }
  });

  elements.directoryInput.addEventListener("change", (event) => {
    importFiles([...event.target.files]);
    event.target.value = "";
  });

  elements.fileInput.addEventListener("change", (event) => {
    importFiles([...event.target.files]);
    event.target.value = "";
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    elements.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      elements.dropZone.classList.add("dragging");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    elements.dropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      elements.dropZone.classList.remove("dragging");
    });
  });

  elements.dropZone.addEventListener("drop", (event) => {
    importFiles([...event.dataTransfer.files]);
  });

  elements.stateSelect.addEventListener("change", () => {
    app.stateId = elements.stateSelect.value;
    app.frame = 0;
    renderAll();
  });

  elements.playButton.addEventListener("click", () => {
    app.playing = !app.playing;
    elements.playButton.textContent = app.playing ? "Pause" : "Play";
  });

  elements.speedRange.addEventListener("input", () => {
    app.fps = Number(elements.speedRange.value);
    elements.speedOutput.value = app.fps;
  });

  elements.zoomRange.addEventListener("input", () => {
    app.zoom = Number(elements.zoomRange.value);
    elements.zoomOutput.value = `${app.zoom}x`;
    sizePreviewCanvas();
  });

  elements.checkerButton.addEventListener("click", () => {
    app.checker = !app.checker;
    elements.previewStage.classList.toggle("checker", app.checker);
    elements.atlasGrid.classList.toggle("checker", app.checker);
    elements.checkerButton.setAttribute("aria-pressed", String(app.checker));
  });

  elements.previewStage.addEventListener("pointerenter", (event) => {
    const pet = getActivePet();
    if (!pet || pet.spriteVersionNumber < 2) return;

    app.mousePreview = {
      stateId: app.stateId,
      frame: app.frame,
      playing: app.playing,
    };
    app.playing = false;
    elements.previewStage.classList.add("mouse-active");
    updateMousePreview(event);
  });

  elements.previewStage.addEventListener("pointermove", (event) => {
    if (!app.mousePreview) return;
    updateMousePreview(event);
  });

  elements.previewStage.addEventListener("pointerleave", () => {
    if (!app.mousePreview) return;

    app.stateId = app.mousePreview.stateId;
    app.frame = app.mousePreview.frame;
    app.playing = app.mousePreview.playing;
    app.mousePreview = null;
    elements.previewStage.classList.remove("mouse-active");
    renderAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    const isTyping =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement;
    if (isTyping) return;

    const action = ACTION_STATES.find((candidate) => candidate.shortcut === event.key);
    if (!action) return;
    event.preventDefault();
    triggerAction(action.id);
  });
}

async function importFiles(files) {
  const imported = await buildPetsFromFiles(files);
  if (!imported.length) {
    showStatusMessage("No pet.json or spritesheet image was found.", "warn");
    return;
  }

  app.pets = [...app.pets.filter((pet) => !pet.sample), ...imported];
  selectPet(imported[0].id);
}

async function loadPetFromUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const petUrl = params.get("pet") || params.get("petJson");
  if (!petUrl) return;

  try {
    const pet = await buildPetFromJsonUrl(petUrl);
    app.pets = [...app.pets.filter((candidate) => !candidate.sample), pet];
    elements.urlInput.value = petUrl;
  } catch (error) {
    showStatusMessage(error.message, "fail");
  }
}

async function buildPetFromJsonUrl(petJsonUrl) {
  const url = new URL(petJsonUrl, window.location.href);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load pet.json: ${response.status} ${response.statusText}`);
  }

  const manifest = await response.json();
  const sheetPath = manifest.spritesheetPath || manifest.spritesheet || "spritesheet.webp";
  const imageUrl = new URL(sheetPath, url).href;
  const image = await loadImage(imageUrl);
  const pathParts = url.pathname.split("/").filter(Boolean);
  const root = manifest.displayName || manifest.id || pathParts.at(-2) || "Remote pet";

  return normalizePet({
    root,
    manifest,
    image,
    imageUrl,
    fileName: sheetPath,
  });
}

async function buildPetsFromFiles(files) {
  const groups = new Map();

  for (const file of files) {
    const path = file.webkitRelativePath || file.name;
    const root = path.includes("/") ? path.split("/")[0] : "Imported files";
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(file);
  }

  const pets = [];
  for (const [root, groupFiles] of groups) {
    const manifestFile = groupFiles.find((file) => file.name === "pet.json");
    const imageFiles = groupFiles.filter((file) => /\.(png|webp)$/i.test(file.name));
    if (!manifestFile && !imageFiles.length) continue;

    let manifest = {};
    if (manifestFile) {
      try {
        manifest = JSON.parse(await manifestFile.text());
      } catch (error) {
        manifest = {
          id: slugify(root),
          displayName: root,
          description: `pet.json could not be parsed: ${error.message}`,
        };
      }
    }

    const manifestPath = manifest.spritesheetPath || manifest.spritesheet || "";
    const preferredImage =
      imageFiles.find((file) => file.webkitRelativePath.endsWith(manifestPath)) ||
      imageFiles.find((file) => /spritesheet/i.test(file.name)) ||
      imageFiles[0];

    if (!preferredImage) continue;

    const imageUrl = URL.createObjectURL(preferredImage);
    const image = await loadImage(imageUrl);
    pets.push(normalizePet({ root, manifest, image, imageUrl, fileName: preferredImage.name }));
  }

  return pets;
}

function normalizePet({ root, manifest, image, imageUrl, fileName, sample = false }) {
  const rows = Math.round(image.naturalHeight / CELL_HEIGHT);
  const version = manifest.spriteVersionNumber || (rows >= V2_ROWS ? 2 : 1);
  const id = manifest.id || slugify(root || fileName || "pet");
  const instanceId = globalThis.crypto?.randomUUID ? crypto.randomUUID() : String(Date.now());

  return {
    id: `${id}-${instanceId}`,
    petId: id,
    displayName: manifest.displayName || manifest.name || titleize(root || id),
    description: manifest.description || "Imported Codex pet atlas.",
    spriteVersionNumber: version,
    spritesheetPath: manifest.spritesheetPath || fileName || "spritesheet",
    image,
    imageUrl,
    width: image.naturalWidth,
    height: image.naturalHeight,
    rows,
    columns: Math.round(image.naturalWidth / CELL_WIDTH),
    sample,
  };
}

async function addSamplePet() {
  const canvas = document.createElement("canvas");
  canvas.width = CELL_WIDTH * COLUMNS;
  canvas.height = CELL_HEIGHT * V2_ROWS;
  const sampleCtx = canvas.getContext("2d");

  for (let row = 0; row < V2_ROWS; row += 1) {
    for (let col = 0; col < COLUMNS; col += 1) {
      drawSampleCell(sampleCtx, row, col);
    }
  }

  const imageUrl = canvas.toDataURL("image/png");
  const image = await loadImage(imageUrl);
  app.pets.push(
    normalizePet({
      root: "Sample Pet",
      manifest: {
        id: "sample-pet",
        displayName: "Sample Pet",
        description: "A generated sample atlas for trying the viewer.",
        spriteVersionNumber: 2,
        spritesheetPath: "generated-sample.png",
      },
      image,
      imageUrl,
      fileName: "generated-sample.png",
      sample: true,
    }),
  );
}

function drawSampleCell(sampleCtx, row, col) {
  const x = col * CELL_WIDTH;
  const y = row * CELL_HEIGHT;
  const cx = x + CELL_WIDTH / 2;
  const baseY = y + 128 + Math.sin((col / COLUMNS) * Math.PI * 2) * rowMotion(row);
  const lean = stateLean(row, col);
  const direction = row >= 9 ? DIRECTION_LABELS[(row - 9) * COLUMNS + col] : "";
  const hue = 170 + row * 8;

  sampleCtx.save();
  sampleCtx.translate(cx + lean, baseY);

  sampleCtx.fillStyle = `hsl(${hue}, 46%, 40%)`;
  sampleCtx.beginPath();
  sampleCtx.ellipse(0, 12, 44, 52, 0, 0, Math.PI * 2);
  sampleCtx.fill();

  sampleCtx.fillStyle = `hsl(${hue + 16}, 58%, 62%)`;
  sampleCtx.beginPath();
  sampleCtx.ellipse(0, -26, 38, 34, 0, 0, Math.PI * 2);
  sampleCtx.fill();

  sampleCtx.strokeStyle = "#26302d";
  sampleCtx.lineWidth = 5;
  sampleCtx.lineCap = "round";
  sampleCtx.beginPath();
  sampleCtx.moveTo(-20, 2);
  sampleCtx.lineTo(-42 - lean * 0.2, 18 + Math.sin(col) * 8);
  sampleCtx.moveTo(20, 2);
  sampleCtx.lineTo(42 - lean * 0.2, 18 + Math.cos(col) * 8);
  sampleCtx.stroke();

  const gaze = direction ? gazeOffset(direction) : { x: row === 1 ? 5 : row === 2 ? -5 : 0, y: 0 };
  sampleCtx.fillStyle = "#f7fbf8";
  sampleCtx.beginPath();
  sampleCtx.arc(-14, -32, 9, 0, Math.PI * 2);
  sampleCtx.arc(14, -32, 9, 0, Math.PI * 2);
  sampleCtx.fill();

  sampleCtx.fillStyle = "#18211f";
  sampleCtx.beginPath();
  sampleCtx.arc(-14 + gaze.x, -32 + gaze.y, 4, 0, Math.PI * 2);
  sampleCtx.arc(14 + gaze.x, -32 + gaze.y, 4, 0, Math.PI * 2);
  sampleCtx.fill();

  sampleCtx.strokeStyle = "#18211f";
  sampleCtx.lineWidth = 4;
  sampleCtx.beginPath();
  sampleCtx.arc(0, -18, row === 5 ? 12 : 10, 0.15 * Math.PI, 0.85 * Math.PI);
  sampleCtx.stroke();

  sampleCtx.restore();
}

function rowMotion(row) {
  if (row === 0) return 3;
  if (row === 4) return 22;
  if (row === 7) return 7;
  return 10;
}

function stateLean(row, col) {
  if (row === 1) return 10 + Math.sin(col * Math.PI) * 4;
  if (row === 2) return -10 + Math.sin(col * Math.PI) * 4;
  if (row === 3) return Math.sin(col * 1.4) * 5;
  return Math.sin(col * 0.8 + row) * 3;
}

function gazeOffset(direction) {
  const degrees = Number(direction);
  const radians = ((degrees - 90) * Math.PI) / 180;
  return {
    x: Math.cos(radians) * 5,
    y: Math.sin(radians) * 5,
  };
}

function selectPet(id) {
  app.activePetId = id;
  app.frame = 0;
  renderAll();
}

function renderAll() {
  renderPetList();
  renderDetails();
  renderActionGrid();
  renderFrameStrip();
  renderAtlas();
  drawCurrentFrame();
}

function triggerAction(stateId) {
  app.stateId = stateId;
  app.frame = 0;
  app.playing = true;
  elements.playButton.textContent = "Pause";
  renderAll();
}

function renderActionGrid() {
  elements.actionGrid.innerHTML = "";

  for (const action of ACTION_STATES) {
    const state = STATES.find((candidate) => candidate.id === action.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `action-button${app.stateId === action.id ? " active" : ""}`;
    button.title = `Trigger ${state.label}`;
    button.setAttribute("aria-pressed", String(app.stateId === action.id));
    button.addEventListener("click", () => triggerAction(action.id));
    button.innerHTML = `<strong>${escapeHtml(action.label)}</strong><span>${escapeHtml(action.shortcut)}</span>`;
    elements.actionGrid.append(button);
  }
}

function renderPetList() {
  elements.petCount.textContent = String(app.pets.length);
  elements.petList.innerHTML = "";

  for (const pet of app.pets) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pet-card${pet.id === app.activePetId ? " active" : ""}`;
    button.addEventListener("click", () => selectPet(pet.id));

    const thumb = document.createElement("div");
    thumb.className = "pet-thumb checker";
    thumb.style.backgroundImage = `url("${pet.imageUrl}")`;
    thumb.style.backgroundSize = `${(pet.width / CELL_WIDTH) * 48}px ${(pet.height / CELL_HEIGHT) * 52}px`;
    thumb.style.backgroundPosition = "0 0";

    const text = document.createElement("div");
    text.innerHTML = `<strong>${escapeHtml(pet.displayName)}</strong><p>${escapeHtml(pet.petId)}</p>`;
    button.append(thumb, text);
    elements.petList.append(button);
  }
}

function renderDetails() {
  const pet = getActivePet();
  const availableStates = STATES.filter((state) => !state.v2 || pet.spriteVersionNumber >= 2);

  elements.stateSelect.innerHTML = availableStates
    .map((state) => `<option value="${state.id}">${state.label}</option>`)
    .join("");

  if (!availableStates.some((state) => state.id === app.stateId)) app.stateId = "idle";
  elements.stateSelect.value = app.stateId;

  elements.petId.textContent = pet.petId;
  elements.petName.textContent = pet.displayName;
  elements.petDescription.textContent = pet.description;
  elements.atlasSize.textContent = `${pet.width} x ${pet.height}`;

  const meta = [
    ["Version", `v${pet.spriteVersionNumber}`],
    ["Cells", `${pet.columns} x ${pet.rows}`],
    ["Cell size", `${CELL_WIDTH} x ${CELL_HEIGHT}`],
    ["Image", pet.spritesheetPath],
  ];

  elements.metaGrid.innerHTML = meta
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(String(value))}</dd></div>`)
    .join("");

  const statuses = getAtlasStatuses(pet);
  elements.statusList.innerHTML = statuses
    .map(
      (status) =>
        `<div class="status-item ${status.kind}"><span class="status-dot"></span><span>${escapeHtml(status.text)}</span></div>`,
    )
    .join("");
}

function getAtlasStatuses(pet) {
  const statuses = [];
  statuses.push(
    pet.width === CELL_WIDTH * COLUMNS
      ? { kind: "ok", text: "Width matches the 8-column Codex atlas contract." }
      : { kind: "fail", text: "Width does not match 8 columns of 192px cells." },
  );

  const expectedRows = pet.spriteVersionNumber >= 2 ? V2_ROWS : V1_ROWS;
  statuses.push(
    pet.rows === expectedRows
      ? { kind: "ok", text: `Height matches the v${pet.spriteVersionNumber} row contract.` }
      : { kind: "warn", text: `Detected ${pet.rows} rows; expected ${expectedRows} for this version.` },
  );

  statuses.push(
    pet.spriteVersionNumber >= 2
      ? { kind: "ok", text: "Look-direction rows are available." }
      : { kind: "warn", text: "v1 atlas: look-direction rows are not present." },
  );

  return statuses;
}

function renderFrameStrip() {
  const state = getActiveState();
  elements.frameStrip.innerHTML = "";

  for (let index = 0; index < state.frames; index += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `frame-button${index === app.frame ? " active" : ""}`;
    button.title = getFrameLabel(state, index);
    button.addEventListener("click", () => {
      app.frame = index;
      renderFrameStrip();
      renderAtlas();
      drawCurrentFrame();
    });

    const canvas = document.createElement("canvas");
    canvas.width = CELL_WIDTH;
    canvas.height = CELL_HEIGHT;
    const thumbCtx = canvas.getContext("2d");
    drawFrameToContext(thumbCtx, getActivePet(), state.row, index);
    button.append(canvas);
    elements.frameStrip.append(button);
  }
}

function renderAtlas() {
  const pet = getActivePet();
  const scale = 0.5;
  const width = pet.width * scale;
  const height = pet.height * scale;

  elements.atlasGrid.style.width = `${width}px`;
  elements.atlasGrid.style.height = `${height}px`;
  elements.atlasGrid.style.minWidth = `${width}px`;
  elements.atlasGrid.style.backgroundImage = `url("${pet.imageUrl}")`;
  elements.atlasGrid.style.backgroundSize = `${width}px ${height}px`;
  elements.atlasGrid.innerHTML = "";

  const state = getActiveState();
  for (let row = 0; row < pet.rows; row += 1) {
    for (let col = 0; col < COLUMNS; col += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = `atlas-cell${row === state.row && col === app.frame ? " active" : ""}`;
      cell.style.left = `${col * CELL_WIDTH * scale}px`;
      cell.style.top = `${row * CELL_HEIGHT * scale}px`;
      cell.style.width = `${CELL_WIDTH * scale}px`;
      cell.style.height = `${CELL_HEIGHT * scale}px`;
      cell.title = `Row ${row}, frame ${col}`;
      cell.setAttribute("aria-label", `Show row ${row}, frame ${col}`);
      cell.addEventListener("click", () => selectCell(row, col));
      elements.atlasGrid.append(cell);
    }
  }
}

function updateMousePreview(event) {
  const rect = elements.previewStage.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = event.clientX - centerX;
  const dy = event.clientY - centerY;
  const distance = Math.hypot(dx, dy);

  elements.mouseReticle.style.left = `${event.clientX - rect.left}px`;
  elements.mouseReticle.style.top = `${event.clientY - rect.top}px`;

  if (distance < 24) {
    app.stateId = "idle";
    app.frame = 0;
  } else {
    const degrees = normalizeDegrees((Math.atan2(dy, dx) * 180) / Math.PI + 90);
    const directionIndex = Math.round(degrees / 22.5) % 16;
    app.stateId = directionIndex < 8 ? "look-a" : "look-b";
    app.frame = directionIndex % 8;
  }

  renderFrameStrip();
  renderAtlas();
  drawCurrentFrame();
}

function selectCell(row, col) {
  const state = STATES.find((candidate) => candidate.row === row) || STATES[0];
  app.stateId = state.id;
  app.frame = Math.min(col, state.frames - 1);
  renderAll();
}

function drawCurrentFrame() {
  const pet = getActivePet();
  const state = getActiveState();
  ctx.clearRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
  drawFrameToContext(ctx, pet, state.row, app.frame);
  sizePreviewCanvas();
}

function drawFrameToContext(targetCtx, pet, row, frame) {
  targetCtx.clearRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
  targetCtx.drawImage(
    pet.image,
    frame * CELL_WIDTH,
    row * CELL_HEIGHT,
    CELL_WIDTH,
    CELL_HEIGHT,
    0,
    0,
    CELL_WIDTH,
    CELL_HEIGHT,
  );
}

function sizePreviewCanvas() {
  elements.previewCanvas.style.width = `${CELL_WIDTH * app.zoom}px`;
  elements.previewCanvas.style.height = `${CELL_HEIGHT * app.zoom}px`;
  elements.zoomOutput.value = `${app.zoom}x`;
}

function animationLoop(timestamp) {
  const interval = 1000 / app.fps;
  if (app.playing && timestamp - app.lastTick >= interval) {
    app.lastTick = timestamp;
    const state = getActiveState();
    app.frame = (app.frame + 1) % state.frames;
    renderFrameStrip();
    renderAtlas();
    drawCurrentFrame();
  }

  app.animationHandle = requestAnimationFrame(animationLoop);
}

function getActivePet() {
  return app.pets.find((pet) => pet.id === app.activePetId) || app.pets[0];
}

function getActiveState() {
  return STATES.find((state) => state.id === app.stateId) || STATES[0];
}

function getFrameLabel(state, index) {
  if (state.row >= 9) return `${state.label}: ${DIRECTION_LABELS[(state.row - 9) * COLUMNS + index]}`;
  return `${state.label}: frame ${index + 1}`;
}

function showStatusMessage(text, kind = "warn") {
  elements.statusList.innerHTML = `<div class="status-item ${kind}"><span class="status-dot"></span><span>${escapeHtml(text)}</span></div>`;
}

function loadImage(src, useCors = false) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (useCors) image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${src}`));
    image.src = src;
  });
}

function normalizeDegrees(degrees) {
  return ((degrees % 360) + 360) % 360;
}

function slugify(value) {
  return String(value || "pet")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleize(value) {
  return String(value || "Pet")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
