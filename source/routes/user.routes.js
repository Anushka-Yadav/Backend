import { Router } from "express";
import { registerUser,userLogin } from "../controllers/user.controllers.js";
import {upload} from "../middleware/multer.middleware.js"

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
    )
router.route('/login').get(userLogin)



export default router
