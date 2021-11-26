import { getCustomRepository, getManager } from "typeorm";
import {Request,Response} from "express";
import { UserRepository } from "./repository/user.repos";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";

export class AuthController{
   static async showPost(req:Request,res:Response){
        let jwt_secret_key=process.env.JWT_SECRET_KEY as string;
        let token=req.headers.authorization as string;
        jwt.verify(token,jwt_secret_key,async(error:any,data:any)=>{
            if(error){
                return res.send({
                    data:error,
                    received:false,
                })
            }

            return res.send({
                posts:"List of potst",
                userdata:data
            });
        });
    }

    static validateEmail(useremail: string):boolean{
        let isEmailValidate=EmailValidator.validate(useremail);
        return isEmailValidate;
    }

    static async sigup(req:Request,res:Response){
        let {username,useremail,userpassword} = req.body;

        let jwt_secret_key=process.env.JWT_SECRET_KEY as string;

      

        if(!AuthController.validateEmail){
            return res.send({
                authentication:false,
                message:"Email valid email",
            });
        }

        let salt=await bcrypt.genSalt(10);
        bcrypt.hash(userpassword,salt,async(error:any,hashedPassword:any)=>{
                if(error){
                    return res.send({
                        authentication:false,
                        message:error,
                    });
                }    

                
        let userRepository=getCustomRepository(UserRepository)
        await userRepository.saveUserData(req,res,hashedPassword);

        jwt.sign(
            {
                useremail, //Payload
            },
            jwt_secret_key, //Secret key
            {
            expiresIn:"1h", //Expiry time
        },
        async(error:any,data:any)=>{
            //Callback
            if(error){
                return res.send({
                    authentication:false,
                    message:error,
                });
            }
            return res.send({
                authentication:true,
                message:data,
            })
        });
        });


        
    }
   
    
}