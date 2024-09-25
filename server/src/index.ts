import express from "express";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import api from "./routes/api";

export const prisma = new PrismaClient();
export const app = express();

const PORT = process.env.PORT || 3000;

async function main() {
  app.use(cookieParser());
  app.use(express.json());
  app.use(api);

  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    await prisma.$disconnect();

    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
}

main();
