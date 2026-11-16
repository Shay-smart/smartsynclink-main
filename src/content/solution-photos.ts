/**
 * The photo under each /solutions card, used whenever the card's own image
 * slot is empty. An image uploaded in the builder still wins.
 *
 * Keyed by the card's page slug (the last part of its href), because the cards
 * live in the database as one array and fill() never merges arrays, so a code
 * default on the card itself would never reach the live page.
 *
 * All Higgsfield (Seedream 5.0 Pro) shots from one brief: candid daylight,
 * no faces toward camera, phone and laptop screens as plain shapes only.
 */
export const solutionPhotos: Record<string, { src: string; alt: string }> = {
  "ai-voice-agent": {
    src: "/images/solutions/ai-voice-agent.webp",
    alt: "A phone ringing on an empty spa front desk after closing time",
  },
  "ai-conversation-assistant": {
    src: "/images/solutions/ai-conversation-assistant.webp",
    alt: "A customer on her sofa texting back and forth with a business",
  },
  "expert-ai": {
    src: "/images/solutions/expert-ai.webp",
    alt: "A shop owner working through his service notes at his desk",
  },
  "website-chat-widget": {
    src: "/images/solutions/website-chat-widget.webp",
    alt: "A homeowner chatting with a business from its website",
  },
  "unified-inbox": {
    src: "/images/solutions/unified-inbox.webp",
    alt: "A front-desk coordinator answering messages on her laptop",
  },
  "google-business-profile": {
    src: "/images/solutions/google-business-profile.webp",
    alt: "Finding a local shop on a phone map, right outside its door",
  },
  "missed-call-text-back": {
    src: "/images/solutions/missed-call-text-back.webp",
    alt: "A stylist mid blow-dry while her phone lights up with a text",
  },
  "google-review-automation": {
    src: "/images/solutions/google-review-automation.webp",
    alt: "A happy customer leaving a five-star review at checkout",
  },
  "smart-website": {
    src: "/images/solutions/smart-website.webp",
    alt: "The same website open on a laptop and a phone",
  },
  "automation-workflows": {
    src: "/images/solutions/automation-workflows.webp",
    alt: "An owner with his morning coffee while the follow-ups run on their own",
  },
  "sales-pipeline-crm": {
    src: "/images/solutions/sales-pipeline-crm.webp",
    alt: "Two agents checking their sales pipeline on the office screen",
  },
};

export function solutionPhoto(card: { href?: string; image: { src: string; alt: string } }) {
  if (card.image?.src) return card.image;
  const slug = card.href?.split("/").filter(Boolean).pop() ?? "";
  return solutionPhotos[slug] ?? card.image;
}
