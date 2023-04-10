const express = require("express");
const app = express();

// define path to the HTML file
const path = require("path");
const htmlPath = path.join(__dirname, "index.html");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve the HTML file at the root URL
app.get("/", (req, res) => {
  res.sendFile(htmlPath);
});

// handle chat API requests
app.post("/api/chat", async (req, res) => {
  // code for handling chat requests goes here
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
