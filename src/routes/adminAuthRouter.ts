import express from 'express';
import {
    singUp,
    signIn,
    verifyOtp,
} from "../controllers/adminAuthController";
import { validateSignUpRequest, validateSignInRequest, validateVerifyOtpRequest } from '../validators/adminAuthValidator';

const router = express.Router();

router.post("/signup", validateSignUpRequest, singUp);
router.post("/signin", validateSignInRequest, signIn);
router.post("/verifyOtp", validateVerifyOtpRequest, verifyOtp);

export default router;
