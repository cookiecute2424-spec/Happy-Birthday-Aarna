// CONFIGURATION LOGIC
const CORRECT_PIN = "1110";
const hintText = "Hint: Bday Date"; 
let enteredPin = "";
let openedWishes = new Set();

const wishes = {
    1: "Manifesting that we r always together even in pulse batch and sit one behind the other or with each other. 😜",
    2: "Hope we will go on horror, fun and breath-taking adventures together!!! 🎉🎉",
    3: "I hope we can do garba together!!!! Even though ik u r _____. 🙏🏼",
    4: "Hope that u give me lots of chocolates 🤭💖😜",
    5: "Come to me if u ever want cat cuddles 😝😋"
};

// INITIAL LOAD SETTINGS
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("hintTextDisplay").innerText = hintText;
    setupKeypad();
    setupPhotoButtons();
});

// ROBUST KEYPAD INTERACTION LOGIC (FIXED TAP DETECTION)
function setupKeypad() {
    const keys = document.querySelectorAll(".key");
    const display = document.getElementById("passwordDisplay");

    keys.forEach(button => {
        button.onclick = function(e) {
            e.preventDefault();
            const value = this.innerText;

            if (display.innerText === "Enter PIN") {
                display.innerText = "";
            }

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
        };
    });
}

// PASSCODE UNLOCK VALIDATION
document.getElementById("unlockBtn").onclick = function() {
    const errorText = document.getElementById("wrongPassword");
    const audioTrack = document.getElementById("birthdayMusic");

    if (enteredPin === CORRECT_PIN) {
        document.getElementById("passwordPage").style.display = "none";
        document.getElementById("welcomePage").style.display = "block";
        audioTrack.play().catch(err => console.log("Audio autoplay initialized safely", err));
    } else {
        errorText.innerText = "Wrong PIN!!! Try again";
        enteredPin = "";
        document.getElementById("passwordDisplay").innerText = "Enter PIN";
    }
};

// NAVIGATE TO HAMPER
document.getElementById("openHamper").onclick = function() {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("hamperPage").style.display = "block";
};

// SETUP INTERACTIVE PHOTO BUTTONS
function setupPhotoButtons() {
    for (let i = 1; i <= 5; i++) {
        const btn = document.getElementById(`picBtn${i}`);
        if (btn) {
            btn.onclick = function() {
                openWish(i);
                this.classList.add("viewed");
            };
        }
    }
    
    document.getElementById("modalCloseBtn").onclick = closeModal;
    
    document.getElementById("finalGiftSlot").onclick = function() {
        if (openedWishes.size >= 5) {
            openFinalWish();
        }
    };
}

function openWish(id) {
    openedWishes.add(id);
    document.getElementById("modalTitle").innerText = `Wish #${id}`;
    document.getElementById("modalText").innerText = wishes[id];
    document.getElementById("wishModal").style.display = "flex";

    if (openedWishes.size === 5) {
        const finalSlot = document.getElementById("finalGiftSlot");
        finalSlot.classList.add("unlocked");
    }
}

function closeModal() {
    document.getElementById("wishModal").style.display = "none";
}

function openFinalWish() {
    document.getElementById("modalTitle").innerText = "Manifesting !!! 😉😍😍";
    document.getElementById("modalText").innerText = "Manifesting we get into the exact same college batch so i can copy off the smartest topper ik!!!!";
    document.getElementById("wishModal").style.display = "flex";
}
