// FOR YOU — кондитерская, мастерская и спецэффекты

const choices = {
  shape: [
    { id: "round", name: "Круглый", icon: "●", color: "#f6dce1" },
    { id: "square", name: "Квадратный", icon: "■", color: "#f6dce1" },
    { id: "heart", name: "Сердце", icon: "♥", color: "#f6dce1" }
  ],
  size: [
    { id: "small", name: "Маленький", icon: "▪", color: "#f6dce1" },
    { id: "medium", name: "Средний", icon: "◼", color: "#f6dce1" },
    { id: "large", name: "Большой", icon: "▰", color: "#f6dce1" }
  ],
  base: [
    { id: "vanilla", name: "Ванильный", icon: "●", color: "#efc995" },
    { id: "chocolate", name: "Шоколадный", icon: "●", color: "#8f5948" },
    { id: "velvet", name: "Красный бархат", icon: "●", color: "#c45d65" },
    { id: "honey", name: "Медовый", icon: "●", color: "#d89a4e" },
    { id: "strawberry", name: "Клубничный", icon: "●", color: "#e98ca0" }
  ],
  cream: [
    { id: "vanilla", name: "Ванильный", icon: "●", color: "#fff5dc" },
    { id: "chocolate", name: "Шоколадный", icon: "●", color: "#8f5948" },
    { id: "strawberry", name: "Клубничный", icon: "●", color: "#f0a2b2" },
    { id: "blueberry", name: "Черника", icon: "●", color: "#8585c7" },
    { id: "caramel", name: "Карамель", icon: "●", color: "#c9824f" }
  ],
  icing: [
    { id: "white", name: "Белая", icon: "●", color: "#fff9eb" },
    { id: "chocolate", name: "Шоколад", icon: "●", color: "#8f5948" },
    { id: "pink", name: "Розовая", icon: "●", color: "#f18eb0" },
    { id: "purple", name: "Сиреневая", icon: "●", color: "#ac8bd4" },
    { id: "blue", name: "Голубая", icon: "●", color: "#82c4e5" }
  ],
  layers: [
    { id: 1, name: "1 этаж", icon: "1", color: "#f6dce1" },
    { id: 2, name: "2 этажа", icon: "2", color: "#f6dce1" },
    { id: 3, name: "3 этажа", icon: "3", color: "#f6dce1" }
  ],
  topping: [
    { id: "strawberry", name: "Клубника", icon: "🍓", color: "#f28aa9" },
    { id: "cherry", name: "Вишня", icon: "🍒", color: "#dc526c" },
    { id: "blueberry", name: "Черника", icon: "🫐", color: "#8585c7" },
    { id: "chocolate", name: "Шоколад", icon: "🍫", color: "#8f5948" },
    { id: "candy", name: "Конфеты", icon: "🍬", color: "#f1c76b" },
    { id: "hearts", name: "Сердечки", icon: "♥", color: "#f28aa9" },
    { id: "stars", name: "Звёзды", icon: "⭐", color: "#f3c75b" },
    { id: "crown", name: "Корона", icon: "👑", color: "#f1bd55" },
    { id: "candles", name: "Свечки", icon: "🕯️", color: "#8bcbb6" }
  ]
};

const customers = [
  { name: "Лили", avatar: "👩🏻" },
  { name: "Томми", avatar: "👦🏻" },
  { name: "Мия", avatar: "👧🏻" },
  { name: "Оскар", avatar: "👨🏻" },
  { name: "Бабушка Роза", avatar: "👵🏻" },
  { name: "Дедушка Лео", avatar: "👴🏻" }
];

const defaultCake = {
  shape: "round",
  size: "medium",
  base: "vanilla",
  cream: "vanilla",
  icing: "pink",
  layers: 1,
  toppings: []
};

const cakeColors = {
  vanilla: "#efc995",
  chocolate: "#8f5948",
  velvet: "#c45d65",
  honey: "#d89a4e",
  strawberry: "#e98ca0"
};

const creamColors = {
  vanilla: "#fff5dc",
  chocolate: "#8f5948",
  strawberry: "#f0a2b2",
  blueberry: "#8585c7",
  caramel: "#c9824f"
};

const icingColors = {
  white: "#fff9eb",
  chocolate: "#8f5948",
  pink: "#f18eb0",
  purple: "#ac8bd4",
  blue: "#82c4e5"
};

const toppingIcons = {
  strawberry: "🍓",
  cherry: "🍒",
  blueberry: "🫐",
  chocolate: "🍫",
  candy: "🍬",
  hearts: "♥",
  stars: "⭐",
  crown: "👑",
  candles: "🕯️"
};

let freeMode = false;
let history = [];
let finishedCake = null;
let writingTimer = null;
let progress = loadProgress();
let currentCategory = "shape";
let currentCake = { ...defaultCake, toppings: [] };
let currentOrder = null;
let currentCustomerIndex = 0;
let streak = 0;
let orderServed = false;
let resultTimer = null;
let audioContext = null;
let modalTrigger = null;

const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const menuStars = document.getElementById("menuStars");
const menuLevel = document.getElementById("menuLevel");
const gameStars = document.getElementById("gameStars");
const gameLevel = document.getElementById("gameLevel");
const levelOrders = document.getElementById("levelOrders");
const progressFill = document.getElementById("progressFill");
const streakElement = document.getElementById("streak");
const ingredientsGrid = document.getElementById("ingredientsGrid");
const customerAvatar = document.getElementById("customerAvatar");
const customerName = document.getElementById("customerName");
const customerMessage = document.getElementById("customerMessage");
const orderTags = document.getElementById("orderTags");
const orderCakeMini = document.getElementById("orderCakeMini");
const cakePreview = document.getElementById("cakePreview");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

function defaultProgress() {
  return {
    stars: 0,
    completedOrders: 0,
    bestStreak: 0,
    soundEnabled: true,
    language: "ru",
    owned: ["wall-rose", "table-cream", "stand-white", "machine-pink"],
    decor: {
      wall: "rose",
      table: "cream",
      stand: "white",
      machine: "pink"
    },
    album: [],
    visits: {}
  };
}

