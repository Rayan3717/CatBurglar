var tl = gsap.timeline();

tl.to("#black", {
    height: "0vh",
    duration: 2,
    ease: Expo.easeInOut
})
    .to("#black h1", {
        y: -100,         // Move the text up off the screen
        duration: 2,
        ease: Expo.easeInOut
    }, "<")
    .to("#ash", {
        height: "0vh",
        duration: 2,
        delay: -1.7,
        ease: Expo.easeInOut
    }).then(() => {
        document.getElementById("signup-popup_reg").style.right = "20px";
    });

gsap.to("signup-popup", {
    delay: 4,
    right: 20
});