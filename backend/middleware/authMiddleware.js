const User = require("../model/userModel");
const ResetToken = require('../model/resetToken');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("mongoose");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next()

        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});


const isResetTokenValid = async (req, res, next) => {
    const { token, id } = req.query;

    if (!token || !id ) {
        return res.status(401).json({message: "Invalid request, No token!"})
    } 

    if(!isValidObjectId(id)){
        console.log('Error')
        return res.status(401).json({message: "Invalid user!"})
    }

    const user = await User.findById(id)
    if(!user) {
        return res.status(401).json({message: "User not Found!"})
    }

    const resetToken = await ResetToken.findOne({owner: user._id})
    if(!resetToken) {
        return res.status(401).json({message: "Reset token not Found!"})
    }

    const isValid = await resetToken.compareToken(token)
    if(!isValid) {
        return res.status(401).json({message: "Reset token is not valid"})
    }

    req.user = user;

    next()
}


module.exports = { protect, isResetTokenValid }