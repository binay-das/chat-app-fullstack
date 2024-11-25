const expressAsyncHandler = require("express-async-handler");
const Chat = require('../models/chatModel');
const generateToken = require('../config/generateToken');
const User = require("../models/userModel");

const accessChats = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate("latestMessage");
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'


    })

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({
                _id: createdChat._id
            }).populate("users", "-password")

            res.status(200).send(FullChat);


        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChats = expressAsyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: 'latestMessage.sender',
                    select: 'name pic email'
                })

                res.status(200).send(results);
            })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.users) {
        return res.status(400).send("Please provide chat name and users");
    }
    let users = JSON.parse(req.body.users);

    if (users.length > 2) {
        return res.status(400).send("Please provide more than 2 users for a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user
        });

        const fullGRoupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

        res.status(200).json(fullGRoupChat);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = { accessChats, fetchChats, createGroupChat };