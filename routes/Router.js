var express = require('express');
var router = express.Router();
var User = require('../models/User');
const { render } = require('ejs');

var name = {
    a : "조재희",
    b : "홍길동",
    c : "일지매"
}
router.get('/', function(req, res, next){
    User.find((err, result)=>{
        if(err){
            console.log(err)
        }
    //console.log(req)
    //res.send
    res.render('index', {data:result})
    
    })
})

router.get('/signup', (req, res, next)=>{
    res.render('signup')
})

router.post('/signup',(req, res, text) =>{
    var contact = new User()

    contact.username = req.body.username
    contact.passwordHash = req.body.passwordHash
    contact.email = req.body.email

    contact.save((err, result)=>{
        if(err) {
            console.log(err)
        }
        console.log(result)
        res.send("Success")
    })
})

router.get('/login',(req, res, next)=>{
    res.render('login')
})

router.post('/login',async (req, res, next)=>{
    var username = await req.body.username
    var passwordHash = await req.body.passwordHash

    await User.findOne({username:username}, (err, user)=>{
        if(err){
            console.log(err)
        }
        if(!user){
            res.send(`${username} is not exist`)
        } else{
            if(user.passwordHash == passwordHash){
                console.log(username)
                res.render('index', {data:username})
            } else{
                res.send(`${username}'s Password is Wrong`)
            }
            
        }
    })
})

module.exports = router;