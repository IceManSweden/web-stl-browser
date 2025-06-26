import express from "express";
import modelController from "../controller/modelController.js";

const router = express.Router();

export default router;
router.get('/:id', modelController.getById);
router.get('/download/:id', modelController.download);
router.post('/:id/category', modelController.addCategory);
