import  Router  from "express";
import { AuthController } from "../auth/auth_controller";

const router=Router();

/* router.get("/",AuthController.fetchUser);
 */

router.get("/user",AuthController.fetchUser);

router.post("/user/signup",AuthController.signup);

router.post("/user/signin",AuthController.signin);

/* router.post("/add",AuthController.createUser);

router.delete("/delete",AuthController.deleteUser);

router.put("/update",AuthController.updateUser); */

export {router};