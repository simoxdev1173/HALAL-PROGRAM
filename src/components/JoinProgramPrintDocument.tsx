import type { JoinProgramPrintSession, JoinProgramPrintValue } from "../lib/joinProgramPrint";
import "./join-program-print.css";

type Props = {
  session: JoinProgramPrintSession;
};

const reportItems = [
  "الهيكل التنظيمي للجهة المعنية بالحلال موضحا به مسؤوليات وواجبات العاملين به في مجال منح الشهادات.",
  "الإمكانات الفنية والبشرية في مجال منح الشهادات.",
  "دليل / إجراءات اختيار وتدريب المفتشين والمدققين.",
  "قائمة المفتشين والمدققين المعتمدين.",
  "إجراءات إصدار شهادات الحلال وفق المتطلبات الدولية ISO/IEC 17065 و AIDSMO 3042.",
  "إجراءات توثيق المستندات والسجلات.",
  "سجل شهادات الحلال الوطنية الصادرة لآخر 12 شهرا (عندما تكون الجهة المعنية بالحلال تمنح شهادة الحلال الوطنية).",
  "قائمة أسماء وعناوين الموردين / المنشآت (المصانع والشركات) ومنتجاتها التي يشرفون عليها في قطاع الحلال (إذا كانت الجهة المعنية بالحلال تمنح شهادة الحلال الوطنية).",
] as const;

const legalConditions = [
  "تقوم المنظمة العربية للتنمية الصناعية والتقييس والتعدين بإبلاغ الجهة المعنية بالحلال بنتيجة مراجعة الطلب خلال شهر من تاريخ استلام الطلب.",
  "تلتزم المنظمة العربية للتنمية الصناعية والتقييس والتعدين بالحفاظ على سرية المعلومات والوثائق المتعلقة بالطلب ومرفقات الطلب.",
  "تلتزم الجهة المتقدمة للحصول على موافقة المنظمة بتشغيل البرنامج العربي للحلال بتنفيذ المتطلبات الواردة في البرنامج.",
  "في حال قبول الطلب يلتزم الطرفان بتوقيع نموذج وثيقة التعاون الفني، الملحق (5) في البرنامج العربي للحلال، والالتزام بما يرد فيه قانونيا وماليا.",
];

function text(value: JoinProgramPrintValue | undefined, empty = "-") {
  if (Array.isArray(value)) return value.filter(Boolean).join("، ") || empty;
  if (typeof value === "boolean") return value ? "نعم" : "لا";
  if (typeof value === "string") return value.trim() || empty;
  return empty;
}

function answer(value: JoinProgramPrintValue | undefined): "yes" | "no" | "empty" {
  if (value === true) return "yes";
  if (value === false || value === null || value === undefined || value === "") return "empty";
  const normalized = String(value).trim().toLocaleLowerCase();
  if (normalized === "yes" || normalized === "نعم" || normalized === "ù†ø¹ù…") return "yes";
  if (normalized === "no" || normalized === "لا" || normalized === "ù„ø§") return "no";
  return "empty";
}

