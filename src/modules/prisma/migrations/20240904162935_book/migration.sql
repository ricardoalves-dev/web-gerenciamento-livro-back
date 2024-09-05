-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "author" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "copies" INTEGER NOT NULL,
    "availableCopies" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_author_key" ON "Book"("title", "author");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
