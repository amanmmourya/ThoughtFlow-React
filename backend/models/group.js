import mongoose from 'mongoose';
const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    groupIdentity: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdBy:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}
);
const Group =mongoose.models.Group || mongoose.model('Group', groupSchema);
export default Group;