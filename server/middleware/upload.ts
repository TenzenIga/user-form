import multer from 'multer';

const cloudinary = require('cloudinary').v2 
const {CloudinaryStorage} = require('multer-storage-cloudinary');
import {storageFolder} from '../startup/config';


cloudinary.config({
  cloud_name: 'dtmyzxgoi',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


let storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:{
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  }
});

let upload = multer({ storage:storage});

if(process.env.NODE_ENV === 'test'){ // save files localy for testing
  const imageFilter = (req:any, file:any, cb:any) =>{
    // reject file if it's not image
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(console.log('only images allowed')
        , false);
    }
    cb(null, true);
  }

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
    cb(null, storageFolder)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
  
  })
  upload = multer({ storage:storage, fileFilter:imageFilter})
}


export default upload;