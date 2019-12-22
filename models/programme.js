const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var programmeSchema = new mongoose.Schema({
    programmeName: String,
    description: String,
    closingDate: Date,
    universityID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University"
    }
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Programme', programmeSchema);