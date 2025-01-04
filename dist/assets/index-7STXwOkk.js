(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const t of e.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&l(t)}).observe(document,{childList:!0,subtree:!0});function c(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(n){if(n.ep)return;n.ep=!0;const e=c(n);fetch(n.href,e)}})();function q(u){u.innerHTML=`
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
    `;let o=0,c=0,l="";const n=[{question:"What is the most important factor that determines the <<this>> binding in JavaScript?",options:["Where the function is defined","The scope of variables","How the function is called","The type of variable"],answer:2},{question:"What is the key difference between <<map()>> and <<forEach()>> in JavaScript?",options:["map() returns a new array, forEach() does not.","forEach() is faster.","map() only works with objects.","forEach() does not create a loop."],answer:0},{question:"What condition must be met for an NxN matrix to have an inverse?",options:["All elements must be positive","Its determinant must not be 0","Rows and columns must be equal","It must be symmetric"],answer:1},{question:"Which country's football league does FC Midtjylland belong to?",options:["Norway","Sweden","Denmark","Germany"],answer:2},{question:"Which is Sweden's top-tier football league?",options:["Allsvenskan","Eliteserien","Superligan","Premierligan"],answer:0},{question:"Which of the following cities was not a Viking settlement?",options:["Uppsala","Sigtuna","Västerås","Eskilstuna"],answer:3},{question:"Which of the following was one of the allies of the Swedish Empire in the Great Northern War?",options:["Norway","Crimean Khanate","Saxony","Duchy of Courland"],answer:1}];document.getElementById("start-btn").addEventListener("click",()=>{if(l=document.getElementById("username-input").value.trim(),l===""){alert("Enter your nickname!");return}document.getElementById("start-screen").style.display="none",document.getElementById("quiz-container").style.display="block",e()});function e(){const r=n[o];document.getElementById("question-text").innerText=r.question;const f=document.getElementById("options-container");f.innerHTML="",document.getElementById("next-btn").style.display="none",r.options.forEach((i,p)=>{const a=document.createElement("button");a.classList.add("option-btn"),a.innerText=i,a.onclick=()=>t(p),f.appendChild(a)}),document.getElementById("progress").innerText=`Question ${o+1} / ${n.length}`}function t(r,f){const i=n[o];document.querySelectorAll(".option-btn").forEach((a,h)=>{h===i.answer&&a.classList.add("correct"),h===r&&r!==i.answer&&a.classList.add("wrong"),a.disabled=!0}),r===i.answer&&c++,document.getElementById("next-btn").style.display="block"}document.getElementById("next-btn").addEventListener("click",()=>{o++,o<n.length?e():m()});function m(){document.getElementById("quiz-container").style.display="none",document.getElementById("result-container").style.display="block",document.getElementById("final-score").innerText=`${l}, you have ${c} correct and ${n.length-c} wrong answers!`}document.getElementById("restart-btn").addEventListener("click",()=>{o=0,c=0,l="",document.getElementById("result-container").style.display="none",document.getElementById("start-screen").style.display="block"})}function w(u){u.innerHTML=`
        <div class="memory-game">
            <h2>Memory Game</h2>
            <label for="board-size">Select Board Size:</label>
            <select class="board-size">
                <option value="4x4">4x4</option>
                <option value="2x2">2x2</option>
                <option value="2x4">2x4</option>
            </select>
            <button class="start-game">Start Game</button>
            <div class="game-board"></div>
            <p class="status"></p>
            <p class="attempts">Attempts: 0</p>
            <button class="restart-btn hidden">Restart</button>
        </div>
    `;const o=u.querySelector(".memory-game"),c=o.querySelector(".start-game");o.querySelector(".board-size"),o.querySelector(".game-board"),o.querySelector(".attempts");const l=o.querySelector(".restart-btn");c.addEventListener("click",()=>{n(o)});function n(e){const t=e.querySelector(".board-size").value;let m,r;t==="4x4"?(m=4,r=4):t==="2x2"?(m=2,r=2):(m=2,r=4);let f=["🍎","🍌","🍇","🍉","🥑","🍒","🍍","🥥"];f=f.slice(0,m*r/2);let i=[...f,...f];i=E(i);const p=e.querySelector(".game-board");p.innerHTML="",p.style.display="grid",p.style.gridTemplateColumns=`repeat(${r}, 1fr)`,p.style.margin="0 auto";let a=[],h=[],g=0,b=0;i.forEach((s,d)=>{const y=document.createElement("div");y.classList.add("card"),y.dataset.symbol=s,y.dataset.index=d,y.innerHTML="?",y.setAttribute("tabindex","0"),y.addEventListener("click",()=>v(y)),p.appendChild(y)}),l.classList.remove("hidden");function E(s){return s.sort(()=>Math.random()-.5)}function v(s){a.length<2&&!a.includes(s)&&!h.includes(s)&&(s.innerHTML=s.dataset.symbol,a.push(s),a.length===2&&setTimeout(L,500))}function L(){const[s,d]=a;g++,e.querySelector(".attempts").innerText=`Attempts: ${g}`,s.dataset.symbol===d.dataset.symbol?h.push(s,d):(s.innerHTML="?",d.innerHTML="?"),a=[],h.length===i.length&&(e.querySelector(".status").innerText=`You won in ${g} attempts!`)}e.addEventListener("keydown",s=>{const d=e.querySelectorAll(".card");s.key==="ArrowRight"?b=(b+1)%d.length:s.key==="ArrowLeft"?b=(b-1+d.length)%d.length:s.key==="Enter"&&v(d[b]),d[b].focus()}),l.addEventListener("click",()=>{e.innerHTML="",w(e)})}}document.addEventListener("DOMContentLoaded",()=>{let u=1;document.querySelectorAll(".icon, .taskbar-icon").forEach(e=>{e.addEventListener("dblclick",()=>{o(e.dataset.app)})});function o(e){const t=document.createElement("div");t.classList.add("window"),t.dataset.app=e,t.style.zIndex=u++,t.style.left="100px",t.style.top="100px",t.innerHTML=`
            <div class="window-header">
                <span class="window-title">${e.toUpperCase()}</span>
                <div class="close-btn">X</div>
            </div>
            <div class="window-content" id="${e}-content"></div>
        `,document.body.appendChild(t),c(t),t.querySelector(".close-btn").addEventListener("click",()=>{t.remove()}),t.addEventListener("mousedown",()=>{t.style.zIndex=u++}),l(e,t.querySelector(".window-content"))}function c(e){let t=!1,m,r;e.querySelector(".window-header").addEventListener("mousedown",i=>{t=!0,m=i.clientX-e.offsetLeft,r=i.clientY-e.offsetTop,e.style.zIndex=u++}),document.addEventListener("mousemove",i=>{t&&(e.style.left=`${i.clientX-m}px`,e.style.top=`${i.clientY-r}px`)}),document.addEventListener("mouseup",()=>{t=!1})}function l(e,t){e==="quiz"?q(t):e==="memory"?w(t):e==="chat"&&n(t)}function n(e){e.innerHTML='<div id="chat-app">Chat App is coming soon...</div>'}});
