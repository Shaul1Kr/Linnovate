import express from "express";
import { getUrlAnalytics } from "../controllers/url.controller";

const router = express.Router();

// Route to get URL analytics (GET /analytics)
router.get("/", getUrlAnalytics);

export default router;
