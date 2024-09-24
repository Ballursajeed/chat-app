import { Router } from "express";
import { checkAuth, userLogin, userRegister } from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/me').get(validateUser,checkAuth);

export default router