# Use an official Python runtime as a parent image
FROM ubuntu:16.04

# Set the working directory to /app
WORKDIR /app

# Install any needed packages specified in requirements.txt
RUN apt-get -y update \
&& apt-get install -y sudo software-properties-common python-software-properties python python-pip \
&& pip install paho-mqtt \
&& add-apt-repository ppa:mraa/mraa \
&& apt-get -y update \
&& apt-get install -y libmraa1 libmraa-dev python-mraa mraa-tools libupm-dev python-upm upm-examples

EXPOSE 1883
# Run app.py when the container launches
USER root
# Copy the current directory contents into the container at /app
ADD . /app

CMD ["python", "app.py"]
