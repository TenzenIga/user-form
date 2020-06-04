import Joi from '@hapi/joi';
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import fs from 'fs';

const schema = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    birthday:Joi.date().required(),
    position:Joi.string().required(),
    city:Joi.string().required(),
    street:Joi.string(),
    building:Joi.string(),
    flat:Joi.string(),
    isRemote:Joi.boolean()
})

export const validateId = (req:Request, res:Response, next:NextFunction) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid ID');
    next() 
}


// when we reach this middleware our image already stored, even if some input fields might be invalid... 
// that's the issue with multer, there is no way to validate formdata before dealing with file
export const validateWorker =  (req:Request, res:Response, next:NextFunction) =>{
    const {error} = schema.validate(req.body);
    if(error){
        if(req.file){
            fs.unlink('./' + req.file.path, (err)=>{ // workaround to delete file if fields validation fails
                if(err) throw err.message;
            });
        }
    return res.status(400).send(error.details[0].message);
    }
    next()
}


