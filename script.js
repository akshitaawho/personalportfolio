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


// SONGGGG
document.addEventListener("DOMContentLoaded", () => {
    const audio = new Audio("cleanshutup.mp3"); 
    const audioButton = document.getElementById("play-audio");

    let isPlaying = false;

    audioButton.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause(); 
            audio.currentTime = 0; 
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
        }
    });

    audio.addEventListener("ended", () => {
        isPlaying = false;
    });
});

// flipbook
$('#flipbook').turn({
    width: 1200,
    height: 360,
    page:1,
    autoCenter: true,
    duration: 2000
})

// contact form
emailjs.init("ULsrBTAlAvtF7rdsj");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_kmrnz89", "template_i34jydq", form)
      .then(function () {
        alert("I got your message, tysm for contacting me!");
        form.reset();
      }, function (error) {
        alert("Oops... something went wrong.");
        console.error("EmailJS error:", error);
      });
  });
});

// live scoaicl

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('viewer-dots') && document.getElementById('viewer-count')) {
      initSocialPresence();
    } else {
      console.error('Viewer indicator elements not found in the DOM!');
    }
  });
  
  function initSocialPresence() {
    const visitorId = generateVisitorId();
    
    initializeLocalStorage(visitorId);
    
    simulateActiveViewers();
    window.addEventListener('beforeunload', function() {
      removeVisitor(visitorId);
    });
  }
  
  function generateVisitorId() {
    if (!localStorage.getItem('visitorId')) {
      const randomId = 'visitor_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitorId', randomId);
    }
    return localStorage.getItem('visitorId');
  }
  
  function initializeLocalStorage(visitorId) {
    let activeViewers = JSON.parse(localStorage.getItem('activeViewers') || '[]');
    
    const existingVisitor = activeViewers.findIndex(v => v.id === visitorId);
    if (existingVisitor >= 0) {
      activeViewers[existingVisitor].lastActive = new Date().getTime();
    } else {
      activeViewers.push({
        id: visitorId,
        name: getRandomName(),
        lastActive: new Date().getTime(),
        isReal: true
      });
      
      if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
        if (activeViewers.length < 2) {
          activeViewers.push({
            id: 'simulated_initial_' + Math.random().toString(36).substr(2, 9),
            name: getRandomName(),
            lastActive: new Date().getTime(),
            isReal: false
          });
        }
      }
    }
    
    const now = new Date().getTime();
    activeViewers = activeViewers.filter(v => (now - v.lastActive) < 300000);
    
    if (activeViewers.length > 4) {
      const realVisitors = activeViewers.filter(v => v.isReal);
      const simulatedVisitors = activeViewers.filter(v => !v.isReal);
      
      simulatedVisitors.sort((a, b) => b.lastActive - a.lastActive);
      
      activeViewers = [...realVisitors];
      const remainingSlots = Math.max(0, 3 - realVisitors.length);
      if (remainingSlots > 0) {
        activeViewers = activeViewers.concat(simulatedVisitors.slice(0, remainingSlots));
      }
    }
    
    localStorage.setItem('activeViewers', JSON.stringify(activeViewers));
  }
  
  function getRandomName() {
    const names = [
      'Alex', 'Jamie', 'Taylor', 'Jordan', 'Casey', 
      'Riley', 'Morgan', 'Quinn', 'Avery', 'Blake'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  function getRandomColor() {
    const colors = [
      '#4a86e8', // blue
      '#ff7537', // orange
      '#6aa84f', // green
      '#a64d79', // purple
      '#e06666', // red
      '#f1c232', // yellow
      '#45818e', // teal
      '#674ea7'  // violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function simulateActiveViewers() {
    const viewerDotsEl = document.getElementById('viewer-dots');
    const viewerCountEl = document.getElementById('viewer-count');
    
    function updateViewerDots() {
      const activeViewers = JSON.parse(localStorage.getItem('activeViewers') || '[]');
      const viewerCount = activeViewers.length;
      
      viewerCountEl.textContent = viewerCount + (viewerCount === 1 ? ' person' : ' people') + ' viewing';
      
      viewerDotsEl.innerHTML = '';
      
      for (let i = 0; i < viewerCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'viewer-dot';
        
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.borderRadius = '50%';
        
        dot.style.backgroundColor = getRandomColor();
        dot.style.display = 'inline-block';
        dot.style.margin = '0 4px';
        dot.style.transition = 'transform 0.3s, opacity 0.3s';
        dot.style.opacity = '1';
        dot.style.transform = 'scale(1)';
        
        const viewerName = activeViewers[i]?.name || 'Visitor';
        dot.setAttribute('title', viewerName);
        
        viewerDotsEl.appendChild(dot);
      }
    }
    updateViewerDots();
    
    setInterval(() => {
      let activeViewers = JSON.parse(localStorage.getItem('activeViewers') || '[]');
      
      if (activeViewers.length >= 5) {
        if (Math.random() < 0.2) {
          const simulatedViewers = activeViewers.filter(v => !v.isReal);
          if (simulatedViewers.length > 0) {
            const indexToRemove = Math.floor(Math.random() * simulatedViewers.length);
            const idToRemove = simulatedViewers[indexToRemove].id;
            activeViewers = activeViewers.filter(v => v.id !== idToRemove);
          }
        }
      } else {
        if (Math.random() < 0.15) {
          activeViewers.push({
            id: 'simulated_' + Math.random().toString(36).substr(2, 9),
            name: getRandomName(),
            lastActive: new Date().getTime(),
            isReal: false
          });
        }
      }
      
      localStorage.setItem('activeViewers', JSON.stringify(activeViewers));
      updateViewerDots();
    }, 8000);
    
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) {
        const visitorId = localStorage.getItem('visitorId');
        initializeLocalStorage(visitorId);
        updateViewerDots();
      }
    });
  }
  
  function removeVisitor(visitorId) {
    const activeViewers = JSON.parse(localStorage.getItem('activeViewers') || '[]');
    const updatedViewers = activeViewers.filter(v => v.id !== visitorId);
    localStorage.setItem('activeViewers', JSON.stringify(updatedViewers));
  }