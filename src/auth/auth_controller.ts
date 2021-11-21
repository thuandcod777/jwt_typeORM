import { getManager } from "typeorm";
import {Request,Response} from "express";
import { UserRepository } from "./repository/user.repos";

export class AuthController{

    //create a new user
    /*   static async createUser(req: Request,res:Response){
        let manager=await getManager().getCustomRepository(UserRepository);
        await manager.createUser(req,res);
    } */

    
    static async fetchUser(req:Request,res:Response){
        let manager=getManager().getCustomRepository(UserRepository);
        await manager.fetchUser(req,res);
    }


  /*   static async deleteUser(req:Request,res:Response){
        let manager=getManager().getCustomRepository(UserRepository);
        await manager.deleteUser(req,res);
    }

    static async updateUser(req:Request,res:Response){
        let manager=getManager().getCustomRepository(UserRepository);
        await manager.updateUser(req,res);
    }
 */

    static async signin(req:Request,res:Response){
        let manager=getManager().getCustomRepository(UserRepository);
        await manager.signin(req,res);
    }

    static async signup(req:Request,res:Response){
        let manager=getManager().getCustomRepository(UserRepository);
        await manager.signup(req,res);
    }
    
}