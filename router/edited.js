require('dotenv').config()
// const fetch= require('node-fetch')
const axios= require('axios'); 

const express= require('express')
const router =require('express').Router() 
const bodyParser =require('body-parser') 
const models = require('./../databse/models')
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post("http://192.168.2.23:3001/support",async  (req,res)=>{
    // const addedSuppot = new models.supportModel( req.body)
        // await addedSuppot.save()
    })   

module.exports = router;