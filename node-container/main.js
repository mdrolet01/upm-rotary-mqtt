// Setup required packages
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt    = require('mqtt');

// Define Port for the web server
const PORT = 8000;
const HOST = '0.0.0.0'

// Setup MongoDB
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://" + process.env.MONGODB_URL +":"+ process.env.MONGODB_PORT +"/";
var dbo;

// Connect to MongoDB - Not currently implemented
/* MongoClient.connect(url, function(err, client) {
   if (err) {
   console.log("Unable to connect with MongoDB")
   throw  err
   }
   else{
   console.log("Connected successfully to MongoDB server");
   dbo = client.db("mqtt");
   }
   });
 */

// Connect to MQTT Broker
var client  = mqtt.connect("mqtt://" + process.env.MQTTServer_URL, {port: 1883});
console.log("connected flag  " + client.connected);

// Subscribe to rotary sensor topic
client.subscribe("sensors/rotary/data")

// Route for index.html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    });

// When MQTT recieves a message, emit the data using socket.io
client.on('message',function(topic, message, packet){
    io.emit('updateAngle', JSON.parse(message));
    });

/* ---------- ALTERNATIVE OPTION USING MONGODB ----------
   io.on('connection', function(socket){
   setInterval(function(){
   dbo.collection('sensor_data').findOne({},{sort:[['_id',-1]]},function (findErr, result){
   io.emit('chat message', result.value);
   });
   }, 100) 
   });
 */ 

// Setup Server on port 8000
http.listen(PORT, HOST);
console.log(`The Web server running on http://${HOST}:${PORT}`);
