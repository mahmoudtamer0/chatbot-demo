const socket = io("https://aleef-server.up.railway.app", {
    auth: {
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
