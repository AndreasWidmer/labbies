-- CreateTable
CREATE TABLE "dogs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "zbid" TEXT NOT NULL,
    "gender" TEXT,
    "hd" TEXT,
    "ed" TEXT,
    "eyes" TEXT,
    "birth" TIMESTAMP(3),
    "parents" TEXT,
    "color" TEXT NOT NULL,
    "breeder" TEXT,
    "approvalSince" TIMESTAMP(3),
    "results" TEXT,
    "tests" TEXT,
    "notes" TEXT,
    "form" TEXT,
    "pedigree" TEXT,
    "contact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverplans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "kennel" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coverplans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverPlanParents" (
    "coverPlanId" TEXT NOT NULL,
    "dogId" TEXT NOT NULL,

    CONSTRAINT "CoverPlanParents_pkey" PRIMARY KEY ("coverPlanId","dogId")
);

-- CreateTable
CREATE TABLE "_CoverPlanDogs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CoverPlanDogs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CoverPlanDogs_B_index" ON "_CoverPlanDogs"("B");

-- AddForeignKey
ALTER TABLE "CoverPlanParents" ADD CONSTRAINT "CoverPlanParents_coverPlanId_fkey" FOREIGN KEY ("coverPlanId") REFERENCES "coverplans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverPlanParents" ADD CONSTRAINT "CoverPlanParents_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "dogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoverPlanDogs" ADD CONSTRAINT "_CoverPlanDogs_A_fkey" FOREIGN KEY ("A") REFERENCES "coverplans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoverPlanDogs" ADD CONSTRAINT "_CoverPlanDogs_B_fkey" FOREIGN KEY ("B") REFERENCES "dogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
