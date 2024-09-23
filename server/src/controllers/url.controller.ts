import { Request, Response } from "express";
import { prisma } from "..";
import { decode, encode } from "../utils/urlService";

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { longUrl } = req.body as { longUrl: string };
    console.info(`Create a shot url with ${longUrl} url`);

    // Validate the input
    if (!longUrl) {
      return res.status(400).json({ error: "longUrl is required" });
    }
    const { protocol, baseUrl, headers } = req;
    const { host } = headers;
    const longUrlData = await prisma.url.upsert({
      where: { longUrl },
      update: {},
      create: { longUrl },
    });
    const shortUrl = encode(longUrlData.id);
    // Generate or retrieve the short URL

    console.log(req.baseUrl);

    // Send response with the newly created short URL
    return res.status(201).json({
      longUrl,
      shortUrl: `${protocol}://${host}${baseUrl}/${shortUrl}`,
    });
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
    console.info("Redirect to long url");

    // Find the URL entry in the database using the shortUrl
    const id = decode(shortUrl);
    const urlEntry = await prisma.url.findUnique({
      where: { id },
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
