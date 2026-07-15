const CELL_WIDTH = 192;
const CELL_HEIGHT = 208;
const COLUMNS = 8;
const V2_ROWS = 11;
const V1_ROWS = 9;

const TRANSLATIONS = {
  en: {
    pageTitle: "Codex Pet Viewer",
    metaDescription: "Preview Codex pet animations, look directions, and atlas files in the browser.",
    petLibrary: "Pet library",
    loadedPets: "Loaded pets",
    importPets: "Import pets",
    petFormat: "Pet format",
    currentPetPreview: "Current pet preview",
    animationFrames: "Animation frames",
    previewControls: "Preview controls",
    actionTriggers: "Manual Codex action triggers",
    viewOptions: "View options",
    petDetails: "Pet details",
    spritesheetAtlas: "Spritesheet atlas",
    pageActions: "Page actions",
    language: "Language",
    githubStarAria: "Star PetViewer on GitHub",
    brandSubtitle: "for Codex pets",
    library: "Library",
    import: "Import",
    localOrUrl: "Local or URL",
    openFolder: "Open pet folder",
    addFiles: "Add loose files",
    petJsonUrl: "Pet JSON URL",
    load: "Load",
    cellSize: "192 x 208 cells",
    livePreview: "Live preview",
    actions: "Actions",
    playback: "Playback",
    play: "Play",
    pause: "Pause",
    playPauseTitle: "Play or pause animation",
    playPauseAria: "Play or pause",
    speed: "Speed",
    state: "State",
    view: "View",
    checkerTitle: "Toggle checkerboard background",
    gridOn: "Grid on",
    gridOff: "Grid off",
    zoom: "Zoom",
    frameMap: "Frame map",
    atlasInspector: "Atlas inspector",
    githubStar: "GitHub Star",
    petCountOne: "{count} pet",
    petCountMany: "{count} pets",
    atlasBadge: "{columns} x {rows} atlas",
    standard: "Standard",
    metaCell: "Cell",
    metaFrames: "Frames",
    metaRows: "Rows",
    metaImage: "Image",
    statusWidthOk: "Width matches the 8-column Codex atlas.",
    statusWidthFail: "Width does not match 8 columns of 192px cells.",
    statusHeightOk: "Height matches the v{version} row contract.",
    statusHeightWarn: "Detected {rows} rows; expected {expected}.",
    statusFramesOk: "Transparent slots are excluded from playback.",
    statusFramesWarn: "Using standard frame counts; pixel inspection was unavailable.",
    triggerState: "Trigger {state}",
    frames: "{count} frames",
    directions: "{count} directions",
    row: "Row {row}",
    rowMeta: "Row {row} · {meta}",
    rowFrame: "Row {row}, frame {frame}",
    neutral: "Neutral",
    look: "Look {degrees}°",
    frameReadout: "Frame {current} / {total}",
    frameLabel: "{state}: frame {frame}",
    noPetFiles: "No pet.json or spritesheet image was found.",
    bundledLoadError: "Could not load bundled pet: {message}",
    "state.idle": "Idle",
    "state.running-right": "Running right",
    "state.running-left": "Running left",
    "state.waving": "Waving",
    "state.jumping": "Jumping",
    "state.failed": "Failed",
    "state.waiting": "Waiting",
    "state.running": "Working",
    "state.review": "Review",
    "state.look-a": "Look 000-157.5",
    "state.look-b": "Look 180-337.5",
    "action.idle": "Idle",
    "action.running-right": "Right",
    "action.running-left": "Left",
    "action.waving": "Wave",
    "action.jumping": "Jump",
    "action.failed": "Fail",
    "action.waiting": "Wait",
    "action.running": "Work",
    "action.review": "Review",
  },
  zh: {
    pageTitle: "Codex 宠物预览器",
    metaDescription: "在浏览器中预览 Codex 宠物动作、朝向和图集文件。",
    petLibrary: "宠物库",
    loadedPets: "已加载的宠物",
    importPets: "导入宠物",
    petFormat: "宠物格式",
    currentPetPreview: "当前宠物预览",
    animationFrames: "动画帧",
    previewControls: "预览控制",
    actionTriggers: "手动触发 Codex 动作",
    viewOptions: "视图选项",
    petDetails: "宠物详情",
    spritesheetAtlas: "精灵图集",
    pageActions: "页面操作",
    language: "语言",
    githubStarAria: "在 GitHub 上为 PetViewer 点 Star",
    brandSubtitle: "Codex 宠物预览器",
    library: "宠物库",
    import: "导入",
    localOrUrl: "本地或链接",
    openFolder: "打开宠物文件夹",
    addFiles: "添加单个文件",
    petJsonUrl: "宠物 JSON 链接",
    load: "加载",
    cellSize: "192 x 208 单元格",
    livePreview: "实时预览",
    actions: "动作",
    playback: "播放",
    play: "播放",
    pause: "暂停",
    playPauseTitle: "播放或暂停动画",
    playPauseAria: "播放或暂停",
    speed: "速度",
    state: "状态",
    view: "视图",
    checkerTitle: "切换棋盘格背景",
    gridOn: "网格开",
    gridOff: "网格关",
    zoom: "缩放",
    frameMap: "帧图谱",
    atlasInspector: "图集检查器",
    githubStar: "GitHub Star",
    petCountOne: "{count} 个宠物",
    petCountMany: "{count} 个宠物",
    atlasBadge: "{columns} x {rows} 图集",
    standard: "标准",
    metaCell: "单元格",
    metaFrames: "帧数",
    metaRows: "行数",
    metaImage: "图像",
    statusWidthOk: "宽度符合 Codex 8 列图集规范。",
    statusWidthFail: "宽度不符合 8 列、每格 192px 的规范。",
    statusHeightOk: "高度符合 v{version} 行数规范。",
    statusHeightWarn: "检测到 {rows} 行，预期为 {expected} 行。",
    statusFramesOk: "播放时已排除透明空帧。",
    statusFramesWarn: "无法检查像素，当前使用标准帧数。",
    triggerState: "触发{state}",
    frames: "{count} 帧",
    directions: "{count} 个朝向",
    row: "第 {row} 行",
    rowMeta: "第 {row} 行 · {meta}",
    rowFrame: "第 {row} 行，第 {frame} 帧",
    neutral: "中立",
    look: "朝向 {degrees}°",
    frameReadout: "第 {current} / {total} 帧",
    frameLabel: "{state}：第 {frame} 帧",
    noPetFiles: "未找到 pet.json 或精灵图文件。",
    bundledLoadError: "无法加载预设宠物：{message}",
    "state.idle": "待机",
    "state.running-right": "向右移动",
    "state.running-left": "向左移动",
    "state.waving": "挥手",
    "state.jumping": "跳跃",
    "state.failed": "失败",
    "state.waiting": "等待",
    "state.running": "工作中",
    "state.review": "审查",
    "state.look-a": "朝向 000-157.5",
    "state.look-b": "朝向 180-337.5",
    "action.idle": "待机",
    "action.running-right": "向右",
    "action.running-left": "向左",
    "action.waving": "挥手",
    "action.jumping": "跳跃",
    "action.failed": "失败",
    "action.waiting": "等待",
    "action.running": "工作",
    "action.review": "审查",
  },
};

