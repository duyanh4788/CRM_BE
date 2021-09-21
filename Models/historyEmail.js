const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    emailTo: {
        type: String,
        require: true,
    },
    emailFrom: {
        type: String,
        unique: true,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    CurrentSigninAt: {
        type: String,
    },
});
const HistoryEmail = mongoose.model("HistoryEmail", historySchema);
module.exports = HistoryEmail;
