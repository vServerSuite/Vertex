#!/bin/sh
if [ -f "/vertex/config/config.json" ]; then
  node src/index.js
else
  cp /vertex/config/config.example.json /vertex/config/config.json
  rm /vertex/config/config.example.com
  node src/index.js
fi
