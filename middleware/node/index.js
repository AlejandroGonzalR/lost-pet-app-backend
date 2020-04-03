'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const Prometheus = require('prom-client');
const winston = require('winston');

const config = require('./config');

// Constants
const PORT = config.server.port;
const HOST = config.server.host;

// Performance
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

const metricsInterval = Prometheus.collectDefaultMetrics;
metricsInterval({ timeout: 1000 });

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
});

// App
const app = express();
Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', function (req, res, next) {
    res.json({ message: 'Hey! I`m here' });
    next();
});

app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('Sentry error!');
});


// Metrics
app.use((req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
});

app.get('/metrics', (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType);
    res.end(Prometheus.register.metrics());
});

app.use((req, res, next) => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch;
    httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(responseTimeInMs);
    next();
});

// Error handler
app.use(Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
        return error.status === 404 || error.status === 500;
    }
}));

app.use(function onError(err, req, res, next) {
    logger.error('An error has been detected');
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

let server = app.listen(PORT, HOST);
logger.info(`Middleware running on http://${HOST}:${PORT}`);

// Shutdown
process.on('SIGTERM', () => {
    clearInterval(metricsInterval);
    server.close((err) => {
        if (err) {
            logger.info(err);
            logger.warning('Process finished with 1 status');
            process.exit(1)
        }
        logger.info('Process finished with 0 status');
        process.exit(0)
    })
});
