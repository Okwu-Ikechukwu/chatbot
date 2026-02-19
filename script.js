const chatbody = document.querySelector(".chat-body");
const messageinput = document.querySelector(".message-input");
const sendmessagebtn = document.querySelector("#send-message");
const fileinput = document.querySelector("#file-input");
const fileuploadwrapper = document.querySelector(".file-upload-wrapper");
const filecancelbtn = document.querySelector("#file-cancel");
const chatbottoggler = document.querySelector("#chatbot-toggler");
const closechatbot = document.querySelector("#close-chatbot");





// API setup
const API_KEY = "AIzaSyDkxHJUnQydRkOgszS0KcEK-oPMEiKK_k0";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

const userdata = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }

}

// create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
        div.classList.add("message", ...classes);
        div.innerHTML = content;
        return div;
    
}

// generating bot response using free gemini api
const generatebotresponse = async (incomingmessagediv) => {
    const messageelement = incomingmessagediv.querySelector(".message-text");
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "applicatication/json" },
        body: JSON.stringify({
            contents: [{
                "parts": [{text: userdata.message }, ...(userdata.file.data ? [{ inline_data: userdata.file}] : [])]
            }]
        })
    }
   try {
    // fetch bot response from API
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if(!response.ok) throw new Error(data.error.message);

    // Extract and display bot's response text
    const apiResponsetext = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    messageelement.innerText = apiResponsetext;
   } catch (error) {
    // handle error in api response
    console.log(error);
    messageelement.innerText = error.message;
    messageelement.style.color = "#ff0000"
   } finally {
    // reset user file data, removing thinking indicator and scroll chat to buttom
    userdata.file = {};
    incomingmessagediv.classList.remove("thinking");
    chatbody.scrollTo({ top: chatbody.scrollHeight, behavior: "smooth" });
   }
}; 


// handle outgoing user messages
const handleoutgoingmessage = (e) => {
    e.preventDefault();
    userdata.message = messageinput.value.trim();
    messageinput.value = "";
     fileuploadwrapper.classList.remove("file-uploaded");   

    // create display user message
    const messagecontent = `<div class="message-text"></div>
    ${userdata.file.data ? `<img src="data:${userdata.file.mime_type};base64,${userdata.file.data}" class="attachment" />` : ""}`;
    const outgoingmessagediv = createMessageElement(messagecontent, "user-message")
    outgoingmessagediv.querySelector(".message-text").textContent = userdata.message
    chatbody.appendChild(outgoingmessagediv);
    chatbody.scrollTo({ top: chatbody.scrollHeight, behavior: "smooth" });


    // simulate bot response with thinking indicator after a delay


    setTimeout(() => {
        const messagecontent = ` <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                    </svg> 
                    <div class="message-text">
                        <div class="thinking-indicator">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>`;
        const incomingmessagediv = createMessageElement(messagecontent, "bot-message", "thinking");   
        chatbody.appendChild(incomingmessagediv);
        chatbody.scrollTo({ top: chatbody.scrollHeight, behavior: "smooth" });
        generatebotresponse(incomingmessagediv);
    }, 600);
}

// handle enter key press for sending messages
messageinput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if(e.key === "Enter" && userMessage) {
        handleoutgoingmessage(e);
    }
})


// handle file upload change and preview the selected file
fileinput.addEventListener("change", () => {
    const file = fileinput.files[0];
    if(!file) return;

    // converting file to base64 format
    const reader = new FileReader();
    reader.onload = (e) => {
        fileuploadwrapper.querySelector("img").src = e.target.result;
        fileuploadwrapper.classList.add("file-uploaded");
        const base64String = e.target.result.split(",")[1];

        // store files data in userdata
        userdata.file = {
        data: base64String,
        mime_type: file.type
    }
       fileinput.value = "";
    }
    
    reader.readAsDataURL(file);
});

// cancel file upload
filecancelbtn.addEventListener("click", () => {
    userdata.file = {};
    fileuploadwrapper.classList.remove("file-uploaded");
});

// initialize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition:"none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const { selectionStart: start, selectionEnd: end } = messageinput;
        messageinput.setRangeText(emoji.native, start, end, "end");
        messageinput.focus();
    },
    onClickOutside: (e) => {
        if(e.target.id === "emoji-picker") {
            document.body.classList.toggle("show-emoji-picker");
        } else{
            document.body.classList.remove("show-emoji-picker");

        }
    }

});

document.querySelector(".chat-form").appendChild(picker);

sendmessagebtn.addEventListener("click", (e) => handleoutgoingmessage(e));
document.querySelector('#file-upload').addEventListener("click", () => fileinput.click());
chatbottoggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closechatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
