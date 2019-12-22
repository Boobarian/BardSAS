const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var applicationSchema = new mongoose.Schema({
    applicationDate: Date,
    status: {
        type: String,
        default: "NEW"
    },
    qualificationObt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QualificationObt"
    },
    applicantID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant"
    },
    programID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programme"
    }
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Application', applicationSchema);