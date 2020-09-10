const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// step 1
const nodemailer = require('nodemailer');//importing node mailer
require('dotenv').config();
const User = require("../models/User")
var session = require("express-session")
users.use(cors())

process.env.SECRET_KEY = 'secret'

//INSCRIPTION
users.post('/inscription', (req, res)=>{
    const today = new Date()
    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,	
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,	
        id_role: req.body.id_role,
        createdAt : today,	
        updatedAt : today
    }
    
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
    .then(user=>{
        if (!user){
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            User.create(userData)
            .then(user =>{
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                    expiresIn: 1440
                });
                var mailer = require("nodemailer");
                var xoauth2 = require('xoauth2');

                // step 2
                const transporter = mailer.createTransport({
                    service:'gmail',
                    auth: {
                        user:process.env.EMAIL_USER,
                        pass:process.env.EMAIL_PASS

                    }
                });
                //step 3
let body ={
    from:'mamyfiononana@gmail.com',
    to:req.body.email,
    subject: 'Confirmation',
    html: '<h2>Vous êtes</h2><br><p>iscrire</p>'
}
transporter.sendMail(body, (err, result)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(result)
})


                req.session.user= req.body.email
                res.json({token:token})
            })
            .catch(err=>{
                res.send('error:'+err)
            })
            }
            else{
                res.json({error:'Utilisateur existe  déjà '})
        }
        
    })
    .catch(err=>{
        res.send('error:'+err)
    })
})

//ATHENTIFICATION
users.post('/authentification', (req, res)=>{
    // sess = req.session;
    // sess.email = req.body.email;
    // res.end('done');
    User.findOne({
        where:{
            email: req.body.email}
        })
        .then(user=>{
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.json({token:token})
                req.session.user= req.body.email
            }else{
                res.send("Utilisateur n'existe pas" )
            }
        })
        .catch(err=>{
            res.send('error:' + err)
        })
      
    })
    //PROFILE
    users.get('/liste', (req, res)=>{
        // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

        User.findAll()
        .then(user=>{
            if(user){
            //   req.send("User is =>"+req.session.user)
                res.json(user)
            }else{
                res.send("Utilisateur n'existe pas")
            }
        })
        .catch(err=>{
            res.send('error:' + err)
        })

        users.get('/logout',(req,res) => {
            req.session.destroy((err) => {
                if(err) {
                    return console.log(err);
                }
                res.redirect('/');
            })
        })
    })
    

module.exports = users