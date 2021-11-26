import { EntityRepository,Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { Request,Response } from "express";


//200 => ok
//201 => email is token
//202 => wrong password
//203 => invalid email
//500 => internal server error


@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async saveUserData(req:Request,res:Response,hashedPassword:any){
        let {username,useremail,userpassword} = req.body;

        let checkIfUserExists=(await this.createQueryBuilder("users").select().where("users.useremail = :useremail",{
            useremail,
        }).getCount()) > 0;

        if(checkIfUserExists){
            return res.send({
                authentication:false,
                message:"Users already exists!!",
            });
        }

        this.createQueryBuilder("users")
        .insert()
        .values({        
            useremail,
            username,
            userpassword:hashedPassword
            }).execute()    
        }

}