function loadProgress() {
  try {
    const saved = localStorage.getItem("forYou.gameProgress");

    return saved
      ? { ...defaultProgress(), ...JSON.parse(saved) }
      : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

function saveProgress() {
  try {
    localStorage.setItem(
      "forYou.gameProgress",
      JSON.stringify(progress)
    );
  } catch {
    console.warn("Не удалось сохранить прогресс");
  }
}

function getLevel() {
  return Math.floor(progress.completedOrders / 5) + 1;
}

function completedInLevel() {
  return progress.completedOrders % 5;
}

function isCategoryUnlocked(category) {
  if (freeMode) return true;

  const level = getLevel();

  if (category === "cream") return level >= 2;
  if (category === "icing") return level >= 3;
  if (category === "topping") return level >= 4;
  if (category === "layers") return level >= 6;

  return true;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createOrder() {
  const level = getLevel();

  const order = {
    shape: randomItem(choices.shape).id,
    size: randomItem(choices.size).id,
    base: randomItem(choices.base).id,
    cream:
      level >= 2
        ? randomItem(choices.cream).id
        : "vanilla",
    icing:
      level >= 3
        ? randomItem(choices.icing).id
        : "pink",
    layers:
      level >= 6
        ? randomItem(choices.layers).id
        : 1,
    toppings: []
  };

  if (level >= 4) {
    order.toppings.push(
      randomItem(choices.topping.slice(0, 7)).id
    );
  }

  if (level >= 7 && Math.random() > .45) {
    const second =
      randomItem(
        choices.topping.slice(0, 7)
      ).id;

    if (!order.toppings.includes(second)) {
      order.toppings.push(second);
    }
  }

  if (
    level >= 8 &&
    Math.random() > .5 &&
    !order.toppings.includes("candles")
  ) {
    order.toppings.push("candles");
  }

  order.base =
    customers[currentCustomerIndex].favorite ||
    order.base;

  const events = [
    "День рождения",
    "Свадьба",
    "Праздник звёзд"
  ];

  if (
    level >= 4 &&
    (progress.completedOrders + 1) % 4 === 0
  ) {
    order.event =
      events[
        Math.floor(
          progress.completedOrders / 4
        ) % events.length
      ];

    order.toppings =
      order.event === "День рождения"
        ? ["candles"]
        : order.event === "Свадьба"
          ? ["hearts"]
          : ["stars"];

    if (
      level >= 6 &&
      order.event === "Свадьба"
    ) {
      order.layers = 3;
    }
  }

  return order;
}

function startGame(free = false) {
  freeMode = free === true;

  finishedCake = null;
  history = [];

  document.body.classList.toggle(
    "free-mode",
    freeMode
  );

  clearTimeout(resultTimer);

  orderServed = false;

  document.getElementById(
    "serveButton"
  ).disabled = false;

  menuScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  currentCustomerIndex =
    progress.completedOrders %
    customers.length;

  currentOrder =
    freeMode
      ? null
      : createOrder();

  customerMessage.textContent =
    "Я уже предвкушаю!";

  resetCustomerReaction();
  resetCake();
  renderGame();
}

function nextOrder() {
  history = [];
  finishedCake = null;
  orderServed = false;

  document.getElementById(
    "serveButton"
  ).disabled = false;

  playTone(740, .09, .025);

  closeModal();

  currentCustomerIndex =
    progress.completedOrders %
    customers.length;

  currentOrder =
    freeMode
      ? null
      : createOrder();

  customerMessage.textContent =
    "Я уже предвкушаю!";

  resetCustomerReaction();
  resetCake();
  renderGame();
}

function resetCake() {
  if (orderServed) return;

  currentCake = {
    ...defaultCake,
    toppings: []
  };

  history = [];
  currentCategory = "shape";

  updateTabs();
  renderIngredients();
  renderCake();
}

function renderIngredients() {
  const scrollLeft =
    ingredientsGrid.scrollLeft;

  const focusedId =
    document.activeElement?.dataset.ingredient;

  ingredientsGrid.innerHTML = "";

  choices[currentCategory].forEach(item => {
    const button =
      document.createElement("button");

    button.type = "button";
    button.dataset.ingredient = item.id;
    button.className = "ingredient-button";

    const selected =
      selectedIngredient(item.id);

    button.setAttribute(
      "aria-pressed",
      String(selected)
    );

    if (selected) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="ingredient-icon" style="--item-color:${item.color}">
        ${item.icon}
      </span>

      <span class="ingredient-label">
        ${item.name}
      </span>

      ${
        selected
          ? '<span class="ingredient-check">✓</span>'
          : ""
      }
    `;

    button.addEventListener(
      "click",
      () => selectIngredient(item.id)
    );

    ingredientsGrid.appendChild(button);
  });

  ingredientsGrid.scrollLeft =
    scrollLeft;

  if (focusedId) {
    ingredientsGrid
      .querySelector(
        `[data-ingredient="${focusedId}"]`
      )
      ?.focus({
        preventScroll: true
      });
  }
}

function selectedIngredient(id) {
  if (currentCategory === "topping") {
    return currentCake.toppings.includes(id);
  }

  if (currentCategory === "layers") {
    return currentCake.layers === id;
  }

  return currentCake[currentCategory] === id;
}

function selectIngredient(id) {
  if (
    orderServed ||
    !isCategoryUnlocked(currentCategory)
  ) {
    return;
  }

  rememberCake();

  playTone(
    {
      shape: 440,
      size: 480,
      base: 520,
      cream: 590,
      icing: 660,
      layers: 700,
      topping: 830
    }[currentCategory],
    .09,
    .025
  );

  if (currentCategory === "topping") {
    if (currentCake.toppings.includes(id)) {
      currentCake.toppings =
        currentCake.toppings.filter(
          item => item !== id
        );
    } else {
      currentCake.toppings.push(id);
    }
  } else {
    currentCake[currentCategory] = id;
  }

  renderIngredients();
  renderCake();
}

function updateTabs() {
  document
    .querySelectorAll(".category-tab")
    .forEach(tab => {
      const category =
        tab.dataset.category;

      const required =
        {
          cream: 2,
          icing: 3,
          topping: 4,
          layers: 6
        }[category] || 1;

      tab.dataset.level = required;

      tab.title =
        isCategoryUnlocked(category)
          ? tab.textContent.trim()
          : `Откроется на уровне ${required}`;

      tab.disabled =
        !isCategoryUnlocked(category);

      tab.setAttribute(
        "aria-pressed",
        String(
          category === currentCategory
        )
      );

      tab.classList.remove(
        "active",
        "locked"
      );

      if (category === currentCategory) {
        tab.classList.add("active");
      }

      if (!isCategoryUnlocked(category)) {
        tab.classList.add("locked");
      }
    });
}

// Общий SVG-торт для игры,
// заказа, альбома и сохранения.

function cakeSVG(cake, id) {
  const base =
    cakeColors[cake.base];

  const cream =
    creamColors[cake.cream];

  const icing =
    icingColors[cake.icing];

  const contours = {
    round:
      "M-110 0 A110 52 0 1 0 110 0 A110 52 0 1 0 -110 0Z",

    square:
      "M-103 -48 Q-110 -48 -110 -41 L-110 41 Q-110 48 -103 48 L103 48 Q110 48 110 41 L110 -41 Q110 -48 103 -48Z",

    heart:
      "M0 -24 C-38 -76 -110 -59 -110 -12 C-110 20 -58 44 0 72 C58 44 110 20 110 -12 C110 -59 38 -76 0 -24Z"
  };

  const path =
    contours[cake.shape] ||
    contours.round;

  const size =
    {
      small: .75,
      medium: .9,
      large: 1.04
    }[cake.size] || .9;

  let svg = `
    <svg
      class="cake-art"
      viewBox="0 0 360 330"
      role="img"
      aria-label="${getChoiceName(
        "shape",
        cake.shape
      )} торт, ${getChoiceName(
        "size",
        cake.size
      )}, этажей: ${cake.layers}"
    >

      <defs>

        <linearGradient id="${id}-body">
          <stop stop-color="${base}"/>
          <stop offset=".32" stop-color="${base}"/>
          <stop offset="1" stop-color="${base}"/>
        </linearGradient>

        <linearGradient id="${id}-shade">
          <stop stop-color="#fff" stop-opacity=".24"/>
          <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
          <stop offset="1" stop-color="#492321" stop-opacity=".23"/>
        </linearGradient>

        <linearGradient
          id="${id}-glaze"
          x2="25%"
          y2="100%"
        >
          <stop stop-color="#fff" stop-opacity=".5"/>
          <stop offset=".6" stop-color="#fff" stop-opacity="0"/>
          <stop offset="1" stop-color="#71334b" stop-opacity=".1"/>
        </linearGradient>

      </defs>

      <ellipse
        cx="180"
        cy="307"
        rx="128"
        ry="13"
        fill="#81575a"
        opacity=".1"
      />

      <ellipse
        cx="180"
        cy="242"
        rx="145"
        ry="65"
        fill="#decfcd"
      />

      <ellipse
        cx="180"
        cy="235"
        rx="145"
        ry="65"
        fill="#fffdf9"
        stroke="#f2e6df"
        stroke-width="2"
      />

      <ellipse
        cx="180"
        cy="235"
        rx="133"
        ry="56"
        fill="none"
        stroke="#e5ccc4"
      />

      <g
        transform="
          translate(180 276)
          scale(${size})
          translate(0 -276)
        "
      >
  `;

  for (
    let tier = 0;
    tier < cake.layers;
    tier++
  ) {
    const scale =
      Math.pow(.74, tier);

    const y =
      {
        round: 180,
        square: 184,
        heart: 160
      }[cake.shape] -
      tier * 59;

    svg += `
      <g
        class="cake-tier"
        data-tier="${tier + 1}"
        transform="
          translate(0 ${y})
          scale(${scale})
        "
      >
    `;

    for (
      let depth = 48;
      depth >= 0;
      depth -= 2
    ) {
      const fill =
        depth >= 22 &&
        depth <= 30
          ? cream
          : `url(#${id}-body)`;

      svg += `
        <path
          d="${path}"
          transform="translate(0 ${depth})"
          fill="${fill}"
        />
      `;
    }

    svg += `
      <path
        d="${path}"
        transform="translate(0 48)"
        fill="url(#${id}-shade)"
      />
    `;

    const frontY = x =>
      cake.shape === "round"
        ? 52 *
          Math.sqrt(
            1 - (x / 110) ** 2
          )
        : cake.shape === "square"
          ? 48
          : 72 - Math.abs(x) * .53;

    [-87, -56, -20, 23, 61, 91]
      .forEach((x, i) => {
        svg += `
          <path
            d="M${x} ${
              frontY(x) - 3
            } v${
              [13,22,10,19,14,9][i]
            }"
            stroke="${icing}"
            stroke-width="11"
            stroke-linecap="round"
          />
        `;
      });

    svg += `
      <path
        d="${path}"
        fill="${icing}"
        stroke="${icing}"
        stroke-width="2"
      />

      <path
        d="${path}"
        fill="url(#${id}-glaze)"
      />

      <path
        d="${path}"
        transform="scale(.94 .88)"
        fill="none"
        stroke="#fff"
        stroke-opacity=".28"
        stroke-width="2"
      />
    `;

    for (
      let x = -90;
      x <= 90;
      x += 18
    ) {
      svg += `
        <ellipse
          cx="${x}"
          cy="${frontY(x) + 39}"
          rx="5.5"
          ry="4"
          fill="${cream}"
        />

        <ellipse
          cx="${x - 1}"
          cy="${frontY(x) + 37.5}"
          rx="2"
          ry="1"
          fill="#fff"
          opacity=".6"
        />
      `;
    }

    if (
      tier === cake.layers - 1
    ) {
      const slots = [
        [-53,-18],
        [53,-18],
        [0,23],
        [-72,8],
        [72,8],
        [-30,6],
        [30,6],
        [-32,33],
        [32,33]
      ];

      const toppings =
        cake.toppings.length === 1 &&
        ![
          "crown",
          "candles"
        ].includes(
          cake.toppings[0]
        )
          ? Array(3).fill(
              cake.toppings[0]
            )
          : cake.toppings;

      toppings.forEach(
        (topping, index) => {
          const [x, y] =
            toppings.length === 1
              ? [0,17]
              : slots[
                  index %
                  slots.length
                ];

          svg += `
            <g
              transform="
                translate(${x} ${y})
              "
            >
              <g class="cake-decoration">
                ${toppingSVG(topping)}
              </g>
            </g>
          `;
        }
      );
    }

    svg += "</g>";
  }

  const text =
    escapeText(
      (
        cake.inscription ||
        ""
      ).slice(0,24)
    );

  svg += "</g>";

  if (text) {
    const y =
      276 +
      (
        (
          {
            round: 180,
            square: 184,
            heart: 160
          }[cake.shape] -
          (cake.layers - 1) * 59
        ) -
        276
      ) *
      size;

    svg += `
      <text
        class="cake-inscription"
        x="180"
        y="${y}"
        text-anchor="middle"
        font-family="sans-serif"
        font-size="${
          cake.layers > 1
            ? 9
            : 12
        }"
        font-weight="bold"
        fill="#70344d"
        stroke="#fff5eb"
        stroke-width=".5"
        paint-order="stroke"
      >${text}</text>
    `;
  }

  return svg + "</svg>";
}

function toppingSVG(type) {
  const shadow = `
    <ellipse
      cy="5"
      rx="12"
      ry="4"
      fill="#663145"
      opacity=".14"
    />
  `;

  const art = {
    strawberry: `
      <path
        d="
          M-12 -13
          Q0 -22 12 -13
          Q14 -1 0 8
          Q-14 -1 -12 -13
        "
        fill="#e54f70"
        stroke="#bf3657"
      />

      <path
        d="
          M0 -14
          L-10 -20
          L-3 -20
          L0 -25
          L4 -19
          L11 -20Z
        "
        fill="#69a67b"
      />

      <path
        d="
          M-6 -10 l1 2
          M3 -11 l1 2
          M-2 -3 l1 2
          M7 -5 l1 2
        "
        stroke="#ffe3a2"
        stroke-width="2"
        stroke-linecap="round"
      />
    `,

    cherry: `
      <path
        d="
          M-7 -5
          Q-10 -22 6 -26
          Q1 -10 7 -3
        "
        fill="none"
        stroke="#71936a"
        stroke-width="2"
      />

      <circle
        cx="-7"
        cy="0"
        r="8"
        fill="#c73358"
      />

      <circle
        cx="7"
        cy="2"
        r="8"
        fill="#e04a67"
      />

      <path
        d="
          M-10 -4 l3 -1
          M4 -2 l3 -1
        "
        stroke="#ffa6b3"
        stroke-width="2"
        stroke-linecap="round"
      />
    `,

    blueberry: `
      <circle
        cx="-7"
        cy="0"
        r="8"
        fill="#535d94"
      />

      <circle
        cx="7"
        cy="0"
        r="8"
        fill="#6b74a9"
      />

      <circle
        cy="-10"
        r="8"
        fill="#7b83b8"
      />

      <path
        d="
          M-3 -12 l3 3 3 -3
          M-10 -2 l3 3 3 -3
          M4 -2 l3 3 3 -3
        "
        stroke="#b5b9db"
        fill="none"
      />
    `,

    chocolate: `
      <g transform="rotate(-14)">

        <rect
          x="-12"
          y="-23"
          width="24"
          height="31"
          rx="3"
          fill="#623e36"
          stroke="#432a28"
        />

        <path
          d="
            M-10 -13 h20
            M-10 -3 h20
            M0 -21 v27
          "
          stroke="#b78061"
          stroke-width="2"
        />

      </g>
    `,

    candy: `
      <path
        d="
          M-7 -8
          L-18 -17
          V2
          L-7 -3

          M7 -8
          L18 -17
          V2
          L7 -3
        "
        fill="#a8cfc1"
      />

      <circle
        cy="-7"
        r="10"
        fill="#e991b7"
      />

      <path
        d="
          M-5 -14
          Q7 -9 -4 -1
        "
        fill="none"
        stroke="#fff0e9"
        stroke-width="4"
      />
    `,

    hearts: `
      <path
        d="
          M0 5
          C-29 -13 -8 -29 0 -15
          C8 -29 29 -13 0 5
        "
        fill="#e95a81"
        stroke="#bf446c"
      />

      <path
        d="
          M-9 -16
          Q-6 -20 -3 -16
        "
        fill="none"
        stroke="#ffb9ca"
        stroke-width="2"
      />
    `,

    stars: `
      <path
        d="
          M0 -25
          L5 -14
          L17 -13
          L8 -5
          L11 7
          L0 1
          L-11 7
          L-8 -5
          L-17 -13
          L-5 -14Z
        "
        fill="#f5c760"
        stroke="#d9a546"
        stroke-width="2"
      />
    `,

    crown: `
      <path
        d="
          M-18 -20
          L-10 -10
          L0 -27
          L10 -10
          L18 -20
          L14 5
          H-14Z
        "
        fill="#f3c764"
        stroke="#ce9e44"
        stroke-width="2"
      />

      <path
        d="M-12 -1 H12"
        stroke="#ffeabd"
        stroke-width="3"
      />

      <circle
        cy="-7"
        r="3"
        fill="#e8789a"
      />
    `,

    candles: `
      <rect
        x="-4"
        y="-25"
        width="8"
        height="31"
        rx="2"
        fill="#97cab9"
      />

      <path
        d="
          M-3 -18 l6 -4
          M-3 -7 l6 -4
          M-3 4 l6 -4
        "
        stroke="#fff5e9"
        stroke-width="3"
      />

      <path
        class="candle-flame"
        d="
          M0 -28
          C-12 -33 0 -45 0 -45
          C1 -38 10 -32 0 -28
        "
        fill="#ffc45f"
      />
    `
  };

  return shadow + (art[type] || "");
}

function renderCake() {
  cakePreview.innerHTML =
    cakeSVG(
      currentCake,
      "player"
    );

  updateOrderChecklist();
  updateWorkshop();
}

function updateOrderChecklist() {
  if (!currentOrder) return;

  orderTags
    .querySelectorAll(
      "[data-category]"
    )
    .forEach(tag => {
      const category =
        tag.dataset.category;

      const matches =
        category === "topping"
          ? currentCake
              .toppings
              .includes(
                tag.dataset.value
              )
          : String(
              currentCake[
                category
              ]
            ) ===
            tag.dataset.value;

      tag.classList.toggle(
        "matched",
        matches
      );

      tag.setAttribute(
        "aria-label",
        tag.textContent +
          (
            matches
              ? ": готово"
              : ": нужно выбрать"
          )
      );
    });

  orderTags
    .querySelectorAll(".extra")
    .forEach(tag => tag.remove());

  currentCake.toppings
    .filter(
      value =>
        !currentOrder
          .toppings
          .includes(value)
    )
    .forEach(value => {
      const tag =
        document.createElement(
          "span"
        );

      tag.className = "extra";

      tag.textContent =
        "Лишнее: " +
        getChoiceName(
          "topping",
          value
        );

      orderTags.appendChild(tag);
    });
}

function renderOrder() {
  if (freeMode) {
    customerAvatar.textContent = "🎨";

    customerName.textContent =
      "Твоя мастерская";

    customerMessage.textContent =
      "Все ингредиенты открыты. Создавай без ограничений!";

    orderTags.innerHTML =
      "<span>Свободный режим · без наград и ошибок</span>";

    orderCakeMini.innerHTML = "";

    return;
  }

  const customer =
    customers[currentCustomerIndex];

  customerAvatar.textContent =
    customer.avatar;

  customerName.textContent =
    customer.name;

  customerMessage.textContent =
    (
      progress.visits[
        customer.name
      ]
        ? "Снова к тебе! "
        : ""
    ) +
    customer.line;

  if (currentOrder.event) {
    customerMessage.textContent =
      "🎁 " +
      currentOrder.event +
      " · бонус +20 ⭐";
  }

  orderTags.innerHTML = "";

  const fields = [
    "shape",
    "size",
    "base"
  ];

  if (getLevel() >= 2) {
    fields.push("cream");
  }

  if (getLevel() >= 3) {
    fields.push("icing");
  }

  if (getLevel() >= 6) {
    fields.push("layers");
  }

  const labels = {
    shape: "Форма",
    size: "Размер",
    base: "Корж",
    cream: "Крем",
    icing: "Глазурь",
    layers: "Этажи"
  };

  const tags =
    fields.map(category => ({
      category,
      value:
        currentOrder[category],
      text:
        `${labels[category]}: ${
          getChoiceName(
            category,
            currentOrder[
              category
            ]
          )
        }`
    }));

  currentOrder.toppings.forEach(
    value => {
      tags.push({
        category: "topping",
        value,
        text:
          getChoiceName(
            "topping",
            value
          )
      });
    }
  );

  tags.forEach(
    ({
      category,
      value,
      text
    }) => {
      const tag =
        document.createElement(
          "span"
        );

      tag.dataset.category =
        category;

      tag.dataset.value =
        value;

      tag.textContent =
        text;

      orderTags.appendChild(tag);
    }
  );

  updateOrderChecklist();
  renderMiniOrderCake();
}

function getChoiceName(category, id) {
  return (
    choices[category]
      ?.find(
        option =>
          option.id === id
      )
      ?.name ||
    id
  );
}

function renderMiniOrderCake() {
  orderCakeMini.innerHTML =
    cakeSVG(
      currentOrder,
      "order"
    );
}

function renderGameInfo() {
  menuStars.textContent =
    progress.stars;

  menuLevel.textContent =
    getLevel();

  gameStars.textContent =
    progress.stars;

  gameLevel.textContent =
    getLevel();

  levelOrders.textContent =
    completedInLevel();

  streakElement.textContent =
    streak;

  progressFill.style.width =
    `${
      completedInLevel() * 20
    }%`;
}

function renderGame() {
  renderGameInfo();
  renderOrder();
  renderCake();
  updateTabs();
  renderIngredients();
}

function countErrors() {
  if (
    freeMode ||
    !currentOrder
  ) {
    return 0;
  }

  let errors = 0;

  if (
    currentCake.shape !==
    currentOrder.shape
  ) {
    errors++;
  }

  if (
    currentCake.size !==
    currentOrder.size
  ) {
    errors++;
  }

  if (
    currentCake.base !==
    currentOrder.base
  ) {
    errors++;
  }

  if (
    getLevel() >= 2 &&
    currentCake.cream !==
    currentOrder.cream
  ) {
    errors++;
  }

  if (
    getLevel() >= 3 &&
    currentCake.icing !==
    currentOrder.icing
  ) {
    errors++;
  }

  if (
    getLevel() >= 6 &&
    currentCake.layers !==
    currentOrder.layers
  ) {
    errors++;
  }

  if (getLevel() >= 4) {
    if (
      [...currentCake.toppings]
        .sort()
        .join(",") !==
      [...currentOrder.toppings]
        .sort()
        .join(",")
    ) {
      errors++;
    }
  }

  return errors;
}

function serveCake() {
  if (freeMode) {
    showCreation();
    return;
  }

  if (
    !currentOrder ||
    orderServed
  ) {
    return;
  }

  const errors =
    countErrors();

  resetCustomerReaction();

  if (errors > 0) {
    playTone(
      220,
      .16,
      .025
    );

    streak = 0;

    customerMessage.textContent =
      errors === 1
        ? "Почти! Один элемент не совпадает."
        : `Почти! Ошибок: ${errors}`;

    customerAvatar
      .classList
      .add("sad");

    cakePreview
      .classList
      .add("shake");

    setTimeout(
      () =>
        cakePreview
          .classList
          .remove("shake"),
      450
    );

    renderGameInfo();

    return;
  }

  orderServed = true;

  updateWorkshop();

  document
    .getElementById(
      "serveButton"
    )
    .disabled = true;

  let reward = 25;

  const level =
    getLevel();

  if (level >= 4) {
    reward = 35;
  }

  if (level >= 7) {
    reward = 50;
  }

  streak++;

  if (streak % 3 === 0) {
    reward += 15;
  }

  if (currentOrder.event) {
    reward += 20;
  }

  finishedCake =
    cloneCake(currentCake);

  const name =
    customers[
      currentCustomerIndex
    ].name;

  progress.visits[name] =
    (
      progress.visits[name] ||
      0
    ) + 1;

  addToAlbum(
    finishedCake,
    currentOrder.event ||
    name,
    false
  );

  progress.stars += reward;
  progress.completedOrders++;

  if (
    streak >
    progress.bestStreak
  ) {
    progress.bestStreak =
      streak;
  }

  saveProgress();

  customerMessage.textContent =
    "Идеально! Именно такой торт я хотел!";

  customerAvatar
    .classList
    .add("happy");

  launchConfetti();
  playSuccessSound();
  renderGameInfo();

  resultTimer =
    setTimeout(
      () =>
        showResultModal(
          reward
        ),
      500
    );
}

function resetCustomerReaction() {
  customerAvatar
    .classList
    .remove(
      "happy",
      "sad"
    );
}

function launchConfetti() {
  if (
    matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    return;
  }

  const colors = [
    "#f17f9b",
    "#9bcbb8",
    "#f1c76b",
    "#ac8bd4",
    "#82c4e5",
    "#f0a2b2"
  ];

  for (
    let i = 0;
    i < 55;
    i++
  ) {
    const piece =
      document.createElement(
        "span"
      );

    piece.className =
      "confetti-piece";

    piece.style.left =
      `${
        Math.random() * 100
      }%`;

    piece.style.background =
      randomItem(colors);

    piece.style.setProperty(
      "--fall-time",
      `${
        2.2 +
        Math.random() * 2
      }s`
    );

    piece.style.animationDelay =
      `${
        Math.random() * .45
      }s`;

    piece.style.transform =
      `rotate(${
        Math.random() * 360
      }deg)`;

    document.body
      .appendChild(piece);

    setTimeout(
      () => piece.remove(),
      4500
    );
  }
}

function showResultModal(reward) {
  openModal(`
    <h2>Безупречно!</h2>

    <p>
      ${
        escapeText(
          customers[
            currentCustomerIndex
          ].thanks
        )
      }
    </p>

    <div class="result-stars">
      ⭐ +${reward}
    </div>

    <div
      id="resultCake"
      class="result-cake"
    >
      ${
        cakeSVG(
          finishedCake ||
          currentCake,
          "result"
        )
      }
    </div>

    <div class="secondary-row">

      <button
        id="sliceButton"
        class="secondary-button"
      >
        🍰 Разрезать
      </button>

      <button
        id="blowButton"
        class="secondary-button"
        ${
          currentCake
            .toppings
            .includes(
              "candles"
            )
            ? ""
            : "disabled"
        }
      >
        🕯 Задуть
      </button>

    </div>

    <p>
      Торт сохранён
      в альбоме ♡
    </p>

    <button
      id="nextOrderButton"
      class="
        primary-button
        modal-action
      "
    >
      Следующий заказ
    </button>
  `);

  document
    .getElementById(
      "nextOrderButton"
    )
    .addEventListener(
      "click",
      nextOrder
    );

  bindCakeActions(
    finishedCake ||
    currentCake
  );
}

function openModal(html) {
  if (
    modal
      .classList
      .contains("hidden")
  ) {
    modalTrigger =
      document.activeElement;
  }

  modalContent.innerHTML =
    html;

  modal.classList.remove(
    "hidden"
  );

  modalContent
    .querySelector("button")
    ?.focus({
      preventScroll: true
    });
}

function closeModal() {
  if (
    orderServed &&
    document.getElementById(
      "nextOrderButton"
    )
  ) {
    orderServed = false;
    nextOrder();
    return;
  }

  modal.classList.add(
    "hidden"
  );

  if (
    modalTrigger
      ?.isConnected &&
    !modalTrigger.disabled
  ) {
    modalTrigger.focus({
      preventScroll: true
    });
  }
}

function showHowToPlay() {
  openModal(`
    <div class="modal-icon">
      🧁
    </div>

    <h2>
      Как играть
    </h2>

    <div class="how-step">
      <div class="how-number">
        1
      </div>
      <div>
        Посмотри на заказ клиента.
      </div>
    </div>

    <div class="how-step">
      <div class="how-number">
        2
      </div>
      <div>
        Выбери нужную форму,
        размер и ингредиенты.
      </div>
    </div>

    <div class="how-step">
      <div class="how-number">
        3
      </div>
      <div>
        Подай торт и получи звёзды.
      </div>
    </div>

    <button
      id="howCloseButton"
      class="
        primary-button
        modal-action
      "
      type="button"
    >
      Понятно
    </button>
  `);

  document
    .getElementById(
      "howCloseButton"
    )
    .addEventListener(
      "click",
      closeModal
    );
}

function showSettings() {
  if (orderServed) return;

  openModal(`
    <div class="modal-icon">
      ⚙
    </div>

    <h2>
      Настройки
    </h2>

    <div class="setting-row">

      <span>
        🔊 Звуки
      </span>

      <button
        id="modalSoundToggle"
        class="
          toggle-button
          ${
            progress.soundEnabled
              ? "on"
              : ""
          }
        "
        type="button"
      >
        ${
          progress.soundEnabled
            ? "ON"
            : "OFF"
        }
      </button>

    </div>

    <div class="setting-row">

      <span>
        🌐 Язык
      </span>

      <div class="language-buttons">

        <button
          class="active"
          type="button"
        >
          RU
        </button>

        <button
          disabled
          type="button"
        >
          EN
        </button>

      </div>

    </div>

    <button
      id="resetProgressButton"
      class="
        secondary-button
        modal-action
      "
      type="button"
    >
      Сбросить прогресс
    </button>
  `);

  document
    .getElementById(
      "modalSoundToggle"
    )
    .addEventListener(
      "click",
      () => {
        progress.soundEnabled =
          !progress.soundEnabled;

        saveProgress();
        updateSoundIcon();
        showSettings();
      }
    );

  document
    .getElementById(
      "resetProgressButton"
    )
    .addEventListener(
      "click",
      resetProgress
    );
}

function playClickSound() {
  if (
    progress.soundEnabled
  ) {
    playTone(
      520,
      .06,
      .025
    );
  }
}

function playSuccessSound() {
  if (
    !progress.soundEnabled
  ) {
    return;
  }

  playTone(
    660,
    .08,
    .035
  );

  setTimeout(
    () =>
      playTone(
        880,
        .11,
        .035
      ),
    90
  );
}

function playTone(
  frequency,
  duration,
  volume
) {
  if (
    !progress.soundEnabled
  ) {
    return;
  }

  try {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    if (
      !audioContext ||
      audioContext.state ===
        "closed"
    ) {
      audioContext =
        new AudioContextClass();
    }

    const context =
      audioContext;

    const play = () => {
      if (
        !progress.soundEnabled ||
        context.state !==
          "running"
      ) {
        return;
      }

      const oscillator =
        context.createOscillator();

      const gain =
        context.createGain();

      const now =
        context.currentTime;

      oscillator.type =
        "sine";

      oscillator
        .frequency
        .setValueAtTime(
          frequency,
          now
        );

      gain
        .gain
        .setValueAtTime(
          0,
          now
        );

      gain
        .gain
        .linearRampToValueAtTime(
          volume,
          now + .012
        );

      gain
        .gain
        .exponentialRampToValueAtTime(
          .001,
          now + duration
        );

      oscillator.connect(
        gain
      );

      gain.connect(
        context.destination
      );

      oscillator.start(now);

      oscillator.stop(
        now +
        duration +
        .02
      );

      oscillator.onended =
        () => {
          oscillator.disconnect();
          gain.disconnect();
        };
    };

    if (
      context.state ===
      "suspended"
    ) {
      context
        .resume()
        .then(play)
        .catch(() => {});
    } else {
      play();
    }
  } catch {}
}

function updateSoundIcon() {
  document
    .getElementById(
      "soundButton"
    )
    .textContent =
      progress.soundEnabled
        ? "🔊"
        : "🔇";
}

function resetProgress() {
  if (
    !confirm(
      "Сбросить весь прогресс?"
    )
  ) {
    return;
  }

  progress =
    defaultProgress();

  streak = 0;

  saveProgress();

  orderServed = false;

  clearTimeout(
    resultTimer
  );

  closeModal();
  updateSoundIcon();
  applyDecor();

  if (
    !gameScreen
      .classList
      .contains("hidden")
  ) {
    startGame(
      freeMode
    );
  }

  renderGameInfo();
}

function goToMenu() {
  clearTimeout(
    resultTimer
  );

  orderServed = false;

  closeModal();

  gameScreen
    .classList
    .add("hidden");

  menuScreen
    .classList
    .remove("hidden");

  renderGameInfo();
}

// =======================================
// МАСТЕРСКАЯ
// =======================================

function escapeText(value) {
  return String(value)
    .replace(
      /[&<>"']/g,
      ch =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        }[ch])
    );
}

function cloneCake(cake) {
  return JSON.parse(
    JSON.stringify(cake)
  );
}

function rememberCake() {
  if (orderServed) return;

  history.push(
    cloneCake(
      currentCake
    )
  );

  if (
    history.length > 30
  ) {
    history.shift();
  }
}

function undoCake() {
  if (
    !history.length ||
    orderServed
  ) {
    return;
  }

  currentCake =
    history.pop();

  renderCake();
  renderIngredients();
  playClickSound();
}

function updateWorkshop() {
  const undo =
    document.getElementById(
      "undoButton"
    );

  if (!undo) return;

  document
    .getElementById(
      "unlockMessage"
    )
    .textContent =
      freeMode
        ? "✦ Все ингредиенты открыты · экспериментируй!"
        : "✦ Новые ингредиенты открываются с уровнями!";

  document
    .querySelector(
      ".customer-panel > .panel-title"
    )
    .textContent =
      freeMode
        ? "● Свободная мастерская"
        : "● Заказ клиента";

  undo.disabled =
    !history.length ||
    orderServed;

  document
    .getElementById(
      "writeButton"
    )
    .disabled =
      orderServed;

  document
    .getElementById(
      "serveButton"
    )
    .textContent =
      freeMode
        ? "♡ Готово! Сохранить торт"
        : "♡ Подать торт ♡";
}

function showInscription() {
  if (orderServed) return;

  renderCake();

  openModal(`
    <h2>
      Надпись на торте
    </h2>

    <p>
      До 24 символов.
      Надпись не влияет
      на заказ.
    </p>

    <label for="cakeText">
      Текст
    </label>

    <input
      id="cakeText"
      maxlength="24"
      placeholder="С днём рождения!"
      value="${
        escapeText(
          currentCake
            .inscription ||
          ""
        )
      }"
    >

    <div class="preset-row">

      <button
        data-text="С днём рождения!"
      >
        С днём рождения!
      </button>

      <button
        data-text="Для тебя ♡"
      >
        Для тебя ♡
      </button>

      <button
        data-text=""
      >
        Без надписи
      </button>

    </div>

    <button
      id="applyText"
      class="
        primary-button
        modal-action
      "
    >
      Написать кремом
    </button>
  `);

  modalContent
    .querySelectorAll(
      "[data-text]"
    )
    .forEach(button => {
      button.onclick =
        () =>
          document
            .getElementById(
              "cakeText"
            )
            .value =
              button.dataset.text;
    });

  document
    .getElementById(
      "applyText"
    )
    .onclick = () => {
      rememberCake();

      currentCake.inscription =
        document
          .getElementById(
            "cakeText"
          )
          .value
          .trim()
          .slice(0,24);

      closeModal();
      renderCake();

      const text =
        cakePreview
          .querySelector(
            ".cake-inscription"
          );

      if (
        !text ||
        matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }

      const full =
        text.textContent;

      text.textContent = "";

      let index = 0;

      clearInterval(
        writingTimer
      );

      const svg =
        cakePreview
          .querySelector(
            ".cake-art"
          );

      const bag =
        document
          .createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
          );

      bag.innerHTML = `
        <path
          d="
            M0 0
            L-12 -24
            Q-8 -34 6 -28
            L16 -12Z
          "
          fill="#fff4de"
          stroke="#d794a8"
        />

        <path
          d="
            M0 0
            L-3 7
            L5 2Z
          "
          fill="#b9b1b5"
        />
      `;

      svg.append(bag);

      writingTimer =
        setInterval(
          () => {
            if (
              !text.isConnected ||
              index >=
                full.length
            ) {
              clearInterval(
                writingTimer
              );

              bag.remove();

              return;
            }

            text.textContent =
              full.slice(
                0,
                ++index
              );

            const box =
              text.getBBox();

            bag.setAttribute(
              "transform",
              `translate(${
                box.x +
                box.width
              } ${
                text.getAttribute(
                  "y"
                ) - 3
              })`
            );
          },
          65
        );

      playTone(
        590,
        .12,
        .02
      );
    };
}

