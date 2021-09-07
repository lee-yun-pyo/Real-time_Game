import { join } from "path";
import express from "express";

const app = express();
const PORT = 4000;
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => {
    res.render("home");
})

const handleListening = () => {
    console.log(`✅ Server running: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);