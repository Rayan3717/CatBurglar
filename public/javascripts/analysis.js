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
});

function openLogoutForm() {
    document.querySelector(".logout_overlay").style.display = "flex";
    document.getElementById("logout").style.display = "block";
}

function cancelLogout() {
    document.getElementById("logout").style.display = "none";
}