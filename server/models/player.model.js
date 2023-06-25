const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 charaters long"],
        unique: true,
    },
    position: {
        type: String,
    },
    statuses: [{ // this is an array of objects
        game: Number, 
        status: { 
            type: String,
            enum: ['Playing', 'Not Playing', 'Undecided'], // enum means string objects must be one of these values
            default: 'Undecided'
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Player", PlayerSchema);
