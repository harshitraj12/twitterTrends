require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 8000
const path=require('path')
const hbs = require('hbs')
const contact_collection = require("./db")

const Twitter = require('twitter');
const view_path = path.join(__dirname,'../views')
const static_path = path.join(__dirname,"../public")
const partials = path.join(__dirname,'../partials')

app.set('view engine','hbs')
app.set('views',view_path)
hbs.registerPartials(partials)
app.use(express.static(static_path))
app.use(express.json())
 
const client = new Twitter({
  consumer_key: process.env.API_Key,
  consumer_secret: process.env.API_Secret_Key,
  access_token_key: process.env.AccessToken,
  access_token_secret: process.env.AccessTokenSecret
});

app.get('/',(req,res)=>{
    res.render('index')
})

app.get("/trend",(req,res)=>{
  res.render('trend')
  
})
app.post("/trends",async(req,res)=>{
    const {country} = req.body
    const id =country
    try{
      const trends = await client.get('trends/place.json',{
        id
      })
      res.json(trends)
    }
    catch(err){
      console.log(err)
    }
})

app.get('/search',(req,res)=>{
  res.render('search')
})

app.post('/searches',async(req,res)=>{
  const {userName} = req.body
  const q = userName
  try{
    const data = await client.get('users/search.json',{
      q
    })
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.json(err)
  }
})

app.get('/followings',(req,res)=>{
  res.render('followings')
})

app.post('/following',async(req,res)=>{
  const {userVal} = req.body
  const user_id = userVal
  // const screen_name = "allu"
  try{
    const data = await client.get('friends/ids.json',{
      user_id
    })
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.json(err)
  }
})


app.post('/findID',async(req,res)=>{
  const {userID} = req.body
  const user_id = userID  
  try{
    const data = await client.get('users/lookup.json',{
      user_id
    })
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.send(err)
  }
})

app.get('/contact',(req,res)=>{
  res.render('contact')
})

app.post('/contact',async(req,res)=>{
  const {name,email,subject,message} = req.body
  if (!name || !subject || !email || !message )
  {
      return res.status(422).json({
          status:422,
          message:"Fill the form properly"
      })
  }
  try{
      const data = new contact_collection({name,subject,email,message})
      const result = await data.save()
      res.status(200).json({
          status:200,
          message:'data saved successfully'
      })
  }
  catch(err)
  {
      res.status(404).json({
          status:404,
          message:'Some error occured'
      })
  }
})



app.get('*',(req,res)=>{
  res.render('index')
})

app.listen(port, () => {
  console.log(`listening to the port no at ${port}`);
})
