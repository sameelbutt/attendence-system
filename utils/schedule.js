const cron = require('node-cron');
const Attendance = require('../models/Attendance');
let User=require('./../models/User')
const autoCheckOutAndMarkAbsent = async () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    try {
        const attendances = await Attendance.find({ date: startOfDay });

        attendances.forEach(async (attendance) => {
            if (attendance.checkedIn && !attendance.checkedOut) {
                attendance.checkedOut = true;
                await attendance.save();
            }
        });

      
        const users = await User.find();
        for (const user of users) {
            const attendanceExists = await Attendance.findOne({ user: user._id, date: startOfDay });
            if (!attendanceExists) {
                const attendance = new Attendance({
                    user: user._id,
                    date: startOfDay,
                    checkedIn: false,
                    checkedOut: false,
                    status: 'absent'
                });
                await attendance.save();
            }
        }
    } catch (error) {
        console.error('Error in cron job:', error);
    }
};


cron.schedule('59 23 * * *', autoCheckOutAndMarkAbsent);
