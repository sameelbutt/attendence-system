let express = require('express')
let app = express()

let attendenceRout = require('./routers/attendanceRoutes')
let UserRout = require('./routers/userRoutes')

app.use(express.json())


app.use('/api/v1/attendence', attendenceRout)
app.use('/api/v1/user', UserRout)
module.exports = app;