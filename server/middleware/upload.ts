import multer from 'multer';
import {storageFolder} from '../startup/config';


const imageFilter = (req:any, file:any, cb:any) =>{
    // reject file if it's not image
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(console.log('only images allowed')
        , false);
    }
    cb(null, true);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
    cb(null, storageFolder)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
  
})

const upload = multer({ storage:storage, fileFilter:imageFilter })

export default upload;