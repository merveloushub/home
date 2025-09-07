async function loadData() {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error("Could not load data.json");
    return res.json();
}

let data;

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function init() {
    data = await loadData();
    const buns = data.buns;

    // STEP 1: CHOOSE BUNS
    let topBun = getRandomItem(buns);

    // Bottom bun options: never "none (open-faced)"
    let bottomOptions = buns.filter(b => b !== "none (open-faced)");
    let bottomBun;

    if (topBun === "none (open-faced)") {
        bottomBun = getRandomItem(bottomOptions);
    } else {
        bottomBun = getRandomItem(buns);
        if (Math.random() < 0.25 && topBun !== "none (open-faced)") {
            bottomBun = topBun;
        }
        if (bottomBun === "none (open-faced)") {
            bottomBun = getRandomItem(bottomOptions);
        }
    }

    // STEP 2: CHOOSE CONDIMENTS
    let numCondiments = Math.floor(Math.random() * 4);
    let availableCondiments = [...data.condiments];
    let chosenCondiments = [];
    for (let i = 0; i < numCondiments; i++) {
        let index = Math.floor(Math.random() * availableCondiments.length);
        chosenCondiments.push(availableCondiments[index]);
        availableCondiments.splice(index, 1);
    }

    // STEP 3: CHOOSE INGREDIENTS
    let numIngredients = Math.floor(Math.random() * 5) + 1;
    let availableIngredients = [...data.ingredients];
    let chosenIngredients = [];
    for (let i = 0; i < numIngredients; i++) {
        let index = Math.floor(Math.random() * availableIngredients.length);
        chosenIngredients.push(availableIngredients[index]);
        availableIngredients.splice(index, 1);
    }

    // STEP 4: MAKE SANDWICH (single <ul>)
    makeSandwich(topBun, chosenIngredients, chosenCondiments, bottomBun);

    // SEPARATE: COUNT INGREDIENTS AND CONDIMENTS AND DISPLAY IT
    const ingredientCount = data.ingredients.length;
    const condimentCount = data.condiments.length;
    const totalCount = ingredientCount + condimentCount + 24;

    document.getElementById("ingredientCount").textContent = ingredientCount;
    document.getElementById("condimentCount").textContent = condimentCount;
    document.getElementById("totalCount").textContent = totalCount;
}

function makeSandwich(topBun, ingredients, condiments, bottomBun) {
    const sandwichContainer = document.getElementById("sandwich-list");
    if (!sandwichContainer) return;
    sandwichContainer.innerHTML = "";

    function renderItem(item, extraClass = "") {
        const li = document.createElement("li");
        li.textContent = item.name || item; // buns are strings

        // add "nobun" class if top or bottom bun is "none (open-faced)"
        if ((typeof item === "string" && item === "none (open-faced)") || (item.name === "none (open-faced)")) {
            li.classList.add("nobun");
        }

        // add color class if item has a color property
        if (item.color) {
            li.classList.add(item.color.toLowerCase().replace(/\s+/g, '-'));
        }

        // add any extra class passed (like "condiment-item")
        if (extraClass) {
            li.classList.add(extraClass);
        }

        sandwichContainer.appendChild(li); // append it to the container
    }

    // render in order
    renderItem(topBun);
    condiments.forEach(c => renderItem(c, "condiment-item"));
    ingredients.forEach(renderItem);
    renderItem(bottomBun);
}

init();

// SHARE SANDWICH IMAGE 73, 79, 113
async function exportSandwich() {
    const sandwich = document.getElementById('sandwich-list');
    if (!sandwich) return;

    // use html2canvas with background color and padding
    const canvas = await html2canvas(sandwich, {
        backgroundColor: '#1c2542',
        useCORS: false // don't try to load external images
    });

    // open generated image in a new tab
    const dataURL = canvas.toDataURL('image/png');
    const newTab = window.open();
    if (newTab) {
        const img = newTab.document.createElement('img');
        img.src = dataURL;
        newTab.document.body.appendChild(img);
    }
}

/* TOGGLE INFO */
const toggleBtn = document.getElementById("infoToggle");
const infoContent = document.getElementById("infoContent");
const list = document.getElementById("sandwich-list");
const closeBtn = document.getElementById("infoClose");
const sandwichBtn = document.getElementById("getSandwich");

function toggleInfo() {
    infoContent.classList.toggle("infoActive");
    list.classList.toggle("infoActive");
    sandwichBtn.classList.toggle("infoActive");
}

toggleBtn.addEventListener("click", toggleInfo);
closeBtn.addEventListener("click", () => {
    infoContent.classList.remove("infoActive");
    list.classList.remove("infoActive");
    sandwichBtn.classList.remove("infoActive");
});