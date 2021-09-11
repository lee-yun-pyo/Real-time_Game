import { handleMessage } from "./chat";

const socket = io("/");

const sendMessage = (message) => {
    socket.emit("newMessage", { message });
    console.log(`You - ${message}`);
}
const setNickname = (nickname) => {
    socket.emit("newNickname", { nickname });
}

socket.on("messageNoti", handleMessage)