function date(value: string) {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("ar-MA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(parsed);
}

function Check({ checked }: { checked: boolean }) {
  return <span className="join-print-check" aria-hidden="true">{checked ? "X" : ""}</span>;
}

function Answer({ value }: { value: JoinProgramPrintValue | undefined }) {
  const selected = answer(value);
  return (
    <div className="join-print-answers">
      <span><Check checked={selected === "yes"} />نعم</span>
      <span><Check checked={selected === "no"} />لا</span>
    </div>
  );
}

function Line({ label, value }: { label: string; value: JoinProgramPrintValue | undefined }) {
  return (
    <div className="join-print-line">
      <span>{label}</span>
      <span className="join-print-line__value">{text(value, "")}</span>
    </div>
  );
}

function Footer({ page }: { page: 1 | 2 }) {
  return (
    <footer className="join-print-footer">
      <span>ARHalal-A02</span>
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
      <span className="join-print-masthead__tag">الملحق (2)</span>
      <span className="join-print-masthead__title">نموذج طلب الانضمام إلى البرنامج العربي للحلال</span>
    </header>
  );
}

export function JoinProgramPrintDocument({ session }: Props) {
  const { data } = session;

  return (
    <div id="join-program-print-document" className="join-print-document" dir="rtl">
      <article className="join-print-page">
        <div className="join-print-content">
          <Masthead />
          <h2 className="join-print-form-title">نموذج طلب الانضمام إلى البرنامج العربي للحلال</h2>

          <table className="join-print-table join-print-table--meta">
            <tbody>
              <tr>
                <td><span className="join-print-label join-print-label--inline">رقم الطلب:</span><span className="join-print-value join-print-value--inline join-print-value--ltr">{text(session.requestNumber)}</span></td>
                <td rowSpan={2} className="join-print-meta-organization">يعبأ من قبل المنظمة</td>
              </tr>
              <tr><td><span className="join-print-label join-print-label--inline">تاريخ استلام الطلب:</span><span className="join-print-value join-print-value--inline">{date(session.submittedAt)}</span></td></tr>
            </tbody>
          </table>

          <p className="join-print-intro">
            تقوم الجهة المعنية بالحلال التي ترغب في الانضمام إلى البرنامج العربي للحلال وتشغيله بتعبئة هذا النموذج وإرساله إلى المنظمة العربية للتنمية الصناعية والتقييس والتعدين عبر البريدين الإلكترونيين:
          </p>
          <div className="join-print-emails"><span>aidsmo@aidsmo.org</span><span>smc@aidsmo.org</span></div>

          <table className="join-print-table join-print-main-table">
            <tbody>
              <tr className="join-print-section-row"><th colSpan={2}>معلومات عامة:</th></tr>
              <tr className="join-print-bilingual-labels">
                <td><span className="join-print-label">اسم الجهة المعنية بالحلال المسجلة: (بالعربية)</span></td>
                <td dir="ltr"><span className="join-print-label">Organization Registered Name: (English)</span></td>
              </tr>
              <tr className="join-print-bilingual-values">
                <td><span className="join-print-value">{text(data.organizationNameAr, "")}</span></td>
                <td dir="ltr"><span className="join-print-value join-print-value--ltr">{text(data.organizationNameEn, "")}</span></td>
              </tr>
              <tr className="join-print-bilingual-labels">
                <td><span className="join-print-label">العنوان البريدي المسجل للجهة المعنية بالحلال: (بالعربية)</span></td>
                <td dir="ltr"><span className="join-print-label">Organization Registered Address: (English)</span></td>
              </tr>
              <tr className="join-print-bilingual-values">
                <td><span className="join-print-value">{text(data.organizationAddressAr, "")}</span></td>
                <td dir="ltr"><span className="join-print-value join-print-value--ltr">{text(data.organizationAddressEn, "")}</span></td>
              </tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">الدولة:</td><td><span className="join-print-value">{text(data.country, "")}</span></td></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">رقم الهاتف:</td><td><span className="join-print-value join-print-value--ltr">{text(data.phone, "")}</span></td></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">رقم الفاكس:</td><td><span className="join-print-value join-print-value--ltr">{text(data.fax, "")}</span></td></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">الموقع الإلكتروني:</td><td><span className="join-print-value join-print-value--ltr">{text(data.website, "")}</span></td></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">البريد الإلكتروني:</td><td><span className="join-print-value join-print-value--ltr">{text(data.email, "")}</span></td></tr>
              <tr className="join-print-section-row"><th colSpan={2}>معلومات الإدارة العليا:</th></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">اسم رئيس الجهة المعنية بالحلال:</td><td><span className="join-print-value">{text(data.headName, "")}</span></td></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">البريد الإلكتروني الخاص به:</td><td><span className="join-print-value join-print-value--ltr">{text(data.headEmail, "")}</span></td></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">رقم الهاتف المحمول:</td><td><span className="join-print-value join-print-value--ltr">{text(data.headMobile, "")}</span></td></tr>
              <tr className="join-print-section-row"><th colSpan={2}>معلومات ضابط الاتصال:<small>يرجى تحديد شخص يمثل الجهة المعنية بالحلال للتواصل معه</small></th></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">اسم ضابط الاتصال:</td><td><span className="join-print-value">{text(data.contactOfficerName, "")}</span></td></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">البريد الإلكتروني الخاص به:</td><td><span className="join-print-value join-print-value--ltr">{text(data.contactOfficerEmail, "")}</span></td></tr>
              <tr className="join-print-single-field"><td className="join-print-field-label">رقم الهاتف المحمول:</td><td><span className="join-print-value join-print-value--ltr">{text(data.contactOfficerMobile, "")}</span></td></tr>
            </tbody>
          </table>

          <section className="join-print-report">
            <p className="join-print-report__title">إذا كان تقديم الطلب لأول مرة، فيرجى إرفاق تقرير يوضح النقاط التالية:</p>
            <ol>
              {reportItems.map((label) => <li key={label}>{label}</li>)}
            </ol>
          </section>

          <table className="join-print-table join-print-attachments">
            <tbody>
              <tr><td colSpan={2} className="join-print-attachments__note">الوثائق المرفقة مع الطلب: يرجى وضع إشارة (X) في المربع المناسب للوثائق المرفقة مع الطلب</td></tr>
              <tr>
                <td className="join-print-attachment-cell"><Check checked={data.accreditationCertificatesCopy === true} />نسخة عن شهادات الاعتماد</td>
                <td className="join-print-attachment-cell"><Check checked={data.appointmentDesignationCopy === true} />نسخة عن التكليف بالتعيين</td>
              </tr>
              <tr><td colSpan={2} className="join-print-attachment-cell"><Check checked={data.otherDocuments === true} />أخرى، يرجى التوضيح: {text(data.otherDocumentsDescription, "")}</td></tr>
            </tbody>
          </table>
        </div>
        <Footer page={1} />
      </article>

      <article className="join-print-page">
        <div className="join-print-content">
          <Masthead />

          <section className="join-print-question-box">
            <div className="join-print-question">
              <p className="join-print-question__prompt">هل تمنح الجهة المعنية بالحلال شهادة حلال وطنية؟</p>
              <Answer value={data.grantsNationalHalalCertificate} />
              <p className="join-print-question__branch">إذا كان الجواب نعم</p>
              <Line label="ما هي؟" value={data.nationalHalalCertificateName} />
              <Line label="ما هي المواصفة المرجعية لها؟" value={data.nationalHalalReferenceStandard} />
              <Line label="ذكر تصنيف المنتجات المغطاة في مجال منح الشهادة:" value={data.coveredProductCategories} />
            </div>

            <div className="join-print-question">
              <p className="join-print-question__branch">إذا كان الجواب لا</p>
              <Line label="هل توجد جهات معينة تقوم بمنح شهادة الحلال الوطنية؟" value={data.hasOtherNationalHalalBodies} />
              <Line label="الرجاء ذكر أسماء هذه الجهات:" value={data.otherNationalHalalBodiesNames} />
            </div>

            <div className="join-print-question">
              <p className="join-print-question__prompt">هل تمنح الجهة المعنية بالحلال شهادات أخرى (أنظمة إدارة، منتجات، أو غيرها)؟</p>
              <Answer value={data.grantsOtherCertificates} />
              <p className="join-print-question__branch">إذا كان الجواب نعم</p>
              <Line label="ما هي؟" value={data.otherCertificatesNames} />
              <Line label="ما هي المواصفة المرجعية لها؟" value={data.otherCertificatesReferenceStandards} />
              <Line label="الرجاء ذكر مجال منح الشهادات:" value={data.otherCertificatesScope} />
            </div>
          </section>

          <section className="join-print-legal">
            <h3>شروط وتوضيحات:</h3>
            <ul>{legalConditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
          </section>

          <table className="join-print-table join-print-signature">
            <tbody>
              <tr><td className="join-print-signature__label">اسم رئيس الجهة المعنية بالحلال:</td><td><span className="join-print-value">{text(data.signatureHeadName)}</span></td></tr>
              <tr><td className="join-print-signature__label">التاريخ:</td><td><span className="join-print-value">{date(text(data.signatureDate, ""))}</span></td></tr>
              <tr><td className="join-print-signature__label">التوقيع:</td><td /></tr>
              <tr><td className="join-print-signature__label">الختم الرسمي:</td><td /></tr>
            </tbody>
          </table>

          <section className="join-print-notes">
            <div className="join-print-label">ملاحظات أخرى:</div>
            <div className="join-print-notes__value">{text(data.additionalNotes, "")}</div>
          </section>
        </div>
        <Footer page={2} />
      </article>
    </div>
  );
}