function addToAlbum(
  cake,
  title,
  persist = true
) {
  progress.album.unshift({
    cake:
      cloneCake(cake),
    title,
    date:
      new Date()
        .toLocaleDateString(
          "ru-RU"
        )
  });

  progress.album =
    progress.album
      .slice(0,24);

  if (persist) {
    saveProgress();
  }
}

function showCreation() {
  renderCake();

  const cake =
    cloneCake(
      currentCake
    );

  openModal(`
    <h2>
      Твой шедевр
    </h2>

    <div
      id="resultCake"
      class="result-cake"
    >
      ${
        cakeSVG(
          cake,
          "creation"
        )
      }
    </div>

    <div class="secondary-row">

      <button
        id="sliceButton"
        class="secondary-button"
      >
        🍰 Разрезать
      </button>

      <button
        id="blowButton"
        class="secondary-button"
        ${
          cake.toppings
            .includes(
              "candles"
            )
            ? ""
            : "disabled"
        }
      >
        🕯 Задуть
      </button>

    </div>

    <button
      id="saveCreation"
      class="
        primary-button
        modal-action
      "
    >
      В альбом
    </button>

    <button
      id="downloadCake"
      class="
        secondary-button
        modal-action
      "
    >
      Скачать PNG
    </button>

    <p>
      В свободном режиме
      звёзды и уровни
      не меняются.
    </p>
  `);

  document
    .getElementById(
      "saveCreation"
    )
    .onclick =
      event => {
        addToAlbum(
          cake,
          "Мой шедевр"
        );

        event
          .currentTarget
          .disabled = true;

        event
          .currentTarget
          .textContent =
            "Сохранено ✓";
      };

  document
    .getElementById(
      "downloadCake"
    )
    .onclick =
      () =>
        downloadCake(cake);

  bindCakeActions(cake);
}

