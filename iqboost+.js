function animateButton(button) {
    button.style.transform = "scale(1.1)";
    setTimeout(() => {
        button.style.transform = "scale(1)";
    }, 200);
}