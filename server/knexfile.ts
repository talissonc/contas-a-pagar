import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWD,
        database : 'contas-a-pagar'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
};