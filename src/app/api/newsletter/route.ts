import { z } from "zod";
import { addNote, ghlReady, subscribeContact } from "@/lib/ghl";
import { markSubmission, saveSubmission } from "@/lib/submissions";

/**
 * The website's two forms: the footer's newsletter sign-up on every page, and
 * the blog's "tell us what you need" inquiry.
 *
 * Each submission is saved to our own table first (listed in the admin under
 * Form submissions), so nothing is lost if GHL is down, then sent to GHL as a
 * contact. The footer's is tagged `newsletter` + `newsletter-footer`; the
 * blog's is an inquiry, not a subscription, so it is tagged `website-inquiry`
 * + `inquiry-blog` and its message goes on the contact as a note. A GHL
 * workflow on those tags is what notifies the team.
 *
 * Both forms also send a phone, a business name and an industry; the industry
 * becomes a tag too (`industry-real-estate`), so a workflow can send each
 * trade its own emails. Validated here, not only in the form: this route is
 * open to the internet and the values become a real contact.
 *
 * `company` is a honeypot. The form hides it from people; a bot fills every
 * field it finds, and gets a quiet success that sends nothing.
 */
const Signup = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  where: z.enum(["footer", "blog"]),
  page: z.string().max(200).optional(),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s().-]*$/)
    .optional(),
  business: z.string().trim().max(120).optional(),
  industry: z.string().trim().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
  company: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const parsed = Signup.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please check your name, email and phone number." }, { status: 400 });
  }
  const signup = parsed.data;
  if (signup.company) return Response.json({ ok: true });

  const inquiry = signup.where === "blog";
  let id: string | null = null;
  try {
    id = await saveSubmission({
      form: signup.where,
      name: signup.name,
      email: signup.email,
      phone: signup.phone ?? "",
      business: signup.business ?? "",
      industry: signup.industry ?? "",
      message: signup.message ?? "",
      page: signup.page ?? "",
    });
  } catch (error) {
    // the table is a copy for the admin; GHL below is still the main record
    console.error("form submission not saved:", error);
  }

  if (!ghlReady()) {
    console.error("form submission not sent to GHL: GHL_API_TOKEN / GHL_LOCATION_ID are not set");
    if (id) return Response.json({ ok: true });
    return Response.json({ error: "That didn't go through. Please try again later." }, { status: 503 });
  }

  const industryTag = signup.industry
    ? `industry-${signup.industry.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`
    : null;
  const tags = inquiry ? ["website-inquiry", "inquiry-blog"] : ["newsletter", `newsletter-${signup.where}`];

  try {
    const contact = await subscribeContact(
      {
        name: signup.name,
        email: signup.email,
        phone: signup.phone,
        companyName: signup.business,
        source: `Website ${inquiry ? "inquiry" : "newsletter"} (${signup.where}${signup.page ? `, ${signup.page}` : ""})`,
      },
      [...tags, ...(industryTag ? [industryTag] : [])],
    );
    if (signup.message) {
      await addNote(contact, `Website inquiry: ${signup.message}`).catch((error) => console.error("inquiry note not added:", error));
    }
    if (id) await markSubmission(id, "sent").catch(() => {});
    return Response.json({ ok: true });
  } catch (error) {
    console.error("form submission to GHL failed:", error);
    if (id) {
      await markSubmission(id, "failed").catch(() => {});
      // saved for the team to follow up from the admin, so the visitor is not asked to retry
      return Response.json({ ok: true });
    }
    return Response.json({ error: "That didn't go through. Please try again." }, { status: 502 });
  }
}
