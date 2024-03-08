const express = require('express');
const router = express.Router();
const Faculty = require('../model/faculty')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const faculty = require('../model/faculty');
const jwt = require('jsonwebtoken')

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const faculty = new Faculty({
                _id:new mongoose.Types.ObjectId,
                Facultyname:req.body.Facultyname,
                password:hash,
                email:req.body.email,
                phone:req.body.phone,
                gender:req.body.gender,
                userType:req.body.userType
            })
            faculty.save()
            .then(result=>{
                res.status(200).json({
                    new_faculty:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
   
})

router.post('/login',(req,res,next)=>{
    Faculty.find({Facultyname:req.body.Facultyname})
    .exec()
    .then(faculty=>{
        if(faculty.length<1){
            return res.status(401).json({
                msg:'user not exist'
            })
        }
        bcrypt.compare(req.body.password,faculty[0].password,(err,result)=>{
            if(!result)
            {
                return res.status(401).json({
                    msg:'Password matching fail'
                })
            }
            if(result)
            {
                const token = jwt.sign({
                    Facultyname:faculty[0].Facultyname,
                    userType:faculty[0].userType,
                    email:faculty[0].email,
                    phone:faculty[0].phone
                },
                'this is dummy text',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    Facultyname:faculty[0].Facultyname,
                    userType:faculty[0].userType,
                    email:faculty[0].email,
                    phone:faculty[0].phone,
                    token:token

                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})



module.exports=router;