const STATES = [
  {
    id: "idle",
    label: "Idle",
    row: 0,
    defaultFrames: 6,
    durations: [280, 110, 110, 140, 140, 320],
  },
  {
    id: "running-right",
    label: "Running right",
    row: 1,
    defaultFrames: 8,
    durations: [120, 120, 120, 120, 120, 120, 120, 220],
  },
  {
    id: "running-left",
    label: "Running left",
    row: 2,
    defaultFrames: 8,
    durations: [120, 120, 120, 120, 120, 120, 120, 220],
  },
  {
    id: "waving",
    label: "Waving",
    row: 3,
    defaultFrames: 4,
    durations: [140, 140, 140, 280],
  },
  {
    id: "jumping",
    label: "Jumping",
    row: 4,
    defaultFrames: 5,
    durations: [140, 140, 140, 140, 280],
  },
  {
    id: "failed",
    label: "Failed",
    row: 5,
    defaultFrames: 8,
    durations: [140, 140, 140, 140, 140, 140, 140, 240],
  },
  {
    id: "waiting",
    label: "Waiting",
    row: 6,
    defaultFrames: 6,
    durations: [150, 150, 150, 150, 150, 260],
  },
  {
    id: "running",
    label: "Working",
    row: 7,
    defaultFrames: 6,
    durations: [120, 120, 120, 120, 120, 220],
  },
  {
    id: "review",
    label: "Review",
    row: 8,
    defaultFrames: 6,
    durations: [150, 150, 150, 150, 150, 280],
  },
  { id: "look-a", label: "Look 000-157.5", row: 9, defaultFrames: 8, v2: true },
  { id: "look-b", label: "Look 180-337.5", row: 10, defaultFrames: 8, v2: true },
];

