import { COMPANY_INFO } from "@/data/siteConfig";

export function emailShell(title: string, body: string) {
  return `
    <div style="margin:0;background:#f6f7fb;padding:24px;font-family:Arial,sans-serif;color:#111827;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <div style="background:#111827;color:#ffffff;padding:24px;">
          <div style="font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#fca5a5;">PacMyProduct</div>
          <h1 style="margin:8px 0 0;font-size:24px;line-height:1.25;">${title}</h1>
        </div>
        <div style="padding:24px;font-size:15px;line-height:1.7;">${body}</div>
        <div style="padding:18px 24px;background:#f9fafb;color:#6b7280;font-size:13px;line-height:1.6;">
          <strong style="color:#111827;">PacMyProduct Team</strong><br/>
          ${COMPANY_INFO.phone} | ${COMPANY_INFO.email}<br/>
          ${COMPANY_INFO.address}
        </div>
      </div>
    </div>
  `;
}

export function summaryTable(rows: Array<[string, string | undefined]>) {
  return `
    <table style="width:100%;border-collapse:collapse;margin:18px 0;">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:700;width:34%;">${label}</td>
              <td style="padding:10px 12px;border:1px solid #e5e7eb;">${value || "Not provided"}</td>
            </tr>
          `
        )
        .join("")}
    </table>
  `;
}
