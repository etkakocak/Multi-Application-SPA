import { initQuiz } from "./quiz.js";
import { initMemoryGame } from "./memorygame.js";

document.addEventListener("DOMContentLoaded", () => {
    let zIndex = 1;

    document.querySelectorAll(".icon, .taskbar-icon").forEach(icon => {
        icon.addEventListener("dblclick", () => {
            createWindow(icon.dataset.app);
        });
    });

    function createWindow(appType) {
        const windowDiv = document.createElement("div");
        windowDiv.classList.add("window");
        windowDiv.dataset.app = appType;
        windowDiv.style.zIndex = zIndex++;
        windowDiv.style.left = "100px";
        windowDiv.style.top = "100px";

        windowDiv.innerHTML = `
            <div class="window-header">
                <span class="window-title">${appType.toUpperCase()}</span>
                <div class="close-btn">X</div>
            </div>
            <div class="window-content" id="${appType}-content"></div>
        `;

        document.body.appendChild(windowDiv);
        makeDraggable(windowDiv);

        windowDiv.querySelector(".close-btn").addEventListener("click", () => {
            windowDiv.remove();
        });

        windowDiv.addEventListener("mousedown", () => {
            windowDiv.style.zIndex = zIndex++;
        });

        loadApp(appType, windowDiv.querySelector(".window-content"));
    }

    function makeDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;
        const header = element.querySelector(".window-header");

        header.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.zIndex = zIndex++;
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }

    function loadApp(appType, container) {
        if (appType === "quiz") {
            initQuiz(container);;
        } else if (appType === "memory") {
            initMemoryGame(container);
        } else if (appType === "chat") {
            loadChatApp(container);
        }
    }

    function loadMemoryApp(container) {
        container.innerHTML = `<div id="memory-app">Memory Game is coming soon...</div>`;
    }

    function loadChatApp(container) {
        container.innerHTML = `<div id="chat-app">Chat App is coming soon...</div>`;
    }
});
