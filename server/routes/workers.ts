import express from 'express';
import { Request, Response } from 'express';
import asyncWrapper from '../middleware/asyncWrapper';
import Worker from '../models/worker';
import { validateWorker, validateId } from '../middleware/validation';
import upload from '../middleware/upload';
import fs from 'fs';
import { storageFolder } from '../startup/config';


const router = express.Router();


/**
 * Get all workers
 */
router.get('/',  asyncWrapper(
    async (req:Request, res:Response)=>{
        const workers = await Worker.find()
        res.send(workers)
    })
)

/**
 * Add worker
 */

router.post('/' , upload.single('userPhoto'), validateWorker,  asyncWrapper(
    async (req:Request, res:Response)=>{
                
        let worker = new Worker({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            birthday:req.body.birthday,
            position:req.body.position,
            city:req.body.city,
            street:req.body.street,
            building:req.body.building,
            flat:req.body.flat,
            isRemote:req.body.isRemote,
            photo:req.file && req.file.filename
        })
        
        worker = await worker.save();
        res.status(200).send(worker)
    })
)

/**
 * Update worker
 */
router.put('/:id', upload.single('userPhoto'), validateId, validateWorker, asyncWrapper(
     async (req:Request, res:Response)=>{
        
        const worker = await Worker.findById(req.params.id)
        if(!worker) return res.status(404).send('Worker with given ID doesn\'t exist');

            worker.first_name = req.body.first_name;
            worker.last_name = req.body.last_name;
            worker.birthday = req.body.birthday;
            worker.position = req.body.position;
            worker.city = req.body.city;
            worker.building = req.body.building;
            worker.street = req.body.street;
            worker.flat = req.body.flat;
            worker.isRemote = req.body.isRemote;
            
            if(req.file){
                
                //delete old photo
                if(worker.photo){
                     fs.unlink(`./${storageFolder}/${worker.photo}`, (err)=>{ // workaround to delete file if fields validation fails
                        if(err) throw err.message;
                    });
                }
                worker.photo = req.file.filename;
            }

            worker.save()
        res.status(200).send(worker);
    })
)


/**
 * Delete worker
 */
router.delete('/:id', validateId, asyncWrapper(
    async (req:Request, res:Response)=>{
        const deletedWorker = await Worker.findByIdAndRemove(req.params.id);
        if(!deletedWorker) return res.status(404).send('Worker with given ID doesn\'t exist');
        
        if(deletedWorker.photo !== 'default.png'){
            fs.unlink(`./${storageFolder}/${deletedWorker.photo}`, (err)=>{ // workaround to delete file if fields validation fails
                if(err) throw err.message;
            });
        }
        res.status(200).send(deletedWorker)
    })
)

export default router;