const express = require("express")
const cors = require("cors")
const lowDb = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const bodyParser = require("body-parser")
const { nanoid } = require("nanoid")

const db = lowDb(new FileSync('db.json'))

db.defaults({ notes: [] }).write()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'pug');

const PORT = 4000;

app.get('/', function(req, res) {
  const data = db.get("notes").value()
  
  res.render('index', {
    data
  });
});

app.get('/new', function(req, res) {  
  res.render('create');
});

app.get('/posts', (req, res) => {
  const data = db.get("notes").value()
  return res.json(data)
})

app.post('/posts/new', (req, res) => {
  const post = req.body
  db.get("notes").push({
    ...post, id: nanoid()
  }).write()
  res.json({ success: true, data: post })
})

app.listen(PORT, ()=> {
  console.log(`Backend is running on http://localhost:${PORT}`)
})