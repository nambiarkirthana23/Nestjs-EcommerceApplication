import { DataSource, DataSourceOptions } from "typeorm";
import {config} from 'dotenv'

config()
export const dataSourceOptions:DataSourceOptions={
    type: 'mysql',
    host:process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    entities:['dist/**/*.entity.js'],
     //migrations:['dist/db/migrations/*.js'],
     //migrations:[],
     synchronize:true,

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;