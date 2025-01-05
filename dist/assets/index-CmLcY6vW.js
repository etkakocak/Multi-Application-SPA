(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const u of e.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function m(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function d(t){if(t.ep)return;t.ep=!0;const e=m(t);fetch(t.href,e)}})();function B(o){o.innerHTML=`
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
    `;let n=0,m=0,d="";const t=[{question:"What is the most important factor that determines the <<this>> binding in JavaScript?",options:["Where the function is defined","The scope of variables","How the function is called","The type of variable"],answer:2},{question:"What is the key difference between <<map()>> and <<forEach()>> in JavaScript?",options:["map() returns a new array, forEach() does not.","forEach() is faster.","map() only works with objects.","forEach() does not create a loop."],answer:0},{question:"What condition must be met for an NxN matrix to have an inverse?",options:["All elements must be positive","Its determinant must not be 0","Rows and columns must be equal","It must be symmetric"],answer:1},{question:"Which countrys football league does FC Midtjylland belong to?",options:["Norway","Sweden","Denmark","Germany"],answer:2},{question:"Which is Swedens top-tier football league?",options:["Allsvenskan","Eliteserien","Superligan","Premierligan"],answer:0},{question:"Which of the following cities was not a Viking settlement?",options:["Uppsala","Sigtuna","Västerås","Eskilstuna"],answer:3},{question:"Which of the following was one of the allies of the Swedish Empire in the Great Northern War?",options:["Norway","Crimean Khanate","Saxony","Duchy of Courland"],answer:1}];document.getElementById("start-btn").addEventListener("click",()=>{if(d=document.getElementById("username-input").value.trim(),d===""){alert("Enter your nickname!");return}document.getElementById("start-screen").style.display="none",document.getElementById("quiz-container").style.display="block",e()});function e(){const p=t[n];document.getElementById("question-text").innerText=p.question;const i=document.getElementById("options-container");i.innerHTML="",document.getElementById("next-btn").style.display="none",p.options.forEach((g,S)=>{const l=document.createElement("button");l.classList.add("option-btn"),l.innerText=g,l.onclick=()=>u(S),i.appendChild(l)}),document.getElementById("progress").innerText=`Question ${n+1} / ${t.length}`}function u(p,i){const g=t[n];document.querySelectorAll(".option-btn").forEach((l,v)=>{v===g.answer&&l.classList.add("correct"),v===p&&p!==g.answer&&l.classList.add("wrong"),l.disabled=!0}),p===g.answer&&m++,document.getElementById("next-btn").style.display="block"}document.getElementById("next-btn").addEventListener("click",()=>{n++,n<t.length?e():h()});function h(){document.getElementById("quiz-container").style.display="none",document.getElementById("result-container").style.display="block",document.getElementById("final-score").innerText=`${d}, you have ${m} correct and ${t.length-m} wrong answers!`}document.getElementById("restart-btn").addEventListener("click",()=>{n=0,m=0,d="",document.getElementById("result-container").style.display="none",document.getElementById("start-screen").style.display="block",document.getElementById("quiz-container").style.display="none",e()})}function I(o){o.innerHTML=`
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
    `;const n=o.querySelector(".memory-game"),m=n.querySelector(".start-game"),d=n.querySelector(".board-size"),t=n.querySelector(".emoji-set"),e=n.querySelector(".game-board"),u=n.querySelector(".attempts"),h=n.querySelector(".restart-btn");m.addEventListener("click",()=>{p(n)});function p(i){const g=d.value,S=t.value;let l,v;g==="4x4"?(l=4,v=4):g==="2x2"?(l=2,v=2):(l=2,v=4);const y={fruits:["🍎","🍌","🍇","🍉","🥑","🍒","🍍","🥥"],animals:["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼"],custom:["😀","😂","😎","😍","😡","😭","😱","🤔"]}[S].slice(0,l*v/2);let L=[...y,...y];L=k(L),e.innerHTML="",e.style.display="grid",e.style.gridTemplateColumns=`repeat(${v}, 1fr)`,e.style.margin="0 auto";let f=[];const q=[];let x=0,E=0;L.forEach((s,a)=>{const w=document.createElement("div");w.classList.add("card"),w.dataset.symbol=s,w.dataset.index=a,w.innerHTML="?",w.setAttribute("tabindex","0"),w.addEventListener("click",()=>r(w)),e.appendChild(w)}),h.classList.remove("hidden");function k(s){return s.sort(()=>Math.random()-.5)}function r(s){f.length<2&&!f.includes(s)&&!q.includes(s)&&(s.innerHTML=s.dataset.symbol,f.push(s),f.length===2&&setTimeout(c,500))}function c(){const[s,a]=f;x++,u.innerText=`Attempts: ${x}`,s.dataset.symbol===a.dataset.symbol?q.push(s,a):(s.innerHTML="?",a.innerHTML="?"),f=[],q.length===L.length&&(i.querySelector(".status").innerText=`You won in ${x} attempts!`)}i.addEventListener("keydown",s=>{const a=i.querySelectorAll(".card");s.key==="ArrowRight"?E=(E+1)%a.length:s.key==="ArrowLeft"?E=(E-1+a.length)%a.length:s.key==="Enter"&&r(a[E]),a[E].focus()}),h.addEventListener("click",()=>{i.innerHTML="",I(i)})}}function T(o){o.innerHTML=`
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
    `;const n=o.querySelector("#chat-username-input"),m=o.querySelector("#profile-pic-upload"),d=o.querySelector("#chat-continue-btn"),t=o.querySelector("#chat-setup"),e=o.querySelector("#chat-container"),u=o.querySelector("#profile-pic"),h=o.querySelector("#chat-user-pic"),p=o.querySelector("#chat-username"),i=o.querySelector("#chat-message-input"),g=o.querySelector("#chat-send-btn"),S=o.querySelector("#messages-container"),l="wss://courselab.lnu.se/message-app/socket",v="eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd";let b,y=localStorage.getItem("chat-username")||"";const L=localStorage.getItem("chat-user-image")||"default-profile.png",f=JSON.parse(localStorage.getItem("chat-messages"))||[];y&&(n.value=y,u.src=L,h.src=L,t.style.display="none",e.style.display="flex",p.innerText=y,E(),q()),m.addEventListener("change",r=>{const c=r.target.files[0];if(c){const s=new FileReader;s.onload=a=>{u.src=a.target.result,h.src=a.target.result,localStorage.setItem("chat-user-image",a.target.result)},s.readAsDataURL(c)}}),d.addEventListener("click",()=>{if(y=n.value.trim(),!y){alert("Username is required!");return}localStorage.setItem("chat-username",y),t.style.display="none",e.style.display="flex",p.innerText=y,q()});function q(){b&&b.readyState===WebSocket.OPEN||(b=new WebSocket(l),b.addEventListener("open",()=>{x("The Server","You are connected!",!0)}),b.addEventListener("message",r=>{const c=JSON.parse(r.data);c.type!=="heartbeat"&&x(c.username,c.data)}),b.addEventListener("close",()=>{setTimeout(q,3e3)}))}function x(r,c,s=!1){if(s&&S.querySelector(".server-message"))return;const a=document.createElement("div");a.classList.add("chat-message"),a.innerHTML=`<strong>${r}:</strong> ${c}`,S.appendChild(a),s||(f.push({user:r,message:c}),f.length>20&&f.shift(),localStorage.setItem("chat-messages",JSON.stringify(f))),S.scrollTop=S.scrollHeight}function E(){f.forEach(({user:r,message:c})=>x(r,c))}function k(){const r=i.value.trim();if(r===""||!b||b.readyState!==WebSocket.OPEN)return;const c={type:"message",data:r,username:y,channel:"default",key:v};b.send(JSON.stringify(c)),i.value=""}g.addEventListener("click",k),i.addEventListener("keypress",r=>{r.key==="Enter"&&(r.preventDefault(),k())})}document.addEventListener("DOMContentLoaded",()=>{let o=1;document.querySelectorAll(".icon, .taskbar-icon").forEach(t=>{t.addEventListener("dblclick",()=>{n(t.dataset.app)})});function n(t){const e=document.createElement("div");e.classList.add("window"),e.dataset.app=t,e.style.zIndex=o++,e.style.left="100px",e.style.top="100px",e.innerHTML=`
            <div class="window-header">
                <span class="window-title">${t.toUpperCase()}</span>
                <div class="close-btn">X</div>
            </div>
            <div class="window-content" id="${t}-content"></div>
        `,document.body.appendChild(e),m(e),e.querySelector(".close-btn").addEventListener("click",()=>{e.remove()}),e.addEventListener("mousedown",()=>{e.style.zIndex=o++}),d(t,e.querySelector(".window-content"))}function m(t){let e=!1,u,h;t.querySelector(".window-header").addEventListener("mousedown",i=>{e=!0,u=i.clientX-t.offsetLeft,h=i.clientY-t.offsetTop,t.style.zIndex=o++}),document.addEventListener("mousemove",i=>{e&&(t.style.left=`${i.clientX-u}px`,t.style.top=`${i.clientY-h}px`)}),document.addEventListener("mouseup",()=>{e=!1})}function d(t,e){t==="quiz"?B(e):t==="memory"?I(e):t==="chat"&&T(e)}});
