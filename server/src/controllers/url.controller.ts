import { Request, Response } from "express";
import { prisma } from "..";
import { decode, encode } from "../utils/urlService";
import path from "path";

const urlCache = new Map<string, string>();

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

    // Cache the newly created short URL and its corresponding long URL
    urlCache.set(shortUrl, longUrl);

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
    console.info(`Redirect to long url ${shortUrl}`);

    if (urlCache.has(shortUrl)) {
      console.info("Cache hit. Redirecting to long URL");
      return res.redirect(urlCache.get(shortUrl)!); // Redirect to cached long URL
    }
    // Find the URL entry in the database using the shortUrl
    const id = decode(shortUrl);
    if (id > 2147483647)
      return res
        .status(404)
        .sendFile(path.resolve(__dirname, "../error/404.html"));

    const urlEntry = await prisma.url.findUnique({
      where: { id },
    });

    // If the short URL does not exist, return a 404 error
    if (!urlEntry) {
      return res
        .status(404)
        .sendFile(path.resolve(__dirname, "../error/404.html"));
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
