const express = require('express');
const Model =require('../models/RoomModel');

const router = express.Router()

router.post('/add',(req,res) => {
    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        if (err?.code === 11000){
            res.status(500).json({message : 'Something went wrong'});
        }else{
            res.status(500).json({message : 'Internal Server Error'});
        }
    });
});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});


router.delete('/delete/:id',(req,res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        
        res.status(500).json(err);

    });

});

router.put('/update/:id',(req,res) => {
    Model.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);

        res.status(500).json(err);

    });
});

router.get('/getall',(req,res) => {
    Model.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

module.exports = router;