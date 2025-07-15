#!/bin/bash

# Install Python if it isn't already.
which python3 || (apt-get update && apt-get install -y python3 python3-pip)

# Install required packages on every boot
pip3 install --upgrade pip
pip3 install -r requirements.txt

# Start the Node app
node app.js
