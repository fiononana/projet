var express = require("express")
var session = require("express-session")
var cookieParser = require('cookie-parser')
var cors = require ("cors")
var bodyParser = require("body-parser")
var multer = require('multer')

const DIR = './uploads'

var app = express()

var port = process.env.PORT || 4300
// var sess;

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors())
app.use(
    bodyParser.urlencoded({extended:false})
)
app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 600000 // Time is in miliseconds
    }
}));

var Users = require("./routes/Users")
var Offres = require("./routes/Offres")
var Roles = require("./routes/Roles")
var Postules = require("./routes/Postules")
var Users_roles = require("./routes/Users_roles")
const db = require("./database/db")


app.use("/users", Users)
app.use("/offres", Offres)
app.use("/roles", Roles)
app.use("/postules", Postules)
app.use("/users_roles", Users_roles)


db.Users = require("./models/User");
db.Offres = require("./models/Offre");
db.Roles = require("./models/Role");
db.Postules = require("./models/Postule");
db.Users_roles = require("./models/Users_role");

//Relations
// db.Postules.hasMany(db.Users);
//db.Users.hasMany(db.Postules);

app.get('/', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });
 
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
 let upload = multer({storage: storage});

app.listen(port, function(){
    console.log("Server is running on port" + port)
})