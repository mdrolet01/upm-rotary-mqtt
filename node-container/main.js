// Setup required packages
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt    = require('mqtt');

// Define Port for the web server
const PORT = 8000;
const HOST = '0.0.0.0'

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

// Setup Server on port 8000
http.listen(PORT, HOST);
console.log(`The Web server running on http://${HOST}:${PORT}`);
