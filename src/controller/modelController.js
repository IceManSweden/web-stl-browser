import fileModel from "../model/fileModel.js";

const controller = {}
export default controller;

controller.getById = async (req, res) => {
    const modelId = req.params.id;
    const modelInfo = await fileModel.findById(modelId);
    console.log(modelInfo, modelId);
    res.render('model', { model: modelInfo });
}

controller.download = async (req, res) => {
    const modelId = req.params.id;
    const modelInfo = await fileModel.findById(modelId);
    const path = "./files/models/" + modelInfo.filePath;
    res.download(path);
}

controller.addCategory = async (req, res) => {
    const modelId = req.params.id;
    const category = req.body.category;
    console.log("id: ", modelId, " Body: ",req.body);
    await fileModel.addCategory(modelId, category);
    res.redirect('/models/' + modelId);
}
