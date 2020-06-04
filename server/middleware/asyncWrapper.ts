import { Request, Response, NextFunction } from 'express';


/**
 *  middleware to not write same catch logic everytime
 * @ function to execute (  db calls, req/res handling)
 */
export default function asyncWrapper(handler:Function){
    return async (req:Request, res:Response, next:NextFunction) =>{
        try{
            await handler(req, res);
        }
        catch(ex){
            next(ex)
        }
    }
}