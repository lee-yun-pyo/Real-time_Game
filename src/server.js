import { join } from "path";
import express from "express";
import logger from "morgan";
import socketIO from "socket.io";

const app = express();
const PORT = 4000;
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => {
    res.render("home");
})

const handleListening = () => {
    console.log(`✅ Server running: http://localhost:${PORT}`);
}

const server = app.listen(PORT, handleListening);

const io = socketIO(server); //io socket 서버의 변수 이름

let sockets = [];

io.on("connection", (socket) => {
    socket.emit("hello")

    socket.on("newMessage", ({ message }) => {
        socket.broadcast.emit("messageNoti", { message, nickname: socket.nickname || "Ann" })
    });

    socket.on("newNickname", ({ nickname }) => {
        socket.nickname = nickname;
    })
});
// 연결된 socket 정보가 필요함
// socket: request 객체 
// socket은 항상 서버의 이벤트를 듣고 있음 