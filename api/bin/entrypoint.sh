#!/bin/bash

echo "Waiting for postgres..."
./bin/wait-for-it.sh postgres:5432 -t 0
echo "PostgreSQL started"
node lib/index.js
