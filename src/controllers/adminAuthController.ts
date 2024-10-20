import { Request, Response } from "express";
import { createAdmin, createAdminOtp, getAdminById, getAdminOtpById, updateAdmin, deleteAdminOtp, getAdminByEmail } from "../services/admin-service";
const helper = require("../helper/helper");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const singUp = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingAdmin = await prisma.admin.findUnique({
            where: { email: email },
        });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Email already exists. Please use a different email.",
            });
        }

        const otp_code = await helper.generateOTP();

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const admin = await createAdmin({
            name: name,
            email: email,
            password: hashPassword
        });

        await createAdminOtp({
            adminId: admin!.id,
            email: email,
            otp: otp_code
        });

        res.status(201).json({
            message: "Success Register Admin.",
            otp: otp_code,
            adminId: admin!.id
        });
    } catch (error) {
        console.error("error in admin singUp", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { adminId, otp } = req.body;

        const getAdminOtp = await getAdminOtpById(adminId);

        if (!getAdminOtp) {
            return res.status(401).send({ message: "OTP expired" });
        }

        const checkOtp = getAdminOtp.otp == otp;

        if (!checkOtp) {
            return res.status(401).send({ message: "OTP don't match" });
        }

        if (checkOtp) {
            const getAdmin = await getAdminById(adminId);
            const adminData = {
                status: "active",
            };
            await updateAdmin(getAdmin?.id!, adminData);
            let payload = { id: getAdmin?.id, name: getAdmin?.name };
            const jwtToken = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
            await deleteAdminOtp(getAdmin?.id!);

            res.status(201).json({
                message: "Success Verify Otp.",
                token: jwtToken
            });
        }
    } catch (error) {
        console.error("error in admin verifyOtp", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const getAdmin = await getAdminByEmail(email);

        if (!getAdmin) {
            res.status(404).json({
                message: "Email Not found!",
            });
        }

        const passwordIsValid = await bcrypt.compareSync(
            password,
            getAdmin!.password
        );

        if (!passwordIsValid) {
            res.status(401).send({
                message: "Invalid Password!",
            });
        }

        const otp_code = await helper.generateOTP();

        await createAdminOtp({
            adminId: getAdmin!.id,
            email: email,
            otp: otp_code
        });

        res.status(200).json({
            message: "Otp Sent.",
            otp: otp_code,
            adminId: getAdmin!.id
        });
    } catch (error) {
        console.error("error in signIn", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}