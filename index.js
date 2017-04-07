const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const bluebird   = require('bluebird');


const config = require('./config');
const routes = require('./routes');

const app  = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/', routes);

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
    
  socket.on('monitor', function(msg){
    console.log('monitor: ' + msg);

    io.emit('monitor', msg);
  });
});

const controller = require('./lib/controller');
controller.prototype.setIO(io);

http.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});


module.exports = http;
