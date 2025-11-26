const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("backend data comming raaaaa");
});

app.get("/recept", (req, res) => {
  res.json([
    { id: 1, name: "Laxmi" },
    { id: 2, name: "Punnam" }
  ]);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
