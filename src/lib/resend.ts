import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const emailConfig = {
  from: process.env.RESEND_FROM_EMAIL || "PacMyProduct <onboarding@resend.dev>",
  adminEmail: process.env.ADMIN_EMAIL || "pmpadmin@gmail.com",
  enabled: Boolean(process.env.RESEND_API_KEY),
};
