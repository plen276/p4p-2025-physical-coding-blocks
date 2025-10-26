-- CreateTable
CREATE TABLE "Pico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "macAddress" TEXT NOT NULL,
    "lastSeen" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Robot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "macAddress" TEXT NOT NULL,
    "lastSeen" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Pico_macAddress_key" ON "Pico"("macAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Robot_macAddress_key" ON "Robot"("macAddress");
