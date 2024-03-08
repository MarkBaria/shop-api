const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/checkauth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'de82qkw0k',
    api_key: '429475432381541',
    api_secret: 'w66GNlJis6wCUowrSiyasRu_-mQ'
});


//get request
router.get('/', checkAuth, (req, res, next) => {
    Student.find()
        .then(result => {
            res.status(200).json({
                studentData: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Student.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                Student: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result);
        const student = new Student({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            photo: result.url

        })
        console.log(req.body);     //--> takes data from postman 

        student.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    newStudent: result
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    })

})

//Delete 
router.delete('/', (req, res, next) => {
    const imageUrl = req.query.imageUrl;
    const urlArray = imageUrl.split('/');
    console.log(urlArray)
    const image = urlArray[urlArray.length - 1]
    console.log(image)
    const imageName = image.split('.')[0];
    console.log(imageName)

    Student.findByIdAndDelete({ _id: req.query.id })
        .then(result => {
            cloudinary.uploader.destroy(imageName,(error,result)=>{
                console.log(error,result);
            })
            res.status(200).json({
                message: 'data deleted',
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error',
                error: err
            })
        })


})

//put request
router.put('/:id', (req, res, next) => {
    console.log(req.params.id);
    Student.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender
        }
    })
        .then(result => {
            res.status(200).json({
                updated_studentData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;

