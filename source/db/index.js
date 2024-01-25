import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

const DB_connect = async () =>{
        try {
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            console.log(`mongo db connected DB host!!!! ${connectionInstance.connection.host}`);
        } catch (err) {
            console.log(`error is ${err}`);
           
            process.exit(1)
        }
}
export default DB_connect