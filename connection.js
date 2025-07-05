const mongoose = require('mongoose');

const url ="mongodb+srv://sakshi06:Up32hy1827@cluster0.hdbo6.mongodb.net/mydb563?retryWrites=true&w=majority&appName=Cluster0";

//Asynchronous function - returns Promise
mongoose.connect( url )
//Succesfully 
    .then((result) => {
        console.log('DB Connected');
//error    
    }).catch((err) => {
        console.log(err);     
    });

module.exports = mongoose