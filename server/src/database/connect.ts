
import knex from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

const connection = knex({
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWD,
        database : 'contas-a-pagar'
    }
});

export default connection;