import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiErr} from "../utils/apiErr.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from  "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";


const userLogin = asyncHandler(async (req,res) => {
    res.status(200).json({
        message:"ok"
    })
})
const registerUser= asyncHandler(async (req,res) => {
   // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const {fullname,email,password,userName} = req.body
    console.log("email:",email,fullname,password,userName);
    if([fullname,userName,email,password].some((field)=> field?.trim()==="")){
        throw new ApiErr(400,"all field required")
    }
    const existedUser = await User.findOne({
        $or: [{userName},{email}]
    })
    if(existedUser){
        throw new ApiErr(409,"username or email exist")
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log("Avatar local path:", avatarLocalPath);
    if (!avatarLocalPath) {
    throw new ApiErr(400, "avatar required");
    }
    
    const coverImageLocalPath=req.files?.coverImage[0]?.path;
    

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    console.log("Avatar upload result:", avatar);
    if(!avatar) {
        throw new ApiErr(400,"avatar img required")
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        userName:userName.toLowerCase(),
        password

    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiErr(500,"user registor error")
    }
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export {registerUser,userLogin}