const ACTION_STATES = [
  { id: "idle", label: "Idle", shortcut: "1" },
  { id: "running-right", label: "Right", shortcut: "2" },
  { id: "running-left", label: "Left", shortcut: "3" },
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

const DIRECTION_NAMES = {
  en: [
    "Up",
    "Up-right",
    "Up-right",
    "Up-right",
    "Right",
    "Down-right",
    "Down-right",
    "Down-right",
    "Down",
    "Down-left",
    "Down-left",
    "Down-left",
    "Left",
    "Up-left",
    "Up-left",
    "Up-left",
  ],
  zh: [
    "上",
    "右上",
    "右上",
    "右上",
    "右",
    "右下",
    "右下",
    "右下",
    "下",
    "左下",
    "左下",
    "左下",
    "左",
    "左上",
    "左上",
    "左上",
  ],
};

const BUNDLED_PETS = [
  {
    manifestPath: "assets/noir/pet.json",
    fallbackManifest: {
      id: "noir",
      displayName: "Noir",
      description:
        "A sweet, quietly mischievous black-and-cream hedgehog with luminous golden eyes and tiny paws.",
      spriteVersionNumber: 2,
      spritesheetPath: "spritesheet.webp",
    },
  },
  {
    manifestPath: "assets/manqu/pet.json",
    fallbackManifest: {
      id: "manqu",
      displayName: "Manqu",
      description:
        "A gray-haired chibi character with a soft worm-like body, blinking at rest and wriggling while moving.",
      spriteVersionNumber: 2,
      spritesheetPath: "spritesheet.webp",
    },
  },
  {
    manifestPath: "assets/miki/pet.json",
    fallbackManifest: {
      id: "miki",
      displayName: "弥希 Miki",
      description:
        "The disciplined yet adorable vice president of Qingguang High School's student council.",
      spriteVersionNumber: 2,
      spritesheetPath: "spritesheet.webp",
    },
  },
  {
    manifestPath: "assets/yua/pet.json",
    fallbackManifest: {
      id: "yua",
      displayName: "悠亚 Yua",
      description:
        "A clever and playful cosmic penguin whose plans to conquer Earth always end in adorable failure.",
      spriteVersionNumber: 2,
      spritesheetPath: "spritesheet.webp",
    },
  },
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
  directionReadout: document.querySelector("#directionReadout"),
  previewCanvas: document.querySelector("#previewCanvas"),
  frameStrip: document.querySelector("#frameStrip"),
  stateReadout: document.querySelector("#stateReadout"),
  frameReadout: document.querySelector("#frameReadout"),
  petId: document.querySelector("#petId"),
  petName: document.querySelector("#petName"),
  petDescription: document.querySelector("#petDescription"),
  petBadges: document.querySelector("#petBadges"),
  metaGrid: document.querySelector("#metaGrid"),
  statusList: document.querySelector("#statusList"),
  atlasSize: document.querySelector("#atlasSize"),
  atlasGrid: document.querySelector("#atlasGrid"),
  languageButtons: [...document.querySelectorAll(".language-option")],
};

const ctx = elements.previewCanvas.getContext("2d");

const app = {
  pets: [],
  activePetId: null,
  stateId: "idle",
  frame: 0,
  playing: true,
  speed: 1,
  zoom: 2,
  checker: true,
  language: getInitialLanguage(),
  mousePreview: null,
  lastTick: 0,
  animationHandle: 0,
};

initialize();

async function initialize() {
  wireEvents();
  applyLanguage();
  let animationStarted = false;

  await addBundledPets();

  if (app.pets[0]) {
    selectPet(app.pets[0].id);
    app.lastTick = performance.now();
    animationLoop(0);
    animationStarted = true;
  }

  const linkedPet = await loadPetFromUrlParams();
  if (linkedPet) selectPet(linkedPet.id);

  if (!animationStarted && linkedPet) {
    app.lastTick = performance.now();
    animationLoop(0);
  }
}

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem("pet-viewer-language");
    if (savedLanguage === "en" || savedLanguage === "zh") return savedLanguage;
  } catch {
    // Local file previews can deny storage access.
  }

  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function setLanguage(language) {
  if (language !== "en" && language !== "zh") return;
  app.language = language;

  try {
    localStorage.setItem("pet-viewer-language", language);
  } catch {
    // The switch still works for the current session without storage.
  }

  applyLanguage();
}

