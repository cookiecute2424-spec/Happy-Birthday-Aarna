const CORRECT_PASSWORD = "1110";
let enteredPassword = "";
let viewedWishesCount = 0;
let activeZoomElement = null;
let cakeStep = 0; 
let currentCarouselIndex = 0;

const wishes = [
    "Manifesting that we r always together even in pulse batch and sit one behind the other or with each other. 😜",
    "Hope we will go on horror, fun and breath-taking adventures together!!! 🎉🎉",
    "I hope we can do garba together!!!! Even though ik u r _____.",
    "Hope that u give me lots of chocolates 🤭💖😜",
    "Come to me if u ever want cat cuddles 😝😋",
    "Manifesting we get into the exact same college batch so i can copy off the smartest topper ik!!!! 😉😍😍"
];

const messages = [
    "I luv u sooooo much!!! Mwahhh 💋💋",
    "U bring so much happiness just by being yourself!!! 💖🎀",
    "On your birthday, I just want u to know how appreciated u are and how much u mean to me. 💖",
    "My book-reader, tomboy girlieee!! 💋💋",
    "Happy Birthday, Aarna! 🎉",
    "Thanks for always teaching me everything 1min before the exam. 🙏🏼🙏🏼"
];

/*==============================
        LOADING DISMISSAL
===============================*/
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = "0";
            setTimeout(() => loadingScreen.style.display = "none", 500);
        }, 1500);
    }
});

/*==============================
        MICRO SCALE ZOOMS
===============================*/
function triggerZoom(element, e) {
    if (e) e.stopPropagation();
    if (activeZoomElement && activeZoomElement !== element) {
        activeZoomElement.classList.remove("zoom-active");
    }
    element.classList.toggle("zoom-active");
    activeZoomElement = element.classList.contains("zoom-active") ? element : null;
}

document.addEventListener("pointerdown", () => {
    if (activeZoomElement) {
        activeZoomElement.classList.remove("zoom-active");
        activeZoomElement = null;
    }
});

/*==============================
        KEYPAD ENGINE
===============================*/
function pressKey(val) {
    const display = document.getElementById("passwordDisplay");
    const capyMessage = document.getElementById("capyMessage");
    if (display.innerText === "Enter PIN") display.innerText = "";

    if (val === "CLR") {
        enteredPassword = "";
        display.innerText = "Enter PIN";
        capyMessage.innerText = "I'm guarding the birthday surprise! 🐹";
    } else if (val === "DEL") {
        enteredPassword = enteredPassword.slice(0, -1);
        display.innerText = enteredPassword || "Enter PIN";
    } else if (enteredPassword.length < 4) {
        enteredPassword += val.toString(); // Forces string matching formatting constraints cleanly
        display.innerText = enteredPassword;
    }

    if (enteredPassword.length === 0) {
        capyMessage.innerText = "I'm guarding the birthday surprise! 🐹";
    } else if (enteredPassword === CORRECT_PASSWORD.substring(0, 1)) {
        capyMessage.innerText = "Good start! You found the first digit 🎀";
    } else if (enteredPassword === CORRECT_PASSWORD.substring(0, 2)) {
        capyMessage.innerText = "Almost there! Two digits unlocked ✨";
    } else if (enteredPassword === CORRECT_PASSWORD.substring(0, 3)) {
        capyMessage.innerText = "One more digit... you're so close! 💖";
    } else if (enteredPassword === CORRECT_PASSWORD) {
        capyMessage.innerText = "Yay!! You found the secret PIN! 🎉🐹";
    } else if (enteredPassword.length === 4) {
        capyMessage.innerText = "Oops... that's not the right path! Try again 🐹";
    }
}

/*==============================
        CODE ENTRY MATCH AND AUDIO PLAY
===============================*/
function verifyPasscode(e) {
    if (e) e.stopPropagation();
    const errorText = document.getElementById("wrongPassword");
    const display = document.getElementById("passwordDisplay");
    const audioTrack = document.getElementById("birthdayMusic");

    if (enteredPassword === CORRECT_PASSWORD) {
        // Direct fixed activation patch to force loop playback constraints immediately on unlock validation
        audioTrack.play().then(() => {
            console.log("Audio contextual connection launched successfully");
        }).catch(err => console.log("Audio track initialized behind explicit user click context layers", err));
        
        document.getElementById("passwordPage").style.display = "none";
        document.getElementById("cakeStagePage").style.display = "block";
    } else {
        errorText.innerText = "🐹 Oops... Try again ❤️";
        enteredPassword = "";
        display.innerText = "Enter PIN";
    }
}