function sliceSVG(cake) {
  let out = `
    <svg
      class="cake-slice"
      viewBox="0 0 210 170"
      role="img"
      aria-label="
        Кусочек торта:
        видны коржи и крем
      "
    >

      <ellipse
        cx="105"
        cy="152"
        rx="94"
        ry="13"
        fill="#eadbd5"
      />
  `;

  for (
    let i = 0;
    i < cake.layers;
    i++
  ) {
    const y =
      120 -
      i * 34;

    const scale =
      1 -
      i * .14;

    out += `
      <g
        transform="
          translate(105 ${y})
          scale(${scale})
        "
      >

        <path
          d="
            M-75 -20
            L30 8
            L82 -17
            V9
            L30 35
            L-75 7Z
          "
          fill="${
            cakeColors[
              cake.base
            ]
          }"
        />

        <path
          d="
            M-75 -7
            L30 21
            L82 -4
            V4
            L30 29
            L-75 1Z
          "
          fill="${
            creamColors[
              cake.cream
            ]
          }"
        />

        <path
          d="
            M-75 -20
            L-14 -44
            L82 -17
            L30 8Z
          "
          fill="${
            icingColors[
              cake.icing
            ]
          }"
          stroke="#ffffff77"
        />

        <path
          d="
            M30 8
            V35
            L82 9
            V-17Z
          "
          fill="#542939"
          opacity=".12"
        />

      </g>
    `;
  }

  return out + "</svg>";
}

function bindCakeActions(cake) {
  document
    .getElementById(
      "sliceButton"
    )
    .onclick =
      event => {
        event
          .currentTarget
          .disabled = true;

        const target =
          document
            .getElementById(
              "resultCake"
            );

        target.classList.add(
          "sliced"
        );

        const art =
          target.querySelector(
            ".cake-art"
          );

        const defs =
          document
            .createElementNS(
              "http://www.w3.org/2000/svg",
              "defs"
            );

        defs.innerHTML = `
          <mask
            id="slice-cut"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="360"
            height="330"
          >
            <rect
              width="360"
              height="330"
              fill="white"
            />

            <path
              d="
                M180 50
                L180 302
                L325 242Z
              "
              fill="black"
            />
          </mask>
        `;

        art.prepend(defs);

        const body =
          art.querySelector(
            ":scope > g"
          );

        const wrap =
          document
            .createElementNS(
              "http://www.w3.org/2000/svg",
              "g"
            );

        wrap.setAttribute(
          "mask",
          "url(#slice-cut)"
        );

        if (body) {
          body.before(wrap);
          wrap.append(body);
        }

        target.insertAdjacentHTML(
          "beforeend",
          sliceSVG(cake)
        );

        playTone(
          330,
          .14,
          .02
        );
      };

  document
    .getElementById(
      "blowButton"
    )
    .onclick =
      event => {
        event
          .currentTarget
          .disabled = true;

        event
          .currentTarget
          .textContent =
            "Желание загадано ♡";

        document
          .querySelectorAll(
            "#resultCake .candle-flame"
          )
          .forEach(
            (flame, i) => {
              flame.style.animation =
                "none";

              flame.classList.add(
                "extinguish"
              );

              flame.style.animationDelay =
                `${i * .13}s`;

              const smoke =
                document
                  .createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                  );

              smoke.setAttribute(
                "d",
                "M0 -30 Q-9 -39 0 -46 Q8 -52 0 -59"
              );

              smoke.setAttribute(
                "class",
                "candle-smoke"
              );

              flame.after(smoke);
            }
          );

        playTone(
          160,
          .25,
          .018
        );

        launchConfetti();
      };
}

function showAlbum() {
  openModal(`
    <h2>
      Альбом тортов
    </h2>

    <p>
      Последние 24 работы ·
      ${progress.album.length}/24
    </p>

    <div class="album-grid">

      ${
        progress.album
          .map(
            (entry,i) => `
              <button
                class="album-item"
                data-album="${i}"
              >

                ${
                  cakeSVG(
                    entry.cake,
                    "album-" + i
                  )
                }

                <b>
                  ${
                    escapeText(
                      entry.title
                    )
                  }
                </b>

                <small>
                  ${
                    escapeText(
                      entry.date
                    )
                  }
                </small>

              </button>
            `
          )
          .join("") ||
        `
          <p>
            Выполни заказ
            или сохрани торт
            из свободного режима.
          </p>
        `
      }

    </div>
  `);

  modalContent
    .querySelectorAll(
      "[data-album]"
    )
    .forEach(button => {
      button.onclick =
        () => {
          const entry =
            progress.album[
              Number(
                button.dataset.album
              )
            ];

          openModal(`
            <h2>
              ${
                escapeText(
                  entry.title
                )
              }
            </h2>

            <div
              id="resultCake"
              class="result-cake"
            >
              ${
                cakeSVG(
                  entry.cake,
                  "view"
                )
              }
            </div>

            <button
              id="downloadCake"
              class="
                primary-button
                modal-action
              "
            >
              Скачать PNG
            </button>

            <button
              id="albumBack"
              class="
                secondary-button
                modal-action
              "
            >
              Назад в альбом
            </button>
          `);

          document
            .getElementById(
              "downloadCake"
            )
            .onclick =
              () =>
                downloadCake(
                  entry.cake
                );

          document
            .getElementById(
              "albumBack"
            )
            .onclick =
              showAlbum;
        };
    });
}