function applyLanguage() {
  document.documentElement.lang = app.language === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");
  document.querySelector('meta[name="description"]').content = t("metaDescription");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });

  for (const button of elements.languageButtons) {
    const isActive = button.dataset.language === app.language;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }

  elements.playButton.textContent = t(app.playing ? "pause" : "play");
  elements.checkerButton.textContent = t(app.checker ? "gridOn" : "gridOff");

  if (app.pets.length) {
    elements.atlasGrid.dataset.petId = "";
    renderAll();
  }
}

function t(key, params = {}) {
  const template = TRANSLATIONS[app.language]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  return Object.entries(params).reduce(
    (value, [name, replacement]) => value.replaceAll(`{${name}}`, String(replacement)),
    template,
  );
}

function getStateLabel(state) {
  return t(`state.${state.id}`);
}

function getDirectionName(index) {
  return DIRECTION_NAMES[app.language]?.[index] ?? DIRECTION_NAMES.en[index];
}

function wireEvents() {
  for (const button of elements.languageButtons) {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  }

  elements.urlImport.addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = elements.urlInput.value.trim();
    if (!url) return;

    try {
      const pet = await buildPetFromJsonUrl(url);
      addOrReplacePet(pet);
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
    app.frame = getFrameIndexes(getActiveState(), getActivePet())[0] || 0;
    app.lastTick = performance.now();
    renderAll();
  });

  elements.playButton.addEventListener("click", () => {
    app.playing = !app.playing;
    app.lastTick = performance.now();
    elements.playButton.textContent = t(app.playing ? "pause" : "play");
  });

  elements.speedRange.addEventListener("input", () => {
    app.speed = Number(elements.speedRange.value);
    elements.speedOutput.value = formatMultiplier(app.speed);
    app.lastTick = performance.now();
  });

  elements.zoomRange.addEventListener("input", () => {
    app.zoom = Number(elements.zoomRange.value);
    sizePreviewCanvas();
  });

  elements.checkerButton.addEventListener("click", () => {
    app.checker = !app.checker;
    elements.previewStage.classList.toggle("checker", app.checker);
    elements.atlasGrid.classList.toggle("plain", !app.checker);
    elements.checkerButton.setAttribute("aria-pressed", String(app.checker));
    elements.checkerButton.textContent = t(app.checker ? "gridOn" : "gridOff");
  });

  elements.previewStage.addEventListener("pointerenter", (event) => {
    const pet = getActivePet();
    if (!pet || pet.spriteVersionNumber < 2 || pet.rows < V2_ROWS) return;

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
    if (app.mousePreview) updateMousePreview(event);
  });

  elements.previewStage.addEventListener("pointerleave", () => {
    if (!app.mousePreview) return;

    app.stateId = app.mousePreview.stateId;
    app.frame = app.mousePreview.frame;
    app.playing = app.mousePreview.playing;
    app.mousePreview = null;
    elements.directionReadout.value = "";
    elements.previewStage.classList.remove("mouse-active");
    app.lastTick = performance.now();
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

async function addBundledPets() {
  for (const bundledPet of BUNDLED_PETS) {
    try {
      await addBundledPet(bundledPet);
    } catch (error) {
      showStatusMessage(t("bundledLoadError", { message: error.message }), "fail");
    }
  }
}

async function addBundledPet({ manifestPath, fallbackManifest }) {
  const manifestUrl = new URL(manifestPath, window.location.href);
  let manifest = fallbackManifest;

  try {
    const response = await fetch(manifestUrl);
    if (response.ok) manifest = await response.json();
  } catch {
    // Direct file access can block fetch while still allowing the image to load.
  }

  const imageUrl = new URL(manifest.spritesheetPath, manifestUrl).href;
  const image = await loadImage(imageUrl);
  app.pets.push(
    normalizePet({
      root: manifest.displayName,
      manifest,
      image,
      imageUrl,
      fileName: manifest.spritesheetPath,
      bundled: true,
    }),
  );
}

async function importFiles(files) {
  try {
    const imported = await buildPetsFromFiles(files);
    if (!imported.length) {
      showStatusMessage(t("noPetFiles"), "warn");
      return;
    }

    imported.forEach(addOrReplacePet);
    selectPet(imported[0].id);
  } catch (error) {
    showStatusMessage(error.message, "fail");
  }
}

async function loadPetFromUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const petUrl = params.get("pet") || params.get("petJson");
  if (!petUrl) return null;

  try {
    const pet = await buildPetFromJsonUrl(petUrl);
    addOrReplacePet(pet);
    elements.urlInput.value = petUrl;
    return pet;
  } catch (error) {
    showStatusMessage(error.message, "fail");
    return null;
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
  const image = await loadRemoteImage(imageUrl);
  const pathParts = url.pathname.split("/").filter(Boolean);
  const root = manifest.displayName || manifest.id || pathParts.at(-2) || "Remote pet";

  return normalizePet({ root, manifest, image, imageUrl, fileName: sheetPath });
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
      imageFiles.find((file) => (file.webkitRelativePath || file.name).endsWith(manifestPath)) ||
      imageFiles.find((file) => /spritesheet/i.test(file.name)) ||
      imageFiles[0];

    if (!preferredImage) continue;

    const imageUrl = URL.createObjectURL(preferredImage);
    const image = await loadImage(imageUrl);
    pets.push(normalizePet({ root, manifest, image, imageUrl, fileName: preferredImage.name }));
  }

  return pets;
}

function normalizePet({ root, manifest, image, imageUrl, fileName, bundled = false }) {
  const rows = Math.round(image.naturalHeight / CELL_HEIGHT);
  const columns = Math.round(image.naturalWidth / CELL_WIDTH);
  const version = manifest.spriteVersionNumber || (rows >= V2_ROWS ? 2 : 1);
  const id = manifest.id || slugify(root || fileName || "pet");
  const instanceId = bundled
    ? "bundled"
    : globalThis.crypto?.randomUUID
      ? crypto.randomUUID()
      : String(Date.now());

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
    columns,
    frameIndexesByRow: detectPopulatedFrames(image, rows, columns),
    bundled,
  };
}

