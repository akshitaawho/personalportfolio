document.addEventListener("DOMContentLoaded", () => {
    // cool navbar effect

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) { 
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // constant typing my name

    const text = "Hi, I'm Akshitaa!";
    const typingSpeed = 80;
    const pauseTime = 2000;
    const h1Element = document.getElementById("auto-type");

    let index = 0;

    function typeText() {
        if (index < text.length) {
            h1Element.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(() => {
                h1Element.textContent = ""; 
                index = 0;
                typeText(); 
            }, pauseTime);
        }
    }

    typeText(); 

    // Add random stickers
    const stickers = [
        "cherryandbow.png",
        "cherrychanel.png",
        "cherrycola.png",
        "cherrystar.png",
        "redclip.png",
        "thumbheart.png",
        "redcam.png",
        "redvinyl.png",
        "redalarm.png",
        "redbutterfly.png",
        "redkiss.png",
        "redbow.png",
        "redseal.png",
        "redlip.png",
        "reddice.png",
        "redgisou.png",
        "redrose.png",
        "red7ball.png",
        "redmiumiu.png",
        "reddior.png",
    ];

    const stickerContainer = document.querySelector(".sticker-container");
    const stickerPositions = [];
    const minGap = 200;

    function isTooClose(newX, newY) {
        for (const pos of stickerPositions) {
            const distance = Math.sqrt(
                Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2)
            );
            if (distance < minGap) {
                return true;
            }
        }
        return false; 
    }

    function createSticker(src) {
        let newX, newY;

        do {
            newX = Math.random() * window.innerWidth;
            newY = Math.random() * window.innerHeight;
        } while (isTooClose(newX, newY));

        stickerPositions.push({ x: newX, y: newY });

        const img = document.createElement("img");
        img.src = src;
        img.classList.add("sticker");
        img.style.top = `${newY}px`;
        img.style.left = `${newX}px`;
        img.style.transform = `rotate(${Math.random() * 360}deg)`;
        stickerContainer.appendChild(img);
    }

    stickers.forEach((sticker) => {
        createSticker(sticker);
    });
});

// random fact generator

document.addEventListener("DOMContentLoaded", () => {
    const facts = [
        "I do a spot-on Shinchan impression.",
        "I love all forms of art and can never stick to one.",
        "Fav book: A Thousand Splendid Suns.",
        "Student at IIIT Delhi, debugging life daily.",
        "If I don’t know it yet, I’ll learn it."
    ];

    const factElement = document.getElementById("random-fact");
    const generateButton = document.getElementById("generate-fact");

    generateButton.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * facts.length);
        factElement.textContent = facts[randomIndex];
    });
});



