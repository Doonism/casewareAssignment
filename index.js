const express = require('express');
const app = express();
const fs = require('fs');
var jsFunction = require('./public/javascript/index')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

var obj = JSON.parse(fs.readFileSync('./MOCK_DATA.json', 'utf8'));

app.post("/search", (req, res) => {
  var employee = req.body.name;
  var name = jsFunction.searchDatabase(employee, obj);
  res.send(name);
  res.end();
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App started on the following ${PORT}`));