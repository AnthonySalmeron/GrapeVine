module.exports=function(app,db){
  app.get("/",function(req,res){
    db.collection("messages").find().sort({score:-1}).toArray(function(err,result){
    if (err) return console.log(err)
    res.render('index.ejs',{messages:result})
    })
  });
  app.post('/submission', (req, res) => {
    db.collection('messages').save({msg: req.body.post, score: 1}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
  });
  app.put("/submission",(req,res)=>{
    db.collection("messages").findOneAndUpdate({msg:req.body.msg,score:req.body.score},{
      $set:{
        score: req.body.newScore
      }
    }, {
      sort: {_id: -1}
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })
  app.delete('/submission', (req, res) => {
    db.collection('messages').findOneAndDelete({msg: req.body.msg, score: req.body.score}, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })
}
