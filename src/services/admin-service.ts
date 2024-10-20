import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Admin
export const createAdmin = async (data: Prisma.AdminCreateInput) => {
    try {
        const newAdmin = await prisma.admin.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
        return newAdmin;
    } catch (error) {
        console.error("error in createAdmin", error);
    }
};

export const updateAdmin = async (id: number, adminData: any) => {
    return prisma.admin.update({
        where: { id: id },
        data: adminData,
    });
};

export const getAdminById = async (id: number) => {
    return prisma.admin.findUnique({
        where: { id: id },
    });
};

export const getAdminByEmail = async (email: string) => {
    return prisma.admin.findUnique({
        where: { email: email },
    });
};

// Admin Otp

export const createAdminOtp = async (data: { adminId: number; email: string; otp: number }) => {
    try {
        const otpEntry = await prisma.adminOtp.create({
            data: {
                adminId: data.adminId,
                email: data.email,
                otp: data.otp,
                count: 0,
            },
        });
        return otpEntry;
    } catch (error) {
        console.error("error in createAdminOtp", error);
    }
};

export const getAdminOtpById = async (id: number) => {
    return prisma.adminOtp.findUnique({
        where: { adminId: id },
    });
};

export const deleteAdminOtp = async (id: number) => {
    return await prisma.adminOtp.delete({
        where: { adminId: id },
    });
};