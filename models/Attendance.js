const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    checkedIn: {
        type: Boolean,
        default: false,
    },
    checkedOut: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true,
    },
}, {
    timestamps: true
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
