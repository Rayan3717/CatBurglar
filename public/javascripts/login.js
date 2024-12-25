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
        document.getElementById("signup-popup").style.left = "20px";
    });

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function showErrorPopup() {
    const error = getQueryParam('error');
    if (error) {
        const errorPopup = document.createElement('div');
        errorPopup.className = 'popup-overlay active';
        errorPopup.innerHTML = `
                <div class="popup-form">
                    <h3>Error</h3>
                    <p>${decodeURIComponent(error)}</p>
                    <button onclick="closeErrorPopup()">Close</button>
                </div>
            `;
        document.body.appendChild(errorPopup);
    }
}

function closeErrorPopup() {
    document.querySelector('.popup-overlay.active').remove();
}

window.onload = showErrorPopup;
