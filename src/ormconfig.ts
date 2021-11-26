import {join} from "path";
import { ConnectionOptions } from "typeorm";
import { User } from "./auth/entity/user.entity";

 const config={
    host: "ec2-3-211-3-53.compute-1.amazonaws.com",
    user: "izwzqionrtoxhn",
    password: "af51df3cb767638e0fc2dc878282dc08c60a4ef9376e9faac80e54a92fa5f6c7",
    database: "deafalgbjbgcdp",
};
 
 const connectionOptions: ConnectionOptions={
    type: "postgres",
    url: "postgres://izwzqionrtoxhn:af51df3cb767638e0fc2dc878282dc08c60a4ef9376e9faac80e54a92fa5f6c7@ec2-3-211-3-53.compute-1.amazonaws.com:5432/deafalgbjbgcdp",
    host: config.host || "localhost",
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
    migrations: [join(__dirname,"src/migration/**//* *.ts")], 
 }; 


/* const connectionOptions: ConnectionOptions={
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345",
    database: "postgres",
    entities: [User], */
   /*  extra:{
        ssl:{
            rejectUnauthorized:false,
        }
    }, */
/*     synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "debug",
    migrations: [join(__dirname,"src/migration/**//* *.ts")],
};  */

export = connectionOptions; 