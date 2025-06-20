import mongoose from "mongoose"
import Group from "../models/group.js"
import GroupMsg from "../models/groupmsg.js";
import DarkMsg from "../models/darkmsg.js";
import { decrypt } from "../utils/encrypt.js";
import Dark from "../models/dark.js";

export const createdark = async (req, res) => {
    const { darkName, darkIdentity, createdBy } = req.body;
    console.log(darkIdentity, darkName, createdBy)
    try {
        // check for duplicates
        const dark = await Dark.findOne({ darkIdentity });
        console.log(dark);
        if (dark) {
            return res.status(400).json({ message: 'Group with same identity exists' })
        } else {
            const newDark = new Dark({ darkName, darkIdentity, createdBy, createdAt: Date.now() });
            await newDark.save();
            return res.status(200).json({ message: 'successful' })
        }

        // if not duplicate then add in database


    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Internal Server error' })
    }
}
export const enterdark = async (req, res) => {
    const { darkIdentity } = req.body
    try {
        const similar = await Dark.findOne({ darkIdentity });
        if (similar) {
            res.status(200).json({ darkName: similar.darkName });
        } else {
            res.status(400).json({ message: 'No such group exists' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}
export const getMessages = async (req, res) => {
    const { sender, darkIdentity } = req.body;
    console.log(req.body, darkIdentity)
    try {
        const allChats = await DarkMsg.find({ darkIdentity })
        console.log(allChats)
        const newAllChats = allChats.map(chat => ({
            id: chat._id,
            message: decrypt({ iv: chat.iv, content: chat.message }),
            sender: chat.sender,
            time: chat.time
        }))
        console.log(newAllChats)
        console.log(newAllChats, "from backend group")
        res.status(200).json(newAllChats)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server error" })
    }
}