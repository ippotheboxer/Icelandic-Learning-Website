import express from "express";
import bodyParser from "body-parser";
import fs from "fs"
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

fs.readFile("data.json", (error, data) => {
  if (error) {
    console.error(error);

    throw err;
  }
  const jsonData = JSON.parse(data);
});

// All paths
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/memoryMenu", (req, res) => {
  res.render("menu.ejs");
});

app.post("/submit", (req,res) => {
  let data = {
    topic:req.body.topic
  }
  res.render("matchingGame.ejs", {data:data})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });