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
    const {fullname,email,userName} = req.body
    console.log("email:",email);
    if([fullname,userName,email,password].some((field)=> field?.trim()==="")){
        throw new ApiErr(400,"all field required")
    }
    const existedUser = User.findOne({
        $or: [{userName},{email}]
    })
    if(existedUser){
        throw new ApiErr(409,"username or email exist")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiErr(400,"avatar required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiErr(400,"avatar required")
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        userName:userName.toLowerCase(),
        password

    })

    const createdUser = await user.findById(user._id)
    .select("-password -refreshToken")

    if(!createdUser){
        throw new ApiErr(500,"user registor error")
    }
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export {registerUser,userLogin}