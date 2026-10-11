const CORRECT_PIN = "1110";
let enteredPin = "";
let openedWishes = new Set();
let activeZoomElement = null;
let cakeStep = 0; 

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

// INITIALIZE CANVAS KEYPAD LAYOUT MATRIX
window.addEventListener("DOMContentLoaded", () => {
    drawCanvasKeypad();
    setupCanvasClickEngine();
});

const buttonsLayout = [
    { label: "1", x: 10, y: 10, w: 80, h: 80 },
    { label: "2", x: 110, y: 10, w: 80, h: 80 },
    { label: "3", x: 210, y: 10, w: 80, h: 80 },
    { label: "4", x: 10, y: 110, w: 80, h: 80 },
    { label: "5", x: 110, y: 110, w: 80, h: 80 },
    { label: "6", x: 210, y: 110, w: 80, h: 80 },
    { label: "7", x: 10, y: 210, w: 80, h: 80 },
    { label: "8", x: 110, y: 210, w: 80, h: 80 },
    { label: "9", x: 210, y: 210, w: 80, h: 80 },
    { label: "CLR", x: 10, y: 310, w: 80, h: 80, special: "clr" },
    { label: "0", x: 110, y: 310, w: 80, h: 80 },
    { label: "⌫", x: 210, y: 310, w: 80, h: 80, special: "del" }
];

function drawCanvasKeypad() {
    const canvas = document.getElementById("canvasKeypad");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    buttonsLayout.forEach(btn => {
        // Render Button Backdrop
        ctx.fillStyle = btn.special === "clr" ? "#ff758c" : (btn.special === "del" ? "#afb3c2" : "#ffffff");
        ctx.beginPath();
        ctx.roundRect(btn.x, btn.y, btn.w, btn.h, 18);
        ctx.fill();

        // Render Button Label
        ctx.fillStyle = (btn.special === "clr" || btn.special === "del") ? "#ffffff" : "#ff5599";
        ctx.font = "bold 24px Fredoka, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
    });
}

function setupCanvasClickEngine() {
    const canvas = document.getElementById("canvasKeypad");
    if (!canvas) return;

    function handleInteraction(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (clientX - rect.left) * scaleX;
        const clickY = (clientY - rect.top) * scaleY;

        buttonsLayout.forEach(btn => {
            if (clickX >= btn.x && clickX <= btn.x + btn.w && clickY >= btn.y && clickY <= btn.y + btn.h) {
                processCanvasInput(btn.label);
            }
        });
    }

    canvas.addEventListener("click", (e) => {
        e.preventDefault();
        handleInteraction(e.clientX, e.clientY);
    });

    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleInteraction(touch.clientX, touch.clientY);
    }, { passive: false });
}

function processCanvasInput(label) {
    const display = document.getElementById("passwordDisplay");
    if (display.innerText === "Enter PIN") display.innerText = "";

    if (label === "CLR") {
        enteredPin = "";
        display.innerText = "Enter PIN";
    } else if (label === "⌫") {
        enteredPin = enteredPin.slice(0, -1);
        display.innerText = enteredPin || "Enter PIN";
    } else if (enteredPin.length < 4) {
        enteredPin += (label === "0" ? "0" : label);
        display.innerText = enteredPin;
    }
}

// ZOOM MANAGER (RESTRICTED TO EXCLUDE CONTROLS FROM CANVAS INPUT ENTRIES)
function triggerZoom(element, e) {
    if(e) e.stopPropagation();
    if (activeZoomElement && activeZoomElement !== element) {
        activeZoomElement.classList.remove("zoom-active");
    }
    element.classList.toggle("zoom-active");
    activeZoomElement = element.classList.contains("zoom-active") ? element : null;
}

document.addEventListener("click", () => {
    if (activeZoomElement) {
        activeZoomElement.classList.remove("zoom-active");
        activeZoomElement = null;
    }
});

function verifyPasscode(e) {
    if(e) e.stopPropagation();
    const errorText = document.getElementById("wrongPassword");
    const display = document.getElementById("passwordDisplay");
    const audioTrack = document.getElementById("birthdayMusic");

    if (enteredPin === CORRECT_PIN) {
        audioTrack.play().catch(err => console.log("Audio contextual playback handled safely", err));
        document.getElementById("passwordPage").style.display = "none";
        document.getElementById("cakeStagePage").style.display = "block";
    } else {
        errorText.innerText = "Wrong PIN!!! Try again";
        enteredPin = "";
        display.innerText = "Enter PIN";
    }
}

function handleCakeInteraction(e) {
    if(e) e.stopPropagation();
    const statusText = document.getElementById("cakeStatusText");
    const flames = document.getElementById("candleFlames");
    
    if (cakeStep === 0) {
        flames.innerHTML = '<span class="flame lit">🔥</span><span class="flame lit">🔥</span><span class="flame lit">🔥</span>';
        document.getElementById("cakeHeaderTitle").innerText = "Cut the Cake!!! 🍰✨";
        document.getElementById("cakeInstructions").innerText = "Tap the cake box one more time to cut it!!!";
        statusText.innerText = "Candles lit beautifully!!! 🔥";
        cakeStep = 1;
    } else if (cakeStep === 1) {
        flames.style.opacity = "0";
        document.getElementById("cakeVisual").innerText = "🍰✨🎉";
        statusText.innerText = "Cake cut perfectly!!! 🥳 Deploying surprise text stream...";
        cakeStep = 2;
        
        triggerConfettiShower();
        
        setTimeout(() => {
            document.getElementById("cakeStagePage").style.display = "none";
            document.getElementById("messageTimelinePage").style.display = "block";
            revealMessagesSequentially();
        }, 2200);
    }
}

function triggerConfettiShower() {
    const container = document.getElementById("confettiContainer");
    const colors = ["#ff4081", "#ff69b4", "#ffb6c1", "#7b68ee", "#ffeb3b", "#4caf50", "#2196f3"];
    
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (Math.random() * 2 + 1.5) + "s";
        piece.style.animationDelay = (Math.random() * 0.4) + "s";
        piece.style.width = piece.style.height = (Math.random() * 8 + 6) + "px";
        container.appendChild(piece);
    }
}

function revealMessagesSequentially() {
    const container = document.getElementById("dynamicMessageContainer");
    let currentIdx = 0;

    function renderNextMessage() {
        if (currentIdx < messages.length) {
            const msgEl = document.createElement("p");
            msgEl.className = "cute-reveal-msg zoom-target";
            msgEl.innerText = messages[currentIdx];
            
            msgEl.onclick = function(e) {
                e.stopPropagation();
                triggerZoom(this, e);
            };
            
            container.appendChild(msgEl);
            setTimeout(() => msgEl.classList.add("visible"), 50);
            
            currentIdx++;
            setTimeout(renderNextMessage, 1400);
        } else {
            document.getElementById("proceedToHamperBtn").style.display = "block";
        }
    }
    renderNextMessage();
}

function showHamperPage(e) {
    if(e) e.stopPropagation();
    document.getElementById("messageTimelinePage").style.display = "none";
    document.getElementById("hamperPage").style.display = "block";
}

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
