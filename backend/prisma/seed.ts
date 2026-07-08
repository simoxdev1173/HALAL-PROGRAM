import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

async function main() {
  // -------------------------------------------------------------------
  // 1. Admin user
  // -------------------------------------------------------------------
  const passwordHash = await bcrypt.hash("admin1234", SALT_ROUNDS);

  const admin = await prisma.adminUser.create({
    data: {
      email: "admin@aidsmo.org",
      name: "مدير النظام",
      role: "SUPER_ADMIN",
      passwordHash,
      isActive: true,
    },
  });

  // -------------------------------------------------------------------
  // 2. Accepted designation body application (Morocco)
  // -------------------------------------------------------------------
  const contractSignedAt = new Date();
  contractSignedAt.setMonth(contractSignedAt.getMonth() - 6);

  const moroccoApplication = await prisma.application.create({
    data: {
      type: "DESIGNATION_BODY",
      status: "ACCEPTED",
      requestNumber: "AHP-APP-2025-00001",
      submittedAt: contractSignedAt,
      reviewedAt: contractSignedAt,
      reviewedBy: admin.id,
      designationBodyApp: {
        create: {
          organizationNameAr: "الهيئة المغربية للاعتماد والمراقبة التنظيمية",
          organizationNameEn: "Moroccan Accreditation and Regulatory Authority",
          organizationAddressAr: "شارع الرباط، الرباط، المغرب",
          organizationAddressEn: "Rabat Avenue, Rabat, Morocco",
          country: "المغرب",
          phone: "+212-537-000000",
          website: "https://marra.example.ma",
          email: "contact@marra.example.ma",
          headName: "عبد اللطيف الفاسي",
          headEmail: "head@marra.example.ma",
          headMobile: "+212-661-000001",
          contactOfficerName: "سلمى بنعلي",
          contactOfficerEmail: "salma.benali@marra.example.ma",
          contactOfficerMobile: "+212-661-000002",
          orgStructureIncluded: true,
          technicalHumanCapacityIncluded: true,
          inspectorsTrainingProceduresIncluded: true,
          approvedInspectorsAuditorsListIncluded: true,
          halalCertificateIssuingProceduresIncluded: true,
          documentRecordsProceduresIncluded: true,
          nationalHalalCertificatesLast12MonthsIncluded: true,
          suppliersFacilitiesProductsListIncluded: true,
          accreditationCertificatesCopy: true,
          appointmentDesignationCopy: true,
          otherDocuments: false,
          grantsNationalHalalCertificate: "YES",
          nationalHalalCertificateName: "شهادة الحلال المغربية",
          nationalHalalReferenceStandard: "NM 08.0.800",
          coveredProductCategories: "منتجات غذائية، مستحضرات تجميل",
          hasOtherNationalHalalBodies: "NO",
          applicantAcknowledgement: true,
          signatureHeadName: "عبد اللطيف الفاسي",
          signatureDate: contractSignedAt,
          bodyType: "NON_GOVERNMENTAL",
          status: "ACTIVE",
          feeExempt: false,
          contractSignedAt,
          contractFileUrl: "/contracts/marra-annex5.pdf",
        },
      },
      attachments: {
        create: [
          {
            category: "signature",
            fileUrl: "/uploads/marra/signature.png",
            fileName: "signature.png",
            mimeType: "image/png",
          },
          {
            category: "accreditationCertificatesFiles",
            fileUrl: "/uploads/marra/accreditation-cert.pdf",
            fileName: "accreditation-cert.pdf",
            mimeType: "application/pdf",
          },
        ],
      },
    },
    include: { designationBodyApp: true },
  });

  const moroccoDesignationBody = moroccoApplication.designationBodyApp;
  if (!moroccoDesignationBody) {
    throw new Error("Failed to create Moroccan designation body application");
  }

  await prisma.payment.create({
    data: {
      feeType: "DESIGNATION_BODY_3YR",
      amountUsd: 250,
      status: "CONFIRMED",
      paidAt: contractSignedAt,
      receiptUrl: "/receipts/marra-3yr.pdf",
      receiptFileName: "marra-3yr-receipt.pdf",
      periodStart: contractSignedAt,
      periodEnd: new Date(contractSignedAt.getFullYear() + 3, contractSignedAt.getMonth(), contractSignedAt.getDate()),
      confirmedBy: admin.id,
      designationBodyId: moroccoDesignationBody.id,
    },
  });

  const moroccoAppointedBody = await prisma.appointedBody.create({
    data: {
      designationBodyId: moroccoDesignationBody.id,
      name: "مركز منح شهادات الحلال المغربي",
      country: "المغرب",
      accreditationScope: "منتجات غذائية، مستحضرات تجميل",
      status: "ACTIVE",
    },
  });

  // -------------------------------------------------------------------
  // 3. Accepted halal certificate application (Atlas Food, Morocco)
  // -------------------------------------------------------------------
  const applicationDate = new Date();
  applicationDate.setMonth(applicationDate.getMonth() - 2);

  const atlasApplication = await prisma.application.create({
    data: {
      type: "HALAL_CERTIFICATE",
      status: "ACCEPTED",
      requestNumber: "AHP-APP-2025-00002",
      submittedAt: applicationDate,
      reviewedAt: applicationDate,
      reviewedBy: admin.id,
      certificateApp: {
        create: {
          companyRegisteredNameAr: "شركة الأطلس للمواد الغذائية",
          companyRegisteredNameEn: "Atlas Food Products Company",
          companyRegisteredAddressAr: "المنطقة الصناعية، الدار البيضاء، المغرب",
          companyRegisteredAddressEn: "Industrial Zone, Casablanca, Morocco",
          country: "المغرب",
          companyNature: "MANUFACTURER",
          phone: "+212-522-000000",
          companyEmail: "info@atlasfood.example.ma",
          responsiblePersonName: "يوسف العلوي",
          managerEmail: "manager@atlasfood.example.ma",
          responsiblePersonMobile: "+212-661-000010",
          qualityManagerName: "ليلى بنجلون",
          isFirstApplication: "YES",
          purposes: ["ARAB_HALAL_CERTIFICATE"],
          branchAddresses: ["المنطقة الصناعية، الدار البيضاء، المغرب"],
          requestedProducts: ["معجون الطماطم", "صلصة الهريسة"],
          productDescription: "منتجات غذائية معلبة",
          otherFactoryProducts: [],
          hasOtherHalalCertificate: "NO",
          attNationalHalalCertificate: true,
          attIso22000Certificate: true,
          attHaccpCertificate: true,
          declarationAccepted: true,
          applicantName: "يوسف العلوي",
          applicantJobTitle: "المدير العام",
          applicationDate,
          status: "ACTIVE",
          appointedBodyId: moroccoAppointedBody.id,
        },
      },
      attachments: {
        create: [
          {
            category: "attachments.iso22000Certificate",
            fileUrl: "/uploads/atlas/iso22000.pdf",
            fileName: "iso22000.pdf",
            mimeType: "application/pdf",
          },
          {
            category: "attachments.haccpCertificate",
            fileUrl: "/uploads/atlas/haccp.pdf",
            fileName: "haccp.pdf",
            mimeType: "application/pdf",
          },
          {
            category: "applicantSignature",
            fileUrl: "/uploads/atlas/signature.png",
            fileName: "signature.png",
            mimeType: "image/png",
          },
        ],
      },
    },
    include: { certificateApp: true },
  });

  const atlasCertificateApp = atlasApplication.certificateApp;
  if (!atlasCertificateApp) {
    throw new Error("Failed to create Atlas Food certificate application");
  }

  const issueDate = new Date();
  const expiryDate = new Date(issueDate.getFullYear() + 3, issueDate.getMonth(), issueDate.getDate());

  const atlasCertificate = await prisma.certificate.create({
    data: {
      certificateAppId: atlasCertificateApp.id,
      appointedBodyId: moroccoAppointedBody.id,
      certificateNumber: "AHP-2026-00001",
      purpose: "ARAB_HALAL_CERTIFICATE",
      productNames: ["معجون الطماطم", "صلصة الهريسة"],
      issueDate,
      expiryDate,
      status: "ACTIVE",
    },
  });

  await prisma.certificateStatusLog.create({
    data: {
      certificateId: atlasCertificate.id,
      fromStatus: "ACTIVE",
      toStatus: "ACTIVE",
      reason: "شهادة جديدة",
      changedBy: admin.id,
    },
  });

  await prisma.payment.create({
    data: {
      feeType: "CERTIFICATE_USE",
      amountUsd: 100,
      status: "CONFIRMED",
      paidAt: issueDate,
      receiptUrl: "/receipts/atlas-cert-use.pdf",
      receiptFileName: "atlas-cert-use-receipt.pdf",
      confirmedBy: admin.id,
      certificateId: atlasCertificate.id,
    },
  });

  // -------------------------------------------------------------------
  // 4. Pending designation body application (Tunisia)
  // -------------------------------------------------------------------
  await prisma.application.create({
    data: {
      type: "DESIGNATION_BODY",
      status: "SUBMITTED",
      requestNumber: "AHP-APP-2026-00001",
      submittedAt: new Date(),
      designationBodyApp: {
        create: {
          organizationNameAr: "الجهة التونسية لمنح شهادات الحلال",
          organizationNameEn: "Tunisian Halal Certification Authority",
          organizationAddressAr: "شارع الحبيب بورقيبة، تونس العاصمة، تونس",
          organizationAddressEn: "Avenue Habib Bourguiba, Tunis, Tunisia",
          country: "تونس",
          phone: "+216-71-000000",
          email: "contact@thca.example.tn",
          headName: "منير الشريف",
          headEmail: "head@thca.example.tn",
          headMobile: "+216-98-000001",
          contactOfficerName: "أمينة الطرابلسي",
          contactOfficerEmail: "amina.trabelsi@thca.example.tn",
          contactOfficerMobile: "+216-98-000002",
          applicantAcknowledgement: true,
          signatureHeadName: "منير الشريف",
          signatureDate: new Date(),
          status: "PENDING",
        },
      },
    },
  });

  // -------------------------------------------------------------------
  // 5. Surveillance report (Jordan)
  // -------------------------------------------------------------------
  const periodStart = new Date("2026-01-01");
  const periodEnd = new Date("2026-06-30");

  await prisma.surveillanceReport.create({
    data: {
      surveillanceBodyName: "جهاز حماية المستهلك الأردني",
      country: "الأردن",
      periodLabel: "H1-2026",
      periodStart,
      periodEnd,
      reportFileUrl: "/uploads/surveillance/jordan-h1-2026.pdf",
      reportFileName: "jordan-h1-2026.pdf",
      violationsCount: 2,
      violationsSummary: "تم رصد منتجين يحملان علامة الحلال العربية دون ترخيص سارٍ",
      createdBy: admin.id,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
