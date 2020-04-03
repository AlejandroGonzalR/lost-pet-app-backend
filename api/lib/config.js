module.exports = {
    server: {
        port: 10000,
        host: '0.0.0.0'
    },
    imageServer: {
        port: 10001,
        host: 'images_server'
    },
    database: {
        port: 5432,
        host: 'postgres',
        user: 'manager',
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.DATABASE_NAME
    }
};
