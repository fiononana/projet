const express = require("express")
const users_roles = express.Router()
const cors = require("cors")

const Postule = require("../models/Users_role")
users_roles.use(cors())

users_roles.post('/users_role', (req, res)=>{
    const today = new Date()
    const postuleData = {
        id_userRole: req.body.id_userRole,
        id: req.body.id,
        id_role : req.body.role,
        createdAt : today,	
        updatedAt : today
    }
})



module.exports = users_roles