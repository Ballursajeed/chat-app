import { Router } from "express";
import { checkAuth, getAllMessages, getAllUsers, getMyMessages, logOut, userLogin, userRegister } from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/register').post(upload.fields([
    {
        name:"avatar",
        maxCount: 1
    }
]),userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(validateUser,logOut);
router.route('/me').get(validateUser,checkAuth);
router.route('/geAllUsers').get(getAllUsers);
router.route('/getMyMessages/:id').get(validateUser,getMyMessages);
router.route('/getAllMessages/:id').get(validateUser,getAllMessages);

export default router