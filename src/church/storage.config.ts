import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const storage = diskStorage({
    destination: "./upload/images/churchImage",
    filename: (req, file, callback) => {
      callback(null, generateFilename(file));
    },
  });

export function fileFilter(req,image,callback) {
    const ext=(image.mimetype)
    const allowedTypes= ["image/jpg", "image/png", "image/jpeg"]
    if(image == undefined){callback(null,true)}
    if(allowedTypes.indexOf(ext) == -1){
        callback(new Error("Extension not allowed"),false)
    }  
    callback(null,true)
}

export const limits ={
    fileSize:2097152
}

function generateFilename(file) {
    return `${uuid()}${extname(file.originalname)}`;
  }
  