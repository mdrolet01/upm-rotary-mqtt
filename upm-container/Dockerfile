# Use an official Python runtime as a parent image
FROM ubuntu:16.04

# Set the working directory to /app
WORKDIR /app

# Install any needed packages specified in requirements.txt
RUN apt-get -yqq update
RUN apt-get -y install sudo
RUN apt-get install -y software-properties-common python-software-properties
RUN apt-get install -yqq python
RUN apt-get -yqq install python-pip
RUN pip install paho-mqtt
RUN add-apt-repository ppa:mraa/mraa
RUN apt-get update
RUN apt-get install -y libmraa1 
RUN apt-get install -y libmraa-dev 
RUN apt-get install -y python-mraa 
RUN apt-get install -y mraa-tools
RUN apt-get install -y libupm-dev 
RUN apt-get install -y python-upm 
RUN apt-get install -y upm-examples

EXPOSE 1883
# Run app.py when the container launches
USER root
# Copy the current directory contents into the container at /app
ADD . /app

CMD ["python", "app.py"]

