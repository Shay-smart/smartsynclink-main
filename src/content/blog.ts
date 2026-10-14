// Shape + seed copy for the blog index and the single post page.
// Live content lives in Postgres (site_content.blog); this is the fallback the
// pages render when the row is missing or the DB is unreachable.
// No imports here on purpose — the seed script loads this file directly.

export const defaultBlog = {
  badge: "BLOGS",
  heading: "Ideas, Strategies & Insights To Help You Capture More Leads.",
  subheading:
    "Practical insights on AI, automation, lead generation, conversion funnels, websites, and follow-up strategies designed to help businesses turn more opportunities into customers.",

  /** Sits above the "All" pill; the rest of the row comes from post tags. */
  allLabel: "All",
  relatedLabel: "Related blog post",
  tocLabel: "Table of Contents",
  updatedLabel: "Updated:",
  readTimeLabel: "min read",

  /** Author byline. Posts have no author column, so one name covers the site. */
  byline: "admin",

  /** Posts per page on the listing. */
  perPage: 10,

  /** How many cards sit above the newsletter band. The rest follow below it. */
  beforeNewsletter: 4,

  /** Not a subscription: an inquiry, on the footer form's fields plus what they need. */
  newsletter: {
    heading: "Tell us what you need",
    body: "Leave your details and a line about your business, and we'll get back to you.",
    message: "What can we help you with?",
    cta: "Send My Request",
    success: "Thanks, we've got it. We'll be in touch shortly.",
    note: "By sending this, you agree to our",
    noteLink: { label: "Privacy Policy.", href: "/privacy-policy" },
    image: { src: "", alt: "" },
  },

  search: {
    placeholder: "Search",
  },
};

export type BlogContent = typeof defaultBlog;