function detectPopulatedFrames(image, rows, columns) {
  if (columns < 1 || rows < 1) return null;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const analysisCtx = canvas.getContext("2d", { willReadFrequently: true });
    analysisCtx.drawImage(image, 0, 0);
    const pixels = analysisCtx.getImageData(0, 0, canvas.width, canvas.height).data;
    const populated = [];

    for (let row = 0; row < rows; row += 1) {
      const frameIndexes = [];
      for (let col = 0; col < Math.min(columns, COLUMNS); col += 1) {
        if (cellHasVisiblePixels(pixels, canvas.width, row, col)) frameIndexes.push(col);
      }
      populated.push(frameIndexes);
    }

    return populated;
  } catch {
    return null;
  }
}

function cellHasVisiblePixels(pixels, imageWidth, row, col) {
  const startX = col * CELL_WIDTH;
  const startY = row * CELL_HEIGHT;

  for (let y = startY; y < startY + CELL_HEIGHT; y += 4) {
    for (let x = startX; x < startX + CELL_WIDTH; x += 4) {
      if (pixels[(y * imageWidth + x) * 4 + 3] > 8) return true;
    }
  }
  return false;
}

function addOrReplacePet(pet) {
  app.pets = [...app.pets.filter((candidate) => candidate.petId !== pet.petId), pet];
}

