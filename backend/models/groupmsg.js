import mongoose from "mongoose";
const groupMsgSchema = new mongoose.Schema({
    groupIdentity:{
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
const GroupMsg =mongoose.models.GroupMsg ||mongoose.model('GroupMsg', groupMsgSchema);
export default GroupMsg;