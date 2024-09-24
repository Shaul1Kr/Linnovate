import express from "express";
import {
  createShortUrl,
  redirectToLongUrl,
} from "../controllers/url.controller";

const router = express.Router();

// Route to shorten URLs (POST /shorten)
router.post("/shorten", createShortUrl);

// Route to handle redirection for short URLs (GET /:shortUrl)
router.get("/:shortUrl", redirectToLongUrl);

export default router;
