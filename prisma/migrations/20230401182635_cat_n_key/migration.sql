-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "categoryId" STRING;

-- CreateTable
CREATE TABLE "Category" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogKeyword" (
    "blogId" STRING NOT NULL,
    "keywordId" STRING NOT NULL,

    CONSTRAINT "BlogKeyword_pkey" PRIMARY KEY ("blogId","keywordId")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogKeyword" ADD CONSTRAINT "BlogKeyword_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogKeyword" ADD CONSTRAINT "BlogKeyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
