updtrouter = require('express').Router()
const models = require('./../databse/models')
const cors = require('cors');
const bodyParser =  require('body-parser')
const bcrypt = require('bcrypt') 
var multer = require('multer');
const path = require('path')
updtrouter.use(bodyParser.urlencoded({ extended: true }));
updtrouter.use(bodyParser.json())
// updtrouter.use("/profile" , express.static('/images')); 

const imageStorage = multer.diskStorage( {
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


updtrouter.post('/image'  ,imageUpload.single('image') , async (req,res)=>{

console.log(req.file)
// const image = imageUpload.single(req.file)

console.log(req.file) 
res.json({  
  success:1 ,
    "image_url" :"https://192.168.2.8:5000/images/"+req.file.filename 
  })

})



module.exports = updtrouter;


