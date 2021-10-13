updtrouter = require('express').Router()
const models = require('./../databse/models')
const bcrypt = require('bcrypt') 
var multer = require('multer');
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
    }
});


const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})  

updtrouter.patch('/register' , async (req,res) =>{ 
  
   const fullname = req.query.fullname
    const   email =  req.query.email
    const  phone =  req.query.phone
    const  password = await bcrypt.hash(req.query.password,10) 
 
   const user_list = await models.user.updateOne({ _id: req.query.id} ,{
   fullname : fullname  ,
   email : email , 
   phone : phone , 
   password : password 
   }) 

    if(user_list){
         res.json(
            {
                "success":1,
                "message": " updated  "                             
            })
    }
    else{
        res.json(
            {
                "success":0,
                "message": " Error  "                             
            })      
     }
   
    

})


updtrouter.patch('/login' ,imageUpload.single('image'),async(req,res)=>{
    //     const id= req.query.id

    //     const user_list = await models.user.findById(id); 
       
    //     if(user_list){
    //  const user_list = await models.user.updateOne({ _id: req.query.id} , {imageurl:__path+"/userimage/"+path } )
    //  if(user_list)
    //       res.send("updated")
    //   else
    //       res.send("has to update ")
            
    // }
   
    res.send(req.file)
}, (error, req, res, next) => {
     res.status(400).send({ error: error.message })
})


module.exports = updtrouter;
