import { initQuiz } from './quiz.js'
import { initMemoryGame } from './memorygame.js'
import { initChat } from './chat.js'

document.addEventListener('DOMContentLoaded', () => {
  let zIndex = 1

  document.querySelectorAll('.icon, .taskbar-icon').forEach(icon => {
    icon.addEventListener('dblclick', () => {
      createWindow(icon.dataset.app)
    })
  })

  /**
   * Creates a new application window.
   * @param {string} appType - The application to open.
   */
  function createWindow (appType) {
    const windowDiv = document.createElement('div')
    windowDiv.classList.add('window')
    windowDiv.dataset.app = appType
    windowDiv.style.zIndex = zIndex++
    windowDiv.style.left = '100px'
    windowDiv.style.top = '100px'

    windowDiv.innerHTML = `
            <div class="window-header">
                <span class="window-title">${appType.toUpperCase()}</span>
                <div class="close-btn">X</div>
            </div>
            <div class="window-content" id="${appType}-content"></div>
        `

    document.body.appendChild(windowDiv)
    makeDraggable(windowDiv)

    windowDiv.querySelector('.close-btn').addEventListener('click', () => {
      windowDiv.remove()
    })

    windowDiv.addEventListener('mousedown', () => {
      windowDiv.style.zIndex = zIndex++
    })

    loadApp(appType, windowDiv.querySelector('.window-content'))
  }

  /**
   * Makes a window draggable within the application.
   * @param {HTMLElement} element - The window element to be made draggable.
   */
  function makeDraggable (element) {
    let isDragging = false
    let offsetX, offsetY
    const header = element.querySelector('.window-header')

    header.addEventListener('mousedown', (e) => {
      isDragging = true
      offsetX = e.clientX - element.offsetLeft
      offsetY = e.clientY - element.offsetTop
      element.style.zIndex = zIndex++
    })

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return
      element.style.left = `${e.clientX - offsetX}px`
      element.style.top = `${e.clientY - offsetY}px`
    })

    document.addEventListener('mouseup', () => {
      isDragging = false
    })
  }

  /**
   * Loads the application into a window.
   * @param {string} appType - The type of application to load.
   * @param {HTMLElement} container - The container element where the app will be initialized.
   */
  function loadApp (appType, container) {
    if (appType === 'quiz') {
      initQuiz(container)
    } else if (appType === 'memory') {
      initMemoryGame(container)
    } else if (appType === 'chat') {
      initChat(container)
    }
  }
})
