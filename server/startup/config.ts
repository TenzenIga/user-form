import env from 'dotenv';

env.config();

let link:string;
let storageFolder:string;


switch (process.env.NODE_ENV) {
    case 'development': 
        link = 'mongodb://localhost/nauka';
        storageFolder = 'client/public/upload'; // folder for images in dev
        break;
    case 'test':
        link = 'mongodb://localhost/test-nauka'
        storageFolder = 'server/test/uploadTest' // folder for images for testing 
        break;
    default:
        link = 'mongodb://test:1234test@ds151247.mlab.com:51247/nauka';
        storageFolder = 'client/public/upload';
        break;
}


export {link, storageFolder}