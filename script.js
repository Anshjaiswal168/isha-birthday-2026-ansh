/* =========================================================
   ISHA BIRTHDAY UNIVERSE
   SCRIPT.JS — FINAL VERSION
   PASSWORD: 2026/09/03
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURATION
   ========================================================= */

const BirthdayApp = {

    password: "2026/09/03",

    birthday: {
        name: "Isha",
        nickname: "Gungun",
        date: "03 September 2026",
        age: 18
    },

    developer: "Ansh Jaiswal",

    photos: [
        "photos/photo1.jpg",
        "photos/photo2.jpg",
        "photos/photo3.jpg",
        "photos/photo4.jpg",
        "photos/photo5.jpg",
        "photos/photo6.jpg"
    ]

};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const loginScreen = document.getElementById("loginScreen");
const mainWebsite = document.getElementById("mainWebsite");

const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const togglePassword = document.getElementById("togglePassword");
const loginError = document.getElementById("loginError");

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

const confettiButton = document.getElementById("confettiButton");
const finalCelebrate = document.getElementById("finalCelebrate");

const giftBox = document.getElementById("giftBox");
const surpriseMessage = document.getElementById("surpriseMessage");

const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeModal = document.getElementById("closeModal");

const notificationContainer =
    document.getElementById("notificationContainer");

const backToTop =
    document.getElementById("backToTop");

const chatInput =
    document.getElementById("chatInput");

const sendChat =
    document.getElementById("sendChat");

const chatMessages =
    document.getElementById("chatMessages");


/* =========================================================
   LOGIN SYSTEM
   ========================================================= */

function checkLogin() {

    const savedLogin =
        sessionStorage.getItem("ishaBirthdayUnlocked");

    if (savedLogin === "true") {

        unlockWebsite(false);

    } else {

        showLogin();

    }

}


function showLogin() {

    if (loginScreen) {
        loginScreen.classList.remove("hidden");
    }

    if (mainWebsite) {
        mainWebsite.classList.add("hidden");
    }

    document.body.style.overflow = "hidden";
}


function unlockWebsite(showWelcome = true) {

    if (loginScreen) {

        loginScreen.style.opacity = "0";
        loginScreen.style.transform = "scale(1.03)";

        setTimeout(() => {

            loginScreen.classList.add("hidden");

        }, 500);
    }

    if (mainWebsite) {

        mainWebsite.classList.remove("hidden");

    }

    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";

    sessionStorage.setItem(
        "ishaBirthdayUnlocked",
        "true"
    );

    if (showWelcome) {

        setTimeout(() => {

            showNotification(
                "Welcome to Isha's Birthday Universe ✨",
                "success"
            );

            createConfetti(100);

        }, 600);

    }

}


function attemptLogin() {

    if (!passwordInput) return;

    const enteredPassword =
        passwordInput.value.trim();

    if (enteredPassword === BirthdayApp.password) {

        loginError.textContent = "";

        unlockWebsite(true);

    } else {

        loginError.textContent =
            "Incorrect password. Try again ✨";

        passwordInput.classList.add("shake");

        showNotification(
            "Wrong password 🔐",
            "error"
        );

        setTimeout(() => {

            passwordInput.classList.remove("shake");

        }, 500);

    }

}


if (loginButton) {

    loginButton.addEventListener(
        "click",
        attemptLogin
    );

}


if (passwordInput) {

    passwordInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                attemptLogin();

            }

        }
    );

}


if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.textContent = "🙈";

            } else {

                passwordInput.type = "password";

                togglePassword.textContent = "👁";

            }

        }
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "mobile-open"
            );

            menuButton.textContent =
                mobileMenu.classList.contains("mobile-open")
                    ? "✕"
                    : "☰";

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "mobile-open"
                    );

                    menuButton.textContent = "☰";

                }
            );

        });

}


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   NOTIFICATION SYSTEM
   ========================================================= */

function showNotification(
    message,
    type = "info",
    duration = 3500
) {

    if (!notificationContainer) return;

    const notification =
        document.createElement("div");

    notification.className =
        `birthday-notification ${type}`;

    let icon = "✨";

    if (type === "success") {
        icon = "🎉";
    }

    if (type === "error") {
        icon = "⚠️";
    }

    if (type === "birthday") {
        icon = "🎂";
    }

    notification.innerHTML = `

        <div class="notification-icon">
            ${icon}
        </div>

        <div class="notification-content">
            <strong>
                Gungun Universe
            </strong>

            <span>
                ${message}
            </span>
        </div>

        <button
            class="notification-close"
            type="button"
        >
            ×
        </button>

    `;

    notificationContainer.appendChild(
        notification
    );

    requestAnimationFrame(() => {

        notification.classList.add("show");

    });

    const closeButton =
        notification.querySelector(
            ".notification-close"
        );

    closeButton.addEventListener(
        "click",
        () => {

            removeNotification(
                notification
            );

        }
    );

    const timer =
        setTimeout(() => {

            removeNotification(
                notification
            );

        }, duration);

    notification.addEventListener(
        "mouseenter",
        () => {

            clearTimeout(timer);

        }
    );

}


