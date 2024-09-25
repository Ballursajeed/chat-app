import { Router } from "express";
import { checkAuth, getAllUsers, getMyMessages, userLogin, userRegister } from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/me').get(validateUser,checkAuth);
router.route('/geAllUsers').get(getAllUsers);
router.route('/getMyMessages/:id').get(validateUser,getMyMessages);

export default router