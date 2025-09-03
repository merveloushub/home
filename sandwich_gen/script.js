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

// Initialize
init();
document.getElementById("getSandwich").addEventListener("click", init);