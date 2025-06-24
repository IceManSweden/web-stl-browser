import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import ejs from 'ejs';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/images', express.static(process.env.MOUNT_DIR_IMAGES));
//app.use('/files', express.static(process.env.MOUNT_DIR_FILES));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/download', (req, res) => {
    res.download('./public/css/style.css');
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);

    console.log(`Mounted dirs ${process.env.MOUNT_DIR_IMAGES}`);
    console.log(`Mounted dirs ${process.env.MOUNT_DIR_FILES}`);
    validateFiles()
})

function validateFiles(){
    if(fs.lstatSync(process.env.MOUNT_DIR_FILES).isDirectory() && fs.lstatSync(process.env.MOUNT_DIR_IMAGES).isDirectory()) {
        console.log("Directory exists");
        //Count files. Look for matching images.
        const files = fs.readdirSync(process.env.MOUNT_DIR_FILES).sort();
        const images = fs.readdirSync(process.env.MOUNT_DIR_IMAGES).sort();
        //Look for missing images.
        console.log("Found models", files.length);
        console.log("Found images", images.length);
        const missing = []
        const link = []
        for (let i = 0; i < files.length; i++) {
            let found = false;
            let im;
            for (let j = 0; j < images.length; j++) {
                if (files[i].split('.st')[0] === images[j].split('.pn')[0]) {
                    found = true;
                    const obj = {
                        file: files[i],
                        image: images[j],
                    }
                    link.push(obj)
                    im = j;
                    break;
                }
            }
            if (!found) {
                missing.push(files[i]);
            }
            else{
                images.splice(im, 1);
            }
        }
        console.log(missing);
        console.log(images);
        console.log(link)

    }
    else{
        console.log("Invalid directory");
    }

}
