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

  document.addEventListener("DOMContentLoaded", () => {
    const assistantButton = document.getElementById("assistant-button");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeButton = document.getElementById("close-chatbot");
    const messageArea = document.getElementById("chatbot-messages");
    const optionsArea = document.getElementById("chatbot-options");
    
    // Enhanced conversation data
    const conversationData = {
        welcome: {
            message: "Hi there! I can help you navigate. Ask me:",
            options: [
                { text: "Who are you?", next: "about" },
                { text: "What projects have you done?", next: "projects" },
                { text: "How can I contact you?", next: "contact" },
                { text: "Tell me a fun fact!", next: "fact" }
            ]
        },
        about: {
            message: "I'm Akshitaa's portfolio assistant! I'm here to help you find information about her work and experience.",
            options: [
                { text: "What technologies does she use?", next: "tech" },
                { text: "See projects", next: "projects" },
                { text: "Contact options", next: "contact" }
            ]
        },
        projects: {
            message: "Here are some highlighted projects:",
            options: [
                { text: "Chrome Bookmarks Extension", next: "chrome" },
                { text: "Gaming Arcade Machine", next: "arcade" },
                { text: "Angry Birds Remake", next: "angrybirds" },
                { text: "About Akshitaa", next: "about" }
            ]
        },
        contact: {
            message: "You can reach out through:",
            options: [
                { text: "Open contact form", action: "openForm" },
                { text: "Visit LinkedIn", action: "openLinkedIn" },
                { text: "Check GitHub", action: "openGitHub" },
                { text: "See projects", next: "projects" }
            ]
        },
        fact: {
            message: getRandomFact(),
            options: [
                { text: "Another fact!", next: "fact" },
                { text: "See projects", next: "projects" },
                { text: "Contact options", next: "contact" }
            ]
        },
        // Detailed project information
        chrome: {
            message: "Chrome Bookmarks Extension:<br><br>A website and chrome extension to save important links, similar to chrome's bookmarks tab using HTML, CSS, JS and Firebase.",
            options: [
                { text: "Other projects", next: "projects" },
                { text: "Technologies used", next: "tech" }
            ]
        },
        arcade: {
            message: "Gaming Arcade Machine:<br><br>Arcade Machine system with battleship and jumbled words using Python libraries and MySQL.",
            options: [
                { text: "Other projects", next: "projects" },
                { text: "About Akshitaa", next: "about" }
            ]
        },
        tech: {
            message: "Main technologies I use:<br><br>- HTML/CSS/JavaScript<br>- Python<br>- Java<br>- MySQL<br>- Git",
            options: [
                { text: "See projects using these", next: "projects" },
                { text: "Contact me", next: "contact" }
            ]
        }
    };

    // Toggle chatbot visibility
    assistantButton.addEventListener("click", (e) => {
        e.preventDefault();
        chatbotContainer.classList.toggle("chatbot-visible");
        if (chatbotContainer.classList.contains("chatbot-visible")) {
            loadConversation("welcome");
        }
    });

    closeButton.addEventListener("click", () => {
        chatbotContainer.classList.remove("chatbot-visible");
    });

    // Load conversation state
    function loadConversation(state) {
        const convo = conversationData[state];
        
        // Add new message
        const messageDiv = document.createElement("div");
        messageDiv.className = "chat-message bot-message";
        messageDiv.innerHTML = convo.message;
        messageArea.appendChild(messageDiv);
        
        // Clear options and add new ones
        optionsArea.innerHTML = '';
        convo.options.forEach(option => {
            const button = document.createElement("button");
            button.className = "chat-option";
            button.textContent = option.text;
            
            if (option.action) {
                button.addEventListener("click", () => {
                    // Add user's choice to chat
                    addUserMessage(option.text);
                    handleAction(option.action);
                });
            } else {
                button.addEventListener("click", () => {
                    // Add user's choice to chat
                    addUserMessage(option.text);
                    loadConversation(option.next);
                });
            }
            
            optionsArea.appendChild(button);
        });
        
        // Scroll to bottom
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    // Add user message to chat
    function addUserMessage(text) {
        const userDiv = document.createElement("div");
        userDiv.className = "chat-message user-message";
        userDiv.textContent = text;
        messageArea.appendChild(userDiv);
    }

    // Handle special actions
    function handleAction(action) {
        const actionDiv = document.createElement("div");
        actionDiv.className = "chat-message bot-message";
        
        switch(action) {
            case "openForm":
                actionDiv.innerHTML = "Taking you to the contact form...";
                messageArea.appendChild(actionDiv);
                setTimeout(() => {
                    document.querySelector('#contact-form').scrollIntoView({
                        behavior: 'smooth'
                    });
                    chatbotContainer.classList.remove("chatbot-visible");
                }, 800);
                break;
                
            case "openLinkedIn":
                actionDiv.innerHTML = "Opening LinkedIn profile...";
                messageArea.appendChild(actionDiv);
                setTimeout(() => {
                    window.open("https://www.linkedin.com/in/akshitaasahoo", "_blank");
                }, 800);
                break;
                
            case "openGitHub":
                actionDiv.innerHTML = "Opening GitHub profile...";
                messageArea.appendChild(actionDiv);
                setTimeout(() => {
                    window.open("https://github.com/akshitaawho", "_blank");
                }, 800);
                break;
        }
        
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    function getRandomFact() {
        const facts = [
            "I do a spot-on Shinchan impression.",
            "I love all forms of art and can never stick to one.",
            "Fav book: A Thousand Splendid Suns.",
            "Student at IIIT Delhi, debugging life daily.",
            "If I don't know it yet, I'll learn it."
        ];
        return facts[Math.floor(Math.random() * facts.length)];
    }
});

// Scroll Animation Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize scroll animations
  initScrollAnimations();
  
  // Add scroll event listener
  window.addEventListener('scroll', initScrollAnimations);
});

