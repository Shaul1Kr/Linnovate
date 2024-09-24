-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "urlId" INTEGER NOT NULL,
    "accessCounter" INTEGER NOT NULL DEFAULT 0,
    "lastAccessed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
