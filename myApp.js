var bodyParser = require("body-parser")
var express = require('express');
var app = express();
console.log("Hello World");

// app.get("/", function(req, res){
//     res.send("Hello Express")
// });

app.use(bodyParser.urlencoded({ extended: false }), (req, res, next) => {
  app.use(bodyParser.json());
  next();
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public",express.static(__dirname + "/public"));


const mySecret = process.env['MESSAGE_STYLE']


app.get("/json", (req, res) => {
  if(process.env.MESSAGE_STYLE==='uppercase'){
    res.json({
      "message": "HELLO JSON"
    })
  } else {
    res.json({
      "message":"Hello json"
    })
  };
});


app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({
    "time":req.time
  })
})

app.get('/:word/echo', (req, res) => {
  var param = req.params.word
  res.json({
    "echo":param
  })
})

app.get('/name', (req, res) => {
  var firstname = req.query.first;
  var lastname = req.query.last;
  res.json({
    "name" : `${firstname} ${lastname}`
  }) 
})

app.post('/name', (req, res) => {
  var firstname = req.body.first;
  var lastname = req.body.last;
  res.json({
    "name": `${firstname} ${lastname}`
  })
})