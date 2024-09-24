import { Request, Response } from "express";
import { prisma } from "..";

export const getUrlAnalytics = async (req: Request, res: Response) => {
  try {
    const urls = await prisma.url.findMany({
      select: {
        id: true,
        longUrl: true,
        _count: {
          select: {
            Analytics: true,
          },
        },
        Analytics: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    // Format the response
    const result = urls
      .map((url) => ({
        id: url.id,
        longUrl: url.longUrl,
        totalAccesses: url._count.Analytics,
        lastAccessed:
          url.Analytics.length > 0 ? url.Analytics[0].createdAt : "Never", // If no access, return 'Never'
      }))
      .sort((a, b) => b.totalAccesses - a.totalAccesses);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving URL analytics:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving URL analytics" });
  }
};
