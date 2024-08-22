const Attendance = require('../models/Attendance');


let catchasync=require('../utils/catchasync')


exports.checkIn = catchasync( async (req, res) => {

let {userId}=req.body

let startDate=new Date().setHours(0, 0, 0, 0)

let attendance=await Attendance.findOne({user:userId,date:startDate})
if(!attendance){
    attendance= new attendance({
        user:userId,
        date:startDate,
        checkedIn: true,
        status: 'present'
        })
    }

if(attendance.checkedIn){
    return res.json({status:'pass',message:'Already CheckIn'})
}
       attendance.checkedIn = true;
        attendance.status = 'present';
        await attendance.save();
        res.status(200).json({ message: 'Checked in successfully.' });
})
exports.checkOut =catchasync( async (req, res) => {
    let {userId}=req.boby

    let startDate=new Date().setHours(0, 0, 0, 0)
    
    let attendance=await Attendance.findOne({user:userId,date:startDate})
    if(!attendance||!attendance.checkedIn){
        return res.status(400).json({ message: 'User has not checked in today.' }) 
    }
    if(attendance.checkedOut){
        return res.json({status:'pass',message:'Already CheckedOut'})
    }
    attendance.checkedOut = true;
    attendance.status = 'absent';
    await attendance.save();
    res.status(200).json({ message: 'Checked out successfully.' });

})

exports.getAttendanceRecords = async (req, res) => {
    const { userId } = req.params;

    try {
        const attendanceRecords = await Attendance.find({ user: userId }).populate('user');
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};