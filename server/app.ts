
import express from 'express';
import logging from './startup/logging';
import routes from './startup/routes';
import db from './startup/db';
import bodyParser from 'body-parser';
import prod from './startup/prod';
import path from 'path';

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const port = process.env.PORT || 5000;




prod(app);
logging(app);
db();
routes(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'))
    });

}



const server = app.listen(port, ()=> console.log('Server is running'));

export default server;