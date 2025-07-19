-- CreateTable
CREATE TABLE "Attachments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "path" TEXT,
    "type" TEXT,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "Attachments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Attachments_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameTh" TEXT,
    "nameEn" TEXT,
    "author" TEXT,
    "publisher" TEXT,
    "attachmentId" TEXT,
    "rating" INTEGER,
    "price" INTEGER,
    "discount" INTEGER,
    "description" TEXT,
    "summary" TEXT,
    "status" BOOLEAN DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "Books_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachments" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Books_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Books_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "bookId" TEXT,
    "orderPrice" REAL,
    "status" INTEGER,
    "orderType" INTEGER,
    "rentAt" DATETIME,
    "rentTo" DATETIME,
    "buyAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "Carts_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Carts_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "Category_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Category_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "Roles_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Roles_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT,
    "inventory" INTEGER,
    "unitPrice" REAL,
    "totalPrice" REAL,
    "remark" TEXT,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "Stock_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Stock_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Stock_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "UserRoles_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "UserRoles_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT,
    "updatedById" TEXT,
    CONSTRAINT "Users_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Users_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserSessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "deviceInfo" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" DATETIME NOT NULL,
    "expiredAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "UserSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_nameTh_key" ON "Books"("nameTh");

-- CreateIndex
CREATE UNIQUE INDEX "Books_nameEn_key" ON "Books"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSessions_token_key" ON "UserSessions"("token");
