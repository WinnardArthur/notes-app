const nodemailer = require('nodemailer');
require('dotenv').config();

exports.generateOTP = () => {
    let otp = '';
    for (let i = 0; i <= 3; i++) {
        const randomValue = Math.round(Math.random() * 9);
    
        otp = otp + randomValue;
    }

    return otp;
}


exports.mailTransport = () => {
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    })

    return transport
}


exports.generateEmailTemplate = code => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE-edge">
            <style>
            @media only screen and (max-width: 620px) {
                h1 {
                    font-size: 20px;
                    padding: 5px;
                }
            }
            </style>
        </head>
        <body>
            <div>
                <div style="max-width: 620px; margin: 0 auto; color: #272727;">
                    <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727">
                        We are delighted to welcome you to our team!
                    </h1>
                    <p>Please Verify Your Email To Continue. Your verification code is:</p>
                    <p style="width: 80px; margin: 0 auto; font-weight: bold; text-align: center; background: #f6f6f6; border-radius: 5px; font-size: 25px">
                        ${code}
                    </p>
                </div>
            </div>
        </body>
    `
}

exports.plainEmailTemplate = (heading, message) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <style>
        @media only screen and (max-width: 620px) {
            h1 {
                font-size: 20px;
                padding: 5px;
            }
        }
        </style>
    </head>
    <body>
        <div>
            <div style="max-width: 620px; margin: 0 auto; color: #272727;">
                <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727">
                    ${heading}
                </h1>
                <p style="text-align: center; color: #272727;">
                    ${message}
                </p>
            </div>
        </div>
    </body>
`
}

exports.generatePasswordResetTemplate = url => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE-edge">
            <style>
            @media only screen and (max-width: 620px) {
                h1 {
                    font-size: 20px;
                    padding: 5px;
                }
            }
            </style>
        </head>
        <body>
            <div>
                <div style="max-width: 620px; margin: 0 auto; color: #272727;">
                    <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727">
                        Response to Your Reset Password Request
                    </h1>
                    <p style="style="color: #272727;"">
                        Please Link Below to Reset Password
                    </p>
                    <div style="text-align: center;">
                        <a href="${url}" style="margin: 0 auto; padding: 20px; text-align: center; border-radius: 5px; text-decoration: none; display: inline-block; background: #e63946; font-size: 15px; color: white">
                            Reset Password
                        </a>
                    </div>
                </div>
            </div>
        </body>
    `
}

// exports.plainEmailTemplate = (heading, message) => {
//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE-edge">
//         <style>
//         @media only screen and (max-width: 620px) {
//             h1 {
//                 font-size: 20px;
//                 padding: 5px;
//             }
//         }
//         </style>
//     </head>
//     <body>
//         <div>
//             <div style="max-width: 620px; margin: 0 auto; color: #272727;">
//                 <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727">
//                     ${heading}
//                 </h1>
//                 <p>Please Verify Your Email To Continue. Your verification code is:</p>
//                 <p style="text-align: center; color: #272727;">
//                     ${message}
//                 </p>
//             </div>
//         </div>
//     </body>
// `
// }