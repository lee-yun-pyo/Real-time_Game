const socket = io("/");

const sendMessage = (message) => {
    socket.emit("newMessage", { message });
    console.log(`You - ${message}`);
}
const setNickname = (nickname) => {
    socket.emit("newNickname", { nickname });
}
const handleMessage = (data) => {
    const { message, nickname } = data;
    console.log(`${nickname} said ${message}`)
}
socket.on("messageNoti", handleMessage)