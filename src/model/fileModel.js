import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    filePath: {type: String, required: true, unique: true},
    imagePath: {type: String, required: true, unique: true},
})

const File = new mongoose.model("File", schema);

const FileModel = {}
export default FileModel;

/**
 * Creates a new model.
 * @param name The models name
 * @param filePath the path for the model.
 *
 * @param imagePath the path for the image.
 * @returns Object if it was successful
 */
FileModel.create = async (name, filePath, imagePath) => {
    const f = new File();
    f.name = name;
    f.filePath = filePath;
    f.imagePath = imagePath;
    return await f.save().catch((err) => {
        return false
    });
}
/**
 * Finds the model by name.
 * @param name the name of the model.
 * @returns Object the model by name.
 */
FileModel.findByName = async (name) => {
    return File.find({name: name});
}
/**
 * Gets all the models.
 * @returns Object the model's info.
 */
FileModel.getAll = async () => {
    return File.find();
}
/**
 * Finds and get the model info by id.
 * @param id the id of the model.
 * @returns Object the model.
 */
FileModel.findById = async (id)=>{
    return File.findById(id)
}
