const Sequelize = require('sequelize')
const db = require("../database/db.js")
const { timeStamp } = require('console')

module.exports= db.sequelize.define(
    'offres',
    {
        id_offre: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        nom:{
            type:Sequelize.STRING
        },
        addre:{
            type:Sequelize.STRING
        },
        titre:{
            type:Sequelize.STRING
        },
        activite:{
            type:Sequelize.STRING
        },
        missions:{
            type:Sequelize.STRING
        },
        profile:{
            type:Sequelize.STRING
        },
        reference:{
            type:Sequelize.STRING
        },
        dateLimiteOffre:{
            type:Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        datePub:{
            type:Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        limiteOffre:{
            type:Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        
        id: {
            type: Sequelize.INTEGER,

            references: 
            {
                model: 'User',
                key: 'id',
            }
        }
 
    },
        {
            timestamps:false
        
        });
