import { sql } from "./db";

/**
 * Every website form submission — the footer's newsletter and the blog's "tell
 * us what you need" — kept in our own table as well as sent to GHL, so the
 * team can see what came in from the admin (Form submissions) and nothing is
 * lost when GHL is down or not connected.
 */

export type Submission = {
  id: string;
  form: "footer" | "blog";
  name: string;
  email: string;
  phone: string;
  business: string;
  industry: string;
  message: string;
  page: string;
  /** sent: in GHL · failed: GHL refused it · off: GHL not connected. */
  ghl: "sent" | "failed" | "off";
  createdAt: string;
};

export async function saveSubmission(s: Omit<Submission, "id" | "createdAt" | "ghl">) {
  const [row] = await sql`
    insert into form_submissions (form, name, email, phone, business, industry, message, page)
    values (${s.form}, ${s.name}, ${s.email}, ${s.phone}, ${s.business}, ${s.industry}, ${s.message}, ${s.page})
    returning id`;
  return row.id as string;
}

export async function markSubmission(id: string, ghl: Submission["ghl"]) {
  await sql`update form_submissions set ghl = ${ghl} where id = ${id}`;
}

export async function listSubmissions(limit = 200): Promise<Submission[]> {
  const rows = await sql`
    select id, form, name, email, phone, business, industry, message, page, ghl, created_at
    from form_submissions
    order by created_at desc
    limit ${limit}`;
  return rows.map((row) => ({
    id: row.id,
    form: row.form,
    name: row.name,
    email: row.email,
    phone: row.phone,
    business: row.business,
    industry: row.industry,
    message: row.message,
    page: row.page,
    ghl: row.ghl,
    createdAt: row.created_at,
  }));
}
