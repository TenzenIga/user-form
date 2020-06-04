import helmet from 'helmet';
import compression from 'compression';
import { Application } from 'express';
import cors from 'cors';


export default function(app:Application){
    app.use(helmet())
    app.use(compression())
    app.use(cors())
}