// CONFIGURATION LOGIC
const CORRECT_PIN = "1110";
let enteredPin = "";
let openedWishes = new Set();

const wishes = {
    1: "hbd to the smartest bookworm ik!!! u literally top every single class",
    2: "u read 500 pages a day and still manage to be the coolest unbothered tomboy",
    3: "our vibe check is officially 100 percent matching forever buddy",
    4: "zero prayers or higher power needed cuz your own brain carries the room anyway",
    5: "close the textbooks for a few hours tonight so we can actually celebrate",
    6: "i wish we get into the exact same college batch so i can copy off u"
};

// INITIAL LOADING SCREEN DEACTIVATION
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loadingScreen").style.display = "none";
});

// KEYPAD EVENT LISTENERS
document.querySelectorAll(".key").forEach(button => {
    button.addEventListener("click", (e) => {
        const value = e.target.innerText;
        const display = document.getElementById("passwordDisplay");

        if (value === "CLR") {
            enteredPin = "";
            display.innerText = "Enter PIN";
        } else if (value === "⌫") {
            enteredPin = enteredPin.slice(0, -1);
            display.innerText = enteredPin || "Enter PIN";
        } else if (enteredPin.length < 4) {
            enteredPin += value;
            display.innerText = enteredPin;
        }
    });
});

// UNLOCK SEQUENCE AND MUSIC ACTIVATION
document.getElementById("unlockBtn").addEventListener("click", () => {
    const errorText = document.getElementById("wrongPassword");
    const audioTrack = document.getElementById("birthdayMusic");

    if (enteredPin === CORRECT_PIN) {
        document.getElementById("passwordPage").style.display = "none";
        document.getElementById("welcomePage").style.display = "block";
        
        // Starts the background audio file immediately upon validation
        audioTrack.play().catch(err => console.log("Autoplay context initialization skipped:", err));
    } else {
        errorText.innerText = "Wrong PIN!!! Try again";
        enteredPin = "";
        document.getElementById("passwordDisplay").innerText = "Enter PIN";
    }
});

// HAMPER NAVIGATION
document.getElementById("openHamper").addEventListener("click", () => {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("hamperPage").style.display = "block";
});

// MODAL CONTROLLERS FOR THE 6 WISHES
function openWish(id) {
    openedWishes.add(id);
    document.getElementById("modalTitle").innerText = `Wish #${id}`;
    document.getElementById("modalText").innerText = wishes[id];
    document.getElementById("wishModal").style.display = "flex";

    // Unlocks the final card slot dynamically if all 6 wishes have been viewed
    if (openedWishes.size === 6) {
        document.getElementById("finalGiftSlot").classList.remove("locked");
    }
}

function closeModal() {
    document.getElementById("wishModal").style.display = "none";
}

// FINAL FLOW GATEWAY
function openFinalWish() {
    if (openedWishes.size < 6) return;
    
    document.getElementById("modalTitle").innerText = "Happy Birthday Aarna!!!";
    document.getElementById("modalText").innerText = "i wish we get into the exact same college batch so i can copy off the smartest topper ik!!!! fr though i hope we never stop sharing good books having elite vibe checks and being the absolute chaotic duo we are. close the textbooks tonight cuz we are celebrating properly buddy";
    document.getElementById("wishModal").style.display = "flex";
    
    // Smoothly reveals the 5 custom photos container below the layout
    document.getElementById("memoryPage").style.display = "block";
}
