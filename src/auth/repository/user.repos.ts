import { EntityRepository,Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { Request,Response } from "express";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";


@EntityRepository(User)
export class UserRepository extends Repository<User>{
    //create a new user
    async createUser(req:Request,res:Response){
        const {username,useremail,userpassword}=req.body;

        try{
            let user = new User();
            user.username=username;
            user.useremail = useremail
            user.userpassword=userpassword;
    
            let userData=await this.save(user);

            let userId=await this.createQueryBuilder("user")
            .select("user.id")
            .where("user.useremail = :query",{query:useremail})
            .getOne();

            console.log(userId);

            var token=jwt.sign({id:userId},"mykey",{
                expiresIn:86400,
            })

            console.log(token);

            return res.send({
                authentication:true,
                token:token,
            })
        }catch(error){
            res.send(error);
        }
    }

     //get user data
    async fetchUser(req:any,res:Response){
          const {username}=req.body;   

        /*  const btoken=req.headers["authorization"]; 

        if(typeof btoken !== undefined){
           req.token=btoken;
            jwt.verify(req.token,"myKey",async(error:any,authData:any)=>{
                if(error){
                    res.send(error);
                }else{
                    let data=await this.createQueryBuilder("user").select().getMany();
                    res.send(data);
                }
            });
       }    */
    
            try{   
            //Traditional
            /*   let data=await this.find();
             res.send(data); */
            
            //CreateQueryBuilder
             let data=await this.createQueryBuilder("user").getMany();
             res.send(data);  
    
           /*   let data=await this.createQueryBuilder("user")
            .select()
            .where("user.username = :query",{query:username})
            .getMany();
            res.send(data);   */
    
           /*  let data=await this.createQueryBuilder("user")
            .select(["user.userpassword","user.useremail"])
            .getMany();
            res.send(data); */
    
             }catch(error){
               res.send(error);
           }   
    }

    //delete user data
    async deleteUser(req:Request,res:Response){
        const {username} =req.body;
        try{
            let data=await this.createQueryBuilder("user")
            .delete()
            .where("username = :query",{query:username})
            .execute();

            return res.send(data);
        }catch(error){
            console.log(error);
            res.send(error);
        }
    }

    //update user data
    async updateUser(req:Request,res:Response){
        const{username,useremail,id,userpassword}=req.body;

        try{
             /*    let data=await this.createQueryBuilder("user").update(User).set({
                    username:username,
                    useremail:useremail,
                }).where("id = :id",{id:id}).execute(); */

                let data=await this.createQueryBuilder("user").update(User).set({
                    userpassword:userpassword,
                }).where("username = :username",{username:username}).execute();

                return res.send(data);
        }catch(error){
            console.log(error);
            res.send(error);
        }
    }

    async signin(req:Request,res:Response){
        const {useremail,userpassword}=req.body;

        let validate=await EmailValidator.validate(useremail);
        if(!validate){
            res.json({
                error:"User not found!",
            })
        }else{
            let findUserFromDB=await this.createQueryBuilder("user")
            .select("user.userpassword")
            .where("user.useremail = :query",{query:useremail})
            .getOne();

            let userId=this.createQueryBuilder("user")
            .select("user.id")
            .where("user.useremail = :query",{query:useremail})
            .getOne();

            await bcrypt.compare(userpassword,findUserFromDB?.userpassword as string,(error,result)=>{
                if(error){
                    res.send(error);
                }

                if(!result) return res.send("Authentication error");

                if(result){
                    var token=jwt.sign({id:userId},"myKey",{
                        expiresIn:86400
                    });

                    res.send({authentication:true,token:token});
                }
            })
        }
    }


    async signup(req:Request,res:Response){
        const {username,useremail,userpassword}=req.body;

        try{
            let validate=await EmailValidator.validate(useremail);
            if(!validate){
                res.status(500).json({
                    error:"Invalid email",
                });
            }else{
                let emailExists=(await this.createQueryBuilder("user").where("user.useremail = :query",{query:useremail}).getCount())>0;
                if(emailExists){
                    res.send({
                        data:"Email is already token!",
                    });
                }else{
                    const salt=await bcrypt.genSalt(10);
                    await bcrypt.hash(userpassword,salt,async(error,data)=>{
                        if(error){
                            res.send(error);
                        }else{
                            let user=new User();
                            user.username=username;
                            user.userpassword=data;
                            user.useremail=useremail;

                            await this.save(user);

                            let userId=this.createQueryBuilder("user").select("user.id").where("user.useremail = :query",{query:useremail}).getOne();

                            var token=jwt.sign({id:userId},"myKey",{
                                expiresIn:86400,
                            });

                            res.send({
                                authentication:true,
                                token:token,
                            });

                        }
                    })
                }
            }
        }catch(error){
            res.send(error);
        }
    }



}