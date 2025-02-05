# Multi-application SPA

**Website Image:**
![website image](/src/public/images/website-image.png)

### Description
This is a ``multi-application SPA (Single Page Application)`` that provides three interactive mini-apps: Quiz Game, Memory Game, and Chat Application. Users can open multiple instances of these apps on a desktop in draggable windows.   

- **Quiz Game:** A multiple-choice quiz where users answer questions and see their scores.  
- **Memory Game:** A card-matching game with different board sizes and customizable themes.  
- **Chat Application:** A real-time chat system where users can set their username and profile picture, with message history persistence. The application utilizes ``WebSockets`` for real-time chat, LocalStorage for data persistence, and JavaScript for interactive UI elements. 

### Instructions to download and start the application:
1. Clone the repo to any location on your computer.  

2. From the same terminal, enter the repo and then type the command below:  
    ```
    npx http-server dist
    ```
* *The web page has already been built to dist, but if you wish to make any updates in the code, you need to rebuild it before running with the command below:*
    ```
    npm run build
    ```

3. Then, when you click on one of the links displayed in the terminal, it will open the website in your browser.  

### Linters
* Run the linters by the command **npm run lint** to verify that the codes contain no errors.  

The application follows modern coding standards with ESLint compliance.  
