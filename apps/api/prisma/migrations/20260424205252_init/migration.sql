-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "shareToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoadProfile" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "who" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "currentSource" TEXT NOT NULL,
    "energyDirection" TEXT NOT NULL,
    "appliancesJson" JSONB NOT NULL,
    "dailyKwh" DOUBLE PRECISION,
    "peakKw" DOUBLE PRECISION,

    CONSTRAINT "LoadProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemDesign" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "panelKw" DOUBLE PRECISION NOT NULL,
    "inverterKw" DOUBLE PRECISION NOT NULL,
    "batteryKwh" DOUBLE PRECISION NOT NULL,
    "componentJson" JSONB NOT NULL,

    CONSTRAINT "SystemDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOQ" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "fxRateUsed" DOUBLE PRECISION NOT NULL,
    "totalNgn" DOUBLE PRECISION NOT NULL,
    "lineItemsJson" JSONB NOT NULL,

    CONSTRAINT "BOQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashflowModel" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "paybackMonths" INTEGER,
    "npvNgn" DOUBLE PRECISION,
    "irr" DOUBLE PRECISION,
    "monthlyRowsJson" JSONB NOT NULL,

    CONSTRAINT "CashflowModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "ganttJson" JSONB NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "url" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "installerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Installer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "states" TEXT[],
    "tier" TEXT NOT NULL DEFAULT 'basic',

    CONSTRAINT "Installer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanProduct" (
    "id" TEXT NOT NULL,
    "lender" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minAmount" DOUBLE PRECISION NOT NULL,
    "maxAmount" DOUBLE PRECISION NOT NULL,
    "tenorMonths" INTEGER NOT NULL,
    "ratePercent" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LoanProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_shareToken_key" ON "Plan"("shareToken");

-- CreateIndex
CREATE UNIQUE INDEX "LoadProfile_planId_key" ON "LoadProfile"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "SystemDesign_planId_key" ON "SystemDesign"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "BOQ_planId_key" ON "BOQ"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "CashflowModel_planId_key" ON "CashflowModel"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_planId_key" ON "Schedule"("planId");

-- AddForeignKey
ALTER TABLE "LoadProfile" ADD CONSTRAINT "LoadProfile_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemDesign" ADD CONSTRAINT "SystemDesign_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOQ" ADD CONSTRAINT "BOQ_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashflowModel" ADD CONSTRAINT "CashflowModel_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_installerId_fkey" FOREIGN KEY ("installerId") REFERENCES "Installer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
