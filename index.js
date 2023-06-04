const express=require('express')
const dotenv=require('dotenv').config();
const mongoose= require('mongoose');


const app=express();


// Import all routes 
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const ordersRouter = require('./routes/order');



// Set up middleware
app.use(express.json());

// Connect the routes
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/orders', ordersRouter);


// Import and use authentication routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

/*
test ------ hello world

app.get('/api/dev/', (req,res)=>{
   res.send('hellooo')
})
*/

mongoose.connect(process.env.dburl)
.then(conn => console.log("Connected to mongoDB"))
.catch(err => console.log)





app.listen(3000, ()=>{
    console.log("running")
})