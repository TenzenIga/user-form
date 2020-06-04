import server from '../../app';
import request from 'supertest';
import Worker from '../../models/worker';
import rimraf from 'rimraf';
import  mongoose  from 'mongoose';
describe('/api/workers', ()=>{

    
afterEach( async ()=>{
    server.close();  
    await Worker.deleteMany({}); // clear database
   
    })
    afterAll( ()=>
         rimraf.sync('./server/test/uploadTest/*')  // clear imaage folder
    )

    describe('GET /', ()=>{
        let newWorker = {
            first_name:'test',
            last_name:'test',
            birthday: '2002-12-09',
            position:'manager',
            address:'Baker street',
            isRemote: true,     
        }
        it('should return all workers', async ()=>{
            await Worker.collection.insertOne(newWorker)
            const res = await request(server).get('/api/workers');
            expect(res.status).toBe(200);
            expect(res.body[0]).toHaveProperty('first_name', 'test')
        })
    })


    describe('POST /', ()=>{

        let newWorker = {
            first_name:'John',
            last_name:'Doe',
            birthday: '2002-12-09',
            position:'manager',
            address:'Baker street',
            isRemote: true,
            photo:`${__dirname}/rick.jpg`     
        }

        const execPost = async () =>{
            return await request(server)
            .post('/api/workers')
            .attach('userPhoto', newWorker.photo)
            .field('first_name', newWorker.first_name)
            .field('last_name', newWorker.last_name)
            .field('birthday', newWorker.birthday)
            .field('position', newWorker.position)
            .field('address', newWorker.address)
            .field('isRemote', newWorker.isRemote) 
        }

        it('should add new worker', async ()=>{
            
            const res = await execPost();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('first_name', 'John');
            expect(res.body).toHaveProperty('photo');

        })

        it('should add new worker with default photo if image is not provided', async ()=>{
            newWorker.photo = '';
            const res = await execPost();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('photo', 'default')
        })

        it('should return 400 if first_name length more than 50 characters', async ()=>{
            newWorker.first_name = new Array(52).join('a');
            const res = await execPost();
            expect(res.status).toBe(400);
        })

        it('should return 400 if first_name length is less than 2 characters', async ()=>{
            newWorker.first_name = 'a';
            const res = await execPost(); 
            expect(res.status).toBe(400);
        })

        it('should return 400 if last_name length more than 50 characters', async ()=>{
            newWorker.first_name = 'John';
            newWorker.last_name = new Array(52).join('a');
            const res = await execPost();
            expect(res.status).toBe(400);
        })

        it('should return 400 if last_name length is less than 2 characters', async ()=>{
            newWorker.last_name = 'a';
            const res = await execPost();
            expect(res.status).toBe(400);
        })
    })

    describe('PUT /', ()=>{
        let worker:any;
        let id:any;
        let newName:string;
        const execPut = async () =>{
            return await request(server)
            .put('/api/workers/' + id)
            .field('first_name', newName) // new name
            .field('last_name', worker.last_name) //same same
            .field('birthday', worker.birthday.toString()) // same data
            .field('position', worker.position) //same data
            .field('address', worker.address) //same data
            .field('isRemote', worker.isRemote) // same data
        }

        beforeEach(async ()=>{
            //Before each test we need to create worker
            // and put it in the database
            worker = new Worker({
                first_name:'John',
                last_name:'Doe',
                birthday: '2002-12-09',
                position:'manager',
                address:'Baker street',
                isRemote: true,
                photo:`${__dirname}/rick.jpg`     
            });
            worker = await worker.save()
            id = worker._id;
            
            newName = 'UpdatedName'            
        })

        it('should return updated worker if it is valid', async ()=>{
            const res = await execPut();
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            let updatedWorker = Worker.findById(res.body._id)
            expect(updatedWorker).toHaveProperty('first_name', newName);

        })

        it('should return 404 if worker with given id was not found', async ()=>{
            id = mongoose.Types.ObjectId()
            const res = await execPut();

            expect(res.status).toBe(404);

        })

        
    })

    describe('DELETE /', ()=>{
        let worker:any;
        let id:any;

        const execDelete = async ()=>{
            return await request(server)
            .delete('/api/workers/' + id)
        } 

        beforeEach(async ()=>{
            //Before each test we need to create worker
            // and put it in the database
            worker = new Worker({
                first_name:'John',
                last_name:'Doe',
                birthday: '2002-12-09',
                position:'manager',
                address:'Baker street',
                isRemote: true,
                photo:`${__dirname}/rick.jpg`     
            });
            worker = await worker.save()
            id = worker._id;       
        })

        it('should return deleted worker if it is valid', async ()=>{
            const res = await execDelete();
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('first_name', worker.first_name);

        })

        it('should return 404 if worker with given id was not found', async ()=>{
            id = mongoose.Types.ObjectId()
            const res = await execDelete();
            expect(res.status).toBe(404);

        })
    })
});

