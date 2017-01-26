'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Board = require('firmata')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname))
var pin = 3


var board = new Board("/dev/cu.usbmodem1411")
board.on('ready', function(){
  board.pinMode(pin, board.MODES.OUTPUT)
})

//FOR BLUEMIX
const port = process.env.VCAP_APP_PORT || 3000;
const host = process.env.VCAP_APP_PORT || 'localhost';

var status = 0
app.get('/light', (req, res, next)=>{
  var b = req.body
  board.digitalWrite(pin, (status ^= 1));
  res.send("hello world" )
})

app.listen(port)
console.log('listening on ' + port)
