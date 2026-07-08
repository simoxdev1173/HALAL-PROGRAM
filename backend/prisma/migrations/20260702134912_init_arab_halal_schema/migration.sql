-- CreateEnum
CREATE TYPE "ApplicationType" AS ENUM ('DESIGNATION_BODY', 'HALAL_CERTIFICATE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "YesNo" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "CompanyNature" AS ENUM ('MANUFACTURER', 'SUPPLIER');

-- CreateEnum
CREATE TYPE "CertPurpose" AS ENUM ('ARAB_HALAL_CERTIFICATE', 'ARAB_HALAL_MARK');

-- CreateEnum
CREATE TYPE "DesignationBodyType" AS ENUM ('GOVERNMENTAL', 'NON_GOVERNMENTAL');

-- CreateEnum
CREATE TYPE "EntityStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'REVOKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('DESIGNATION_BODY_3YR', 'CERTIFICATE_USE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'REVIEWER', 'VIEWER');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "type" "ApplicationType" NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "requestNumber" TEXT,
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSizeBytes" INTEGER,
    "mimeType" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignationBodyApplication" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "organizationNameAr" TEXT NOT NULL,
    "organizationNameEn" TEXT NOT NULL,
    "organizationAddressAr" TEXT NOT NULL,
    "organizationAddressEn" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fax" TEXT,
    "website" TEXT,
    "email" TEXT NOT NULL,
    "headName" TEXT NOT NULL,
    "headEmail" TEXT NOT NULL,
    "headMobile" TEXT NOT NULL,
    "contactOfficerName" TEXT NOT NULL,
    "contactOfficerEmail" TEXT NOT NULL,
    "contactOfficerMobile" TEXT NOT NULL,
    "orgStructureIncluded" BOOLEAN NOT NULL DEFAULT false,
    "technicalHumanCapacityIncluded" BOOLEAN NOT NULL DEFAULT false,
    "inspectorsTrainingProceduresIncluded" BOOLEAN NOT NULL DEFAULT false,
    "approvedInspectorsAuditorsListIncluded" BOOLEAN NOT NULL DEFAULT false,
    "halalCertificateIssuingProceduresIncluded" BOOLEAN NOT NULL DEFAULT false,
    "documentRecordsProceduresIncluded" BOOLEAN NOT NULL DEFAULT false,
    "nationalHalalCertificatesLast12MonthsIncluded" BOOLEAN NOT NULL DEFAULT false,
    "suppliersFacilitiesProductsListIncluded" BOOLEAN NOT NULL DEFAULT false,
    "accreditationCertificatesCopy" BOOLEAN NOT NULL DEFAULT false,
    "appointmentDesignationCopy" BOOLEAN NOT NULL DEFAULT false,
    "otherDocuments" BOOLEAN NOT NULL DEFAULT false,
    "otherDocumentsDescription" TEXT,
    "grantsNationalHalalCertificate" "YesNo",
    "nationalHalalCertificateName" TEXT,
    "nationalHalalReferenceStandard" TEXT,
    "coveredProductCategories" TEXT,
    "hasOtherNationalHalalBodies" "YesNo",
    "otherNationalHalalBodiesNames" TEXT,
    "grantsOtherCertificates" "YesNo",
    "otherCertificatesNames" TEXT,
    "otherCertificatesReferenceStandards" TEXT,
    "otherCertificatesScope" TEXT,
    "applicantAcknowledgement" BOOLEAN NOT NULL DEFAULT false,
    "signatureHeadName" TEXT NOT NULL,
    "signatureDate" TIMESTAMP(3) NOT NULL,
    "additionalNotes" TEXT,
    "bodyType" "DesignationBodyType",
    "status" "EntityStatus" NOT NULL DEFAULT 'PENDING',
    "feeExempt" BOOLEAN NOT NULL DEFAULT false,
    "contractSignedAt" TIMESTAMP(3),
    "contractFileUrl" TEXT,

    CONSTRAINT "DesignationBodyApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificateApplication" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "companyRegisteredNameAr" TEXT NOT NULL,
    "companyRegisteredNameEn" TEXT NOT NULL,
    "companyRegisteredAddressAr" TEXT NOT NULL,
    "companyRegisteredAddressEn" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "companyNature" "CompanyNature" NOT NULL,
    "phone" TEXT NOT NULL,
    "fax" TEXT,
    "website" TEXT,
    "companyEmail" TEXT NOT NULL,
    "responsiblePersonName" TEXT NOT NULL,
    "managerEmail" TEXT NOT NULL,
    "responsiblePersonMobile" TEXT NOT NULL,
    "qualityManagerName" TEXT NOT NULL,
    "isFirstApplication" "YesNo" NOT NULL,
    "purposes" "CertPurpose"[],
    "branchAddresses" JSONB NOT NULL,
    "requestedProducts" JSONB NOT NULL,
    "productDescription" TEXT NOT NULL,
    "otherFactoryProducts" JSONB NOT NULL,
    "hasOtherHalalCertificate" "YesNo" NOT NULL,
    "otherHalalCertificateScope" TEXT,
    "otherHalalReferenceStandard" TEXT,
    "otherHalalCertifyingBody" TEXT,
    "attNationalHalalCertificate" BOOLEAN NOT NULL DEFAULT false,
    "attFinalProductTestCertificate" BOOLEAN NOT NULL DEFAULT false,
    "attRawMaterialTestCertificates" BOOLEAN NOT NULL DEFAULT false,
    "attQualityOrNationalConformityCert" BOOLEAN NOT NULL DEFAULT false,
    "attFactoryLicense" BOOLEAN NOT NULL DEFAULT false,
    "attOtherFactoryCertificates" BOOLEAN NOT NULL DEFAULT false,
    "attIso22000Certificate" BOOLEAN NOT NULL DEFAULT false,
    "attHaccpCertificate" BOOLEAN NOT NULL DEFAULT false,
    "attOther" BOOLEAN NOT NULL DEFAULT false,
    "attOtherDescription" TEXT,
    "declarationAccepted" BOOLEAN NOT NULL DEFAULT false,
    "applicantName" TEXT NOT NULL,
    "applicantJobTitle" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "additionalNotes" TEXT,
    "appointedBodyId" TEXT,
    "status" "EntityStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "CertificateApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointedBody" (
    "id" TEXT NOT NULL,
    "designationBodyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accreditationScope" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" "EntityStatus" NOT NULL DEFAULT 'ACTIVE',
    "appointedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppointedBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "certificateAppId" TEXT NOT NULL,
    "appointedBodyId" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "purpose" "CertPurpose" NOT NULL,
    "productNames" JSONB NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "status" "CertificateStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificateStatusLog" (
    "id" TEXT NOT NULL,
    "certificateId" TEXT NOT NULL,
    "fromStatus" "CertificateStatus" NOT NULL,
    "toStatus" "CertificateStatus" NOT NULL,
    "reason" TEXT,
    "changedBy" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CertificateStatusLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "feeType" "FeeType" NOT NULL,
    "amountUsd" DECIMAL(10,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "receiptUrl" TEXT,
    "receiptFileName" TEXT,
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "notes" TEXT,
    "confirmedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "designationBodyId" TEXT,
    "certificateId" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveillanceReport" (
    "id" TEXT NOT NULL,
    "surveillanceBodyName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "periodLabel" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "reportFileUrl" TEXT NOT NULL,
    "reportFileName" TEXT NOT NULL,
    "licensedProductsListUrl" TEXT,
    "violationsSummary" TEXT,
    "violationsCount" INTEGER,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdBy" TEXT,

    CONSTRAINT "SurveillanceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'VIEWER',
    "passwordHash" TEXT NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_requestNumber_key" ON "Application"("requestNumber");

-- CreateIndex
CREATE INDEX "Application_type_status_idx" ON "Application"("type", "status");

-- CreateIndex
CREATE INDEX "Attachment_applicationId_idx" ON "Attachment"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "DesignationBodyApplication_applicationId_key" ON "DesignationBodyApplication"("applicationId");

-- CreateIndex
CREATE INDEX "DesignationBodyApplication_country_status_idx" ON "DesignationBodyApplication"("country", "status");

-- CreateIndex
CREATE UNIQUE INDEX "CertificateApplication_applicationId_key" ON "CertificateApplication"("applicationId");

-- CreateIndex
CREATE INDEX "CertificateApplication_country_status_idx" ON "CertificateApplication"("country", "status");

-- CreateIndex
CREATE INDEX "AppointedBody_designationBodyId_idx" ON "AppointedBody"("designationBodyId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateNumber_key" ON "Certificate"("certificateNumber");

-- CreateIndex
CREATE INDEX "Certificate_status_expiryDate_idx" ON "Certificate"("status", "expiryDate");

-- CreateIndex
CREATE INDEX "CertificateStatusLog_certificateId_idx" ON "CertificateStatusLog"("certificateId");

-- CreateIndex
CREATE INDEX "Payment_status_feeType_idx" ON "Payment"("status", "feeType");

-- CreateIndex
CREATE INDEX "SurveillanceReport_country_idx" ON "SurveillanceReport"("country");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignationBodyApplication" ADD CONSTRAINT "DesignationBodyApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateApplication" ADD CONSTRAINT "CertificateApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateApplication" ADD CONSTRAINT "CertificateApplication_appointedBodyId_fkey" FOREIGN KEY ("appointedBodyId") REFERENCES "AppointedBody"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointedBody" ADD CONSTRAINT "AppointedBody_designationBodyId_fkey" FOREIGN KEY ("designationBodyId") REFERENCES "DesignationBodyApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_certificateAppId_fkey" FOREIGN KEY ("certificateAppId") REFERENCES "CertificateApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_appointedBodyId_fkey" FOREIGN KEY ("appointedBodyId") REFERENCES "AppointedBody"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateStatusLog" ADD CONSTRAINT "CertificateStatusLog_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateStatusLog" ADD CONSTRAINT "CertificateStatusLog_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_designationBodyId_fkey" FOREIGN KEY ("designationBodyId") REFERENCES "DesignationBodyApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_confirmedBy_fkey" FOREIGN KEY ("confirmedBy") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveillanceReport" ADD CONSTRAINT "SurveillanceReport_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
