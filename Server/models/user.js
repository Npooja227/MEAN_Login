const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create a schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    google_id: String
});

userSchema.pre('save', async function (next) {
    try {
        if (this.password) {
            //Generate a salt
            const salt = await bcrypt.genSalt(10);

            //Generate a password hash (salt + hash)
            const hash = await bcrypt.hash(this.password, salt);

            //Reassign hashed version over orginal, plain text password
            this.password = hash;
            next();
        }
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

//create a model
const User = mongoose.model('user', userSchema);

//export the model
module.exports = User;