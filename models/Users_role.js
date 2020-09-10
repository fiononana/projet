const Sequelize = require('sequelize')
const db = require("../database/db.js")
const { timeStamp } = require('console')

 
module.exports= db.sequelize.define(
    'users_roles',
    {
        id_userRole:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },


        id: {
            type: Sequelize.INTEGER,

            references: 
            {
                model: 'User',
                key: 'id',
            }
        },
        id_role:{
            type:Sequelize.INTEGER,
            references: 
            {
                model: 'Role',
                key: 'id_role',
            }
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
