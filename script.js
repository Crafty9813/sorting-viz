const container = document.getElementById("array-container");

let arr = [];
let sorting = false;

function generateArray() {
    container.innerHTML = "";
    arr = [];

    for (let i = 0; i < 50; i++) {
        const value = Math.floor(Math.random() * 300) + 20;
        arr.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;

        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    if (sorting) return;
    sorting = true;

    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-i-1; j++) {

            bars[j].style.background = "red";
            bars[j+1].style.background = "red";

            await sleep(30);

            if (arr[j] > arr[j+1]) {

                // Swap vals
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];

                // Swap heights
                bars[j].style.height = `${arr[j]}px`;
                bars[j+1].style.height = `${arr[j+1]}px`;
            }

            bars[j].style.background = "skyblue";
            bars[j+1].style.background = "skyblue";
        }

        bars[arr.length-i-1].style.background = "lime";

  }
  sorting = false;
}

async function insertionSort() {
    if (sorting) return;
    sorting = true;

    const bars = document.getElementsByClassName("bar");

    for (let i = 1; i < arr.length; i++) {

        let key = arr[i];
        let j = i - 1;

        bars[i].style.background = "yellow";

        await sleep(30);

        while (j >= 0 && arr[j] > key) {

            bars[j].style.background = "red";
            bars[j+1].style.background = "red";

            await sleep(30);

            arr[j+1] = arr[j];
            bars[j+1].style.height = `${arr[j+1]}px`;

            bars[j].style.background = "skyblue";
            bars[j+1].style.background = "skyblue";

            j--;
        }

        arr[j+1] = key;
        bars[j+1].style.height = `${key}px`;

        bars[i].style.background = "skyblue";
    }

    // Mark sorted
    for (let bar of bars) {
        bar.style.background = "lime";
    }

    sorting = false;
}

async function selectionSort() {
    if (sorting) return;
    sorting = true;

    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < arr.length - 1; i++) {

        let min_idx = i;
        bars[min_idx].style.background = "yellow";

        for(let j = i + 1; j < arr.length; j++) {
            bars[j].style.background = "red";

            await sleep(30);

            if (arr[j] < arr[min_idx]) {
                bars[min_idx].style.background = "skyblue";

                min_idx = j;

                bars[min_idx].style.background = "yellow";
            } else {
                bars[j].style.background = "skyblue";
            }
        }

        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];

        bars[i].style.height = `${arr[i]}px`;
        bars[min_idx].style.height = `${arr[min_idx]}px`;

        bars[min_idx].style.background = "skyblue";
        bars[i].style.background = "lime";
    }

    bars[arr.length - 1].style.background = "lime";
    sorting = false;
}

async function bogoSort() {
    if (sorting) return;
    sorting = true;

    const bars = document.getElementsByClassName("bar");

    while (!isSorted(arr)) {

        // Shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            // Bars being swapped
            bars[i].style.background = "red";
            bars[j].style.background = "yellow";

            await sleep(20);

            [arr[i], arr[j]] = [arr[j], arr[i]];

            // Update heights
            bars[i].style.height = `${arr[j]}px`;
            bars[j].style.height = `${arr[j]}px`;

            bars[i].style.background = "skyblue";
            bars[j].style.background = "skyblue";
        }
    }

    for (let i = 0; i < arr.length; i++) {
        bars[i].style.background = "lime";
    }

    sorting = false
}

function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}

generateArray();