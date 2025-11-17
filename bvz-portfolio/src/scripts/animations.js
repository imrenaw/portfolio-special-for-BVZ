// This file contains the JavaScript logic for handling animations of the "BVZ" typography and transitions between sections as the user scrolls.

document.addEventListener("DOMContentLoaded", () => {
    const bvzText = document.querySelector(".bvz-text");
    const sections = document.querySelectorAll("section");
    
    // Animation for the "BVZ" typography
    const animateBVZ = () => {
        bvzText.classList.add("animate");
    };

    // Scroll event listener for section transitions
    const handleScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.75) {
                section.classList.add("visible");
            } else {
                section.classList.remove("visible");
            }
        });
    };

    // Initial animation on load
    animateBVZ();

    // Smooth scroll effect
    window.addEventListener("scroll", handleScroll);
});