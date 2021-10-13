require('dotenv').config()
const express =require('express') 
const bodyParser =require('body-parser') 
const app = express()
const getrouter=  require('./router/getrouter')
const router=  require('./router/router')
app.use(express.json())
app.use(router)
app.use(getrouter)
app.use(require('./router/updaterouter'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/home", (req,res)=>{
     // const supportModel =  new supportModel({ })
   res.send("get")
      
})   

app.listen(5000, ()=>{
     console.log("server running at port 5000 "  )
} )