import express from "express";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const app = express();

const PORT = process.env.PORT || 3000;

async function main() {
  app.use(cookieParser());
  app.use(express.json());

  app.listen(PORT, () => {
    return console.log(`Server is listening on port ${PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
