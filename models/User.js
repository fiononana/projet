const Sequelize = require('sequelize')
const db = require("../database/db.js")
const { timeStamp } = require('console')
const Postule = require("./Postule")


module.exports = db.sequelize.define(
    "users",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        firstName:{
            type:Sequelize.STRING
        },
        lastName:{
            type:Sequelize.STRING
        },
        username:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
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
        freezeTableName: true,
            timestamps:false
        }
    
    );
