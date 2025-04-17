const mongoose = require('mongoose');   

const userSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

//Auto-increment the id field
userSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        // search for the last user in the database and get the highest id
        // sort by id in descending order and limit to 1 result
        // find the last user in the database and get the highest id    
        const lastUser = await mongoose.model('User').findOne({}).sort({ id: -1 });

        if (lastUser && lastUser.id) {
            this.id = lastUser.id + 1;
        } else {
            this.id = 1; // start from 1 if no users exist
        }

        next();
    } catch (err) {
        next(err);
    }
});


const user = mongoose.model('User', userSchema);
module.exports = user;  