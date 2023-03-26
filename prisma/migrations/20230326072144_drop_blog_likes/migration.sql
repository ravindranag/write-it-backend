/*
  Warnings:

  - You are about to drop the `BlogLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogLikes" DROP CONSTRAINT "BlogLikes_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogLikes" DROP CONSTRAINT "BlogLikes_userId_fkey";

-- DropTable
DROP TABLE "BlogLikes";
