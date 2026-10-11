const CORRECT_PIN = "1110";
let enteredPin = "";
let openedWishes = new Set();

const wishes = {
    1: "Manifesting that we r always together even in pulse batch and sit one behind the other or with each other. 😜",
    2: "Hope we will go on horror, fun and breath-taking adventures together!!! 🎉🎉",
    3: "I hope we can do garba together!!!! Even though ik u r _____.",
    4: "Hope that u give me lots of chocolates 🤭💖😜",
    5: "Come to me if u ever want cat cuddles 😝😋"
};

// EXPLICIT GLOBAL KEYPAD FUNCTION
function pressKey(val) {
    const display = document.getElementById("passwordDisplay");

    if (display.innerText === "Enter PIN") {
        display.innerText = "";
    }

    if (val === "CLR") {
        enteredPin = "";
        display.innerText = "Enter PIN";
    } else if (val === "DEL") {
        enteredPin = enteredPin.slice(0, -1);
        display.innerText = enteredPin || "Enter PIN";
    } else if (enteredPin.length < 4) {
        enteredPin += val;
        display.innerText = enteredPin;
    }
}

// PASSCODE UNLOCK CONFIRMATION AND IMMEDIATE SONG STREAM INITIALIZATION
function verifyPasscode() {
    const errorText = document.getElementById("wrongPassword");
    const display = document.getElementById("passwordDisplay");
    const audioTrack = document.getElementById("birthdayMusic");

    if (enteredPin === CORRECT_PIN) {
        // FORCES TRACK ENGINE AUDIO INITIALIZATION IMMEDIATELY UPON PIN ENTRY MATCH
        audioTrack.play().then(() => {
            console.log("Audio streaming active");
        }).catch(err => {
            console.log("Audio auto-playback handled by user click", err);
        });

        document.getElementById("passwordPage").style.display = "none";
        document.getElementById("welcomePage").style.display = "block";
    } else {
        errorText.innerText = "Wrong PIN!!! Try again";
        enteredPin = "";
        display.innerText = "Enter PIN";
    }
}

function showHamperPage() {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("hamperPage").style.display = "block";
}

function openWishBox(id) {
    openedWishes.add(id);
    document.getElementById(`picBtn${id}`).classList.add("viewed");
    
    document.getElementById("modalTitle").innerText = `Wish #${id}`;
    document.getElementById("modalText").innerText = wishes[id];
    document.getElementById("wishModal").style.display = "flex";

    if (openedWishes.size === 5) {
        const finalSlot = document.getElementById("finalGiftSlot");
        finalSlot.classList.add("unlocked");
        finalSlot.querySelector("p").innerText = "Tap here to open your final gift !!!";
    }
}

function closeModalBox() {
    document.getElementById("wishModal").style.display = "none";
}

function openFinalWishBox() {
    if (openedWishes.size < 5) return;
    document.getElementById("modalTitle").innerText = "Manifesting !!! 😉😍😍";
    document.getElementById("modalText").innerText = "Manifesting we get into the exact same college batch so i can copy off the smartest topper ik!!!!";
    document.getElementById("wishModal").style.display = "flex";
}
