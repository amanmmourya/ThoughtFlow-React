import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    recentChats: [{
        recentUser:{type: mongoose.Schema.Types.ObjectId,ref: 'TFUser'},
        lastMessage: {
            type: String,
            trim: true,
        },
        lastIv:{
            type:String,
        },
        time:{
            type: Date,
            default: Date.now,
        }
    }],
    status:{
        type:String,
        trim:true
    },
    lastSeen:{
        type:Date,
        default:Date.now
    }
}, {
    timestamps: true,
});
const TFUser =mongoose.models.TFUser || mongoose.model('TFUser', userSchema);
export default TFUser;