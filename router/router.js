require('dotenv').config()
const cors = require('cors');
const fs= require('fs')
const sendmail=require('./sendmail')
const bcrypt= require('bcrypt')
const axios= require('axios'); 
const express= require('express')
const router =require('express').Router() 
const bodyParser =require('body-parser') 
const models = require('./../databse/models')

var corsOptions = {
    origin: "*" ,
    optionsSuccessStatus: 200 ,
    methods: [
        'GET',
        'POST',
      ],
      allowedHeaders: [
        'Content-Type',
      ]// For legacy browser support
}
router.use(cors(corsOptions));
 
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post("/support",async  (req,res)=> {
    if(req.body.items || req.body.email || req.body.subject || req.body.message =="" ){
        const addedSuppot = new models.supportModel(req.body)
        await addedSuppot.save()
        const result =await models.supportModel.find ( {} )
        res.send("sucesfully submited ")     
       }
       else{
           res.send("can't send")
       }
    
    })   

    router.post("/contact",async  (req,res)=> {
        if(req.body.items || req.body.email || req.body.subject || req.body.message =="" ){
            const addedContact = new models.contactUs(req.body)
            await addedContact.save()   
            const result =await models.contactUs.find ( {} )
            res.send(result)     
           }
           else{
                res.send("Please fill all the data")
           }
        })  

 router.post("/register",async (req,res)=> {
            if(req.body.fullname || req.body.email || req.body.phone || req.body.password =="" ) {
                const all_data =await  models.user.find({})
                if(all_data==""){
                    const plane_pass=req.body.password
                    let hashpassword=await bcrypt.hash(`${req.body.password}` , 10 ) 
                    req.body.password=hashpassword 
                    const addeduser = new models.user (req.body)
                    await addeduser.save()
                    await sendmail(req.body.email ,plane_pass)
                    const cu_data =await  models.user.findOne({email:req.body.email})
                    res.send(  {
                        "success":1,
                        "message": "succesful"                             
                    } )  
                 }
               else{
                        all_data.map(async (ele,index)=>{
                             if(ele.fullname!=req.body.fullname && ele.email!=req.body.email  ){
                                const plane_pass=req.body.password
                                let hashpassword=await bcrypt.hash(`${req.body.password}` , 10 ) 
                                req.body.password=hashpassword 
                                const addeduser = new models.user(req.body)
                                addeduser.save()
                                await sendmail(req.body.email, plane_pass)
                             const cu_data =await  models.user.find({email:ele.email})
                             await res.send(  {
                                "success":1,
                                "message": " succesfull "                             
                            } )
                             
                        }
                             else{
                                res.send(  {
                                    "success":0,
                                    "message": " signup wih different email  "                             
                                } )
                             }
                        })
                   } 
              }
       })  

       
       router.post('/login',async (req,res)=>{ 
        //    if(  req.body.email && req.body.password   ){
            const u_data=await models.user.find( {email:`${req.body.email}`} )
            if(u_data!=""){
            if(req.body.email==u_data[0].email )   {
                 const user_data=await models.user.find({email:`${req.body.email}`}) 
                const ismatch=await bcrypt.compare(req.body.password ,user_data[0].password  )
                 if(ismatch) 
                     res.json({
                         "id" :user_data[0]._id,  
                         "success":1,
                         "message": " succesfully logged in ",                             
                     })
                 else{
                    res.send(  {
                        "success":0,
                        "message": " Invalid password "                             
                    } )
                 }
                        
            }       
           }
           else{
            res.send(  {
                "success":0,
                "message": " Invalid email "                             
            } )
           }
    })   

module.exports = router;






