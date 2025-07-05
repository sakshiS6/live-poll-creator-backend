const express = require('express');
const Model =require('../models/UserModel');
const jwt =require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.post('/add',(req,res) => {

    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        if (err?.code === 11000){
            res.status(500).json({message : 'Email already registered'});
        }else{
            res.status(500).json({message : 'Internal Server Error'});
        }
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

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

// update
router.put('/update/:id', (req, res) => {

    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
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


router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
    .then((result) => {
        if(result) {

            //Email and password matched
            //

            const {_id, email, password } = result;
            const payload = {_id , email, password}

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn:'6h' },
                (err, token) => {
                    if(err){
                        console.log(err);
                        res.status(500).json(err);
                    }else{
                        res.status(200).json({token});
                    }
                }
            )
        }
        else{
            res.status(401).json({message: 'Invalid email or password'})
        }
        
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
})

module.exports = router;