import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "icelandicLearning",
  password: "Your password",
  port: 5432,
  });
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

async function getTopics() {
  const result = await db.query("SELECT * FROM topics");
  let topicsList = [];
  result.rows.forEach((topic) => {
    topicsList.push(topic);
   });
   return topicsList;
 }

 async function getItems() {
  const result = await db.query("SELECT * FROM matching_items");
  let itemsList = [];
  result.rows.forEach((item) => {
    itemsList.push(item);
   });
   return itemsList;
 }

// All paths
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/memoryMenu", async (req, res) => {
  const result = await getTopics();
  res.render("menu.ejs", {topicsList: result});
});

app.get("/dictionary", async (req, res) => {
  const result = await getTopics();
  const itemResult = await getItems();
  res.render("dictionary.ejs", {topicsList: result, matching_items:itemResult});
});

app.post("/submit", async (req,res) => {
  const itemResult = await getItems();
  let data = {
    topic:req.body.topic
  }
  res.render("matchingGame.ejs", {data:data, matching_items:itemResult})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});