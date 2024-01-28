import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req,res) => {
    res.status(200).json({
        message:"ok"
    })
})
const userLogin = asyncHandler(async (req,res) => {
    res.status(200).json({
        message:"user logined"
    })
})

export {registerUser,userLogin}