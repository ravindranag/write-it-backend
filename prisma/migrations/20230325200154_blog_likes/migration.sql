-- CreateTable
CREATE TABLE "BlogLikes" (
    "blogId" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "BlogLikes_pkey" PRIMARY KEY ("blogId","userId")
);

-- AddForeignKey
ALTER TABLE "BlogLikes" ADD CONSTRAINT "BlogLikes_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogLikes" ADD CONSTRAINT "BlogLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
