import  Router  from "express";
import { AuthController } from "../auth/auth_controller";

const router=Router();

/* router.get("/",AuthController.fetchUser);
 */

router.get("/",(req,res)=>{
    res.send({
        message:"API IS WORKING!!"
    });
});

/* router.get("/user",AuthController.fetchUser);

router.post("/user/signup",AuthController.signup);

router.post("/user/signin",AuthController.signin);

router.post("/user/posts",AuthController.showPosts); */

/* router.post("/add",AuthController.createUser);

router.delete("/delete",AuthController.deleteUser);

router.put("/update",AuthController.updateUser); */

router.post("/user/signup",AuthController.sigup);
router.post("/user/signin",AuthController.signin);
router.post("/user/post",AuthController.showPost);
router.get("/user",AuthController.showData);
export {router};