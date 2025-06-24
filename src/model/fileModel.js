import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    filePath: { type: String, required: true },
    imagePath: { type: String, required: true },
})

const File = new mongoose.model("File", schema);

const FileModel = {}
export default FileModel;

FileModel.create = async (name, filePath, imagePath) => {
    const f = new File();
}
