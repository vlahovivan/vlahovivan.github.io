const express = require('express');
const load_everything = require('./load_everything');

const PORT = process.env.PORT || 7070;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

data = load_everything();

app.get('/', async (req, res) => {
    res.render('index.ejs', data);
});

app.listen(PORT);
console.log("Server started!");