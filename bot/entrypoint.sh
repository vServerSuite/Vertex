#!/bin/sh
if [ -f "/vertex/config/database.json" ]; then
  npx sequelize db:migrate --env db
  node src/index.js
else
  cp /vertex/config.example.json /vertex/config/config.json
  rm /vertex/config.example.json

  cp /vertex/database.example.json /vertex/config/database.json
  rm /vertex/database.example.json
  
  node src/index.js
fi
