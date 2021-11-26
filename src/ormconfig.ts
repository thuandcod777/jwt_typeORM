import {join} from "path";
import { ConnectionOptions } from "typeorm";
import { User } from "./auth/entity/user.entity";

/* const config={
    host: "ec2-54-88-154-67.compute-1.amazonaws.com",
    user: "dulbzpihpwsiyb",
    password: "085dac27d01705f3d22a80892d9a49419f99cc03c61955318064c843a375b239",
    database: "d1g53ag0gsm50f",
};
 */
/* const connectionOptions: ConnectionOptions={
    type: "postgres",
    url: "postgres://dulbzpihpwsiyb:085dac27d01705f3d22a80892d9a49419f99cc03c61955318064c843a375b239@ec2-54-88-154-67.compute-1.amazonaws.com:5432/d1g53ag0gsm50f",
    host: "ec2-54-88-154-67.compute-1.amazonaws.com" || "localhost",
    port: 5432,
    username: config.user,
    password: config.password,
    database: config.database || "postgres",
    entities: [User],
    extra:{
        ssl:{
            rejectUnauthorized:false,
        }
    },
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "debug",
    migrations: [join(__dirname,"src/migration/**//* *.ts")], */
/* }; */ 

/* export = connectionOptions; */

const connectionOptions: ConnectionOptions={
    type: "postgres",
    /* url: "postgres://dulbzpihpwsiyb:085dac27d01705f3d22a80892d9a49419f99cc03c61955318064c843a375b239@ec2-54-88-154-67.compute-1.amazonaws.com:5432/d1g53ag0gsm50f", */
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "postgres",
    entities: [User],
   /*  extra:{
        ssl:{
            rejectUnauthorized:false,
        }
    }, */
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "debug",
    migrations: [join(__dirname,"src/migration/**//* *.ts")],
}; 

export = connectionOptions; 