import {Document, Schema, model} from "mongoose";


interface IWorker extends Document{
    _id:string
    first_name:string
    last_name:string
    birthday:Date
    position:string
    city:string
    street:string | null
    building:string | null
    flat:string | null
    photo:string | null
    isRemote:boolean
}

const workerSchema = new Schema({
    first_name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    last_name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    birthday:{
        type:Date,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    street:{
        type:String
        
    },
    building:{
        type:String
    },
    flat:{
        type:String
    },
    photo:{ 
        type:String
    },
    isRemote:{
        type:Boolean,
        default: false
    }
});


export default model<IWorker>('Worker', workerSchema);

 