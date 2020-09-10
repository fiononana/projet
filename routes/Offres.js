const express = require("express")
const offres = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Offre = require("../models/Offre")
//const  = require("sequelize/types")
offres.use(cors())

process.env.SECRET_KEY = 'secret'

offres.post('/ajoutOffre', (req, res)=>{
    const today = new Date()
    const offreData = {
        id_offre: req.body.id_offre,
        nom : req.body.nom,
        addre : req.body.addre,	
        titre : req.body.titre,
        activite : req.body.activite,
        missions : req.body.missions,	
        profile : req.body.profile,
        reference : req.body.reference,
        dateLimiteOffre:req.body.dateLimiteOffre,
        datePub : req.body.datePub,
        limiteOffre :req.body.limiteOffre,
        id:req.body.id,
        createdAt : today,	
        updatedAt : today
    }
    Offre.findOne({
        where:{
           nom: req.body.nom,
        },
    })
    .then(offre=>{
         console.log(offre)
        if (!offre){
            Offre.create(offreData)
            .then(offre =>{
                let token = jwt.sign(offre.dataValues, process.env.SECRET_KEY,{
                    expiresIn: 1440
                });
                console.log('success', offre.toJSON());
                res.json({token:token})
            })
            .catch(err=>{
                console.log(err, req.body.nom);
                res.send('error:'+err)
            })
            }
            else{
                res.json("Offre existe déjà")
        }
        
    })
    .catch(err=>{
        res.send('error:'+err)
    })
})

//Afficher offre
offres.get('/offre', (req, res)=>{
    Offre.findAll()
    .then(offre=>{
        if(offre){
            res.json(offre)
        }else{
            res.send("Offre n'existe pas")
        }
    })
    .catch(err=>{
        res.send('error:' + err)
    })
})

//Afficher offre par id
offres.get('/detailsOffre/:id_offre', (req, res)=>{
    console.log(req.params.id_offre);
    let id = req.params.id_offre;
    Offre.findOne({
        where:{
           id_offre: id
            }
        }
    ).then(result =>{
        res.status(200).json({
            offre:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

    // Offre.findById(req.params.offre_id, function(err, offres){
        // res.send(offres)
    // })
    // .then(offre=>{
        // if(offre){
            // res.json(offre)
        // }else{
            // res.send("Offre n'existe pas")
        // }
    // })
    // .catch(err=>{
        // res.send('error:' + err)
    // })
})


module.exports = offres