// ------------------- LOAD DATA -------------------
async function loadData() {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error("Could not load data.json");
    return res.json();
}

// ------------------- HELPERS -------------------
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ------------------- MAKE SANDWICH -------------------
function makeSandwich(topBun, ingredients, condiments, bottomBun) {
    const sandwichContainer = document.getElementById("sandwich-list");
    if (!sandwichContainer) return;

    sandwichContainer.innerHTML = "";

    function renderItem(item, extraClass = "") {
        const li = document.createElement("li");
        li.textContent = item.name || item; // buns are strings

        // Add class for "none (open-faced)" buns
        if ((typeof item === "string" && item === "none (open-faced)") ||
            (item.name === "none (open-faced)")) {
            li.classList.add("nobun");
        }

        // Add color class if item has color
        if (item.color) {
            li.classList.add(item.color.toLowerCase().replace(/\s+/g, '-'));
        }

        // Add any extra class (like condiments)
        if (extraClass) li.classList.add(extraClass);

        sandwichContainer.appendChild(li);
    }

    // Render order: top bun, condiments, ingredients, bottom bun
    renderItem(topBun);
    condiments.forEach(c => renderItem(c, "condiment-item"));
    ingredients.forEach(renderItem);
    renderItem(bottomBun);
}

// ------------------- INIT -------------------
async function init() {
    const data = await loadData();
    const buns = data.buns;

    // ------------------- 1. CHOOSE BUNS -------------------
    let topBun = getRandomItem(buns);

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

    // ------------------- 2. CHOOSE CONDIMENTS -------------------
    let numCondiments = Math.floor(Math.random() * 4);
    let availableCondiments = [...data.condiments];
    let chosenCondiments = [];
    for (let i = 0; i < numCondiments; i++) {
        let index = Math.floor(Math.random() * availableCondiments.length);
        chosenCondiments.push(availableCondiments[index]);
        availableCondiments.splice(index, 1);
    }

    // ------------------- 3. CHOOSE INGREDIENTS -------------------
    let numIngredients = Math.floor(Math.random() * 5) + 1;
    let availableIngredients = [...data.ingredients];
    let chosenIngredients = [];
    for (let i = 0; i < numIngredients; i++) {
        let index = Math.floor(Math.random() * availableIngredients.length);
        chosenIngredients.push(availableIngredients[index]);
        availableIngredients.splice(index, 1);
    }

    // ------------------- 4. RENDER SANDWICH -------------------
    makeSandwich(topBun, chosenIngredients, chosenCondiments, bottomBun);

    // ------------------- DISPLAY COUNTS -------------------
    const ingredientCount = data.ingredients.length;
    const condimentCount = data.condiments.length;
    const bunCount = buns.length;
    const totalCount = ingredientCount + condimentCount + bunCount;

    const ingredientSpan = document.getElementById("ingredientCount");
    const condimentSpan = document.getElementById("condimentCount");
    const bunSpan = document.getElementById("bunCount");
    const totalSpan = document.getElementById("totalCount");

    if (ingredientSpan) ingredientSpan.textContent = ingredientCount;
    if (condimentSpan) condimentSpan.textContent = condimentCount;
    if (bunSpan) bunSpan.textContent = bunCount;
    if (totalSpan) totalSpan.textContent = totalCount;
}

// ------------------- EXPORT SANDWICH IMAGE -------------------
async function exportSandwich() {
    const sandwich = document.getElementById('sandwich-list');
    if (!sandwich) return;

    const canvas = await html2canvas(sandwich, {
        backgroundColor: '#1c2542',
        padding: 16 // example padding
    });

    const dataURL = canvas.toDataURL('image/png');
    const newTab = window.open();
    if (newTab) {
        const img = newTab.document.createElement('img');
        img.src = dataURL;
        newTab.document.body.appendChild(img);
    }
}

// ------------------- TOGGLE INFO -------------------
function setupToggleInfo() {
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

    if (toggleBtn) toggleBtn.addEventListener("click", toggleInfo);
    if (closeBtn) closeBtn.addEventListener("click", () => {
        infoContent.classList.remove("infoActive");
        list.classList.remove("infoActive");
        sandwichBtn.classList.remove("infoActive");
    });
}

// ------------------- START -------------------
document.addEventListener("DOMContentLoaded", () => {
    init();
    setupToggleInfo();
    const sandwichBtn = document.getElementById("getSandwich");
    if (sandwichBtn) {
        sandwichBtn.addEventListener("click", async () => {
            // just re-run init or the part that generates a new sandwich
            const data = await loadData();

            const buns = data.buns;
            let topBun = getRandomItem(buns);
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

            let numCondiments = Math.floor(Math.random() * 4);
            let availableCondiments = [...data.condiments];
            let chosenCondiments = [];
            for (let i = 0; i < numCondiments; i++) {
                let index = Math.floor(Math.random() * availableCondiments.length);
                chosenCondiments.push(availableCondiments[index]);
                availableCondiments.splice(index, 1);
            }

            let numIngredients = Math.floor(Math.random() * 5) + 1;
            let availableIngredients = [...data.ingredients];
            let chosenIngredients = [];
            for (let i = 0; i < numIngredients; i++) {
                let index = Math.floor(Math.random() * availableIngredients.length);
                chosenIngredients.push(availableIngredients[index]);
                availableIngredients.splice(index, 1);
            }

            makeSandwich(topBun, chosenIngredients, chosenCondiments, bottomBun);
        });
    }
});
