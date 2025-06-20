import mongoose from "mongoose";
const darkMsgSchema = new mongoose.Schema({
    darkIdentity:{
        type:String,
        required:true,
    },
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    iv:{
        type:String,
        required:true,
    },
    time: {
        type: Date,
        default: Date.now,
    }
}, {

    timestamps: true,

});
const DarkMsg =mongoose.models.DarkMsg ||mongoose.model('DarkMsg', darkMsgSchema);
export default DarkMsg;