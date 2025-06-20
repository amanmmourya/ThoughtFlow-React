import mongoose from "mongoose";
const singleMsgSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
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
const SingleMsg =mongoose.models.SingleMsg ||mongoose.model('SingleMsg', singleMsgSchema);
export default SingleMsg;