function selectPet(id) {
  app.activePetId = id;
  app.stateId = "idle";
  app.frame = getFrameIndexes(STATES[0], getActivePet())[0] || 0;
  app.lastTick = performance.now();
  elements.atlasGrid.dataset.petId = "";
  renderAll();
}

function renderAll() {
  renderPetList();
  renderDetails();
  ensureActiveFrame();
  renderActionGrid();
  renderFrameStrip();
  renderAtlas();
  drawCurrentFrame();
}

function triggerAction(stateId) {
  const state = STATES.find((candidate) => candidate.id === stateId);
  const pet = getActivePet();
  if (!state || state.row >= pet.rows) return;

  app.stateId = stateId;
  app.frame = getFrameIndexes(state, pet)[0] || 0;
  app.playing = true;
  app.lastTick = performance.now();
  elements.playButton.textContent = t("pause");
  renderAll();
}

function renderActionGrid() {
  const pet = getActivePet();
  elements.actionGrid.innerHTML = "";

  for (const action of ACTION_STATES) {
    const state = STATES.find((candidate) => candidate.id === action.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `action-button${app.stateId === action.id ? " active" : ""}`;
    button.title = t("triggerState", { state: getStateLabel(state) });
    button.disabled = state.row >= pet.rows;
    button.setAttribute("aria-pressed", String(app.stateId === action.id));
    button.addEventListener("click", () => triggerAction(action.id));
    button.innerHTML = `<strong>${escapeHtml(t(`action.${action.id}`))}</strong>`;
    elements.actionGrid.append(button);
  }
}

function renderPetList() {
  elements.petCount.textContent = t(app.pets.length === 1 ? "petCountOne" : "petCountMany", {
    count: app.pets.length,
  });
  elements.petList.innerHTML = "";

  for (const pet of app.pets) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pet-card${pet.id === app.activePetId ? " active" : ""}`;
    button.addEventListener("click", () => selectPet(pet.id));

    const thumb = document.createElement("div");
    thumb.className = "pet-thumb checker";
    thumb.style.backgroundImage = `url("${pet.imageUrl}")`;
    thumb.style.backgroundSize = `${pet.columns * 46}px ${pet.rows * 50}px`;
    thumb.style.backgroundPosition = "0 0";

    const text = document.createElement("div");
    text.innerHTML = `<strong>${escapeHtml(pet.displayName)}</strong><p>${escapeHtml(pet.petId)}</p>`;
    button.append(thumb, text);
    elements.petList.append(button);
  }
}

function renderDetails() {
  const pet = getActivePet();
  const availableStates = STATES.filter((state) => state.row < pet.rows);

  elements.stateSelect.innerHTML = availableStates
    .map((state) => `<option value="${state.id}">${escapeHtml(getStateLabel(state))}</option>`)
    .join("");

  if (!availableStates.some((state) => state.id === app.stateId)) app.stateId = "idle";
  elements.stateSelect.value = app.stateId;

  elements.petId.textContent = pet.petId;
  elements.petName.textContent = pet.displayName;
  elements.petDescription.textContent = pet.description;
  elements.atlasSize.textContent = `${pet.width} x ${pet.height}`;

  const expectedRows = pet.spriteVersionNumber >= 2 ? V2_ROWS : V1_ROWS;
  const dimensionMatch = pet.columns === COLUMNS && pet.rows === expectedRows;
  elements.petBadges.innerHTML = [
    `<span class="badge ok">Codex v${pet.spriteVersionNumber}</span>`,
    `<span class="badge${dimensionMatch ? " ok" : ""}">${escapeHtml(t("atlasBadge", { columns: pet.columns, rows: pet.rows }))}</span>`,
  ].join("");

  const populatedCells = pet.frameIndexesByRow
    ? pet.frameIndexesByRow.reduce((total, indexes) => total + indexes.length, 0)
    : null;
  const meta = [
    [t("metaCell"), `${CELL_WIDTH} x ${CELL_HEIGHT}`],
    [t("metaFrames"), populatedCells ?? t("standard")],
    [t("metaRows"), pet.rows],
    [t("metaImage"), pet.spritesheetPath],
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
      ? { kind: "ok", text: t("statusWidthOk") }
      : { kind: "fail", text: t("statusWidthFail") },
  );

  const expectedRows = pet.spriteVersionNumber >= 2 ? V2_ROWS : V1_ROWS;
  statuses.push(
    pet.rows === expectedRows
      ? { kind: "ok", text: t("statusHeightOk", { version: pet.spriteVersionNumber }) }
      : { kind: "warn", text: t("statusHeightWarn", { rows: pet.rows, expected: expectedRows }) },
  );

  statuses.push(
    pet.frameIndexesByRow
      ? { kind: "ok", text: t("statusFramesOk") }
      : { kind: "warn", text: t("statusFramesWarn") },
  );

  return statuses;
}

function renderFrameStrip() {
  const pet = getActivePet();
  const state = getActiveState();
  const frameIndexes = getFrameIndexes(state, pet);
  elements.frameStrip.innerHTML = "";

  for (const frameIndex of frameIndexes) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `frame-button${frameIndex === app.frame ? " active" : ""}`;
    button.title = getFrameLabel(state, frameIndex);
    button.addEventListener("click", () => {
      app.frame = frameIndex;
      app.playing = false;
      app.lastTick = performance.now();
      elements.playButton.textContent = t("play");
      renderFrameStrip();
      drawCurrentFrame();
    });

    const canvas = document.createElement("canvas");
    canvas.width = CELL_WIDTH;
    canvas.height = CELL_HEIGHT;
    drawFrameToContext(canvas.getContext("2d"), pet, state.row, frameIndex);
    button.append(canvas);
    elements.frameStrip.append(button);
  }

  updatePreviewReadouts(state, frameIndexes);
}

function renderAtlas() {
  const pet = getActivePet();
  if (elements.atlasGrid.dataset.petId !== pet.id) {
    elements.atlasGrid.innerHTML = "";

    for (let row = 0; row < pet.rows; row += 1) {
      const state = STATES.find((candidate) => candidate.row === row);
      const frameIndexes = state
        ? getFrameIndexes(state, pet)
        : Array.from({ length: Math.min(pet.columns, COLUMNS) }, (_, index) => index);
      const populated = new Set(frameIndexes);
      const rowElement = document.createElement("div");
      rowElement.className = "atlas-row";

      const label = document.createElement("div");
      label.className = "atlas-row-label";
      const rowName = state ? getStateLabel(state) : t("row", { row });
      const rowMeta = t(row >= 9 ? "directions" : "frames", { count: frameIndexes.length });
      label.innerHTML = `<strong>${escapeHtml(rowName)}</strong><span>${escapeHtml(t("rowMeta", { row, meta: rowMeta }))}</span>`;
      rowElement.append(label);

      for (let col = 0; col < COLUMNS; col += 1) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = `atlas-cell${populated.has(col) ? "" : " empty"}`;
        cell.dataset.row = String(row);
        cell.dataset.col = String(col);
        cell.dataset.frame = String(col);
        cell.title = state
          ? getFrameLabel(state, col)
          : t("rowFrame", { row, frame: col + 1 });
        cell.setAttribute("aria-label", cell.title);
        cell.addEventListener("click", () => selectCell(row, col));

        const canvas = document.createElement("canvas");
        canvas.width = CELL_WIDTH;
        canvas.height = CELL_HEIGHT;
        drawFrameToContext(canvas.getContext("2d"), pet, row, col);
        cell.append(canvas);
        rowElement.append(cell);
      }

      elements.atlasGrid.append(rowElement);
    }

    elements.atlasGrid.dataset.petId = pet.id;
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

  if (distance < 42) {
    app.stateId = "idle";
    app.frame = getFrameIndexes(STATES[0], getActivePet())[0] || 0;
    elements.directionReadout.value = t("neutral");
  } else {
    const degrees = normalizeDegrees((Math.atan2(dy, dx) * 180) / Math.PI + 90);
    const directionIndex = Math.round(degrees / 22.5) % 16;
    app.stateId = directionIndex < 8 ? "look-a" : "look-b";
    app.frame = directionIndex % 8;
    elements.directionReadout.value = `${getDirectionName(directionIndex)} · ${DIRECTION_LABELS[directionIndex]}°`;
  }

  renderFrameStrip();
  drawCurrentFrame();
}

function selectCell(row, col) {
  const state = STATES.find((candidate) => candidate.row === row);
  if (!state) return;

  app.stateId = state.id;
  app.frame = col;
  app.playing = false;
  app.lastTick = performance.now();
  elements.playButton.textContent = t("play");
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
  if (row >= pet.rows || frame >= pet.columns) return;
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
  elements.previewCanvas.style.height = "auto";
  elements.zoomOutput.value = formatMultiplier(app.zoom);
}

function animationLoop(timestamp) {
  if (app.playing && !app.mousePreview) {
    const state = getActiveState();
    const pet = getActivePet();
    const frameIndexes = getFrameIndexes(state, pet);
    const elapsed = timestamp - app.lastTick;
    const duration = getCurrentFrameDuration(state, frameIndexes) / app.speed;

    if (elapsed >= duration) {
      app.lastTick = timestamp;
      const currentIndex = Math.max(0, frameIndexes.indexOf(app.frame));
      app.frame = frameIndexes[(currentIndex + 1) % frameIndexes.length];
      renderFrameStrip();
      drawCurrentFrame();
    }
  }

  app.animationHandle = requestAnimationFrame(animationLoop);
}

function getCurrentFrameDuration(state, frameIndexes) {
  if (!state.durations?.length) return 140;
  const position = Math.max(0, frameIndexes.indexOf(app.frame));
  return state.durations[Math.min(position, state.durations.length - 1)];
}

function getFrameIndexes(state, pet) {
  const detected = pet.frameIndexesByRow?.[state.row];
  if (detected?.length) return detected;

  const count = Math.min(state.defaultFrames, pet.columns, COLUMNS);
  return Array.from({ length: count }, (_, index) => index);
}

function ensureActiveFrame() {
  const frameIndexes = getFrameIndexes(getActiveState(), getActivePet());
  if (!frameIndexes.includes(app.frame)) app.frame = frameIndexes[0] || 0;
}

function updatePreviewReadouts(state, frameIndexes) {
  const position = Math.max(0, frameIndexes.indexOf(app.frame));
  if (state.row >= 9) {
    const directionIndex = (state.row - 9) * COLUMNS + app.frame;
    elements.stateReadout.textContent = t("look", { degrees: DIRECTION_LABELS[directionIndex] });
    elements.frameReadout.textContent = getDirectionName(directionIndex);
  } else {
    elements.stateReadout.textContent = getStateLabel(state);
    elements.frameReadout.textContent = t("frameReadout", {
      current: position + 1,
      total: frameIndexes.length,
    });
  }
}

function getActivePet() {
  return app.pets.find((pet) => pet.id === app.activePetId) || app.pets[0];
}

function getActiveState() {
  return STATES.find((state) => state.id === app.stateId) || STATES[0];
}

function getFrameLabel(state, index) {
  if (state.row >= 9) {
    const directionIndex = (state.row - 9) * COLUMNS + index;
    return `${getDirectionName(directionIndex)} ${DIRECTION_LABELS[directionIndex]}°`;
  }
  return t("frameLabel", { state: getStateLabel(state), frame: index + 1 });
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

async function loadRemoteImage(src) {
  try {
    return await loadImage(src, true);
  } catch {
    return loadImage(src);
  }
}

function normalizeDegrees(degrees) {
  return ((degrees % 360) + 360) % 360;
}

function formatMultiplier(value) {
  return `${Number(value).toFixed(Number(value) % 1 === 0 ? 0 : 2).replace(/0$/, "")}x`;
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
