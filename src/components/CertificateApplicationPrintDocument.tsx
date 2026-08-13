import type { CertificateApplicationPrintSession } from "../lib/certificateApplicationPrint";
import type { ReactNode } from "react";
import "./join-program-print.css";
import "./certificate-application-print.css";

type Props = {
  session: CertificateApplicationPrintSession;
};

const attachmentLabels: Record<string, string> = {
  nationalHalalCertificate: "نسخة عن شهادة الحلال الوطنية",
  finalProductTestCertificate: "نسخة عن شهادة اختبار المنتجات النهائية، إن وجدت",
  rawMaterialTestCertificates: "نسخة عن شهادات اختبار المواد الخام",
  qualityOrNationalConformityCertificate: "شهادة الجودة أو علامة المطابقة الوطنية للمنتج",
  factoryLicense: "نسخة عن شهادة ترخيص المصنع",
  otherFactoryCertificates: "نسخة من أي شهادات أخرى حصل عليها المصنع (غير شهادة الحلال)",
  iso22000Certificate: "شهادة نظام إدارة سلامة الأغذية ISO 22000",
  haccpCertificate: "نظام تحليل المخاطر ونقاط التحكم الحرجة HACCP",
  other: "أخرى، يرجى التوضيح",
};

const notices = [
  "تقوم الجهة المانحة لشهادة أو علامة الحلال العربية التي تلقت هذا الطلب بإبلاغ المنشأة أو المورد بنتيجة مراجعة الطلب خلال شهر من تاريخ استلام الطلب.",
  "تلتزم الجهة المانحة لشهادة أو علامة الحلال العربية بالحفاظ على سرية المعلومات والوثائق المتعلقة بالطلب وإجراءات المنح وفق الأصول المعمول بها.",
  "يمكن للمنشأة أو المورد الحاصل على علامة الحلال الوطنية لإحدى الدول العربية سارية المفعول الحصول على علامة الحلال العربية لنفس مدة سريان العلامة الوطنية.",
];

const commitments = [
  "تلتزم المنشأة أو المورد المتقدم بهذا الطلب بتحقيق متطلبات البرنامج العربي للحلال والمواصفات المتعلقة بالحلال الواردة فيه، والشروط والترتيبات التي تتطلبها شهادة أو علامة الحلال العربية وإجراءات تقييم المطابقة المعتمدة من الجهة المعنية بالحلال.",
  "السماح لممثلي الجهة المعنية بالحلال في الدولة بزيارة المنشأة أو المورد لإجراء التفتيش أو التدقيق أو سحب العينات إذا لزم الأمر.",
  "عدم الإعلان أو النشر بأي شكل من الأشكال بأن المنتجات أو الأنظمة أو الخدمات حاصلة على شهادة أو علامة الحلال العربية حتى يتم منح الشهادة أو العلامة للمنتجات.",
  "تسديد تكاليف حق استخدام علامة الحلال العربية في الحساب البنكي الخاص بالمنظمة العربية للتنمية الصناعية والتقييس والتعدين.",
  "يتحمل مقدم الطلب جميع النفقات المتعلقة بهذا الطلب.",
];

function value(input: unknown, empty = "-") {
  if (Array.isArray(input)) return input.filter(Boolean).join("، ") || empty;
  if (typeof input === "string") return input.trim() || empty;
  if (typeof input === "boolean") return input ? "نعم" : "لا";
  return empty;
}

function printableImage(input: unknown) {
  return typeof input === "string" && input.startsWith("data:image/") ? input : "";
}

function isYes(input: unknown) {
  const normalized = String(input ?? "").trim().toLocaleLowerCase();
  return normalized === "yes" || normalized === "نعم" || normalized === "ù†ø¹ù…";
}

function Check({ checked }: { checked: boolean }) {
  return <span className="join-print-check" aria-hidden="true">{checked ? "✓" : ""}</span>;
}

function Footer({ page }: { page: 1 | 2 }) {
  return (
    <footer className="join-print-footer">
      <span>ARHalal-A01</span>
      <span>Rev (0)</span>
      <span>{page}/2</span>
      <span className="join-print-footer__badge">21</span>
      <span className="join-print-footer__page">البرنامج العربي للحلال</span>
    </footer>
  );
}

function Masthead() {
  return (
    <header className="join-print-masthead">
      <span className="join-print-masthead__tag">الملحق (1)</span>
      <span className="join-print-masthead__title">نموذج طلب الحصول / تجديد شهادة وعلامة الحلال العربية</span>
    </header>
  );
}

