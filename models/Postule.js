const Sequelize = require('sequelize')
const db = require("../database/db.js")

 
module.exports = db.sequelize.define(
        "postules",
        {
            id_postule:{
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
            id_offre:{
                type:Sequelize.INTEGER,
                references: 
                {
                    model: 'Offre',
                    key: 'id_offre',
                }
            },
            datePost:{
                type:Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            cv:{
                type: Sequelize.STRING,
            },
            lm:{
                type:Sequelize.STRING
            }
    
        },
        {
            freezeTableName: true
        },
            {
                timestamps:false
            },


        );

        

            
