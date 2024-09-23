import { Request, Response } from "express";
import { generateShortUrl } from "../utils/urlService";
import { prisma } from "..";

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { longUrl } = req.body;

    // Validate the input
    if (!longUrl) {
      return res.status(400).json({ error: "longUrl is required" });
    }

    // Generate or retrieve the short URL
    const shortUrl = await generateShortUrl(longUrl);

    // Send response with the newly created short URL
    return res.status(201).json({ longUrl, shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the short URL" });
  }
};

export const redirectToLongUrl = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params;

    // Find the URL entry in the database using the shortUrl
    const urlEntry = await prisma.url.findUnique({
      where: { shortUrl },
    });

    // If the short URL does not exist, return a 404 error
    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Redirect the user to the long URL
    return res.redirect(urlEntry.longUrl);
  } catch (error) {
    console.error("Error during redirection:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while redirecting to the long URL" });
  }
};