export function CertificateApplicationPrintDocument({ session }: Props) {
  const company = session.data.companyInformation;
  const product = session.data.productInformation;
  const applicant = session.data.applicantInformation;
  const attachments = session.data.attachments;
  const normalizedNature = company.companyNature.trim().toLocaleLowerCase();
  const isManufacturer = company.companyNature === "MANUFACTURER" || normalizedNature === "مصنعة" || normalizedNature === "ù…øµù†ø¹ø©";
  const isSupplier = company.companyNature === "SUPPLIER" || normalizedNature === "موردة" || normalizedNature === "ù…ùˆø±ø¯ø©";
  const wantsCertificate = company.applicationPurpose.includes("arab_halal_certificate") || company.applicationPurpose.includes("ARAB_HALAL_CERTIFICATE");
  const wantsMark = company.applicationPurpose.includes("arab_halal_mark") || company.applicationPurpose.includes("ARAB_HALAL_MARK");

  return (
    <div id="certificate-application-print-document" className="join-print-document certificate-print-document" dir="rtl">
      <article className="join-print-page certificate-print-page">
        <div className="join-print-content">
          <Masthead />
          <div className="certificate-print-heading">
            <strong>نموذج طلب الحصول على شهادة حلال العربية</strong>
            <strong>أو الحصول على / تجديد الترخيص باستخدام علامة الحلال العربية</strong>
            <span className="certificate-print-heading__english">Arab Halal Certification and Arab Mark application form</span>
            <small>(البيانات الواردة في هذا النموذج تمثل الحد الأدنى من البيانات الواجب توفرها)</small>
          </div>

          <h2 className="certificate-print-section-title">معلومات عامة:</h2>
          <table className="join-print-table">
            <tbody>
              <tr className="certificate-print-row--tall">
                <td><span className="join-print-label">اسم الشركة المسجل (بالعربية)</span><span className="join-print-value">{value(company.companyRegisteredNameAr)}</span></td>
                <td dir="ltr"><span className="join-print-label">Company Registered Name (English)</span><span className="join-print-value join-print-value--ltr">{value(company.companyRegisteredNameEn)}</span></td>
              </tr>
              <tr className="certificate-print-row--tall">
                <td><span className="join-print-label">العنوان البريدي المسجل للشركة (بالعربية)</span><span className="join-print-value">{value(company.companyRegisteredAddressAr)}</span></td>
                <td dir="ltr"><span className="join-print-label">Company Registered Address (English)</span><span className="join-print-value join-print-value--ltr">{value(company.companyRegisteredAddressEn)}</span></td>
              </tr>
              <tr className="certificate-print-row"><td colSpan={2}><span className="join-print-label">الدولة:</span><span className="join-print-value">{value(company.country)}</span></td></tr>
              <tr className="certificate-print-row"><td colSpan={2}><span className="join-print-label">طبيعة الشركة:</span><div className="certificate-print-inline-options"><span><Check checked={isManufacturer} />مصنعة</span><span><Check checked={isSupplier} />موردة</span></div></td></tr>
              <tr className="certificate-print-row--tall"><td colSpan={2}><span className="join-print-label">العناوين البريدية لفروع الشركة إن وجدت:</span><span className="join-print-value">{value(company.branchAddresses)}</span></td></tr>
              <tr className="certificate-print-row"><td><span className="join-print-label">رقم الهاتف:</span><span className="join-print-value join-print-value--ltr">{value(company.phone)}</span></td><td><span className="join-print-label">رقم الفاكس:</span><span className="join-print-value join-print-value--ltr">{value(company.fax)}</span></td></tr>
              <tr className="certificate-print-row"><td><span className="join-print-label">الموقع الإلكتروني:</span><span className="join-print-value join-print-value--ltr">{value(company.website)}</span></td><td><span className="join-print-label">البريد الإلكتروني:</span><span className="join-print-value join-print-value--ltr">{value(company.companyEmail)}</span></td></tr>
              <tr className="certificate-print-row"><td><span className="join-print-label">اسم المسؤول في الشركة:</span><span className="join-print-value">{value(company.responsiblePersonName)}</span></td><td><span className="join-print-label">البريد الإلكتروني للمدير:</span><span className="join-print-value join-print-value--ltr">{value(company.managerEmail)}</span></td></tr>
              <tr className="certificate-print-row"><td><span className="join-print-label">رقم الهاتف المحمول للمسؤول:</span><span className="join-print-value join-print-value--ltr">{value(company.responsiblePersonMobile)}</span></td><td><span className="join-print-label">اسم مدير الجودة:</span><span className="join-print-value">{value(company.qualityManagerName)}</span></td></tr>
              <tr className="certificate-print-row">
                <td><span className="join-print-label">هل الطلب يقدم لأول مرة؟</span><div className="certificate-print-inline-options"><span><Check checked={isYes(company.isFirstApplication)} />نعم</span><span><Check checked={!isYes(company.isFirstApplication)} />لا</span></div></td>
                <td><span className="join-print-label">ما الغرض من تقديم الطلب؟</span><div className="certificate-print-inline-options"><span><Check checked={wantsCertificate} />شهادة حلال العربية</span><span><Check checked={wantsMark} />علامة الحلال العربية</span></div></td>
              </tr>
            </tbody>
          </table>

          <h2 className="certificate-print-section-title">تفاصيل المنتج:</h2>
          <section className="certificate-print-product-box">
            <div className="certificate-print-product-row"><div className="join-print-value">{value(product.requestedProducts)}</div><div className="join-print-label">اسم المنتج / المنتجات المطلوب منحها شهادة أو علامة الحلال العربية:</div></div>
            <div className="certificate-print-product-row"><div className="join-print-value">{value(product.productDescription)}</div><div className="join-print-label">وصف المنتج / المنتجات:</div></div>
            <div className="certificate-print-product-row"><div className="join-print-value">{value(product.otherFactoryProducts)}</div><div className="join-print-label">المنتجات الأخرى التي ينتجها المصنع:</div></div>
            <div className="certificate-print-other-certificate">
              <div className="join-print-label">هل منتجات المصنع حاصلة على شهادة حلال أخرى؟</div>
              <div className="certificate-print-inline-options"><span><Check checked={isYes(product.hasOtherHalalCertificate)} />نعم</span><span><Check checked={!isYes(product.hasOtherHalalCertificate)} />لا</span></div>
              {isYes(product.hasOtherHalalCertificate) && (
                <>
                  <div className="join-print-line"><span>ما هو مجال الشهادة؟</span><span className="join-print-line__value">{value(product.otherHalalCertificateScope, "")}</span></div>
                  <div className="join-print-line"><span>ما هي المواصفة المرجعية لها؟</span><span className="join-print-line__value">{value(product.otherHalalReferenceStandard, "")}</span></div>
                  <div className="join-print-line"><span>ما هي الجهة المانحة للشهادة؟</span><span className="join-print-line__value">{value(product.otherHalalCertifyingBody, "")}</span></div>
                </>
              )}
            </div>
          </section>

          <div className="certificate-print-attachments-title">
            الوثائق المرفقة مع الطلب:
            <div className="certificate-print-attachments-note">الرجاء الإشارة بعلامة (X) في المربع المناسب للوثائق المرفقة مع الطلب</div>
          </div>
          <table className="join-print-table">
            <tbody>
              {Object.keys(attachmentLabels).reduce<ReactNode[]>((rows, key, index, keys) => {
                if (index % 2 !== 0) return rows;
                const pair = keys.slice(index, index + 2);
                rows.push(
                  <tr key={key}>
                    {pair.map((attachmentKey) => {
                      const attachment = attachments[attachmentKey];
                      return (
                        <td key={attachmentKey} className="certificate-print-attachment">
                          <Check checked={attachment?.included === true} />{attachmentLabels[attachmentKey]}
                          {attachmentKey === "other" && attachment?.description ? `: ${attachment.description}` : ""}
                        </td>
                      );
                    })}
                    {pair.length === 1 && <td />}
                  </tr>,
                );
                return rows;
              }, [])}
            </tbody>
          </table>
        </div>
        <Footer page={1} />
      </article>

      <article className="join-print-page certificate-print-page certificate-print-page-two">
        <div className="join-print-content">
          <Masthead />
          <section className="certificate-print-legal">
            <h3>معلومات هامة:</h3>
            <ul>{notices.map((notice) => <li key={notice}>{notice}</li>)}</ul>
            <h3>بعد موافقة الجهة المعنية بالحلال أو الجهة المعينة على هذا الطلب يرجى مراعاة التالي:</h3>
            <ul>{commitments.map((commitment) => <li key={commitment}>{commitment}</li>)}</ul>
          </section>

          <section className="certificate-print-declaration">
            <Check checked={session.data.declarationAccepted} />
            <span>أقر بأنني قرأت جميع المعلومات والتعهدات الواردة أعلاه، وأوافق على الالتزام بها، وأؤكد صحة البيانات والوثائق المقدمة في هذا الطلب.</span>
          </section>

          <table className="join-print-table certificate-print-signature">
            <tbody>
              <tr><td>اسم مقدم الطلب:</td><td><span className="join-print-value">{value(applicant.applicantName)}</span></td></tr>
              <tr><td>المسمى الوظيفي:</td><td><span className="join-print-value">{value(applicant.applicantJobTitle)}</span></td></tr>
              <tr><td>التاريخ:</td><td><span className="join-print-value">{value(applicant.applicationDate)}</span></td></tr>
              <tr className="certificate-print-signature__drawing-row">
                <td>التوقيع الإلكتروني:</td>
                <td>
                  {printableImage(applicant.applicantSignature) ? (
                    <img className="certificate-print-signature__drawing" src={printableImage(applicant.applicantSignature)} alt="التوقيع الإلكتروني" />
                  ) : (
                    <span className="join-print-value">{value(applicant.applicantSignature, "غير مرفق")}</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <section className="certificate-print-notes">
            <div className="join-print-label">ملاحظات أخرى:</div>
            <div className="certificate-print-notes__lines">{value(applicant.additionalNotes, "")}</div>
          </section>
        </div>
        <Footer page={2} />
      </article>
    </div>
  );
}
