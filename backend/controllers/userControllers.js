const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const { generateOTP, mailTransport, generateEmailTemplate, plainEmailTemplate, generatePasswordResetTemplate } = require('../utils/mail');
const VerificationToken = require('../model/verificationToken');
const { isValidObjectId } = require('mongoose');
const ResetToken = require('../model/resetToken');
const { createRandomBytes } = require('../utils/helper');


const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400)  
        throw new Error("User Already Exists oo");
    }

    const newUser = new User({
        name, 
        email,
        password,
        pic 
    })

    const OTP = generateOTP();

    const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP
    })
         
    await verificationToken.save()
    
    const user = await newUser.save()

    mailTransport().sendMail({
        from: 'emailverification@gmail.com',
        to: newUser.email,
        subject: "Verify your email account",
        html: generateEmailTemplate(OTP)
    })

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            isVerified: user.isVerified,
            token: generateToken(user._id)
        })
    } else {
         res.status(400)
        throw new Error("Error Occured")
    }
});

const verifyEmail = async (req, res) => {

    const { userId, otp } = req.body;

    if(!userId || !otp) {
        return res.status(401).json({errorMessage: "Invalid request, missing parameters"})
    }
    if(!isValidObjectId(userId)) {
        return res.status(401).json({errorMessage: "Invalid user id"})
    }

    const user = await User.findById(userId)
    if(!user) {
        return res.status(401).json({errorMessage: "Sorry, user not found"})
    }
    if(user.isVerified) {
        return res.status(401).json({errorMessage: "This account is already verified."})
    }

    const token = await VerificationToken.findOne({owner: user._id})
    if(!token) {
        return res.status(401).json({errorMessage: "Sorry, user not found!"})
    }

    const isMatched = await token.compareToken(otp)
    if(!isMatched) {
        return res.status(401).json({errorMessage: "Invalid token, Please provide a valid token!"})
    }

    user.isVerified = true;

    await VerificationToken.findByIdAndDelete(token._id)
    await user.save()

    mailTransport().sendMail({
        from: "emailverification@gmail.com",
        to: user.email,
        subject: "Welcome email",
        html: plainEmailTemplate(
            "Email Verified Successfully",
            "Thanks for connecting with us!"
        )
    })

    res.status(201).json({
        message: "Your Email is verified",
        user: {
            name: user.name,
            email: user.email,
            pic: user.pic,
            id: user._id 
        }
    })
}

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin, 
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password!");
    }
})

const forgotPassword = async (req, res) => {
    const {email} = req.body;

    if (!email) {
        return res.status(401).json({message: 'Please provide a valid email'})
    }

    const user = await User.findOne({email})

    if (!user) {
        return res.status(401).json({message: 'User not found, invalid request'})
    }

    const token = await ResetToken.findOne({owner: user._id})
    if (token) {
        return res.status(401).json({message: 'Only after one hour can you request for another token!'})
    }

    const randomBytes = await createRandomBytes()
    
    const resetToken = new ResetToken({owner: user._id, token: randomBytes})
    await resetToken.save()

    mailTransport().sendMail({
        from: 'security@gmail.com',
        to: user.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(`http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`)
    })

    res.json({success: true, message: 'Password reset link is sent to your email.'})
}

const resetPassword = async (req, res) => {
    const { password } = req.body;

    const user = await User.findById(req.user._id);

    if(!user) {
        return res.status(401).json({message: "User not Found"})
    }

    const isSamePassword = await user.matchPassword(password)
    if(isSamePassword) {
        return res.status(401).json({message: "New Password must be different!"})
    }

    if(password && (password.trim().length < 8 || password.trim().length > 20)) {
        return res.status(401).json({message: "Password must be 8 to 20 characters long!"})
    }

    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({owner: user._id})

    mailTransport().sendMail({
        from: "security@gmail.com",
        to: user.email,
        subject: "Password Reset Successfully",
        html: plainEmailTemplate(
            "Password Reset Successfully",
            "Now you can login with your new password!"
        )
    })

    res.json({success: true, message: "Password Reset Successfully! Login into your account to continue. "})
}

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;

        if (req.body.password) {
            user.passsword = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
})


module.exports = { registerUser, verifyEmail, authUser, forgotPassword, resetPassword, updateUser }