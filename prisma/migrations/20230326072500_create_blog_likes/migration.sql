-- CreateTable
CREATE TABLE "BlogLikes" (
    "blogSlug" STRING NOT NULL,
    "profileId" STRING NOT NULL,

    CONSTRAINT "BlogLikes_pkey" PRIMARY KEY ("blogSlug","profileId")
);

-- AddForeignKey
ALTER TABLE "BlogLikes" ADD CONSTRAINT "BlogLikes_blogSlug_fkey" FOREIGN KEY ("blogSlug") REFERENCES "Blog"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogLikes" ADD CONSTRAINT "BlogLikes_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
