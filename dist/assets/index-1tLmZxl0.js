(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();function I(i){i.innerHTML=`
        <div id="quiz-app">
            <div id="start-screen">
                <h2>Welcome to the Quiz Game!</h2>
                <input type="text" id="username-input" placeholder="Enter your nickname...">
                <button id="start-btn">Start</button>
            </div>

            <div id="quiz-container" style="display: none;">
                <h3 id="question-text"></h3>
                <div id="options-container"></div>
                <button id="next-btn" style="display: none;">Next</button>
                <p id="progress"></p>
            </div>

            <div id="result-container" style="display: none;">
                <h2>Quiz Result</h2>
                <p id="final-score"></p>
                <div id="answer-details"></div>
                <button id="restart-btn">Restart</button>
            </div>
        </div>
    `;let s=0,l=0,o="";const e=[{question:"What is the most important factor that determines the <<this>> binding in JavaScript?",options:["Where the function is defined","The scope of variables","How the function is called","The type of variable"],answer:2},{question:"What is the key difference between <<map()>> and <<forEach()>> in JavaScript?",options:["map() returns a new array, forEach() does not.","forEach() is faster.","map() only works with objects.","forEach() does not create a loop."],answer:0},{question:"What condition must be met for an NxN matrix to have an inverse?",options:["All elements must be positive","Its determinant must not be 0","Rows and columns must be equal","It must be symmetric"],answer:1},{question:"Which country's football league does FC Midtjylland belong to?",options:["Norway","Sweden","Denmark","Germany"],answer:2},{question:"Which is Sweden's top-tier football league?",options:["Allsvenskan","Eliteserien","Superligan","Premierligan"],answer:0},{question:"Which of the following cities was not a Viking settlement?",options:["Uppsala","Sigtuna","Västerås","Eskilstuna"],answer:3},{question:"Which of the following was one of the allies of the Swedish Empire in the Great Northern War?",options:["Norway","Crimean Khanate","Saxony","Duchy of Courland"],answer:1}];document.getElementById("start-btn").addEventListener("click",()=>{if(o=document.getElementById("username-input").value.trim(),o===""){alert("Enter your nickname!");return}document.getElementById("start-screen").style.display="none",document.getElementById("quiz-container").style.display="block",t()});function t(){const p=e[s];document.getElementById("question-text").innerText=p.question;const n=document.getElementById("options-container");n.innerHTML="",document.getElementById("next-btn").style.display="none",p.options.forEach((d,E)=>{const r=document.createElement("button");r.classList.add("option-btn"),r.innerText=d,r.onclick=()=>c(E),n.appendChild(r)}),document.getElementById("progress").innerText=`Question ${s+1} / ${e.length}`}function c(p,n){const d=e[s];document.querySelectorAll(".option-btn").forEach((r,y)=>{y===d.answer&&r.classList.add("correct"),y===p&&p!==d.answer&&r.classList.add("wrong"),r.disabled=!0}),p===d.answer&&l++,document.getElementById("next-btn").style.display="block"}document.getElementById("next-btn").addEventListener("click",()=>{s++,s<e.length?t():h()});function h(){document.getElementById("quiz-container").style.display="none",document.getElementById("result-container").style.display="block",document.getElementById("final-score").innerText=`${o}, you have ${l} correct and ${e.length-l} wrong answers!`}document.getElementById("restart-btn").addEventListener("click",()=>{s=0,l=0,o="",document.getElementById("result-container").style.display="none",document.getElementById("start-screen").style.display="block"})}function x(i){i.innerHTML=`
        <div class="memory-game">
            <h2>Memory Game</h2>

            <label for="board-size">Select Board Size:</label>
            <select class="board-size">
                <option value="4x4">4x4</option>
                <option value="2x2">2x2</option>
                <option value="2x4">2x4</option>
            </select>

            <label for="emoji-set">Select Board Theme:</label>
            <select class="emoji-set">
                <option value="fruits">🍎 Fruits</option>
                <option value="animals">🐶 Animals</option>
                <option value="custom">😀 Faces</option>
            </select>

            <button class="start-game">Start Game</button>

            <div class="game-board"></div>
            <p class="status"></p>
            <p class="attempts">Attempts: 0</p>
            <button class="restart-btn hidden">Restart</button>
        </div>
    `;const s=i.querySelector(".memory-game"),l=s.querySelector(".start-game"),o=s.querySelector(".board-size"),e=s.querySelector(".emoji-set"),t=s.querySelector(".game-board"),c=s.querySelector(".attempts"),h=s.querySelector(".restart-btn");l.addEventListener("click",()=>{p(s)});function p(n){const d=o.value,E=e.value;let r,y;d==="4x4"?(r=4,y=4):d==="2x2"?(r=2,y=2):(r=2,y=4);let u={fruits:["🍎","🍌","🍇","🍉","🥑","🍒","🍍","🥥"],animals:["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼"],custom:["😀","😂","😎","😍","😡","😭","😱","🤔"]}[E].slice(0,r*y/2),m=[...u,...u];m=k(m),t.innerHTML="",t.style.display="grid",t.style.gridTemplateColumns=`repeat(${y}, 1fr)`,t.style.margin="0 auto";let g=[],v=[],L=0,w=0;m.forEach((a,f)=>{const b=document.createElement("div");b.classList.add("card"),b.dataset.symbol=a,b.dataset.index=f,b.innerHTML="?",b.setAttribute("tabindex","0"),b.addEventListener("click",()=>q(b)),t.appendChild(b)}),h.classList.remove("hidden");function k(a){return a.sort(()=>Math.random()-.5)}function q(a){g.length<2&&!g.includes(a)&&!v.includes(a)&&(a.innerHTML=a.dataset.symbol,g.push(a),g.length===2&&setTimeout(B,500))}function B(){const[a,f]=g;L++,c.innerText=`Attempts: ${L}`,a.dataset.symbol===f.dataset.symbol?v.push(a,f):(a.innerHTML="?",f.innerHTML="?"),g=[],v.length===m.length&&(n.querySelector(".status").innerText=`You won in ${L} attempts!`)}n.addEventListener("keydown",a=>{const f=n.querySelectorAll(".card");a.key==="ArrowRight"?w=(w+1)%f.length:a.key==="ArrowLeft"?w=(w-1+f.length)%f.length:a.key==="Enter"&&q(f[w]),f[w].focus()}),h.addEventListener("click",()=>{n.innerHTML="",x(n)})}}function T(i){i.innerHTML=`
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
    `;const s="wss://courselab.lnu.se/message-app/socket",l="eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd";let o,e="";const t=i.querySelector("#chat-username-screen"),c=i.querySelector("#chat-container"),h=i.querySelector("#chat-username-input"),p=i.querySelector("#chat-username-btn"),n=i.querySelector("#messages-container"),d=i.querySelector("#chat-message-input"),E=i.querySelector("#chat-send-btn");function r(){o&&o.readyState===WebSocket.OPEN||(o=new WebSocket(s),o.addEventListener("open",()=>{y("The Server","You are connected!",!0)}),o.addEventListener("message",u=>{const m=JSON.parse(u.data);m.type!=="heartbeat"&&y(m.username,m.data)}),o.addEventListener("close",()=>{setTimeout(r,3e3)}))}function y(u,m,g=!1){if(g&&n.querySelector(".server-message"))return;const v=document.createElement("div");v.classList.add("chat-message"),g&&v.classList.add("server-message"),v.innerHTML=`<strong>${u}:</strong> ${m}`,n.appendChild(v),n.children.length>20&&n.removeChild(n.firstChild),n.scrollTop=n.scrollHeight}function S(){const u=d.value.trim();if(u===""||!o||o.readyState!==WebSocket.OPEN)return;const m={type:"message",data:u,username:e,channel:"default",key:l};o.send(JSON.stringify(m)),d.value=""}p.addEventListener("click",()=>{e=h.value.trim(),e!==""&&(t.style.display="none",c.style.display="flex",r())}),E.addEventListener("click",S),d.addEventListener("keypress",u=>{u.key==="Enter"&&(u.preventDefault(),S())})}document.addEventListener("DOMContentLoaded",()=>{let i=1;document.querySelectorAll(".icon, .taskbar-icon").forEach(e=>{e.addEventListener("dblclick",()=>{s(e.dataset.app)})});function s(e){const t=document.createElement("div");t.classList.add("window"),t.dataset.app=e,t.style.zIndex=i++,t.style.left="100px",t.style.top="100px",t.innerHTML=`
            <div class="window-header">
                <span class="window-title">${e.toUpperCase()}</span>
                <div class="close-btn">X</div>
            </div>
            <div class="window-content" id="${e}-content"></div>
        `,document.body.appendChild(t),l(t),t.querySelector(".close-btn").addEventListener("click",()=>{t.remove()}),t.addEventListener("mousedown",()=>{t.style.zIndex=i++}),o(e,t.querySelector(".window-content"))}function l(e){let t=!1,c,h;e.querySelector(".window-header").addEventListener("mousedown",n=>{t=!0,c=n.clientX-e.offsetLeft,h=n.clientY-e.offsetTop,e.style.zIndex=i++}),document.addEventListener("mousemove",n=>{t&&(e.style.left=`${n.clientX-c}px`,e.style.top=`${n.clientY-h}px`)}),document.addEventListener("mouseup",()=>{t=!1})}function o(e,t){e==="quiz"?I(t):e==="memory"?x(t):e==="chat"&&T(t)}});
