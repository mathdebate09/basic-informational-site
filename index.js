const express = require("express");
const path = require("path");
const app = express();

const PORT = 8080
const PAGES_DIR = path.join(__dirname, 'pages');

// static declaration at first
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(PAGES_DIR, "about.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(PAGES_DIR, "contact.html"));
});

// 404 at end
app.use((req, res) => {
    res.status(404).sendFile(path.join(PAGES_DIR, "404.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});