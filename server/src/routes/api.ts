import express from "express";
import urlRouter from "./url";
import analyticsRouter from "./analytics";
const router = express.Router();

router.use("/analytics", analyticsRouter);

router.use("/", urlRouter);

export default router;
