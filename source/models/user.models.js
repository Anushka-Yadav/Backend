import { Schema } from "mongoose"
import mongoose from "mongoose"

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

export const User = new mongoose.model("User",UserSchema)