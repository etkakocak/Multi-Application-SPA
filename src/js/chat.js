export function initChat (container) {
  container.innerHTML = `
        <div class="chat-app">
            <div id="chat-setup">
                <div class="profile-pic-container">
                    <img id="profile-pic" src="default-profile.png" alt="Profile Picture">
                </div>
                <input type="text" id="chat-username-input" placeholder="Your username here">
                <p class="upload-info">Optional: Upload a profile picture</p>
                <input type="file" id="profile-pic-upload" accept="image/*">
                <button id="chat-continue-btn">Continue</button>
            </div>

            <div id="chat-container" class="hidden">
                <div id="chat-header">
                    <div class="profile-pic-container small">
                        <img id="chat-user-pic" src="default-profile.png" alt="User Profile">
                    </div>
                    <span id="chat-username"></span>
                </div>
                <div id="messages-container"></div>
                <div id="chat-input-area">
                    <textarea id="chat-message-input" placeholder="Type a message..."></textarea>
                    <button id="chat-send-btn">Send</button>
                </div>
            </div>
        </div>
    `

  const usernameInput = container.querySelector('#chat-username-input')
  const profilePicInput = container.querySelector('#profile-pic-upload')
  const continueBtn = container.querySelector('#chat-continue-btn')
  const setupScreen = container.querySelector('#chat-setup')
  const chatScreen = container.querySelector('#chat-container')
  const profilePic = container.querySelector('#profile-pic')
  const chatUserPic = container.querySelector('#chat-user-pic')
  const chatUsernameDisplay = container.querySelector('#chat-username')
  const messageInput = container.querySelector('#chat-message-input')
  const sendBtn = container.querySelector('#chat-send-btn')
  const messagesContainer = container.querySelector('#messages-container')

  const serverURL = 'wss://courselab.lnu.se/message-app/socket'
  const apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'

  let socket
  let username = localStorage.getItem('chat-username') || ''
  const profilePicSrc = localStorage.getItem('chat-user-image') || 'default-profile.png'
  const messageHistory = JSON.parse(localStorage.getItem('chat-messages')) || []

  if (username) {
    usernameInput.value = username
    profilePic.src = profilePicSrc
    chatUserPic.src = profilePicSrc
    setupScreen.style.display = 'none'
    chatScreen.style.display = 'flex'
    chatUsernameDisplay.innerText = username
    loadMessageHistory()
    connectWebSocket()
  }

  profilePicInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        profilePic.src = e.target.result
        chatUserPic.src = e.target.result
        localStorage.setItem('chat-user-image', e.target.result)
      }
      reader.readAsDataURL(file)
    }
  })

  continueBtn.addEventListener('click', () => {
    username = usernameInput.value.trim()
    if (!username) {
      alert('Username is required!')
      return
    }
    localStorage.setItem('chat-username', username)
    setupScreen.style.display = 'none'
    chatScreen.style.display = 'flex'
    chatUsernameDisplay.innerText = username
    connectWebSocket()
  })

  function connectWebSocket () {
    if (socket && socket.readyState === WebSocket.OPEN) return
    socket = new WebSocket(serverURL)

    socket.addEventListener('open', () => {
      displayMessage('The Server', 'You are connected!', true)
    })

    socket.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data)
      if (msg.type !== 'heartbeat') {
        displayMessage(msg.username, msg.data)
      }
    })

    socket.addEventListener('close', () => {
      setTimeout(connectWebSocket, 3000)
    })
  }

  function displayMessage (user, message, isServerMessage = false) {
    if (isServerMessage && messagesContainer.querySelector('.server-message')) return

    const msgDiv = document.createElement('div')
    msgDiv.classList.add('chat-message')
    msgDiv.innerHTML = `<strong>${user}:</strong> ${message}`
    messagesContainer.appendChild(msgDiv)

    if (!isServerMessage) {
      messageHistory.push({ user, message })
      if (messageHistory.length > 20) {
        messageHistory.shift()
      }
      localStorage.setItem('chat-messages', JSON.stringify(messageHistory))
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  function loadMessageHistory () {
    messageHistory.forEach(({ user, message }) => displayMessage(user, message))
  }

  function sendMessage () {
    const message = messageInput.value.trim()
    if (message === '' || !socket || socket.readyState !== WebSocket.OPEN) return

    const msgObject = {
      type: 'message',
      data: message,
      username,
      channel: 'default',
      key: apiKey
    }

    socket.send(JSON.stringify(msgObject))
    messageInput.value = ''
  }

  sendBtn.addEventListener('click', sendMessage)
  messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessage()
    }
  })
}
