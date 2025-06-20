import mongoose from 'mongoose';
const darkSchema = new mongoose.Schema({
    darkName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    darkIdentity: {
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
const Dark =mongoose.models.Dark || mongoose.model('Dark', darkSchema);
export default Dark;