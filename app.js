var express = require('express')
var app = express()
require('dotenv').config()
var path = require('path')
var routing = require('./routes/Router')
const mongoose = require('mongoose')

var pw = process.env.PASSWORD
var url = `mongodb+srv://root:${pw}@cluster0.yzejk.mongodb.net/mydb?retryWrites=true&w=majority`
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true } )

app.set('views', path.resolve(__dirname+ '/views'))
app.set('view engine', 'ejs')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

//routing 파일 
app.use('/', routing);

const port = process.env.PORT
//(method) Application.listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): Server (+5 overloads)
app.listen(port, function(){
    console.log(`Server is starting at http://localhost:${port}`)
})