function removeNotification(notification) {

    notification.classList.remove("show");

    setTimeout(() => {

        notification.remove();

    }, 400);

}


/* =========================================================
   WELCOME NOTIFICATION
   ========================================================= */

function birthdayWelcome() {

    setTimeout(() => {

        showNotification(
            "A beautiful birthday universe is waiting for you 🎂✨",
            "birthday",
            5000
        );

    }, 1500);

}


/* =========================================================
   CONFETTI
   ========================================================= */

function createConfetti(amount = 80) {

    const layer =
        document.getElementById(
            "celebrationLayer"
        );

    if (!layer) return;

    const symbols = [
        "✨",
        "⭐",
        "💖",
        "🎉",
        "🎊",
        "🌸",
        "💫"
    ];

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.top =
            "-30px";

        piece.style.fontSize =
            (10 + Math.random() * 18) + "px";

        piece.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            (Math.random() * 0.8) + "s";

        layer.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 6000);

    }

}


if (confettiButton) {

    confettiButton.addEventListener(
        "click",
        () => {

            createConfetti(120);

            showNotification(
                "Birthday magic activated! 🎉✨",
                "success"
            );

        }
    );

}


if (finalCelebrate) {

    finalCelebrate.addEventListener(
        "click",
        () => {

            createConfetti(180);

            showNotification(
                "Happy 18th Birthday, Isha! 🎂💖",
                "birthday",
                6000
            );

        }
    );

}


/* =========================================================
   BACKGROUND PARTICLES
   ========================================================= */

function createParticles() {

    const container =
        document.getElementById(
            "particles"
        );

    if (!container) return;

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (8 + Math.random() * 15) + "s";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        particle.style.opacity =
            0.2 + Math.random() * 0.6;

        container.appendChild(
            particle
        );

    }

}


/* =========================================================
   BACKGROUND STARS
   ========================================================= */

function createStars() {

    const container =
        document.getElementById(
            "backgroundStars"
        );

    if (!container) return;

    for (let i = 0; i < 80; i++) {

        const star =
            document.createElement("span");

        star.className = "background-star";

        star.textContent =
            Math.random() > 0.8
                ? "✦"
                : "•";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        star.style.animationDuration =
            (2 + Math.random() * 5) + "s";

        container.appendChild(star);

    }

}


/* =========================================================
   PHOTO GALLERY
   ========================================================= */

function setupGallery() {

    const photoCards =
        document.querySelectorAll(
            ".photo-card"
        );

    photoCards.forEach(
        (card, index) => {

            const image =
                card.querySelector("img");

            if (!image) return;

            image.src =
                BirthdayApp.photos[index];

            image.addEventListener(
                "error",
                () => {

                    card.classList.add(
                        "photo-missing"
                    );

                    image.alt =
                        "Photo " +
                        (index + 1) +
                        " not found";

                }
            );


            card.addEventListener(
                "click",
                () => {

                    openPhoto(
                        BirthdayApp.photos[index],
                        index + 1
                    );

                }
            );

        }
    );

}


function openPhoto(
    source,
    number
) {

    if (!photoModal || !modalImage)
        return;

    modalImage.src = source;

    if (modalCaption) {

        modalCaption.textContent =
            `Memory ${String(number).padStart(2, "0")} ✦ Isha`;

    }

    photoModal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closePhoto() {

    if (!photoModal) return;

    photoModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "auto";

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closePhoto
    );

}


if (photoModal) {

    photoModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                photoModal
            ) {

                closePhoto();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            photoModal &&
            photoModal.classList.contains("active")
        ) {

            closePhoto();

        }

    }
);


/* =========================================================
   GIFT SURPRISE
   ========================================================= */

