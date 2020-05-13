const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');

app.use(cors());
/*acess image folder*/
//app.use(express.static(__dirname + 'upload'));
// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ****** validation rules START ****** //
const valFunctions = require('./validators/validate');
// ****** validation rules END ****** //

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'upload/profile')
    },
    filename: (req, file, callBack) => {
        callBack(null, new Date().toISOString() + file.originalname)
    }
  })
const upload = multer({ storage: storage })

// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/signup', jsonParser, function (req, res) {
    if(valFunctions.checkInputDataNULL(req,res)) return false;
    if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkJWTToken(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;

    var dbFunctions = require('./models/connector');
    dbFunctions.createCustomer(req,res);
});
app.post('/signin', jsonParser, function (req, res) {
    if(valFunctions.checkInputDataNULL(req,res)) return false;
    if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkJWTToken(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;

    var dbFunctions = require('./models/connector');
    dbFunctions.signIn(req,res);
});
app.get('/getUser', jsonParser, function (req, res) {
    //if(valFunctions.checkInputDataNULL(req,res)) return false;
    //if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;
    var dbFunctions = require('./models/connector');
    var userEmail = valFunctions.checkJWTToken(req,res);
    if(!userEmail) return false;
    dbFunctions.getUser(userEmail,res);
});
app.post('/updateUser', upload.single('file'), function (req, res) {
    
    if(valFunctions.checkInputDataNULL(req,res)) return false;
    if(valFunctions.checkInputDataQuality(req,res)) return false;
    //upload.single('file');
    //var filewww = req.fileSource.name;
    console.log("nameeeeeeeiiiiii----"+req.file.filename);
    var filename = '';
    filename = req.file.filename;
    var dbFunctions = require('./models/connector');
    var userEmail = valFunctions.checkJWTToken(req,res);
    if(!userEmail) return false;
    dbFunctions.updateUser(filename,userEmail,req,res);
});

app.use('/resources',express.static(__dirname + '/upload/profile'));

app.get('/getBodyData', jsonParser, function (req, res) {
    var dbFunctions = require('./models/connector');
    dbFunctions.getBodyData(req,res);
});
app.get('/getMenuCategory', jsonParser, function (req, res) {
    var dbFunctions = require('./models/connector');
    dbFunctions.getMenuCategory(req,res);
});
app.get('/getFoodMenuData', jsonParser, function (req, res) {
    var dbFunctions = require('./models/connector');
    dbFunctions.getFoodMenuData(req,res);
});
app.listen(process.env.PORT, ()=> console.log('readylocalhost:' + process.env.PORT));