import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    filePath: {type: String, required: true, unique: true},
    imagePath: {type: String, required: true, unique: true},
})

const File = new mongoose.model("File", schema);

const FileModel = {}
export default FileModel;

FileModel.create = async (name, filePath, imagePath) => {
    const f = new File();
    f.name = name;
    f.filePath = filePath;
    f.imagePath = imagePath;
    return await f.save().catch((err) => {
        return false
    });
}

FileModel.findByName = async (name) => {
    return File.find({name: name});
}

FileModel.getAll = async () => {
    return File.find();
}