if (giftBox) {

    giftBox.addEventListener(
        "click",
        () => {

            if (surpriseMessage) {

                surpriseMessage.classList.remove(
                    "hidden"
                );

                surpriseMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

            createConfetti(150);

            showNotification(
                "You found the secret birthday surprise! 🎁💖",
                "birthday",
                6000
            );

            giftBox.classList.add(
                "gift-opened"
            );

        }
    );

}


/* =========================================================
   AI CHAT
   ========================================================= */

const aiResponses = {

    birthday: `
        Your birthday is <strong>03 September 2026</strong> 🎂✨
        That's your special 18th birthday!
    `,

    developer: `
        This birthday universe was designed and developed by
        <strong>Ansh Jaiswal</strong> 👨‍💻✨
    `,

    chapter: `
        Chapter 18 is all about new memories, new dreams,
        new experiences and countless possibilities. 🌸✨
    `,

    wish: `
        Happy 18th Birthday, Gungun! 🎂💖
        May your year be filled with happiness,
        success, beautiful memories and lots of reasons to smile.
    `,

    family: `
        Your family wishes you happiness, confidence,
        success and a beautiful future. ❤️
    `,

    website: `
        This is your personal birthday universe —
        with memories, wishes, family messages,
        photos, surprises and a little birthday AI. 🌌✨
    `,

    greeting: `
        Hey Gungun! 👋✨
        Welcome back to your birthday universe.
    `

};


function getAIResponse(question) {

    const text =
        question.toLowerCase();

    if (
        text.includes("birthday") ||
        text.includes("born") ||
        text.includes("date")
    ) {

        return aiResponses.birthday;

    }

    if (
        text.includes("developer") ||
        text.includes("created") ||
        text.includes("made") ||
        text.includes("who made")
    ) {

        return aiResponses.developer;

    }

    if (
        text.includes("18") ||
        text.includes("chapter")
    ) {

        return aiResponses.chapter;

    }

    if (
        text.includes("wish") ||
        text.includes("wishes")
    ) {

        return aiResponses.wish;

    }

    if (
        text.includes("mom") ||
        text.includes("dad") ||
        text.includes("family")
    ) {

        return aiResponses.family;

    }

    if (
        text.includes("website") ||
        text.includes("universe")
    ) {

        return aiResponses.website;

    }

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return aiResponses.greeting;

    }

    return `
        That's a beautiful question, Gungun! ✨
        Remember — this entire little universe was created
        specially for your 18th birthday. 🎂💖
    `;

}


function addChatMessage(
    message,
    type = "ai"
) {

    if (!chatMessages) return;

    const messageElement =
        document.createElement("div");

    messageElement.className =
        `message ${type === "user"
            ? "user-message"
            : "ai-message"}`;

    messageElement.innerHTML = `
        <div>
            ${message}
        </div>
    `;

    chatMessages.appendChild(
        messageElement
    );

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


function sendAIMessage() {

    if (!chatInput) return;

    const question =
        chatInput.value.trim();

    if (!question) return;

    addChatMessage(
        question,
        "user"
    );

    chatInput.value = "";

    const typing =
        document.createElement("div");

    typing.className =
        "message ai-message typing-message";

    typing.innerHTML =
        "Gungun AI is thinking... ✨";

    chatMessages.appendChild(
        typing
    );

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    setTimeout(
        () => {

            typing.remove();

            addChatMessage(
                getAIResponse(question),
                "ai"
            );

        },
        700
    );

}


if (sendChat) {

    sendChat.addEventListener(
        "click",
        sendAIMessage
    );

}


if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter"
            ) {

                sendAIMessage();

            }

        }
    );

}


/* =========================================================
   QUICK AI PROMPTS
   ========================================================= */

document
    .querySelectorAll(
        ".quick-prompts button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const prompt =
                    button.dataset.prompt;

                if (!prompt) return;

                if (chatInput) {

                    chatInput.value =
                        prompt;

                    sendAIMessage();

                }

            }
        );

    });


/* =========================================================
   BACK TO TOP
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupRevealAnimation() {

    const elements =
        document.querySelectorAll(
            ".section-container > *, " +
            ".story-card, " +
            ".photo-card, " +
            ".parent-card, " +
            ".wish-item, " +
            ".memory-item, " +
            ".stat-card, " +
            ".letter-card"
        );

    if (!("IntersectionObserver" in window)) {

        elements.forEach(
            element => {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

        return;

    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );

    elements.forEach(
        element => {

            element.classList.add(
                "reveal-element"
            );

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   CURSOR GLOW
   ========================================================= */

function setupCursorGlow() {

    const glow =
        document.createElement("div");

    glow.className =
        "cursor-glow";

    document.body.appendChild(
        glow
    );

    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                event.clientX + "px";

            glow.style.top =
                event.clientY + "px";

        }
    );

}


/* =========================================================
   DOUBLE CLICK CELEBRATION
   ========================================================= */

document.addEventListener(
    "dblclick",
    () => {

        if (
            mainWebsite &&
            !mainWebsite.classList.contains("hidden")
        ) {

            createConfetti(50);

        }

    }
);


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkLogin();

        createParticles();

        createStars();

        setupGallery();

        setupRevealAnimation();

        setupCursorGlow();

        birthdayWelcome();

    }
);


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%c✨ ISHA BIRTHDAY UNIVERSE ✨",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "%cCreated by Ansh Jaiswal",
    "font-size:14px;"
);

console.log( 

    "%cBirthday: 03 September 2026",
    "font-size:14px;"
);


