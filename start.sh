#!/bin/bash

# Create virtual enviroment
python3 -m venv .venv

# Activate virtual enviroment 
source .venv/bin/activate

# Install required packages 
pip install --upgrade pip
pip install -r requirements.txt

# Start the Node app
node app.js
