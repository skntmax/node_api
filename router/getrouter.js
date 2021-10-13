const getrouter = require('express').Router()
const models = require('./../databse/models')

getrouter.get('/login/' , async (req,res) =>{ 
  
  const user_list = await models.user.findById( req.query.id )      
 console.log(user_list)
  if( user_list ){
    res.json( {
      "id" : user_list._id, 
     "fullname" :user_list.fullname,
     "email" : user_list.email ,
     "phone": user_list.phone
    })
  }

   else {
    res.send("no user found ")
      }

})

getrouter.post('/setimage'  ,async (req,res)=> { 
     const id= req.query.id  
        const path= req.query.path
        const user_list = await models.user.findById(id); 
       
        if(user_list) {
     const user_list = await models.user.updateOne({ _id: req.query.id} , {imageurl : path } )

     if(user_list) {
      res.json(  {
        "success":1,
        "message": " updated"                             
         })
   
        }
      else {
        res.json(  {
          "success":0,
          "message": " unupdated "                             
           })
      }
          
            
    }   
})



module.exports = getrouter;
