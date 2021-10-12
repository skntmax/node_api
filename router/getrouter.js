getrouter = require('express').Router()

getrouter.get('/support' , (req,res) =>{ 
  res.send("support get ")
}) 


module.exports = getrouter;
