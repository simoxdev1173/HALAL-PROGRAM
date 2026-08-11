export const CERTIFICATE_APPLICATION_PRINT_SESSION_KEY = "arab-halal-certificate-application-print-v1";

export type CertificateApplicationPrintPayload = {
  companyInformation: {
    companyRegisteredNameAr: string;
    companyRegisteredNameEn: string;
    companyRegisteredAddressAr: string;
    companyRegisteredAddressEn: string;
    country: string;
    companyNature: string;
    branchAddresses: string[];
    phone: string;
    fax: string;
    website: string;
    companyEmail: string;
    responsiblePersonName: string;
    managerEmail: string;
    responsiblePersonMobile: string;
    qualityManagerName: string;
    isFirstApplication: string | null;
    applicationPurpose: string[];
  };
  productInformation: {
    requestedProducts: string[];
    productDescription: string;
    otherFactoryProducts: string[];
    hasOtherHalalCertificate: string | null;
    otherHalalCertificateScope: string;
    otherHalalReferenceStandard: string;
    otherHalalCertifyingBody: string;
  };
  attachments: Record<string, {
    included: boolean;
    description?: string;
    files: string[];
  }>;
  declarationAccepted: boolean;
  applicantInformation: {
    applicantName: string;
    applicantJobTitle: string;
    applicationDate: string;
    applicantSignature: string | null;
    additionalNotes: string;
  };
};

export type CertificateApplicationPrintSession = {
  requestNumber: string;
  submittedAt: string;
  data: CertificateApplicationPrintPayload;
};
