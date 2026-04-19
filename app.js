const socket = io("https://aleef-server.up.railway.app", {
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9oYW1lZCBEZXNhd3kiLCJpZCI6IjY5Y2MyOTA4YjlmMjdhMjQ0YmM0YWZmZCIsInJvbGUiOiJVU0VSIiwic2Vzc2lvbklkIjoiNjllNDNmNjNhNThlZTNiZmU1NjIzMWRhIiwiZW1haWwiOiJtb2Rlc2F3eXlAZ21haWwuY29tIiwiaWF0IjoxNzc2NTY2MTE1LCJleHAiOjE3NzY5OTgxMTV9.0htWN6BAcRSQOZwQj4YWRFOHVDfxbX9yemVgeF9hu4c" // optional, if your server requires authentication
    }
});

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");
const typing = document.getElementById("typing");

// add message
function addMessage(text, type) {
    const div = document.createElement("div");
    div.classList.add("msg", type);
    div.innerText = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// send message
function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    // show typing
    typing.classList.remove("hidden");

    socket.emit("chat_send", {
        message
    });
}

// receive bot response
socket.on("chat_response", (data) => {
    typing.classList.add("hidden");
    addMessage(data.message, "bot");
});

// optional: error
socket.on("chat:error", (err) => {
    typing.classList.add("hidden");
    addMessage("Error: " + err.message, "bot");
});