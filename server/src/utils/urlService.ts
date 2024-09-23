// urlService.ts
import { prisma } from "../index";

const base62Chars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Function to convert a number to Base62
const encodeBase62 = (num: number): string => {
  let shortUrl = "";
  while (num > 0) {
    shortUrl = base62Chars[num % 62] + shortUrl;
    num = Math.floor(num / 62);
  }
  return shortUrl || "0"; // Ensure at least '0' is returned
};

// Function to generate a unique short URL
export const generateShortUrl = async (longUrl: string): Promise<string> => {
  // Use `findFirst` to check if the long URL already exists
  const existingUrl = await prisma.url.findFirst({
    where: { longUrl },
  });

  if (existingUrl) {
    return existingUrl.shortUrl; // Return existing short URL if it exists
  }

  // If it doesn't exist, count the current URLs to generate a new short URL
  const count = await prisma.url.count(); // Get the current count of URLs

  // Generate a new short URL based on the count
  const newShortUrl = encodeBase62(count + 1); // Increment count for new entry

  // Save the new long-url and short-url mapping to the database
  await prisma.url.create({
    data: {
      longUrl,
      shortUrl: newShortUrl,
    },
  });

  return newShortUrl; // Return the newly created short URL
};
