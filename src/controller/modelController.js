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

controller.addModelSite = async (req, res) => {
    res.render('upload')
}

controller.addNewModel = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.foo;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/home/ice/Development/web-stl-browser/Files/temp/', function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
}
