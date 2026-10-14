import { Card, Empty, PageHeader, Pill } from "@/components/admin/ui";
import { listSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

const FORM = { footer: "Footer newsletter", blog: "Blog inquiry" } as const;
const GHL = {
  sent: { tone: "good", label: "In GHL" },
  failed: { tone: "warn", label: "GHL failed" },
  off: { tone: "neutral", label: "GHL not connected" },
} as const;

function when(date: string) {
  return new Date(date).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default async function SubmissionsPage() {
  const submissions = await listSubmissions();

  return (
    <>
      <PageHeader
        title="Form submissions"
        subtitle="Everything sent from the website's forms, newest first. Each one also goes to GHL as a contact: the footer's tagged newsletter, the blog's tagged website-inquiry."
      />

      {submissions.length ? (
        <Card className="p-0">
          <ul className="divide-y divide-line">
            {submissions.map((s) => (
              <li key={s.id} className="px-6 py-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] text-[#1e1e1e]">
                      {s.name}
                      {s.business ? <span className="text-muted"> · {s.business}</span> : null}
                    </p>
                    <p className="mt-0.5 truncate text-[13px] text-muted">
                      {s.email}
                      {s.phone ? ` · ${s.phone}` : ""}
                      {s.industry ? ` · ${s.industry}` : ""}
                    </p>
                  </div>
                  <Pill tone="neutral">{FORM[s.form]}</Pill>
                  <Pill tone={GHL[s.ghl].tone}>{GHL[s.ghl].label}</Pill>
                  <span className="w-[120px] text-right text-[13px] text-muted">{when(s.createdAt)}</span>
                </div>
                {s.message ? <p className="mt-2 text-[14px] leading-relaxed text-[#1e1e1e]">{s.message}</p> : null}
                {s.page ? <p className="mt-1 text-[12px] text-muted">from {s.page}</p> : null}
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <Empty>No form submissions yet.</Empty>
      )}
    </>
  );
}
