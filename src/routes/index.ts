import { Router } from "express";
import express from 'express';
import ProductRouter from "./productRouter";
import AdminRouter from "./adminAuthRouter";

const router: Router = Router();

router.use("/api/v1/admin/", AdminRouter);
router.use("/api/v1/", ProductRouter);

// 404 handler for non-existent routes
router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error handling middleware
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.status === 400 && err.errors) {
    res.status(400).json({
      message: err.message,
      errors: err.errors,
    });
  }
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default router;