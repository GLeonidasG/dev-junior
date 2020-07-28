import Knex from 'knex';
import config from '../config-db.json'

const connection = Knex({
    client: 'pg',
    connection:{
        host: config.host,
        database: config.database,
        user: config.user,
        password: config.password,
        port: config.port
    }
})
export default connection;