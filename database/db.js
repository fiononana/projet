const Sequelize = require("sequelize")
const db = {}

const sequelize = new Sequelize("testdb", "root", "",{
  host: "localhost",
  dialect: "mysql",
  logging: false,
  freezeTableName: true,
  operatorsAliases:0,
  define: {
      timestamps: false
  },

  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize



module.exports = db 