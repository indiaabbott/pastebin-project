import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();

//get all submissions
app.get("/", async (req, res) => {
  const dbres = await client.query('select * from pastebin_table ORDER BY id DESC');
  res.json(dbres.rows);
});

//create another submission and insert into database
app.post("/submit", async (req, res) => {
  try {
    const {title, content} = req.body; //req.body holds information
    //console.log(req.body)
    const newSubmission = await client.query('INSERT INTO pastebin_table (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
    res.json(newSubmission.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get a single submission (to be displayed by React)
app.get("/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const getOneSubmission = await client.query('SELECT * FROM pastebin_table WHERE id = $1',[id]);
    res.json(getOneSubmission.rows[0]);
  } catch (error) {
    console.error(error.message)
    
  }
});




//delete a todo

app.delete("/:id", async (req, res) => { //with a URL such as localhost:5000/4, then req.params.id === 4
  try {
    const {id} = req.params;
    const deleteSubmission = await client.query('DELETE FROM pastebin_table WHERE id = $1', [id]);
    res.json("Todo was deleted!")
  } catch (error) {
    console.error(error.message);
  }
});


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
