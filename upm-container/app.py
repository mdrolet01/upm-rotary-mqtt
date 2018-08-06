#!/usr/bin/env python
# This file reads sensor data from the UpSquared board and publishes the data to a MQTT Broker
from __future__ import print_function
import mraa
import os
import paho.mqtt.client as paho
from time import sleep
from upm import pyupm_grove as grove

#Connect to MQTT Broker
broker= os.environ['MQTTServer_URL']
print(broker)
port=1883
client1= paho.Client("pythonClient")
client1.connect(broker,port)

def main():
    # New knob on AIO pin 0
    mraa.addSubplatform(mraa.GROVEPI,"0")
    knob = grove.GroveRotary(512)

    # Loop indefinitely
    while True:
        # Read values
        abs = knob.abs_value()
        absdeg = knob.abs_deg()

        # Publish sensor data to MQTT Broker
        payload = "{\"sensor_id\":\"Rotary Sensor\",\"value\":" + str(int(absdeg)) + "}"
        ret= client1.publish("sensors/rotary/data", payload) 
        sleep(.01)

if __name__ == '__main__':
    main()
