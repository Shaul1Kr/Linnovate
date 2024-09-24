import express from "express";
import {
  createShortUrl,
  getUrlAnalytics,
  redirectToLongUrl,
} from "../controllers/url.controller";

const router = express.Router();

// Route to shorten URLs (POST /shorten)
router.post("/shorten", createShortUrl);

// Route to get URL analytics (GET /analytics)
router.get("/analytics", getUrlAnalytics); // Add the analytics route

// Route to handle redirection for short URLs (GET /:shortUrl)
router.get("/:shortUrl", redirectToLongUrl);

export default router;
