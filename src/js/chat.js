export function initChat(container) {
    container.innerHTML = `
        <div class="chat-app">
            <h2>Chat Application</h2>
            
            <div id="chat-username-screen">
                <p>Enter your username:</p>
                <input type="text" id="chat-username-input" placeholder="Username">
                <button id="chat-username-btn">Start Chat</button>
            </div>

            <div id="chat-container" class="hidden">
                <div id="messages-container"></div>
                <textarea id="chat-message-input" placeholder="Type a message..."></textarea>
                <button id="chat-send-btn">Send</button>
            </div>
        </div>
    `;

    const serverURL = "wss://courselab.lnu.se/message-app/socket";
    const apiKey = "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd";

    let socket;
    let username = "";

    const usernameScreen = container.querySelector("#chat-username-screen");
    const chatContainer = container.querySelector("#chat-container");
    const usernameInput = container.querySelector("#chat-username-input");
    const usernameBtn = container.querySelector("#chat-username-btn");
    const messagesContainer = container.querySelector("#messages-container");
    const messageInput = container.querySelector("#chat-message-input");
    const sendBtn = container.querySelector("#chat-send-btn");

    function connectWebSocket() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            return;
        }

        socket = new WebSocket(serverURL);

        socket.addEventListener("open", () => {
            displayMessage("The Server", "You are connected!", true);
        });

        socket.addEventListener("message", (event) => {
            const msg = JSON.parse(event.data);
            if (msg.type !== "heartbeat") {
                displayMessage(msg.username, msg.data);
            }
        });

        socket.addEventListener("close", () => {
            setTimeout(connectWebSocket, 3000);
        });
    }

    function displayMessage(user, message, isServerMessage = false) {
        if (isServerMessage && messagesContainer.querySelector(".server-message")) return;

        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message");
        if (isServerMessage) msgDiv.classList.add("server-message");
        msgDiv.innerHTML = `<strong>${user}:</strong> ${message}`;
        messagesContainer.appendChild(msgDiv);

        if (messagesContainer.children.length > 20) {
            messagesContainer.removeChild(messagesContainer.firstChild);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === "" || !socket || socket.readyState !== WebSocket.OPEN) return;

        const msgObject = {
            type: "message",
            data: message,
            username: username,
            channel: "default",
            key: apiKey
        };

        socket.send(JSON.stringify(msgObject));
        messageInput.value = "";
    }

    usernameBtn.addEventListener("click", () => {
        username = usernameInput.value.trim();
        if (username === "") return;

        usernameScreen.style.display = "none";
        chatContainer.style.display = "flex";

        connectWebSocket();
    });

    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
}
