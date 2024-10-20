import { Request, Response } from "express";
import {
    createProduct,
    showProducts,
    updateProduct,
    deleteProduct,
} from "../services/product-service";
import { getAdminById } from "../services/admin-service";

interface CustomRequest extends Request {
    adminId?: number;
}

export const create = async (req: CustomRequest, res: Response) => {
    try {
        const getAdmin = await getAdminById(req.adminId!);
        const product = await createProduct({
            name: req.body.name,
            price: req.body.price,
            createdBy: getAdmin?.name as string,
            updatedBy: getAdmin?.name as string
        });

        res.status(201).json({
            message: "Success Create Product",
            data: product,
        });
    } catch (error) {
        console.error("error in product create", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const show = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;

        const products = await showProducts(page, limit);

        res.status(200).json({
            message: "List Data Product",
            data: products,
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await updateProduct(
            {
                name: req.body.name,
                price: req.body.price,
            },
            id
        );

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({
            message: "Success Update Product",
            data: product,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await deleteProduct(id);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({
            message: "Success Delete Product",
            data: product,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
