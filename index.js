import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Your database",
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
   console.log(topicsList);
   return topicsList;
 }


// All paths
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/memoryMenu", async (req, res) => {
  const result = await getTopics();
  res.render("menu.ejs", {topicsList: result});
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