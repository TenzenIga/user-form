import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import winston from 'winston';

export default function(err:any,req:Request, res:Response, next:NextFunction) {
    winston.error(err.message, err);
     res.status(500).send('Something failed');   
    
 }
