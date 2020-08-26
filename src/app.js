const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http')

require('dotenv').config();
const WebSocket = require('ws')

const port = process.env.PORT || 8080
const app = express()
const httpServer = http.createServer(app)
const wss = new WebSocket.Server({
    'server': httpServer
})



const registationRoute = require('./routes/registation');
const tradeRoute = require('./routes/trade');
const helmet = require('helmet');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { MAIN_PORT, NODE_ENV } = process.env;
NODE_ENV !== "production" ? app.use(morgan('dev')) : app.use(morgan('combined'));

app.use(helmet());
app.use(cors());
app.use('/api/registation', registationRoute);
app.use('/api/trade', tradeRoute);



//app.listen(process.env.PORT || 3000);


httpServer.listen(process.env.PORT || 3000 ,function(){
  console.log('service listening on port', this.address().port);
});
/* if (NODE_ENV !== "production" ) {
    console.log(`service is running ${app.port}`);
} */
