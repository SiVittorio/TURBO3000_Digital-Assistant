// ==UserScript==
// @name         Xenofan
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Чат-бот помощник для подачи заявки в грантовом модуле ФГАИС Молодежь России
// @author       TURBO 3000
// @match        https://grants.myrosmol.ru/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=myrosmol.ru
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

(function() {
    'use strict';

    const chatButtonImg = "data:image/png;base64,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";
    const botAvatarImg = "data:image/png;base64,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";
    const outOfChatButtonImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE+SURBVHgB7ZY9TsMwFMffe4SdnRNkQr0AHzviCkTiY0eiAyyUFXoCBGoOARIb3IAxGyoDUxcmUKvYDxvkKrVDUiTHUCm/IYmtZ//+jmIrAC0t/42Lgyy53M964BmsK9BiYhzoZwY+717HPfAEwZxijRCTdfAIzSvOxfjhefSyDR7B34ivbnfeoUl5KLEjDymekYcWT+W2WMr8VV0OMVp2xCQRJTFXTWrX2G21XR/1PbLFX8UUrap9cFc2MZNOXH082DUlY/DbI2ET/ojo+CZO+nuZyoK7plOyHBEt3Zs2s2REcpZb7LdrTNsdy8I8TTtVgLQYYCLG3dPBWh8aZGY1oQM4rzJkgNLPNlSAH/dMiACVG7bpALU/E8UA6owaRuKjc5R23sADtXITgAE3csFbJ2k8hNCcJU8r0NKyyHwCN5fW+56sWGIAAAAASUVORK5CYII=";
    const addFilesButtonImg = "data:image/png;base64,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";
    const css =
`#chatButton {
    border: none;
    cursor: pointer;
    appearance: none;
    background-color: inherit;
    position: fixed;
    right: 50px;
    bottom: 50px;
}

.chatButtonImage {
    filter: alpha(opacity=100);
    opacity: 1;
}

.chatButtonImage:hover {
    filter: alpha(opacity=85);
    opacity: 0.85;
}

.show{
    display: flex;
}

.chatPopup {
    display: none;
    position: fixed;
    bottom:80px;
    right:160px;
    height: 460px;
    width: 360px;
    background-color: white;
    /* display: flex; */
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.4);
    border-radius: 10px;
}

.chatArea{
    height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
}

.incomeMsg{
    display: flex;
    align-items: center;
}

.avatar {
    width:45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
}

.addFilesButtonImage {
    width:20px;
    height: 15px;
    border-radius: 50%;
    object-fit: cover;
}

.incomeMsg .msg {
    background-color: #D9D9D9;
    color: #4B4B4B;
    padding: 10px;
    border-radius: 25px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.4);
    margin-bottom: 20px;
    margin-left: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
}

.inputArea {
    position: relative;
    display: flex;
    justify-content: right;
    background: #D9D9D9;
    border-radius: 21px;
}

input[type="text"] {
    width: 225px;
    border: 1px solid #ccc;
    font-size: 1rem;
    border-radius: 5px;
    height: 2.2rem;
}

.submit {
    padding: 0.25rem 0.5rem;
    margin-left: 0.5rem;
    background: #8C64D8;
    color:white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    opacity: 0.7;
}

.outMsg {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.myMsg{
    display: flex;
    justify-content: flex-end;
    margin: 0.75rem;
    padding: 0.5rem;
    border-radius: 25px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.4);
    word-break: break-all;
    background: #EBEBEB;
    margin-bottom: 20px;
}

.chatHeader {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    top: 0;
    background: #EBEBEB;
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
    border-radius: 13px 13px 0px 0px;
    padding: 5px;
    margin-bottom: 20px;
}

#outOfChatButton {
    border: none;
    cursor: pointer;
    appearance: none;
    background-color: inherit;
    padding: 10px;
}

.incomeMsgWrapper {
    margin-left: 10px;
}

@media (max-width:500px){

    .chatPopup {
        bottom: 120px;
        right:10%;
        width: 80vw;
    }
}

.botDesc {
    margin-left: 13px;
    margin-top: 7px;
}

.botHelperAvatar {
    margin-left: 7px;
    padding: 50px;
}

.botName {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
}

.botStatus {
font-size: 16px;
font-weight: 400;
line-height: 19px;
letter-spacing: 0em;
text-align: left;
color: #8C64D8;
}

.chatFooter {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    bottom: 0;
    background: #EBEBEB;
    border-radius: 0px 0px 13px 13px;
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
    padding: 13px;
}

`;
    const js =
`
const popup = document.querySelector('.chatPopup');
const chatBtn = document.querySelector('#chatButton');
const submitBtn = document.querySelector('.submit');
const chatArea = document.querySelector('.chatArea');
const inputElm = document.querySelector('input');

//   chat button toggler

chatBtn.addEventListener('click', ()=>{
    if (popup.style.display === 'flex')
    {
        popup.style.display = 'none';
    }
    else
    {
        popup.style.display = 'flex';
    }
})

// send msg
submitBtn.addEventListener('click', ()=>{
    console.log("CALLED");
    let userInput = inputElm.value;

    let temp = '<div class="outMsg"><span class="myMsg">' + userInput + '</span></div>';

    chatArea.insertAdjacentHTML("beforeend", temp);
    inputElm.value = '';
})

`;

    function CSS() {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    function JS() {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = js;
        document.head.appendChild(script);
    }

    CSS();

    waitForElm('.user-card_name_1Sa7l').then((elm) => {
        const chatButtonImage = document.createElement("img");
        chatButtonImage.src = chatButtonImg;;
        chatButtonImage.className = "chatButtonImage";

        const chatButton = document.createElement("button");
        chatButton.append(chatButtonImage);
        chatButton.id = "chatButton";
        document.body.appendChild(chatButton);

        const chatPopup = document.createElement("div");
        chatPopup.className = "chatPopup";

        const chatHeader = document.createElement("div");
        chatHeader.className = "chatHeader";
        chatPopup.appendChild(chatHeader);

        const outOfChatButtonImage = document.createElement("img");
        outOfChatButtonImage.src = outOfChatButtonImg;
        outOfChatButtonImage.className = "outOfChatImage";

        const outOfChatButton = document.createElement("button");
        outOfChatButton.append(outOfChatButtonImage);
        outOfChatButton.id = "outOfChatButton";
        chatHeader.appendChild(outOfChatButton);

        const botHelperAvatar = document.createElement("img");
        botHelperAvatar.src = botAvatarImg;
        botHelperAvatar.className = "avatar";
        botHelperAvatar.alt = "";
        chatHeader.appendChild(botHelperAvatar);

        const botDesc = document.createElement("div");
        botDesc.className = "botDesc";
        chatHeader.appendChild(botDesc);

        const botName = document.createElement("h6");
        botName.className = "botName";
        botName.innerHTML = "Поддержка";
        botDesc.appendChild(botName);

        const botStatus = document.createElement("h6");
        botStatus.className = "botStatus";
        botStatus.innerHTML = "В сети";
        botDesc.appendChild(botStatus);

        const chatArea = document.createElement("div");
        chatArea.className = "chatArea";
        chatPopup.appendChild(chatArea);

        const incomeMsgWrapper = document.createElement("div");
        incomeMsgWrapper.className = "incomeMsgWrapper";
        chatArea.append(incomeMsgWrapper);

        const incomeMsg = document.createElement("div");
        incomeMsg.className = "incomeMsg";
        incomeMsgWrapper.appendChild(incomeMsg);

        const botAvatar = document.createElement("img");
        botAvatar.src = botAvatarImg;
        botAvatar.class = "avatar";
        botAvatar.alt = "";
        incomeMsg.appendChild(botAvatar);

        const botMsgText = document.createElement("span");
        botMsgText.className = "msg";
        botMsgText.innerHTML = "Привет," + elm.textContent + "!";
        incomeMsg.appendChild(botMsgText);

        const chatFooter = document.createElement("div");
        chatFooter.className = "chatFooter";
        chatPopup.appendChild(chatFooter);

        const inputArea = document.createElement("div");
        inputArea.className = "inputArea";
        chatFooter.appendChild(inputArea);

        const inputElem = document.createElement("input");
        inputElem.type = "text";
        inputArea.appendChild(inputElem);

        const submitBtn = document.createElement("button");
        submitBtn.className = "submit";
        submitBtn.type = "submit";
        submitBtn.innerHTML = "Отправить";
        inputArea.appendChild(submitBtn);

        document.body.appendChild(chatPopup);

        JS();
    });
})();
