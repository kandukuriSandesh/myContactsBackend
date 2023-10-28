const express = require('express');
const contactRouter = require('./Routes/contactRoutes');
const userRouter = require('./Routes/userRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json())

connectDb()

const port = process.env.PORT || 5000;

app.use(errorHandler)


app.use('/api/contacts',contactRouter)

app.use('/api/users',userRouter)

app.listen(port,() => console.log('Server running on port'   + port))