const express = require("express")
const roles = express.Router()
const cors = require("cors")

const Role = require("../models/Role")
roles.use(cors())

roles.post('/recruteur', (req, res)=>{
    const today = new Date()
    const roleData = {
        id_role: req.body.id_role,
        name : req.body.name,
        createdAt : today,	
        updatedAt : today
    }
})



module.exports = roles
