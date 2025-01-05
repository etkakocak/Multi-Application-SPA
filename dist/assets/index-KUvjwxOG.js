(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const u of e.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function m(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=m(t);fetch(t.href,e)}})();function S(i){i.innerHTML=`
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
    `;let o=0,m=0,n="";const t=[{question:"What is the most important factor that determines the <<this>> binding in JavaScript?",options:["Where the function is defined","The scope of variables","How the function is called","The type of variable"],answer:2},{question:"What is the key difference between <<map()>> and <<forEach()>> in JavaScript?",options:["map() returns a new array, forEach() does not.","forEach() is faster.","map() only works with objects.","forEach() does not create a loop."],answer:0},{question:"What condition must be met for an NxN matrix to have an inverse?",options:["All elements must be positive","Its determinant must not be 0","Rows and columns must be equal","It must be symmetric"],answer:1},{question:"Which country's football league does FC Midtjylland belong to?",options:["Norway","Sweden","Denmark","Germany"],answer:2},{question:"Which is Sweden's top-tier football league?",options:["Allsvenskan","Eliteserien","Superligan","Premierligan"],answer:0},{question:"Which of the following cities was not a Viking settlement?",options:["Uppsala","Sigtuna","Västerås","Eskilstuna"],answer:3},{question:"Which of the following was one of the allies of the Swedish Empire in the Great Northern War?",options:["Norway","Crimean Khanate","Saxony","Duchy of Courland"],answer:1}];document.getElementById("start-btn").addEventListener("click",()=>{if(n=document.getElementById("username-input").value.trim(),n===""){alert("Enter your nickname!");return}document.getElementById("start-screen").style.display="none",document.getElementById("quiz-container").style.display="block",e()});function e(){const l=t[o];document.getElementById("question-text").innerText=l.question;const s=document.getElementById("options-container");s.innerHTML="",document.getElementById("next-btn").style.display="none",l.options.forEach((c,f)=>{const r=document.createElement("button");r.classList.add("option-btn"),r.innerText=c,r.onclick=()=>u(f),s.appendChild(r)}),document.getElementById("progress").innerText=`Question ${o+1} / ${t.length}`}function u(l,s){const c=t[o];document.querySelectorAll(".option-btn").forEach((r,h)=>{h===c.answer&&r.classList.add("correct"),h===l&&l!==c.answer&&r.classList.add("wrong"),r.disabled=!0}),l===c.answer&&m++,document.getElementById("next-btn").style.display="block"}document.getElementById("next-btn").addEventListener("click",()=>{o++,o<t.length?e():p()});function p(){document.getElementById("quiz-container").style.display="none",document.getElementById("result-container").style.display="block",document.getElementById("final-score").innerText=`${n}, you have ${m} correct and ${t.length-m} wrong answers!`}document.getElementById("restart-btn").addEventListener("click",()=>{o=0,m=0,n="",document.getElementById("result-container").style.display="none",document.getElementById("start-screen").style.display="block"})}function L(i){i.innerHTML=`
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
    `;const o=i.querySelector(".memory-game"),m=o.querySelector(".start-game");o.querySelector(".board-size"),o.querySelector(".game-board"),o.querySelector(".attempts");const n=o.querySelector(".restart-btn");m.addEventListener("click",()=>{t(o)});function t(e){const u=e.querySelector(".board-size").value;let p,l;u==="4x4"?(p=4,l=4):u==="2x2"?(p=2,l=2):(p=2,l=4);let s=["🍎","🍌","🍇","🍉","🥑","🍒","🍍","🥥"];s=s.slice(0,p*l/2);let c=[...s,...s];c=g(c);const f=e.querySelector(".game-board");f.innerHTML="",f.style.display="grid",f.style.gridTemplateColumns=`repeat(${l}, 1fr)`,f.style.margin="0 auto";let r=[],h=[],v=0,d=0;c.forEach((a,y)=>{const b=document.createElement("div");b.classList.add("card"),b.dataset.symbol=a,b.dataset.index=y,b.innerHTML="?",b.setAttribute("tabindex","0"),b.addEventListener("click",()=>w(b)),f.appendChild(b)}),n.classList.remove("hidden");function g(a){return a.sort(()=>Math.random()-.5)}function w(a){r.length<2&&!r.includes(a)&&!h.includes(a)&&(a.innerHTML=a.dataset.symbol,r.push(a),r.length===2&&setTimeout(E,500))}function E(){const[a,y]=r;v++,e.querySelector(".attempts").innerText=`Attempts: ${v}`,a.dataset.symbol===y.dataset.symbol?h.push(a,y):(a.innerHTML="?",y.innerHTML="?"),r=[],h.length===c.length&&(e.querySelector(".status").innerText=`You won in ${v} attempts!`)}e.addEventListener("keydown",a=>{const y=e.querySelectorAll(".card");a.key==="ArrowRight"?d=(d+1)%y.length:a.key==="ArrowLeft"?d=(d-1+y.length)%y.length:a.key==="Enter"&&w(y[d]),y[d].focus()}),n.addEventListener("click",()=>{e.innerHTML="",L(e)})}}function q(i){i.innerHTML=`
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
    `;const o="wss://courselab.lnu.se/message-app/socket",m="eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd";let n,t="";const e=i.querySelector("#chat-username-screen"),u=i.querySelector("#chat-container"),p=i.querySelector("#chat-username-input"),l=i.querySelector("#chat-username-btn"),s=i.querySelector("#messages-container"),c=i.querySelector("#chat-message-input"),f=i.querySelector("#chat-send-btn");function r(){n&&n.readyState===WebSocket.OPEN||(n=new WebSocket(o),n.addEventListener("open",()=>{h("The Server","You are connected!",!0)}),n.addEventListener("message",d=>{const g=JSON.parse(d.data);g.type!=="heartbeat"&&h(g.username,g.data)}),n.addEventListener("close",()=>{setTimeout(r,3e3)}))}function h(d,g,w=!1){if(w&&s.querySelector(".server-message"))return;const E=document.createElement("div");E.classList.add("chat-message"),w&&E.classList.add("server-message"),E.innerHTML=`<strong>${d}:</strong> ${g}`,s.appendChild(E),s.children.length>20&&s.removeChild(s.firstChild),s.scrollTop=s.scrollHeight}function v(){const d=c.value.trim();if(d===""||!n||n.readyState!==WebSocket.OPEN)return;const g={type:"message",data:d,username:t,channel:"default",key:m};n.send(JSON.stringify(g)),c.value=""}l.addEventListener("click",()=>{t=p.value.trim(),t!==""&&(e.style.display="none",u.style.display="flex",r())}),f.addEventListener("click",v),c.addEventListener("keypress",d=>{d.key==="Enter"&&(d.preventDefault(),v())})}document.addEventListener("DOMContentLoaded",()=>{let i=1;document.querySelectorAll(".icon, .taskbar-icon").forEach(t=>{t.addEventListener("dblclick",()=>{o(t.dataset.app)})});function o(t){const e=document.createElement("div");e.classList.add("window"),e.dataset.app=t,e.style.zIndex=i++,e.style.left="100px",e.style.top="100px",e.innerHTML=`
            <div class="window-header">
                <span class="window-title">${t.toUpperCase()}</span>
                <div class="close-btn">X</div>
            </div>
            <div class="window-content" id="${t}-content"></div>
        `,document.body.appendChild(e),m(e),e.querySelector(".close-btn").addEventListener("click",()=>{e.remove()}),e.addEventListener("mousedown",()=>{e.style.zIndex=i++}),n(t,e.querySelector(".window-content"))}function m(t){let e=!1,u,p;t.querySelector(".window-header").addEventListener("mousedown",s=>{e=!0,u=s.clientX-t.offsetLeft,p=s.clientY-t.offsetTop,t.style.zIndex=i++}),document.addEventListener("mousemove",s=>{e&&(t.style.left=`${s.clientX-u}px`,t.style.top=`${s.clientY-p}px`)}),document.addEventListener("mouseup",()=>{e=!1})}function n(t,e){t==="quiz"?S(e):t==="memory"?L(e):t==="chat"&&q(e)}});
