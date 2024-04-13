import { DataSource, DataSourceOptions } from "typeorm";
import {config} from 'dotenv'

config()
export const dataSourceOptions:DataSourceOptions={
    type: 'postgres',
    // host:process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username:process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'kirthana',
    database:'Ecommerce',
    entities:['dist/**/*.entity.js'],
     //migrations:['dist/db/migrations/*.js'],
    //   migrations:['dist/db/migrations/*{.ts,js}'],
    migrations:['dist/db/migrations/*.js'],
     synchronize:false,

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;