'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const winston = require('winston');
const config = require('./config');

const path = require('path');



const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

// Constants
const PORT = config.server.port;
const HOST = config.server.host;

// App
const app = express();
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.post('/images', function (req, res) {
    const { image, title }  = req.body;
    createImage(image, title);
    res.send('POST request to the image server');
});

function createImage(encodedImage, title) {
    console.log(title)
    let buf = Buffer.from(encodedImage, 'base64');
    fs.writeFile(path.join(__dirname, '/images/', `${title}.png`), buf, function(error){
        if(error){
            throw error;
        } else{
            console.log('File created from base64 string!');
            return true;
        }
    });
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
