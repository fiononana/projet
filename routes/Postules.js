const express = require("express")
const postules = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
// step 1
const Postule = require("../models/Postule")
const User = require("../models/User")
const db = require("../database/db")
const multer = require("multer")
const path = require('path');

var app = express()
postules.use(cors())

app.use(express.static(__dirname + '/public'));
process.env.SECRET_KEY = 'secret'
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + req.body.id + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

postules.post('/postuler', upload.fields([{
                            name: 'cv', maxCount: 1
                        }, {
                            name: 'lm', maxCount: 1
                        }]), (req,res)=>{

    const today = new Date()
    const postuleData = {
        id_postule: req.body.id_postule,
        id: req.body.id,
        id_offre : req.body.id_offre,
        datePost: req.body.datePost,
        cv: req.files.cv[0].fieldname+ '-' + req.body.id + path.extname(req.files.cv[0].originalname),
        lm: req.files.lm[0].fieldname+ '-' + req.body.id + path.extname(req.files.lm[0].originalname),
        createdAt : today,	
        updatedAt : today
       
    }

User.findOne({
 
        where:{id: req.body.id} 
    })
    .then(user=>{
        console.log(user)
            Postule.create(postuleData)
           .then(postule =>{
              let token = jwt.sign(postule.dataValues, process.env.SECRET_KEY,{
                    expiresIn: 1440
                });


                console.log(postule)
                

                res.json({token:token})
            })
            .catch(err=>{
                res.send('error:'+err)
            });

            var mailer = require("nodemailer");
               

                // step 2
                const transporter = mailer.createTransport({
                    service:'gmail',
                    auth: {
                        user:process.env.EMAIL_USER,
                        pass:process.env.EMAIL_PASS

                    }
                });
                //step 3

                console.log(user.dataValues.email)
                let body ={
                    from:'mamyfiononana@gmail.com',
                    to:user.dataValues.email,
                    subject:  req.files.cv[0].fieldname+ '-' + req.body.id + path.extname(req.files.cv[0].originalname) +   
                    req.files.lm[0].fieldname+ '-' + req.body.id + path.extname(req.files.lm[0].originalname),
                    html: '<h2>Test email by me</h2><br><p>This is paragraphe test email</p>'
                }
                transporter.sendMail(body, (err, result)=>{
                    if(err){
                        console.log(err);
                        return false;
                    }
                    console.log(result)
                })


    })
    .catch(err=>{
        console.log(err);
        res.send('error:'+err)
    })
})




module.exports = postules