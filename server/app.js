//import modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var path = require('path');
var cors = require('cors');

var app = express();

const route = require('./routes/route');

//Mongoose Connections
mongoose.connect('mongodb+srv://Vedant:ysrtrznCQyERtb6o@mycluster.ro44w.mongodb.net/HRApp?retryWrites=true&w=majority');

mongoose.connection.on('connected',()=>{
    console.log('Connected MongoDB');
});

mongoose.connection.on('error',(err)=>{
    if(err)
    console.log('Error in DB Connection: '+err);
});

//PORT Configuration and Binding
const PORT = process.env.PORT || 8080;

//CORS - middleware between ports
app.use(cors());

//init body-parser to parse the incoming JSON data
app.use(bodyparser.json());

//Static files path
app.use(express.static(path.join(__dirname, 'public')));

//API routes
app.use('/api', route);

//Testing the server
app.get('/',(req,res)=>{
    res.send('Testing')
});

app.listen(PORT,()=>{
    console.log('Server started at port:'+PORT);
});