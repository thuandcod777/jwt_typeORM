import "reflect-metadata";
import express from "express";
import { ConnectionOptions,createConnection } from "typeorm";
import config from "./ormconfig";
import { router } from "./routers/routes";

/* const app=express();

app.get("/",(req,res)=>{
    res.send("API IS ROKING");
});

app.listen(8080,()=>{
    console.log("Sever is running at 8080");
}); */
const app=express();
const port= process.env.PORT || 8080;

createConnection(config as ConnectionOptions).then(async(connection)=>{
    if(connection.isConnected){
        console.log("Postgres is connect");
    }
   
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use("/",router);
    app.listen(port,()=>{
        console.log(`Server is roking at ${port}`);
    });
}).catch((error)=>{
    console.log(error);
});