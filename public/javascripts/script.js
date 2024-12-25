var tl = gsap.timeline();

tl.to("#black", {
    height: "0vh",
    delay: 1,
    duration: 2,
    ease: Expo.easeInOut
})
    .to("#black h1", {
        y: -100,         // Move the text up off the screen
        duration: 2,
        ease: Expo.easeInOut
    }, "<");             // "<" ensures this animation starts at the same time as the previous one

tl.to("#ash", {
    height: "0vh",
    duration: 2,
    delay: -1.7,
    ease: Expo.easeInOut
}).then(() => {
    document.getElementById("signup-popup_reg").style.right = "20px";
});

gsap.to("signup-popup", {
    delay: 4,
    left: 20
});

const textElement = document.getElementById("text");
const phrases = ["Managing", "Tracking", "Monitoring"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 150; // Speed of typing in milliseconds
let deletingSpeed = 50; // Speed of deleting in milliseconds

function type() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        // Remove a character
        currentCharIndex--;
        textElement.textContent = currentPhrase.substring(0, currentCharIndex);
    } else {
        // Add a character
        currentCharIndex++;
        textElement.textContent = currentPhrase.substring(0, currentCharIndex);
    }

    // Check if we need to switch to deleting
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 1000); // Wait a second before starting to delete
    }

    // Check if we need to switch to typing
    if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to the next phrase
    }

    // Set the speed of typing or deleting
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
}

// Start the typing animation
type();

const inputs = document.querySelectorAll(".input");


function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}


inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

function showPopup() {
    document.getElementById('popupOverlay').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

function openLogoutForm() {
    document.querySelector(".logout_overlay").style.display = "flex";
    document.getElementById("logout").style.display = "block";
}

function cancelLogout() {
    document.getElementById("logout").style.display = "none";
}
