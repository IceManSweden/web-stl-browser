import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import fileModel from "./src/model/fileModel.js";
import modelRoute from './src/route/modelRoute.js';
dotenv.config();

await mongoose.connect(process.env.DB_CONNECTION);

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/images', express.static(process.env.MOUNT_DIR_IMAGES));
//app.use('/files', express.static(process.env.MOUNT_DIR_FILES));

app.use('/models', modelRoute);

app.get('/', async (req, res) => {
    res.render('index', {models: await fileModel.getAll()});
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

async function validateFiles() {
    if (fs.lstatSync(process.env.MOUNT_DIR_FILES).isDirectory() && fs.lstatSync(process.env.MOUNT_DIR_IMAGES).isDirectory()) {
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
                        name: files[i].split('.')[0], filePath: files[i], imagePath: images[j],
                    }
                    link.push(obj)
                    im = j;
                    break;
                }
            }
            if (!found) {
                missing.push(files[i]);
            } else {
                images.splice(im, 1);
            }
        }
        if (!missing) {
            console.log(missing);
        }
        const db = await fileModel.getAll()
        if (db.length === link.length) {
            console.log("All files found in DB by Count");
        } else { // Adds the files to the db if they don't exist.
            link.forEach(link => {
                fileModel.create(link.name, link.filePath, link.imagePath)
            })
        }
    } else {
        console.log("Invalid directory");
    }
}