async function downloadCake(cake) {
  const button =
    document.getElementById(
      "downloadCake"
    );

  if (button) {
    button.disabled = true;
  }

  try {
    const source =
      cakeSVG(
        cake,
        "export"
      ).replace(
        "<svg ",
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          width="720"
          height="660"
        `
      );

    const url =
      URL.createObjectURL(
        new Blob(
          [source],
          {
            type:
              "image/svg+xml;charset=utf-8"
          }
        )
      );

    const image =
      new Image();

    try {
      await new Promise(
        (
          resolve,
          reject
        ) => {
          image.onload =
            resolve;

          image.onerror =
            reject;

          image.src =
            url;
        }
      );
    } finally {
      URL.revokeObjectURL(
        url
      );
    }

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width = 720;
    canvas.height = 740;

    const ctx =
      canvas.getContext(
        "2d"
      );

    ctx.fillStyle =
      "#fff6f0";

    ctx.fillRect(
      0,
      0,
      720,
      740
    );

    ctx.drawImage(
      image,
      0,
      10,
      720,
      660
    );

    ctx.fillStyle =
      "#b56a84";

    ctx.font =
      "bold 28px sans-serif";

    ctx.textAlign =
      "center";

    ctx.fillText(
      "For You · создано с любовью",
      360,
      705
    );

    const blob =
      await new Promise(
        resolve =>
          canvas.toBlob(
            resolve,
            "image/png"
          )
      );

    if (!blob) {
      throw new Error(
        "PNG"
      );
    }

    const download =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href =
      download;

    a.download =
      "ForYou-cake.png";

    a.click();

    setTimeout(
      () =>
        URL.revokeObjectURL(
          download
        ),
      60000
    );
  } catch {
    if (button) {
      button.textContent =
        "Не получилось. Попробуй ещё раз";
    }
  } finally {
    if (
      button?.isConnected
    ) {
      button.disabled =
        false;
    }
  }
}

// =======================================
// МАГАЗИН
// =======================================

function shopItems() {
  return [
    [
      "wall",
      "rose",
      "Розовый зал",
      0,
      "🌸"
    ],
    [
      "wall",
      "mint",
      "Мятный зал",
      80,
      "🌿"
    ],
    [
      "wall",
      "lavender",
      "Лавандовый зал",
      120,
      "💜"
    ],
    [
      "table",
      "cream",
      "Сливочный стол",
      0,
      "🤍"
    ],
    [
      "table",
      "wood",
      "Медовый стол",
      75,
      "🍯"
    ],
    [
      "table",
      "berry",
      "Ягодный стол",
      100,
      "🍓"
    ],
    [
      "stand",
      "white",
      "Белая подставка",
      0,
      "🍽"
    ],
    [
      "stand",
      "gold",
      "Золотая подставка",
      150,
      "✨"
    ],
    [
      "stand",
      "mint",
      "Мятная подставка",
      90,
      "🌱"
    ],
    [
      "machine",
      "pink",
      "Розовый аппарат",
      0,
      "🧁"
    ],
    [
      "machine",
      "mint",
      "Мятный аппарат",
      130,
      "🍃"
    ],
    [
      "machine",
      "purple",
      "Сиреневый аппарат",
      130,
      "🔮"
    ]
  ];
}

function showShop() {
  openModal(`
    <h2>
      Моя кондитерская
    </h2>

    <p>
      Твой баланс:
      ⭐ ${progress.stars}
    </p>

    <div class="shop-grid">

      ${
        shopItems()
          .map(
            (
              [
                type,
                id,
                name,
                cost,
                icon
              ]
            ) => {
              const owned =
                progress
                  .owned
                  .includes(
                    type +
                    "-" +
                    id
                  );

              const selected =
                progress
                  .decor[
                    type
                  ] === id;

              return `
                <button
                  data-shop="${type}-${id}"

                  ${
                    selected ||
                    (
                      !owned &&
                      progress.stars <
                      cost
                    )
                      ? "disabled"
                      : ""
                  }

                  aria-pressed="${selected}"
                >

                  <span>
                    ${icon}
                  </span>

                  <b>
                    ${name}
                  </b>

                  <small>
                    ${
                      selected
                        ? "Выбрано ✓"
                        : owned
                          ? "Выбрать"
                          : "⭐ " + cost
                    }
                  </small>

                </button>
              `;
            }
          )
          .join("")
      }

    </div>

    <p>
      Покупки меняют оформление
      и сохраняются
      на этом устройстве.
    </p>
  `);

  modalContent
    .querySelectorAll(
      "[data-shop]"
    )
    .forEach(button => {
      button.onclick =
        () => {
          const item =
            shopItems()
              .find(
                x =>
                  x[0] +
                  "-" +
                  x[1] ===
                  button.dataset.shop
              );

          const [
            type,
            id,
            ,
            cost
          ] = item;

          const key =
            type +
            "-" +
            id;

          if (
            !progress
              .owned
              .includes(key)
          ) {
            if (
              progress.stars <
              cost
            ) {
              return;
            }

            progress.stars -=
              cost;

            progress
              .owned
              .push(key);
          }

          progress
            .decor[type] =
              id;

          saveProgress();
          applyDecor();
          renderGameInfo();
          showShop();
          playClickSound();
        };
    });
}

function applyDecor() {
  document.body.dataset.wall =
    progress.decor.wall;

  document.body.dataset.table =
    progress.decor.table;

  document.body.dataset.stand =
    progress.decor.stand;

  document.body.dataset.machine =
    progress.decor.machine;
}

// =======================================
// СОБЫТИЯ
// =======================================

document
  .getElementById(
    "playButton"
  )
  .addEventListener(
    "click",
    () =>
      startGame(false)
  );

document
  .getElementById(
    "howButton"
  )
  .addEventListener(
    "click",
    showHowToPlay
  );

document
  .getElementById(
    "settingsButton"
  )
  .addEventListener(
    "click",
    showSettings
  );

document
  .getElementById(
    "gameSettingsButton"
  )
  .addEventListener(
    "click",
    showSettings
  );

document
  .getElementById(
    "backButton"
  )
  .addEventListener(
    "click",
    goToMenu
  );

document
  .getElementById(
    "serveButton"
  )
  .addEventListener(
    "click",
    serveCake
  );

document
  .getElementById(
    "resetCakeButton"
  )
  .addEventListener(
    "click",
    () => {
      if (orderServed) {
        return;
      }

      const old =
        cloneCake(
          currentCake
        );

      const previous =
        history.slice();

      resetCake();

      history =
        [
          ...previous,
          old
        ].slice(-30);

      updateWorkshop();
    }
  );

document
  .getElementById(
    "soundButton"
  )
  .addEventListener(
    "click",
    () => {
      progress.soundEnabled =
        !progress.soundEnabled;

      saveProgress();
      updateSoundIcon();
    }
  );

document
  .getElementById(
    "modalClose"
  )
  .addEventListener(
    "click",
    closeModal
  );

document
  .getElementById(
    "modalBackdrop"
  )
  .addEventListener(
    "click",
    closeModal
  );

document
  .querySelectorAll(
    ".category-tab"
  )
  .forEach(tab => {
    tab.addEventListener(
      "click",
      () => {
        const category =
          tab.dataset.category;

        if (
          !isCategoryUnlocked(
            category
          )
        ) {
          return;
        }

        currentCategory =
          category;

        ingredientsGrid.scrollLeft =
          0;

        playClickSound();
        updateTabs();
        renderIngredients();
      }
    );
  });

// Совместимость со старым сохранением.

progress.owned =
  Array.isArray(
    progress.owned
  )
    ? progress.owned
    : defaultProgress().owned;

progress.decor = {
  ...defaultProgress().decor,
  ...(progress.decor || {})
};

progress.visits =
  progress.visits &&
  typeof progress.visits ===
    "object"
    ? progress.visits
    : {};

progress.album =
  Array.isArray(
    progress.album
  )
    ? progress.album
        .filter(
          entry =>
            entry?.cake &&
            [
              "shape",
              "size",
              "base",
              "cream",
              "icing",
              "layers"
            ]
              .every(
                key =>
                  choices[key]
                    .some(
                      choice =>
                        choice.id ===
                        entry.cake[
                          key
                        ]
                    )
              ) &&
            Array.isArray(
              entry.cake
                .toppings
            )
        )
        .slice(0,24)
    : [];

customers.forEach(
  (customer,i) => {
    customer.favorite =
      [
        "strawberry",
        "chocolate",
        "vanilla",
        "velvet",
        "honey",
        "chocolate"
      ][i];

    customer.line =
      [
        "Люблю всё клубничное ♡",
        "Шоколада много не бывает!",
        "Ваниль — мой любимый аромат.",
        "Красный бархат для особого случая!",
        "Медовый, как в детстве.",
        "К чаю — непременно шоколадный."
      ][i];

    customer.thanks =
      [
        "Как красиво! Обязательно вернусь ♡",
        "Вот это шоколадное чудо!",
        "Спасибо, ты поднял мне настроение!",
        "Такой торт достоин праздника!",
        "Золотые у тебя руки, спасибо!",
        "Лучшее дополнение к чашке чая!"
      ][i];
  }
);

applyDecor();

document
  .getElementById(
    "freeButton"
  )
  .onclick =
    () =>
      startGame(true);

document
  .getElementById(
    "shopButton"
  )
  .onclick =
    showShop;

document
  .getElementById(
    "albumButton"
  )
  .onclick =
    showAlbum;

document
  .getElementById(
    "undoButton"
  )
  .onclick =
    undoCake;

document
  .getElementById(
    "writeButton"
  )
  .onclick =
    showInscription;

updateSoundIcon();
renderGameInfo();
updateTabs();
renderIngredients();
renderCake();

document
  .querySelector(
    ".hero-cake"
  )
  .innerHTML =
    cakeSVG(
      {
        ...defaultCake,
        layers: 2,
        toppings: [
          "strawberry"
        ]
      },
      "hero"
    );

document.addEventListener(
  "keydown",
  event => {
    if (
      modal
        .classList
        .contains(
          "hidden"
        )
    ) {
      return;
    }

    if (
      event.key ===
      "Escape"
    ) {
      closeModal();
    }

    if (
      event.key !==
      "Tab"
    ) {
      return;
    }

    const elements = [
      ...modal
        .querySelectorAll(
          `
            button:not(:disabled),
            input,
            select,
            textarea,
            a[href]
          `
        )
    ];

    const first =
      elements[0];

    const last =
      elements[
        elements.length - 1
      ];

    if (
      event.shiftKey &&
      document.activeElement ===
        first
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement ===
        last
    ) {
      event.preventDefault();
      first.focus();
    }
  }
);

// =======================================
// СПЕЦЭФФЕКТЫ ПРИГОТОВЛЕНИЯ И УЗОРЫ
// =======================================

(() => {
  if (
    document.getElementById(
      "creamPatternPanel"
    )
  ) {
    return;
  }

  const NS =
    "http://www.w3.org/2000/svg";

  const reducedMotion =
    matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  const patternNames = {
    pearls: "Жемчуг",
    shells: "Ракушки",
    roses: "Розочки",
    waves: "Волны"
  };

  const panel =
    document.createElement(
      "div"
    );

  panel.id =
    "creamPatternPanel";

  panel.className =
    "cream-pattern-panel hidden";

  panel.innerHTML = `
    <p class="cream-pattern-title">
      Узор крема · на твой вкус
    </p>

    <div
      class="cream-pattern-list"
      role="group"
      aria-label="Узор крема"
    ></div>
  `;

  document
    .getElementById(
      "unlockMessage"
    )
    .before(panel);

  let active = null;
  let frame = 0;

  function svgNode(
    name,
    attributes = {}
  ) {
    const node =
      document.createElementNS(
        NS,
        name
      );

    Object.entries(
      attributes
    ).forEach(
      ([key,value]) =>
        node.setAttribute(
          key,
          value
        )
    );

    return node;
  }

  const clamp = x =>
    Math.max(
      0,
      Math.min(
        1,
        x
      )
    );

  const ease = x =>
    1 -
    Math.pow(
      1 -
      clamp(x),
      3
    );

  const front =
    (shape,x) =>
      shape === "round"
        ? 52 *
          Math.sqrt(
            Math.max(
              0,
              1 -
              (x / 110) ** 2
            )
          )
        : shape ===
          "square"
          ? 48
          : 72 -
            Math.abs(x) *
            .53;

  function creamMotif(
    pattern,
    color
  ) {
    if (
      pattern ===
      "shells"
    ) {
      return `
        <path
          d="
            M-8 4
            Q-10 -5 -5 -7
            Q0 -13 5 -7
            Q10 -5 8 4
            Q0 9 -8 4
          "
          fill="${color}"
        />

        <path
          d="
            M-5 -5
            Q-4 0 -2 4
            M0 -7 V4
            M5 -5
            Q4 0 2 4
          "
          fill="none"
          stroke="#fff"
          stroke-opacity=".55"
          stroke-width="1.3"
        />
      `;
    }

    if (
      pattern ===
      "roses"
    ) {
      let petals = "";

      for (
        let i = 0;
        i < 6;
        i++
      ) {
        petals += `
          <ellipse
            cx="0"
            cy="-4"
            rx="4.2"
            ry="5"
            transform="
              rotate(${i * 60})
            "
            fill="${color}"
            stroke="#fff"
            stroke-opacity=".25"
            stroke-width=".7"
          />
        `;
      }

      return (
        petals +
        `
          <circle
            r="4"
            fill="${color}"
          />

          <path
            d="
              M-3 0
              C-3 -4 4 -4 3 0
              C2 3 -1 3 0 0
            "
            fill="none"
            stroke="#fff"
            stroke-opacity=".65"
            stroke-width="1.2"
          />
        `
      );
    }

    return `
      <ellipse
        rx="5.5"
        ry="4"
        fill="${color}"
      />

      <ellipse
        cx="-1.5"
        cy="-1.5"
        rx="2"
        ry="1"
        fill="#fff"
        opacity=".65"
      />
    `;
  }

  function patternMarkup(
    shape,
    pattern,
    color
  ) {
    if (
      pattern ===
      "waves"
    ) {
      let d =
        `M-94 ${
          front(
            shape,
            -94
          ) + 37
        }`;

      for (
        let x = -94;
        x < 94;
        x += 16
      ) {
        const end =
          Math.min(
            94,
            x + 16
          );

        d += `
          Q${
            x + 8
          } ${
            front(
              shape,
              x + 8
            ) + 27
          } ${
            end
          } ${
            front(
              shape,
              end
            ) + 37
          }
        `;
      }

      return `
        <path
          d="${d}"
          fill="none"
          stroke="${color}"
          stroke-width="7"
          stroke-linecap="round"
        />

        <path
          d="${d}"
          transform="translate(0 -1.5)"
          fill="none"
          stroke="#fff"
          stroke-opacity=".4"
          stroke-width="1.5"
        />
      `;
    }

    let markup = "";

    const step =
      pattern ===
      "roses"
        ? 22
        : 18;

    for (
      let x = -88;
      x <= 88;
      x += step
    ) {
      markup += `
        <g
          transform="
            translate(
              ${x}
              ${
                front(
                  shape,
                  x
                ) + 36
              }
            )
          "
        >
          ${
            creamMotif(
              pattern,
              color
            )
          }
        </g>
      `;
    }

    return markup;
  }

  function applyPattern(
    root = cakePreview,
    cake = currentCake
  ) {
    const pattern =
      cake.creamPattern ||
      "pearls";

    if (
      pattern ===
      "pearls"
    ) {
      return;
    }

    root
      .querySelectorAll(
        ".cake-tier"
      )
      .forEach(tier => {
        tier
          .querySelectorAll(
            ".cream-pattern"
          )
          .forEach(
            node =>
              node.remove()
          );

        [
          ...tier.children
        ]
          .filter(
            node =>
              node
                .tagName
                .toLowerCase() ===
              "ellipse"
          )
          .forEach(
            node =>
              node.remove()
          );

        const group =
          svgNode(
            "g",
            {
              class:
                "cream-pattern"
            }
          );

        group.innerHTML =
          patternMarkup(
            cake.shape,
            pattern,
            creamColors[
              cake.cream
            ]
          );

        const topping =
          tier
            .querySelector(
              ".cake-decoration"
            )
            ?.parentNode;

        tier.insertBefore(
          group,
          topping ||
          null
        );
      });
  }

  window.applyCakePattern =
    applyPattern;

  function updatePatternPanel() {
    panel.classList.toggle(
      "hidden",
      currentCategory !==
        "cream" ||
      !isCategoryUnlocked(
        "cream"
      )
    );

    panel
      .querySelectorAll(
        "button"
      )
      .forEach(button => {
        const selected =
          button
            .dataset
            .pattern ===
          (
            currentCake
              .creamPattern ||
            "pearls"
          );

        button
          .classList
          .toggle(
            "selected",
            selected
          );

        button
          .setAttribute(
            "aria-pressed",
            String(selected)
          );

        button.disabled =
          orderServed;
      });
  }

  Object.entries(
    patternNames
  ).forEach(
    ([pattern,name]) => {
      const button =
        document
          .createElement(
            "button"
          );

      button.type =
        "button";

      button.className =
        "cream-pattern-button";

      button.dataset.pattern =
        pattern;

      const preview =
        pattern ===
        "waves"
          ? `
            <path
              d="
                M-14 2
                Q-7 -10 0 2
                Q7 -10 14 2
              "
              fill="none"
              stroke="#d886a3"
              stroke-width="4"
              stroke-linecap="round"
            />
          `
          : creamMotif(
              pattern,
              "#d886a3"
            );

      button.innerHTML = `
        <svg
          viewBox="-18 -12 36 24"
          aria-hidden="true"
        >
          ${preview}
        </svg>

        <span>
          ${name}
        </span>
      `;

      button.addEventListener(
        "click",
        () => {
          if (
            orderServed ||
            !isCategoryUnlocked(
              "cream"
            )
          ) {
            return;
          }

          stopEffect();

          const old =
            snapshot();

          rememberCake();

          currentCake.creamPattern =
            pattern;

          renderCake();
          updatePatternPanel();

          playTone(
            680,
            .1,
            .025
          );

          runEffect(
            "cream",
            pattern,
            old
          );
        }
      );

      panel
        .querySelector(
          ".cream-pattern-list"
        )
        .appendChild(
          button
        );
    }
  );

  function snapshot() {
    const svg =
      cakePreview
        .querySelector(
          "svg.cake-art"
        );

    if (!svg) {
      return null;
    }

    const clone =
      svg.cloneNode(true);

    clone
      .querySelectorAll(
        "[id]"
      )
      .forEach(node => {
        node.id =
          "fx-old-" +
          node.id;
      });

    clone
      .querySelectorAll("*")
      .forEach(node => {
        [
          ...node.attributes
        ].forEach(
          attribute => {
            if (
              attribute.value
                .includes(
                  "url(#"
                )
            ) {
              node.setAttribute(
                attribute.name,
                attribute.value
                  .replaceAll(
                    "url(#",
                    "url(#fx-old-"
                  )
              );
            }
          }
        );

        node.style.opacity =
          "";
      });

    clone.style.clipPath =
      "";

    clone.classList.add(
      "fx-old-cake"
    );

    clone.setAttribute(
      "aria-hidden",
      "true"
    );

    return clone;
  }

  function stopEffect() {
    cancelAnimationFrame(
      frame
    );

    frame = 0;

    if (active) {
      active.restore?.();

      active.hidden
        .forEach(
          node =>
            node.style.opacity =
              ""
        );

      active.art.style.clipPath =
        "";

      active.old?.remove();
      active.svg.remove();
      active.caption.remove();

      active = null;
    }

    cakePreview
      .classList
      .remove(
        "fx-active"
      );
  }

  function point(
    tierIndex,
    x = 0,
    y = 0
  ) {
    const size =
      {
        small: .75,
        medium: .9,
        large: 1.04
      }[
        currentCake.size
      ];

    const tierScale =
      Math.pow(
        .74,
        tierIndex
      );

    const tierY =
      {
        round: 180,
        square: 184,
        heart: 160
      }[
        currentCake.shape
      ] -
      tierIndex *
      59;

    const px =
      180 +
      x *
      tierScale *
      size;

    const py =
      276 +
      (
        tierY +
        y *
        tierScale -
        276
      ) *
      size;

    return {
      x:
        180 +
        (
          px -
          180
        ) *
        .86,

      y:
        330 +
        (
          py -
          330
        ) *
        .86
    };
  }

  function machine(
    color,
    cream
  ) {
    return `
      <rect
        x="-40"
        y="-25"
        width="80"
        height="39"
        rx="13"
        fill="${
          {
            pink:"#f3e4e7",
            mint:"#b8e5d1",
            purple:"#d8c0ef"
          }[
            progress
              .decor
              .machine
          ] ||
          "#f3e4e7"
        }"
        stroke="#ba899d"
        stroke-width="1.5"
      />

      <rect
        x="-35"
        y="-21"
        width="46"
        height="26"
        rx="8"
        fill="#fffaf6"
      />

      <rect
        x="-31"
        y="-17"
        width="38"
        height="18"
        rx="5"
        fill="${color}"
      />

      <path
        d="M-27 -14 H-2"
        stroke="#fff"
        stroke-width="3"
        opacity=".7"
        stroke-linecap="round"
      />

      <circle
        cx="25"
        cy="-6"
        r="7"
        fill="#98cdb7"
      />

      <circle
        cx="25"
        cy="-6"
        r="3"
        fill="#fff7e5"
      />

      <path
        d="
          M-9 13
          H9
          L5 25
          H-5Z
        "
        fill="#ba98a5"
      />

      <rect
        x="-6"
        y="23"
        width="12"
        height="5"
        rx="2"
        fill="#8f6b7d"
      />

      <text
        x="-14"
        y="11"
        font-size="5"
        fill="#986879"
        font-family="sans-serif"
      >
        ${
          cream
            ? "CREAM"
            : "GLAZE"
        }
      </text>
    `;
  }

  function handMarkup() {
    return `
      <path
        d="
          M13 -85
          H35
          L34 -42
          Q32 -29 24 -20
          L12 -10
          Q7 -7 3 -12
          Q0 -16 6 -22
          L16 -32
          L6 -31
          L-5 -16
          Q-9 -10 -14 -14
          Q-18 -17 -14 -23
          L-3 -43
          Q1 -49 11 -46
          L16 -45Z
        "
        fill="#ffe5d0"
        stroke="#d7a58f"
        stroke-width="1.7"
        stroke-linejoin="round"
      />

      <path
        d="
          M11 -84
          H38
          V-58
          H11Z
        "
        fill="#e7a1b9"
      />

      <path
        d="M13 -59 H36"
        stroke="#fff2ec"
        stroke-width="5"
      />
    `;
  }

  function sparkles(
    svg,
    color
  ) {
    const group =
      svgNode("g");

    const particles = [];

    for (
      let i = 0;
      i < 14;
      i++
    ) {
      const node =
        svgNode(
          "path",
          {
            d:
              "M0 -3 V3 M-3 0 H3",

            stroke:
              i % 3
                ? color
                : "#e9be60",

            "stroke-width":
              1.7,

            "stroke-linecap":
              "round",

            opacity:
              0
          }
        );

      group.appendChild(
        node
      );

      particles.push(
        node
      );
    }

    svg.appendChild(
      group
    );

    return (
      amount,
      target
    ) => {
      particles.forEach(
        (node,i) => {
          const angle =
            i *
            Math.PI *
            2 /
            particles.length;

          const distance =
            8 +
            amount *
            (
              20 +
              i % 4 *
              7
            );

          node.setAttribute(
            "transform",
            `
              translate(
                ${
                  target.x +
                  Math.cos(
                    angle
                  ) *
                  distance
                }

                ${
                  target.y +
                  Math.sin(
                    angle
                  ) *
                  distance *
                  .55 +
                  amount *
                  amount *
                  12
                }
              )

              rotate(
                ${i * 26}
              )
            `
          );

          node.setAttribute(
            "opacity",
            Math.max(
              0,
              1 -
              amount
            )
          );
        }
      );
    };
  }

  function runEffect(
    category,
    item,
    old = null
  ) {
    stopEffect();

    if (
      reducedMotion.matches ||
      gameScreen
        .classList
        .contains(
          "hidden"
        )
    ) {
      return;
    }

    const art =
      cakePreview
        .querySelector(
          "svg.cake-art"
        );

    if (!art) {
      return;
    }

    const svg =
      svgNode(
        "svg",
        {
          class:
            "cake-fx",

          viewBox:
            "0 0 360 330",

          "aria-hidden":
            "true"
        }
      );

    const caption =
      document
        .createElement(
          "span"
        );

    caption.className =
      "fx-caption";

    caption.setAttribute(
      "aria-hidden",
      "true"
    );

    cakePreview
      .classList
      .add(
        "fx-active"
      );

    cakePreview.append(
      svg,
      caption
    );

    active = {
      art,
      svg,
      caption,
      old: null,
      hidden: []
    };

    let tick;
    let duration;
    let sounded = false;

    const top =
      currentCake.layers -
      1;

    if (
      category === "cream" ||
      category === "icing"
    ) {
      const cream =
        category ===
        "cream";

      const color =
        cream
          ? creamColors[
              currentCake.cream
            ]
          : icingColors[
              currentCake.icing
            ];

      caption.textContent =
        cream
          ? "Наносим крем…"
          : "Поливаем глазурью…";

      duration =
        cream
          ? 1900
          : 1700;

      if (old) {
        cakePreview.insertBefore(
          old,
          art
        );

        active.old =
          old;

        art.style.clipPath =
          "inset(0 0 100% 0)";
      }

      const fluid =
        svgNode(
          "path",
          {
            fill:
              "none",

            stroke:
              color,

            "stroke-width":
              cream
                ? 9
                : 13,

            "stroke-linecap":
              "round",

            opacity:
              0
          }
        );

      const highlight =
        svgNode(
          "path",
          {
            fill:
              "none",

            stroke:
              "#fff",

            "stroke-width":
              2,

            opacity:
              0
          }
        );

      const puddle =
        svgNode(
          "ellipse",
          {
            fill:
              color,

            rx:
              0,

            ry:
              0
          }
        );

      const tool =
        svgNode("g");

      tool.innerHTML =
        machine(
          color,
          cream
        );

      svg.append(
        fluid,
        highlight,
        puddle,
        tool
      );

      const burst =
        sparkles(
          svg,
          color
        );

      tick =
        progress => {
          const pouring =
            clamp(
              (
                progress -
                .2
              ) /
              .57
            );

          const target =
            point(
              top,
              Math.sin(
                pouring *
                Math.PI *
                2
              ) *
              (
                cream
                  ? 48
                  : 18
              ),
              12
            );

          const enter =
            ease(
              progress /
              .18
            );

          const exit =
            ease(
              (
                progress -
                .8
              ) /
              .2
            );

          const toolY =
            25 -
            75 *
            (
              1 -
              enter
            ) -
            75 *
            exit;

          tool.setAttribute(
            "transform",
            `translate(${
              target.x
            } ${toolY})`
          );

          const isPouring =
            progress > .2 &&
            progress < .8;

          const start =
            toolY +
            28;

          const end =
            start +
            (
              target.y -
              start
            ) *
            ease(
              (
                progress -
                .2
              ) /
              .12
            );

          const wobble =
            Math.sin(
              progress *
              65
            ) *
            3;

          const d =
            `M${
              target.x
            } ${start}
             Q${
               target.x +
               wobble
             } ${
               (
                 start +
                 end
               ) /
               2
             }
             ${
               target.x
             } ${end}`;

          fluid.setAttribute(
            "d",
            d
          );

          highlight.setAttribute(
            "d",
            d
          );

          fluid.setAttribute(
            "opacity",
            isPouring
              ? 1
              : 0
          );

          highlight.setAttribute(
            "opacity",
            isPouring
              ? .4
              : 0
          );

          puddle.setAttribute(
            "cx",
            target.x
          );

          puddle.setAttribute(
            "cy",
            target.y
          );

          puddle.setAttribute(
            "rx",
            isPouring
              ? 8 +
                Math.sin(
                  progress *
                  50
                ) *
                2
              : 0
          );

          puddle.setAttribute(
            "ry",
            isPouring
              ? 3
              : 0
          );

          if (old) {
            art.style.clipPath =
              `inset(
                0 0 ${
                  (
                    1 -
                    pouring
                  ) *
                  100
                }% 0
              )`;
          }

          if (
            progress >
            .78
          ) {
            burst(
              clamp(
                (
                  progress -
                  .78
                ) /
                .22
              ),
              target
            );
          }

          if (
            !sounded &&
            progress >
            .22
          ) {
            sounded =
              true;

            playTone(
              cream
                ? 330
                : 280,
              .22,
              .016
            );
          }
        };
    } else if (
      category ===
      "topping"
    ) {
      const tops =
        currentCake
          .toppings
          .length === 1 &&
        ![
          "crown",
          "candles"
        ].includes(item)
          ? [
              item,
              item,
              item
            ]
          : currentCake
              .toppings;

      const slots = [
        [-53,-18],
        [53,-18],
        [0,23],
        [-72,8],
        [72,8],
        [-30,6],
        [30,6],
        [-32,33],
        [32,33]
      ];

      const real = [
        ...art
          .querySelectorAll(
            ".cake-decoration"
          )
      ];

      const falling = [];

      tops.forEach(
        (name,i) => {
          if (
            name !== item
          ) {
            return;
          }

          if (real[i]) {
            real[i]
              .style
              .opacity =
                "0";

            active.hidden.push(
              real[i]
            );
          }

          const [x,y] =
            tops.length === 1
              ? [0,17]
              : slots[i];

          const target =
            point(
              top,
              x,
              y
            );

          const node =
            svgNode("g");

          node.innerHTML =
            toppingSVG(
              item
            );

          svg.appendChild(
            node
          );

          const scale =
            .86 *
            {
              small: .75,
              medium: .9,
              large: 1.04
            }[
              currentCake.size
            ] *
            Math.pow(
              .74,
              top
            );

          const trail =
            svgNode(
              "path",
              {
                fill:
                  "none",

                stroke:
                  "#f6ce75",

                "stroke-width":
                  3,

                "stroke-linecap":
                  "round",

                opacity:
                  0
              }
            );

          svg.insertBefore(
            trail,
            node
          );

          falling.push({
            node,
            target,
            scale,
            trail
          });
        }
      );

      const candle =
        item ===
        "candles";

      const star =
        item ===
        "stars";

      caption.textContent =
        candle
          ? "Зажигаем свечу ♡"
          : star
            ? "Звёзды с неба ✦"
            : "Добавляем украшения…";

      duration =
        candle
          ? 1700
          : star
            ? 1500
            : 1100;

      const hand =
        svgNode("g");

      if (candle) {
        hand.innerHTML =
          handMarkup();

        svg.appendChild(
          hand
        );
      }

      const burst =
        sparkles(
          svg,
          star
            ? "#edbc51"
            : "#e69ab7"
        );

      tick =
        progress => {
          falling.forEach(
            (
              {
                node,
                target,
                scale,
                trail
              },
              i
            ) => {
              const local =
                clamp(
                  (
                    progress -
                    i * .1
                  ) /
                  (
                    candle
                      ? .58
                      : .6
                  )
                );

              const t =
                candle
                  ? ease(local)
                  : local *
                    local;

              const startX =
                candle
                  ? target.x +
                    50
                  : target.x -
                    55 -
                    i * 16;

              const x =
                startX +
                (
                  target.x -
                  startX
                ) *
                t;

              let y =
                -35 +
                (
                  target.y +
                  35
                ) *
                t;

              if (
                !candle &&
                local >= 1
              ) {
                y -=
                  Math.sin(
                    clamp(
                      (
                        progress -
                        .6 -
                        i * .1
                      ) /
                      .16
                    ) *
                    Math.PI
                  ) *
                  6;
              }

              const rotation =
                candle
                  ? (
                      1 -
                      t
                    ) *
                    14
                  : (
                      1 -
                      t
                    ) *
                    -145;

              node.setAttribute(
                "transform",
                `
                  translate(
                    ${x}
                    ${y}
                  )

                  rotate(
                    ${rotation}
                  )

                  scale(
                    ${scale}
                  )
                `
              );

              if (candle) {
                const retreat =
                  ease(
                    (
                      progress -
                      .68
                    ) /
                    .25
                  );

                hand.setAttribute(
                  "transform",
                  `
                    translate(
                      ${
                        x +
                        retreat *
                        80
                      }

                      ${
                        y -
                        20 -
                        retreat *
                        180
                      }
                    )

                    scale(.7)
                  `
                );

                node
                  .querySelector(
                    ".candle-flame"
                  )
                  ?.setAttribute(
                    "opacity",
                    progress >
                    .72
                      ? "1"
                      : "0"
                  );
              }

              if (star) {
                trail.setAttribute(
                  "d",
                  `
                    M${x}
                    ${y - 10}

                    Q${
                      x -
                      12
                    }
                    ${
                      y -
                      35
                    }

                    ${
                      x -
                      22
                    }
                    ${
                      y -
                      62
                    }
                  `
                );

                trail.setAttribute(
                  "opacity",
                  local >
                    .05 &&
                  local <
                    1
                    ? .65
                    : 0
                );
              }
            }
          );

          if (
            progress > .74 &&
            falling.length
          ) {
            burst(
              clamp(
                (
                  progress -
                  .74
                ) /
                .26
              ),
              falling[
                falling.length -
                1
              ].target
            );
          }

          if (
            !sounded &&
            progress >
            .63
          ) {
            sounded = true;

            playTone(
              star
                ? 1175
                : candle
                  ? 880
                  : 740,
              .16,
              .025
            );
          }
        };
    } else {
      caption.textContent =
        category ===
        "layers"
          ? "Собираем этажи…"
          : "Готовим основу…";

      duration = 800;

      const tiers = [
        ...art
          .querySelectorAll(
            ".cake-tier"
          )
      ];

      const originals =
        tiers.map(
          node =>
            node.getAttribute(
              "transform"
            )
        );

      tick =
        progress => {
          tiers.forEach(
            (node,i) => {
              const amount =
                ease(
                  (
                    progress -
                    i * .13
                  ) /
                  .55
                );

              node.setAttribute(
                "transform",
                `
                  translate(
                    0
                    ${
                      -35 *
                      (
                        1 -
                        amount
                      )
                    }
                  )

                  ${
                    originals[i]
                  }
                `
              );

              node.style.opacity =
                String(
                  amount
                );
            }
          );
        };

      active.restore =
        () =>
          tiers.forEach(
            (node,i) => {
              node.setAttribute(
                "transform",
                originals[i]
              );

              node.style.opacity =
                "";
            }
          );
    }

    const effect =
      active;

    const start =
      performance.now();

    const loop =
      now => {
        if (
          active !==
          effect
        ) {
          return;
        }

        const progress =
          clamp(
            (
              now -
              start
            ) /
            duration
          );

        tick(progress);

        if (
          progress < 1
        ) {
          frame =
            requestAnimationFrame(
              loop
            );
        } else {
          effect.restore?.();
          stopEffect();
        }
      };

    tick(0);

    frame =
      requestAnimationFrame(
        loop
      );
  }

  const originalRenderCake =
    renderCake;

  renderCake =
    function() {
      active?.restore?.();
      stopEffect();

      originalRenderCake();

      applyPattern();
      updatePatternPanel();
    };

  const originalRenderIngredients =
    renderIngredients;

  renderIngredients =
    function() {
      originalRenderIngredients();
      updatePatternPanel();
    };

  const originalSelectIngredient =
    selectIngredient;

  selectIngredient =
    function(id) {
      if (orderServed) {
        return;
      }

      active?.restore?.();
      stopEffect();

      const category =
        currentCategory;

      const removing =
        category ===
          "topping" &&
        currentCake
          .toppings
          .includes(id);

      const old =
        snapshot();

      originalSelectIngredient(
        id
      );

      if (!removing) {
        runEffect(
          category,
          id,
          old
        );
      }
    };

  const cancel =
    () => {
      active?.restore?.();
      stopEffect();
    };

  [
    "serveButton",
    "resetCakeButton",
    "backButton",
    "gameSettingsButton"
  ].forEach(id => {
    document
      .getElementById(id)
      .addEventListener(
        "click",
        cancel,
        true
      );
  });

  window.addEventListener(
    "resize",
    cancel
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.hidden
      ) {
        cancel();
      }
    }
  );

  reducedMotion
    .addEventListener(
      "change",
      cancel
    );

  updatePatternPanel();
})();

// Узоры и выбранная подставка
// сохраняются на картинках.

const plainCakeSVG =
  cakeSVG;

cakeSVG =
  function(cake,id) {
    const host =
      document
        .createElement(
          "div"
        );

    host.innerHTML =
      plainCakeSVG(
        cake,
        id
      );

    window
      .applyCakePattern(
        host,
        cake
      );

    const plate =
      host
        .querySelector(
          ".cake-art > ellipse:nth-of-type(3)"
        );

    if (plate) {
      plate.setAttribute(
        "fill",
        {
          white:
            "#fffdf9",

          gold:
            "#f9dd95",

          mint:
            "#c5e9d8"
        }[
          progress
            .decor
            .stand
        ] ||
        "#fffdf9"
      );
    }

    return host.innerHTML;
  };


// =========================================================
// КОТ-ВОРИШКА
// =========================================================

(() => {
  const CAT_CONFIG = {
    minDelay: 9000,
    maxDelay: 17000,

    reactionTime: 1900,

    chanceAfterDecor: .38,

    quickMinDelay: 900,
    quickMaxDelay: 2400,

    rewardEvery: 5,
    rewardStars: 10,

    protectedToppings: [
      "candles",
      "crown"
    ]
  };

  let catTimer = null;
  let stealTimer = null;
  let cleanupTimer = null;

  let catActive = false;

  let targetTopping =
    null;

  let catGeneration =
    0;

  function loadCatStats() {
    try {
      return {
        saved: 0,
        stolen: 0,
        gifts: 0,

        ...JSON.parse(
          localStorage
            .getItem(
              "forYou.catThief"
            ) ||
          "{}"
        )
      };
    } catch {
      return {
        saved: 0,
        stolen: 0,
        gifts: 0
      };
    }
  }

  const catStats =
    loadCatStats();

  function saveCatStats() {
    try {
      localStorage.setItem(
        "forYou.catThief",
        JSON.stringify(
          catStats
        )
      );
    } catch {}
  }

  function catRandom(
    min,
    max
  ) {
    return Math.round(
      min +
      Math.random() *
      (
        max -
        min
      )
    );
  }

  function getStealableToppings() {
    if (
      !currentCake ||
      !Array.isArray(
        currentCake.toppings
      )
    ) {
      return [];
    }

    return currentCake
      .toppings
      .filter(
        item =>
          !CAT_CONFIG
            .protectedToppings
            .includes(item)
      );
  }

  function catCanAppear() {
    return (
      !gameScreen
        .classList
        .contains(
          "hidden"
        ) &&

      modal
        .classList
        .contains(
          "hidden"
        ) &&

      !orderServed &&

      !document.hidden &&

      getStealableToppings()
        .length >
        0
    );
  }

  function scheduleCat(
    delay =
      catRandom(
        CAT_CONFIG.minDelay,
        CAT_CONFIG.maxDelay
      )
  ) {
    clearTimeout(
      catTimer
    );

    catTimer = null;

    if (
      catActive ||
      gameScreen
        .classList
        .contains(
          "hidden"
        ) ||
      orderServed
    ) {
      return;
    }

    const generation =
      ++catGeneration;

    catTimer =
      setTimeout(
        () => {
          if (
            generation !==
            catGeneration
          ) {
            return;
          }

          if (
            catCanAppear()
          ) {
            showCat();
          } else if (
            !gameScreen
              .classList
              .contains(
                "hidden"
              ) &&
            !orderServed
          ) {
            scheduleCat(
              3500
            );
          }
        },
        delay
      );
  }

  function removeCatNode() {
    document
      .getElementById(
        "forYouCatThief"
      )
      ?.remove();
  }

  function cancelCat(
    reschedule = false
  ) {
    catGeneration++;

    clearTimeout(
      catTimer
    );

    clearTimeout(
      stealTimer
    );

    clearTimeout(
      cleanupTimer
    );

    catTimer = null;
    stealTimer = null;
    cleanupTimer = null;

    removeCatNode();

    catActive = false;
    targetTopping = null;

    if (
      reschedule &&
      !gameScreen
        .classList
        .contains(
          "hidden"
        ) &&
      !orderServed
    ) {
      scheduleCat(
        4500
      );
    }
  }

  function showCat() {
    if (
      catActive ||
      !catCanAppear()
    ) {
      return;
    }

    const toppings =
      getStealableToppings();

    if (!toppings.length) {
      return;
    }

    targetTopping =
      randomItem(
        toppings
      );

    catActive = true;

    const side =
      Math.random() >
      .5
        ? "right"
        : "left";

    const icon =
      toppingIcons[
        targetTopping
      ] ||
      "🍰";

    const cat =
      document
        .createElement(
          "button"
        );

    cat.id =
      "forYouCatThief";

    cat.type =
      "button";

    cat.className =
      `for-you-cat cat-${side}`;

    cat.setAttribute(
      "aria-label",
      "Прогнать кота-воришку"
    );

    cat.innerHTML = `

      <span class="cat-thought">

        <span class="cat-thought-text">
          Хочу ${icon}!
        </span>

        <span
          class="
            cat-thought-dot
            cat-thought-dot-one
          "
        ></span>

        <span
          class="
            cat-thought-dot
            cat-thought-dot-two
          "
        ></span>

      </span>


      <span class="cat-body">

        <span class="cat-tail"></span>

        <span
          class="
            cat-ear
            cat-ear-left
          "
        ></span>

        <span
          class="
            cat-ear
            cat-ear-right
          "
        ></span>


        <span class="cat-head">

          <span
            class="
              cat-eye
              cat-eye-left
            "
          ></span>

          <span
            class="
              cat-eye
              cat-eye-right
            "
          ></span>

          <span class="cat-nose"></span>

          <span
            class="
              cat-whisker
              cat-whisker-a
            "
          ></span>

          <span
            class="
              cat-whisker
              cat-whisker-b
            "
          ></span>

          <span
            class="
              cat-whisker
              cat-whisker-c
            "
          ></span>

          <span
            class="
              cat-whisker
              cat-whisker-d
            "
          ></span>

        </span>


        <span
          class="
            cat-paw
            cat-paw-one
          "
        >
          🐾
        </span>

        <span
          class="
            cat-paw
            cat-paw-two
          "
        >
          🐾
        </span>

      </span>


      <span class="cat-danger-bar">
        <span></span>
      </span>
    `;

    const host =
      document
        .querySelector(
          ".cake-panel"
        ) ||
      gameScreen;

    host.appendChild(
      cat
    );

    requestAnimationFrame(
      () =>
        requestAnimationFrame(
          () =>
            cat
              .classList
              .add(
                "cat-visible"
              )
        )
    );

    playCatSneakSound();

    cat.addEventListener(
      "pointerdown",
      event => {
        event.preventDefault();
        event.stopPropagation();

        scareCatAway();
      },
      {
        once: true
      }
    );

    cat.addEventListener(
      "click",
      event => {
        event.preventDefault();
        event.stopPropagation();
      }
    );

    stealTimer =
      setTimeout(
        stealDecoration,
        CAT_CONFIG
          .reactionTime
      );
  }

  function scareCatAway() {
    if (!catActive) {
      return;
    }

    clearTimeout(
      stealTimer
    );

    stealTimer = null;

    const cat =
      document
        .getElementById(
          "forYouCatThief"
        );

    catActive = false;

    catStats.saved++;

    saveCatStats();

    if (!cat) {
      targetTopping =
        null;

      scheduleCat();

      return;
    }

    cat
      .classList
      .remove(
        "cat-visible"
      );

    cat
      .classList
      .add(
        "cat-scared"
      );

    const text =
      cat.querySelector(
        ".cat-thought-text"
      );

    if (text) {
      text.textContent =
        "МЯУ! 😾";
    }

    cat
      .querySelector(
        ".cat-danger-bar"
      )
      ?.classList
      .add(
        "cat-bar-safe"
      );

    playCatScaredSound();

    showCatToast(
      "Успел! Кот убежал 😸",
      "safe"
    );

    if (
      catStats.saved %
      CAT_CONFIG
        .rewardEvery ===
      0
    ) {
      giveCatGift();
    }

    cleanupTimer =
      setTimeout(
        () => {
          cat.remove();

          targetTopping =
            null;

          scheduleCat();
        },
        720
      );
  }

  function stealDecoration() {
    if (
      !catActive ||
      !targetTopping
    ) {
      return;
    }

    const cat =
      document
        .getElementById(
          "forYouCatThief"
        );

    const toppingIndex =
      currentCake
        .toppings
        .indexOf(
          targetTopping
        );

    if (
      toppingIndex === -1
    ) {
      cancelCat(true);
      return;
    }

    catActive = false;

    catStats.stolen++;

    saveCatStats();

    // Настоящая кража.
    // Украшение удаляется
    // из торта.

    currentCake
      .toppings
      .splice(
        toppingIndex,
        1
      );

    renderCake();

    if (
      currentCategory ===
      "topping"
    ) {
      renderIngredients();
    }

    if (cat) {
      cat
        .classList
        .remove(
          "cat-visible"
        );

      cat
        .classList
        .add(
          "cat-stole"
        );

      const text =
        cat.querySelector(
          ".cat-thought-text"
        );

      if (text) {
        text.textContent =
          `${
            toppingIcons[
              targetTopping
            ] ||
            "🍰"
          } моё!`;
      }
    }

    playCatStealSound();

    showCatToast(
      `Ой! Кот украл: ${
        getChoiceName(
          "topping",
          targetTopping
        )
      } 😼`,
      "stolen"
    );

    cleanupTimer =
      setTimeout(
        () => {
          cat?.remove();

          targetTopping =
            null;

          scheduleCat();
        },
        900
      );
  }

  function giveCatGift() {
    catStats.gifts++;

    saveCatStats();

    let giftText =
      "Секретный подарок 🐾";

    // В свободном режиме
    // звёзды не начисляем.

    if (!freeMode) {
      progress.stars +=
        CAT_CONFIG.rewardStars;

      saveProgress();
      renderGameInfo();

      giftText =
        `+${
          CAT_CONFIG
            .rewardStars
        } ⭐`;
    }

    const gift =
      document
        .createElement(
          "div"
        );

    gift.className =
      "cat-gift";

    gift.innerHTML = `
      <span>
        🐾
      </span>

      <b>
        Подарок кота!
      </b>

      <small>
        ${giftText}
      </small>
    `;

    document.body
      .appendChild(
        gift
      );

    playTone(
      1046,
      .1,
      .025
    );

    setTimeout(
      () =>
        playTone(
          1318,
          .12,
          .022
        ),
      110
    );

    requestAnimationFrame(
      () =>
        gift
          .classList
          .add(
            "cat-gift-show"
          )
    );

    setTimeout(
      () => {
        gift
          .classList
          .remove(
            "cat-gift-show"
          );

        setTimeout(
          () =>
            gift.remove(),
          400
        );
      },
      2200
    );
  }

  function showCatToast(
    text,
    type
  ) {
    document
      .querySelector(
        ".cat-toast"
      )
      ?.remove();

    const toast =
      document
        .createElement(
          "div"
        );

    toast.className =
      `cat-toast cat-toast-${type}`;

    toast.textContent =
      text;

    document.body
      .appendChild(
        toast
      );

    requestAnimationFrame(
      () =>
        toast
          .classList
          .add(
            "cat-toast-show"
          )
    );

    setTimeout(
      () => {
        toast
          .classList
          .remove(
            "cat-toast-show"
          );

        setTimeout(
          () =>
            toast.remove(),
          300
        );
      },
      1700
    );
  }

  function playCatSneakSound() {
    playTone(
      420,
      .06,
      .012
    );

    setTimeout(
      () =>
        playTone(
          510,
          .06,
          .012
        ),
      90
    );
  }

  function playCatScaredSound() {
    playTone(
      820,
      .05,
      .02
    );

    setTimeout(
      () =>
        playTone(
          560,
          .08,
          .018
        ),
      60
    );

    setTimeout(
      () =>
        playTone(
          300,
          .11,
          .015
        ),
      130
    );
  }

  function playCatStealSound() {
    playTone(
      260,
      .08,
      .018
    );

    setTimeout(
      () =>
        playTone(
          220,
          .12,
          .016
        ),
      100
    );
  }

  // =====================================
  // ПОДКЛЮЧЕНИЕ К ДЕКОРУ
  // =====================================

  const catOriginalSelectIngredient =
    selectIngredient;

  selectIngredient =
    function(id) {
      const wasTopping =
        currentCategory ===
        "topping";

      const alreadyHad =
        wasTopping &&
        currentCake
          .toppings
          .includes(id);

      catOriginalSelectIngredient(
        id
      );

      const actuallyAdded =
        wasTopping &&
        !alreadyHad &&
        currentCake
          .toppings
          .includes(id);

      if (
        !actuallyAdded ||
        CAT_CONFIG
          .protectedToppings
          .includes(id) ||
        orderServed
      ) {
        return;
      }

      if (
        Math.random() <
        CAT_CONFIG
          .chanceAfterDecor
      ) {
        scheduleCat(
          catRandom(
            CAT_CONFIG
              .quickMinDelay,

            CAT_CONFIG
              .quickMaxDelay
          )
        );
      }
    };

  // =====================================
  // СТАРТ ИГРЫ
  // =====================================

  const catOriginalStartGame =
    startGame;

  startGame =
    function(...args) {
      cancelCat(false);

      const result =
        catOriginalStartGame
          .apply(
            this,
            args
          );

      scheduleCat(
        6500
      );

      return result;
    };

  // =====================================
  // НОВЫЙ ЗАКАЗ
  // =====================================

  const catOriginalNextOrder =
    nextOrder;

  nextOrder =
    function(...args) {
      cancelCat(false);

      const result =
        catOriginalNextOrder
          .apply(
            this,
            args
          );

      scheduleCat(
        6500
      );

      return result;
    };

  // =====================================
  // МОДАЛЬНЫЕ ОКНА
  // =====================================

  const catOriginalOpenModal =
    openModal;

  openModal =
    function(...args) {
      cancelCat(false);

      return (
        catOriginalOpenModal
          .apply(
            this,
            args
          )
      );
    };

  const catOriginalCloseModal =
    closeModal;

  closeModal =
    function(...args) {
      const result =
        catOriginalCloseModal
          .apply(
            this,
            args
          );

      if (
        !gameScreen
          .classList
          .contains(
            "hidden"
          ) &&
        !orderServed
      ) {
        scheduleCat(
          4500
        );
      }

      return result;
    };

  // =====================================
  // КОТ ИСЧЕЗАЕТ ПРИ ДЕЙСТВИЯХ
  // =====================================

  [
    "serveButton",
    "resetCakeButton",
    "backButton",
    "gameSettingsButton"
  ].forEach(id => {
    document
      .getElementById(id)
      ?.addEventListener(
        "click",
        () =>
          cancelCat(
            false
          ),
        true
      );
  });

  // =====================================
  // СВЕРНУЛ ИГРУ
  // =====================================

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.hidden
      ) {
        cancelCat(
          false
        );
      } else if (
        !gameScreen
          .classList
          .contains(
            "hidden"
          ) &&
        !orderServed
      ) {
        scheduleCat(
          4500
        );
      }
    }
  );
})();
