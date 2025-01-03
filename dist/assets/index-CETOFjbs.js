(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))d(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const e of o.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&d(e)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();function f(a){a.innerHTML=`
        <div id="quiz-app">
            <div id="start-screen">
                <h2>Welcome to the Quiz Game!</h2>
                <input type="text" id="username-input" placeholder="Enter your nickname...">
                <button id="start-btn">Start</button>
            </div>

            <div id="quiz-container" style="display: none;">
                <h3 id="question-text"></h3>
                <div id="options-container"></div>
                <p id="progress"></p>
            </div>

            <div id="result-container" style="display: none;">
                <h2>Quiz Result</h2>
                <p id="final-score"></p>
                <div id="answer-details"></div>
                <button id="restart-btn">Restart</button>
            </div>
        </div>
    `;let i=0,s=0,d=[],n="";const o=[{question:"5 + 3 = ?",options:["6","7","8","9"],answer:2},{question:"12 + 7 = ?",options:["19","20","21","22"],answer:0},{question:"9 + 6 = ?",options:["13","14","15","16"],answer:2},{question:"3 + 4 = ?",options:["5","6","7","8"],answer:2},{question:"8 + 2 = ?",options:["9","10","11","12"],answer:1},{question:"7 + 5 = ?",options:["11","12","13","14"],answer:1},{question:"4 + 9 = ?",options:["12","13","14","15"],answer:1}];document.getElementById("start-btn").addEventListener("click",()=>{if(n=document.getElementById("username-input").value.trim(),n===""){alert("Enter your nickname!");return}document.getElementById("start-screen").style.display="none",document.getElementById("quiz-container").style.display="block",e()});function e(){const r=o[i];document.getElementById("question-text").innerText=r.question;const m=document.getElementById("options-container");m.innerHTML="",r.options.forEach((c,p)=>{const u=document.createElement("button");u.classList.add("option-btn"),u.innerText=c,u.onclick=()=>t(p),m.appendChild(u)}),document.getElementById("progress").innerText=`Question ${i+1} / ${o.length}`}function t(r){d.push({question:i+1,correct:r===o[i].answer}),r===o[i].answer&&s++,i++,i<o.length?e():l()}function l(){document.getElementById("quiz-container").style.display="none",document.getElementById("result-container").style.display="block",document.getElementById("final-score").innerText=`${n}, you have ${s} correct and ${o.length-s} wrong answers!`}document.getElementById("restart-btn").addEventListener("click",()=>{i=0,s=0,d=[],n="",document.getElementById("result-container").style.display="none",document.getElementById("start-screen").style.display="block"})}document.addEventListener("DOMContentLoaded",()=>{let a=1;document.querySelectorAll(".icon, .taskbar-icon").forEach(e=>{e.addEventListener("dblclick",()=>{i(e.dataset.app)})});function i(e){if(document.querySelector(`.window[data-app="${e}"]`))return;const t=document.createElement("div");t.classList.add("window"),t.dataset.app=e,t.style.zIndex=a++,t.style.left="100px",t.style.top="100px",t.innerHTML=`
            <div class="window-header">
                <span class="window-title">${e.toUpperCase()}</span>
                <div class="close-btn">X</div>
            </div>
            <div class="window-content" id="${e}-content"></div>
        `,document.body.appendChild(t),s(t),t.querySelector(".close-btn").addEventListener("click",()=>{t.remove()}),t.addEventListener("mousedown",()=>{t.style.zIndex=a++}),d(e,t.querySelector(".window-content"))}function s(e){let t=!1,l,r;e.querySelector(".window-header").addEventListener("mousedown",c=>{t=!0,l=c.clientX-e.offsetLeft,r=c.clientY-e.offsetTop,e.style.zIndex=a++}),document.addEventListener("mousemove",c=>{t&&(e.style.left=`${c.clientX-l}px`,e.style.top=`${c.clientY-r}px`)}),document.addEventListener("mouseup",()=>{t=!1})}function d(e,t){e==="quiz"?f(t):e==="memory"?n(t):e==="chat"&&o(t)}function n(e){e.innerHTML='<div id="memory-app">Memory Game is coming soon...</div>'}function o(e){e.innerHTML='<div id="chat-app">Chat App is coming soon...</div>'}});
