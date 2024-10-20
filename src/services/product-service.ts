import { Prisma, PrismaClient } from "@prisma/client";
import { offset } from "../utils/paginate";
const prisma = new PrismaClient();

export const createProduct = async (data: Prisma.ProductCreateInput) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                createdBy: data.createdBy
            },
        });
        return product;
    } catch (error) {
        console.error("error in createProduct", error);
    }
};

export const showProducts = async (page: any, limit: any) => {
    try {
        const order = { createdAt: "desc" };
        const fields = {
            id: true,
            name: true,
            price: true,
            createdAt: true,
            updatedAt: true,
        };

        const products = await offset(
            prisma.product,
            page,
            limit,
            null,
            order,
            fields,
        );
        return products;
    } catch (error) {
        console.error("error in showProducts", error);
    }
};

export const updateProduct = async (
    data: Prisma.ProductUpdateInput,
    id: number
) => {
    try {
        const product = await prisma.product.update({
            where: { id: id },
            data: {
                name: data.name,
                price: data.price,
            },
        });
        return product;
    } catch (error) {
        console.error("error in updateProduct", error);
    }
};

export const deleteProduct = async (id: number) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id: id,
            },
        });
        return product;
    } catch (error) {
        console.error("error in deleteProduct", error);
    }
};