function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-scroll]');
  const windowHeight = window.innerHeight;
  const triggerOffset = windowHeight * 0.8; // Adjust when animation triggers
  
  elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      
      if (elementPosition < triggerOffset) {
          element.setAttribute('data-scroll', 'in');
      }
  });
}

// Run once on page load
initScrollAnimations();

function initScrollAnimations() {
  // Check if mobile device (you can adjust the breakpoint as needed)
  if (window.innerWidth < 768) {
      // Mobile view - immediately show all elements
      const elements = document.querySelectorAll('[data-scroll]');
      elements.forEach((element) => {
          element.setAttribute('data-scroll', 'in');
      });
      return; // Exit the function
  }
  
  // Desktop view - normal scroll animation logic
  const elements = document.querySelectorAll('[data-scroll]');
  const windowHeight = window.innerHeight;
  const triggerOffset = windowHeight * 0.8;
  
  elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      
      if (elementPosition < triggerOffset) {
          element.setAttribute('data-scroll', 'in');
      }
  });
}

// Smooth scrolling functionality
document.addEventListener("DOMContentLoaded", () => {
  // Contact Me button
  const contactButton = document.querySelector(".btn-1");
  if (contactButton) {
      contactButton.addEventListener("click", (e) => {
          e.preventDefault();
          const contactSection = document.getElementById("contact-section");
          if (contactSection) {
              contactSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
              });
          }
      });
  }

  // Explore My Work button
  const exploreButton = document.querySelector(".btn-2");
  if (exploreButton) {
      exploreButton.addEventListener("click", (e) => {
          e.preventDefault();
          const projectsSection = document.getElementById("projects-section");
          if (projectsSection) {
              projectsSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
              });
          }
      });
  }
});

// Navbar scroll functionality
document.addEventListener("DOMContentLoaded", () => {
  const navbarLinks = document.querySelectorAll(".navbar a");
  
  navbarLinks.forEach(link => {
      link.addEventListener("click", (e) => {
          e.preventDefault();
          
          const targetId = link.textContent.trim().toLowerCase();
          
          switch(targetId) {
              case "home":
                  // Reload the page to go to top
                  window.location.href = window.location.pathname;
                  break;
                  
              case "about":
                  const aboutSection = document.getElementById("about-section");
                  if (aboutSection) {
                      aboutSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                      });
                  }
                  break;
                  
              case "projects":
                  const projectsSection = document.getElementById("projects-section");
                  if (projectsSection) {
                      projectsSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                      });
                  }
                  break;
                  
              case "contact":
                  const contactSection = document.getElementById("contact-section");
                  if (contactSection) {
                      contactSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                      });
                  }
                  break;
                  
              case "assistant":
                  // This will be handled by your existing chatbot code
                  break;
                  
              default:
                  // For any other links, just follow the href
                  window.location.href = link.href;
          }
      });
  });
});