#!/usr/bin/env python
# This file reads sensor data from the UpSquared board and publishes the data to a MQTT Broker
from __future__ import print_function
import mraa
import os
import paho.mqtt.client as paho
from time import sleep
from upm import pyupm_grove as grove

broker= os.environ['MQTTServer_URL'] # Try using mosquitto container DNS --  Use different IP Address if publishing to another device
port=1883
def on_publish(client,userdata,result):
    #print("data published \n")
    pass

client1= paho.Client("control1")
client1.on_publish = on_publish
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
        absrad = knob.abs_rad()

        #print("Abs values: %4d" % int(abs) , " raw %4d" % int(absdeg), "deg = %5.2f" % absrad , " rad ", end=' ')

        payload = "{\"sensor_id\":\"Temperature Sensor\",\"value\":" + str(int(absdeg)) + "}"
        ret= client1.publish("sensors/rotary/data", payload) 
        sleep(.01)

if __name__ == '__main__':
    main()
