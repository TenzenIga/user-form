import {Application } from 'express';
import express from 'express';
import workers from '../routes/workers';
import error from '../middleware/error';


export default function(app:Application){
    app.use(express.json());

    app.use('/api/workers', workers);

    // Error handle
     app.use(error)
}


