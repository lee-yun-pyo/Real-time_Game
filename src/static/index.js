const socket = io("/");

socket.on("hello", () => {
    console.log("Somebody Joined")
})

socket.emit("hi");