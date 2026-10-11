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

// DIRECT HARDWARE INTERCEPT ENGINE FOR RELIABLE CLICK TRACKING
window.addEventListener("DOMContentLoaded", () => {
    setupKeypadHandlers();
    setupHamperHandlers();
});

function setupKeypadHandlers() {
    const display = document.getElementById("passwordDisplay");
    const keys = document.querySelectorAll(".key");

    keys.forEach(key => {
        key.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const keyValue = this.innerText.trim();

            if (display.innerText === "Enter PIN") {
                display.innerText = "";
            }

            if (keyValue === "CLR") {
                enteredPin = "";
                display.innerText = "Enter PIN";
            } else if (keyValue === "⌫") {
                enteredPin = enteredPin.slice(0, -1);
                display.innerText = enteredPin || "Enter PIN";
            } else if (enteredPin.length < 4) {
                enteredPin += keyValue;
                display.innerText = enteredPin;
            }
        });
    });

    // PASSCODE VALIDATION AND AUDIO TRIGGER INITIALIZATION
    document.getElementById("unlockBtn").addEventListener("click", (e) => {
        e.preventDefault();
        const errorText = document.getElementById("wrongPassword");
        const audioTrack = document.getElementById("birthdayMusic");

        if (enteredPin === CORRECT_PIN) {
            // INSTANTLY RUNS AND BOOTS UP THE AUDIO SONG TRACK FILE
            audioTrack.play().then(() => {
                console.log("Audio pipeline launched successfully");
            }).catch(err => {
                console.log("Forcing web audio track context backup initialization", err);
            });

            document.getElementById("passwordPage").style.display = "none";
            document.getElementById("welcomePage").style.display = "block";
        } else {
            errorText.innerText = "Wrong PIN!!! Try again";
            enteredPin = "";
            display.innerText = "Enter PIN";
        }
    });
}

function setupHamperHandlers() {
    document.getElementById("openHamper").addEventListener("click", () => {
        document.getElementById("welcomePage").style.display = "none";
        document.getElementById("hamperPage").style.display = "block";
    });

    for (let i = 1; i <= 5; i++) {
        const imgBtn = document.getElementById(`picBtn${i}`);
        if (imgBtn) {
            imgBtn.addEventListener("click", function() {
                openWishBox(i);
                this.classList.add("viewed");
            });
        }
    }

    document.getElementById("modalCloseBtn").addEventListener("click", () => {
        document.getElementById("wishModal").style.display = "none";
    });

    document.getElementById("finalGiftSlot").addEventListener("click", function() {
        if (openedWishes.size >= 5) {
            document.getElementById("modalTitle").innerText = "Manifesting !!! 😉😍😍";
            document.getElementById("modalText").innerText = "Manifesting we get into the exact same college batch so i can copy off the smartest topper ik!!!!";
            document.getElementById("wishModal").style.display = "flex";
        }
    });
}

function openWishBox(id) {
    openedWishes.add(id);
    document.getElementById("modalTitle").innerText = `Wish #${id}`;
    document.getElementById("modalText").innerText = wishes[id];
    document.getElementById("wishModal").style.display = "flex";

    if (openedWishes.size === 5) {
        const finalSlot = document.getElementById("finalGiftSlot");
        finalSlot.classList.add("unlocked");
        finalSlot.querySelector("p").innerText = "Tap here to open your final gift !!!";
    }
}