/*==============================
        INTERACTIVE CAKE LOGIC
===============================*/
function handleCakeInteraction(e) {
    if (e) e.stopPropagation();
    const statusText = document.getElementById("cakeStatusText");
    const flames = document.getElementById("candleFlames");
    
    if (cakeStep === 0) {
        flames.innerHTML = '<span class="flame lit">🔥</span><span class="flame lit">🔥</span><span class="flame lit">🔥</span>';
        document.getElementById("cakeHeaderTitle").innerText = "Cut the Cake!!! 🍰✨";
        document.getElementById("cakeInstructions").innerText = "Tap the cake container box once more to cut it!!!";
        statusText.innerText = "Candles lit beautifully!!! 🔥";
        cakeStep = 1;
    } else if (cakeStep === 1) {
        flames.style.opacity = "0";
        document.getElementById("cakeVisual").innerText = "🍰✨🎉";
        statusText.innerText = "Cake cut perfectly!!! 🥳 Deploying your wishes layout...";
        cakeStep = 2;
        
        triggerConfettiShower();
        
        setTimeout(() => {
            document.getElementById("cakeStagePage").style.display = "none";
            document.getElementById("wishesStagePage").style.display = "block";
            revealWishesSequentially();
        }, 2200);
    }
}

function triggerConfettiShower() {
    const container = document.getElementById("confettiContainer");
    const colors = ["#ff4081", "#ff69b4", "#ffb6c1", "#7b68ee", "#ffeb3b", "#4caf50", "#2196f3"];
    
    for (let i = 0; i < 85; i++) {
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

/*==============================
        WISHES TILES TIMELINE
===============================*/
function revealWishesSequentially() {
    const container = document.getElementById("dynamicWishesContainer");
    let currentIdx = 0;

    function renderNextWish() {
        if (currentIdx < wishes.length) {
            const wishEl = document.createElement("div");
            wishEl.className = "cute-reveal-msg zoom-target visible-card";
            wishEl.innerHTML = `<div class="card-decor">✨📜✨</div><strong style="color:#ff4081; font-size:1.1rem; display:block; margin-bottom:5px;">Wish Card #${currentIdx + 1}</strong> ${wishes[currentIdx]}`;
            
            wishEl.onpointerdown = function(e) {
                e.stopPropagation();
                triggerZoom(this, e);
                if (!this.classList.contains("counted")) {
                    this.classList.add("counted");
                    viewedWishesCount++;
                    if (viewedWishesCount === wishes.length) {
                        document.getElementById("proceedToPicsBtn").style.display = "block";
                    }
                }
            };
            
            container.appendChild(wishEl);
            currentIdx++;
            setTimeout(renderNextWish, 1300);
        }
    }
    renderNextWish();
}

/*==============================
        CAROUSEL CONTROLLER SLIDER MECHANICS
===============================*/
function showPicsPage(e) {
    if (e) e.stopPropagation();
    document.getElementById("wishesStagePage").style.display = "none";
    document.getElementById("picsStagePage").style.display = "block";
    updateCarouselLayout();
}

function moveCarousel(direction, e) {
    if(e) e.stopPropagation();
    const totalImages = 5;
    currentCarouselIndex += direction;
    if (currentCarouselIndex >= totalImages) currentCarouselIndex = 0;
    if (currentCarouselIndex < 0) currentCarouselIndex = totalImages - 1;
    updateCarouselLayout();
}

function updateCarouselLayout() {
    const track = document.querySelector(".carouselTrack");
    if(!track) return;
    track.style.transform = `translateX(-${currentCarouselIndex * 310}px)`;
    
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentCarouselIndex);
    });
}

function showMessagesPage(e) {
    if (e) e.stopPropagation();
    document.getElementById("picsStagePage").style.display = "none";
    document.getElementById("messagesStagePage").style.display = "block";
    revealMessagesSequentially();
}

/*==============================
        MESSAGES TILES ENGINE
===============================*/
function revealMessagesSequentially() {
    const container = document.getElementById("dynamicMessagesContainer");
    let currentIdx = 0;

    function renderNextMessage() {
        if (currentIdx < messages.length) {
            const msgEl = document.createElement("div");
            msgEl.className = "cute-reveal-msg zoom-target visible-card custom-bubble";
            msgEl.innerHTML = `<div class="card-decor">💬💖</div>${messages[currentIdx]}`;
            
            msgEl.onpointerdown = function(e) {
