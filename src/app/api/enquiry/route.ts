import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_test_key123");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, company, email, phone, quantity, budget, deliveryLocation, message, shortlist } = data;

    // Validate minimal required fields
    if (!name || !email || !company || !phone || !deliveryLocation || !quantity) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Format Shortlist Items if any exist
    let shortlistHtml = "";
    if (shortlist && Array.isArray(shortlist) && shortlist.length > 0) {
      const itemsList = shortlist.map(item => `<li><strong>${item.title}</strong>${item.price ? ` (${item.price})` : ''}</li>`).join('');
      shortlistHtml = `
        <tr style="background-color: #fef2f2;">
          <td style="padding: 12px; border-bottom: 2px solid #fee2e2; font-weight: bold; color: #dc2626; vertical-align: top;">Quoted Items</td>
          <td style="padding: 12px; border-bottom: 2px solid #fee2e2;">
            <ul style="margin: 0; padding-left: 20px; color: #dc2626;">
              ${itemsList}
            </ul>
          </td>
        </tr>
      `;
    }

    // 1. Prepare Admin Notification Email HTML
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #dc2626; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #fee2e2; border-radius: 12px; background-color: #fef2f2;">
        <div style="background-color: #dc2626; color: white; padding: 15px 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
          <h2 style="margin: 0;">New Corporate Enquiry 🚀</h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #ffffff;"><td style="padding: 12px; border-bottom: 1px solid #fee2e2; font-weight: bold; width: 35%;">Name</td><td style="padding: 12px; border-bottom: 1px solid #fee2e2;">${name}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #fee2e2; font-weight: bold;">Company</td><td style="padding: 12px; border-bottom: 1px solid #fee2e2;">${company}</td></tr>
          <tr style="background-color: #ffffff;"><td style="padding: 12px; border-bottom: 1px solid #fee2e2; font-weight: bold;">Email</td><td style="padding: 12px; border-bottom: 1px solid #fee2e2;"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #fee2e2; font-weight: bold;">Phone</td><td style="padding: 12px; border-bottom: 1px solid #fee2e2;">${phone}</td></tr>
          <tr style="background-color: #ffffff;"><td style="padding: 12px; border-bottom: 1px solid #fee2e2; font-weight: bold;">Quantity</td><td style="padding: 12px; border-bottom: 1px solid #fee2e2;">${quantity}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #fee2e2; font-weight: bold;">Budget</td><td style="padding: 12px; border-bottom: 1px solid #fee2e2;">${budget || "Not Specified"}</td></tr>
          <tr style="background-color: #ffffff;"><td style="padding: 12px; border-bottom: 1px solid #fee2e2; font-weight: bold;">Delivery Target</td><td style="padding: 12px; border-bottom: 1px solid #fee2e2; color: #ef4444;">${deliveryLocation}</td></tr>
          ${shortlistHtml}
          <tr><td style="padding: 12px; font-weight: bold; vertical-align: top;">Message</td><td style="padding: 12px;">${message || "No message provided."}</td></tr>
        </table>
      </div>
    `;

    // 2. Prepare Client Confirmation Email HTML
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; color: #dc2626; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #fee2e2; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #dc2626;">Thank You for Your Request, ${name}!</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          We have successfully received your bulk enquiry for <strong>${company}</strong>. Our corporate gifting experts are reviewing your requirements and will get back to you within 2-4 business hours with a custom curation and quote.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          If you have any urgent requests or designs you would like us to look at, feel free to reply directly to this email.
        </p>
        <hr style="border: 0; border-top: 1px solid #fee2e2; margin: 30px 0;" />
        <p style="font-size: 14px; color: #888;">
          Best Regards,<br/>
          <strong>The Corporate Gifting Team</strong><br/>
          PacMyProduct
        </p>
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      await Promise.all([
        resend.emails.send({
          from: "Enquiry <onboarding@resend.dev>", // Replace with verified domain in production
          to: ["admin@pacmyproduct.com"], // Placeholder Admin Email
          replyTo: email,
          subject: `New Corporate Enquiry - ${company}`,
          html: adminEmailHtml,
        }),
        resend.emails.send({
          from: "Corporate Gifting Team <onboarding@resend.dev>", // Replace with verified domain in production
          to: [email],
          subject: "We received your request – PacMyProduct",
          html: clientEmailHtml,
        }),
      ]);
    } else {
      console.log("Mock Email Sending (No RESEND_API_KEY found):", { adminEmailHtml, clientEmailHtml });
    }

    return NextResponse.json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
