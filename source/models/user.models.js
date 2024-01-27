import { Schema } from "mongoose"
import mongoose from "mongoose"
import bcrypt from "bcrypt";
import { JsonWebToken } from "jsonwebtoken";

const UserSchema = new Schema(
    {
        userName:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique:true,
            index:true,

        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            unique:true,
            
        },
        fullname:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            
        },
        avatar:{
            type:String,
            required:true,
            
        },
        coverimg:{
            type:String,
            
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"video"
            }
        ],
        password:{
            type:String,
            required:[true,"password is required"],
        }
}
,{timestamps:true});

UserSchema.pre("save", async function() {
    if(!this.isModified("password"))return next();
        
    this.password=bcrypt.hash(this.password,10);
    next();
    
}
)
UserSchema.methods.isPasswordCorrect= async function(password){
      return await bcrypt.compare(password,this.password)
}
UserSchema.methods.generateAcessToken= async function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.userName,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expirein:ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken= async function(){
    jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expirein:REFERSH_TOKEN_EXPIRY
        }
    )
}

export const User = new mongoose.model("User",UserSchema)