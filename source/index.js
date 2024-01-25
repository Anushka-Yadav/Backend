//require ('dotenv').config({path:'./env'}); one of the way but make code inconsistent

import dotenv from 'dotenv'
import DB_connect from './db/index.js';
import app from './app.js'

dotenv.config({
    path:'./env'
})

DB_connect().then((PORT)=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log('server running');
    })
}).catch((err)=>{
        console.log(`conenction failed ${err}`);
})

/*
import { express } from 'express';


const app = express();

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on(error, (error)=>{
            console.log("error",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log("server is running at",process.env.PORT);
        })
    } catch (error) {
        console.log(`error :`);
        throw error;
    }

} )()
*/
