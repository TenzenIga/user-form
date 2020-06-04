import mongoose from 'mongoose';
import {link} from './config';




console.log(link);

export default function(){
    mongoose.connect(link, { useUnifiedTopology:true, useNewUrlParser: true })
    .then(()=> console.log('Connected to database'))
    mongoose.set('useFindAndModify', false);
}