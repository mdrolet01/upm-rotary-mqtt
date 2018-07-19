# upm-rotary-mqtt
<p>The purpose of this application is to evaluate the performance of MQTT and Websockets for viewing live sensor data on an Intel board. In this application, there are three containers: Python Sensor collection, Mosquitto MQTT Broker, and Node JS. You will be able to see the live data on a web page after running the docker containers.</p>
<li>If you'd like to view live sensor data on a remote sever, check out: </li>
https://github.com/mdrolet01/upm-rotary-http.git
<h2>Getting Started:</h2>
First, you will need an UpSquared Board with the GROVE kit<br>
Connect the GROVEPI shield to the board <br>
Plug in the Rotary sensor to A0 (Analog pin 0)<br>
Make sure docker engine is installed on your computer<br>

<h2>Instructions:</h2>

    git clone https://github.com/mdrolet01/upm-rotary-mqtt.git
    cd upm-rotary-mqtt/node-container
    docker build . -t nws
    cd ../upm-container
    docker build . -t mqttpy
    cd ..
    docker compose up
<br>
