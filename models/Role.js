const Sequelize = require('sequelize')
const db = require("../database/db.js")
const { timeStamp } = require('console')

 
module.exports= db.sequelize.define(
    'roles',
    {
        id_role: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        name:{
            type:Sequelize.STRING
        },
       
        createdAt:{
            type:Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt:{
            type:Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
        {
            timeStamp:false
        }
    )
