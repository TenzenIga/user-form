import mongoose from 'mongoose';
import {link} from './config';





export default function(){
    mongoose.connect(link, { useUnifiedTopology:true, useNewUrlParser: true })
    .then(()=> console.log('Connected to database'))
    mongoose.set('useFindAndModify', false);
}