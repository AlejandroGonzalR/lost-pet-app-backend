const Pool = require('pg').Pool;
const Database_Config = require('./config').database;

const pool = new Pool({
    user: Database_Config.user,
    host: Database_Config.host,
    database: Database_Config.database,
    password: Database_Config.password,
    port: Database_Config.port
});

pool.connect((err) => {
    if (err) return  err;
});

module.exports = pool;
