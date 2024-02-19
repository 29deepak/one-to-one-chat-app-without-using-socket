const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./utils/database')
const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// routes
const userRoutes = require('./router/user')
const messagRoutes = require('./router/message')

//modals

const User = require('./modals/user');
const Message = require('./modals/message')

//use
app.use('/api', userRoutes)
app.use('/api', messagRoutes)

//join
User.hasMany(Message);
Message.belongsTo(User);

const server = http.createServer(app)





sequelize
    .sync()
    .then(() => {

        server.listen(4000, () => {
            console.log("server is connected succesfully")
        })
    })
    .catch((err) => {
        console.log(err)
    })