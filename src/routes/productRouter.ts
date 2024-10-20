import express from 'express';
import {
    create,
    show,
    update,
    remove,
} from "../controllers/productController";
import { validateProductRequest, validateProductPagination } from '../validators/productValidator';
import isAuth from '../middlewares/isAuth';


const router = express.Router();

router.post("/products", validateProductRequest, isAuth, create);
router.get("/products", isAuth, validateProductPagination, show);
router.put("/products/:id", isAuth, validateProductRequest, update);
router.delete("/products/:id", isAuth, remove);

export default router;