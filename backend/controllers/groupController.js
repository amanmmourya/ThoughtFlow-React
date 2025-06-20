import mongoose from "mongoose"
import Group from "../models/group.js"
import GroupMsg from "../models/groupmsg.js";
import { decrypt } from "../utils/encrypt.js";

export const createGroup=async (req,res)=>{
    const {groupName,groupIdentity,createdBy}=req.body;
    console.log(groupIdentity,groupName,createdBy)
    try {
        // check for duplicates
        const group=await Group.findOne({groupIdentity});
        console.log(group);
        if(group){
            return res.status(400).json({message:'Group with same identity exists'})
        }else{
            const newGroup=new Group({groupName,groupIdentity,createdBy,createdAt:Date.now()});
            await newGroup.save();
            return res.status(200).json({message:'successful'})
        }

        // if not duplicate then add in database


    } catch (error) {
        console.log(error)
       return res.status(400).json({message:'Internal Server error'})
    }
}
export const entergroup=async (req,res)=>{
    const {groupIdentity}=req.body
    const similar=await Group.findOne({groupIdentity});
    if(similar){
        res.status(200).json({groupName:similar.groupName});
    }else{
        res.status(400).json({message:'No such group exists'});
    }
}
export const getMessages=async(req,res)=>{
    const {sender,groupIdentity}=req.body;
    console.log(req.body,groupIdentity)
    try {
        const allChats=await GroupMsg.find({groupIdentity})
        console.log(allChats)
        const newAllChats=allChats.map(chat=>({
            id:chat._id,
            message:decrypt({iv:chat.iv ,content:chat.message}),
            sender:chat.sender,
            time:chat.time
        }))
        console.log(newAllChats,"from backend group")
        res.status(200).json(newAllChats)
    } catch (error) {
        res.status(500).json({message:"Internal Server error"})
    }
}