const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
     owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true 
     },
     token: {
         type: String,
         required: true
     },
     createdAt: {
         type: Date,
         expires: 3600,
         default: Date.now()
     }
})

resetTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        const hash = await bcrypt.hash(this.token, 10)
        this.token = hash;
    }

    next();
})

resetTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token);

    return result;
}

module.exports = mongoose.model('ResetToken', resetTokenSchema)