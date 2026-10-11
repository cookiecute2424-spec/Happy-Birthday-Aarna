const CORRECT_PIN = "1110";
let enteredPin = "";
let openedWishes = new Set();
let activeZoomElement = null;

const messages = [
    "I luv u sooooo much!!! Mwahhh 😜",
    "U bring so much happiness just by being yourself!!! 💖🎀",
    "On your birthday, I just want u to know how appreciated u are and how much u mean to me. 💖",
    "My book-reader, tomboy girlieee!! 💋💋",
    "Happy Birthday, Aarna! 🎉",
    "Thanks for always teaching me everything 1min before the exam. 🙏🏼🙏🏼"
];

const wishes = {
    1: "Manifesting that we r always together even in pulse batch and sit one behind the other or with each other. 😜",
    2: "Hope we will go on horror, fun and breath-taking adventures together!!! 🎉🎉",
    3: "I hope we can do garba together!!!! Even though ik u r _____.",
    4: "Hope that u give me lots of chocolates 🤭💖😜",
    5: "Come to me if u ever want cat cuddles 😝😋"
};

// RELIABLE INTERACTIVE ZOOM REGISTRATION FUNCTION
function triggerZoom(element) {
    if (activeZoomElement && activeZoomElement !== element) {
        activeZoomElement.classList.remove("zoom-active");
    }
    element.classList.toggle("zoom-active");
    activeZoomElement = element.classList.contains("zoom-active") ? element : null;
}

// RESET ZOOM IF USER TAPS OUTSIDE ELEMENTS
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("zoom-target") && !e.target.closest(".zoom-target") && activeZoomElement) {
        activeZoomElement.classList.remove("zoom-active");
        activeZoomElement = null;
    }
});

function pressKey(val) {
    const display = document.getElementById("passwordDisplay");
    if (display.innerText === "Enter PIN") display.innerText = "";

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

// STAGE 1: PIN MATCH & MUSIC TRIGGER AT ENTRY
function verifyPasscode(e) {
    if(e) e.stopPropagation();
    const errorText = document.getElementById("wrongPassword");
    const display = document.getElementById("passwordDisplay");
    const audioTrack = document.getElementById("birthdayMusic");

    if (enteredPin === CORRECT_PIN) {
        audioTrack.play().catch(err => console.log("Audio pipeline loaded safely", err));
        document.getElementById("passwordPage").style.display = "none";
        document.getElementById("cakeStagePage").style.display = "block";
    } else {
        errorText.innerText = "Wrong PIN!!! Try again";
        enteredPin = "";
        display.innerText = "Enter PIN";
    }
}

// STAGE 2: BLOWING OUT THE CAKE CANDLES
function blowCandles(e) {
    if(e) e.stopPropagation();
    document.getElementById("candleFlames").style.opacity = "0";
    document.getElementById("cakeStatusText").innerText = "Candles blown!!! ✨ Sending you your cards...";
    
    setTimeout(() => {
        document.getElementById("cakeStagePage").style.display = "none";
        document.getElementById("messageTimelinePage").style.display = "block";
        revealMessagesSequentially();
    }, 2000);
}

// STAGE 3: CUTE INCREMENTAL REVEAL STREAM FOR TEXT BLOCKS
function revealMessagesSequentially() {
    const container = document.getElementById("dynamicMessageContainer");
    let currentIdx = 0;

    function renderNextMessage() {
        if (currentIdx < messages.length) {
            const msgEl = document.createElement("p");
            msgEl.className = "cute-reveal-msg zoom-target";
            msgEl.innerText = messages[currentIdx];
            
            // Attaches zoom listening hooks to the message bubble on generation
            msgEl.onclick = function(e) {
                e.stopPropagation();
                triggerZoom(this);
            };
            
            container.appendChild(msgEl);
            setTimeout(() => msgEl.classList.add("visible"), 50);
            
            currentIdx++;
            setTimeout(renderNextMessage, 1500);
        } else {
            document.getElementById("proceedToHamperBtn").style.display = "block";
        }
    }
    renderNextMessage();
}

// STAGE 4: PHOTO MATRIX NAVIGATION
function showHamperPage(e) {
    if(e) e.stopPropagation();
    document.getElementById("messageTimelinePage").style.display = "none";
    document.getElementById("hamperPage").style.display = "block";
}

// STAGE 5: SEQUENTIAL POPUPS AND WISH VIEW LOGIC
function openWishBox(id, e) {
    if(e) e.stopPropagation();
    openedWishes.add(id);
    document.getElementById(`picBtn${id}`).classList.add("viewed");
    
    document.getElementById("modalTitle").innerText = `Wish #${id} 💖`;
    document.getElementById("modalText").innerText = wishes[id];
    document.getElementById("wishModal").style.display = "flex";

    if (openedWishes.size === 5) {
        const finalSlot = document.getElementById("finalGiftSlot");
        finalSlot.classList.remove("locked-state");
        finalSlot.classList.add("unlocked");
        document.getElementById("finalSlotSubtext").innerText = "Tap here to open your final gift !!! 🎉✨";
    }
}

function closeModalBox() {
    document.getElementById("wishModal").style.display = "none";
}

function openFinalWishBox(e) {
    if(e) e.stopPropagation();
    if (openedWishes.size < 5) return;
    document.getElementById("modalTitle").innerText = "Manifesting !!! 😉😍😍";
    document.getElementById("modalText").innerText = "Manifesting we get into the exact same college batch so i can copy off the smartest topper ik!!!!";
    document.getElementById("wishModal").style.display = "flex";
}
