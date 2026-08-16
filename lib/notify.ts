/**
 * Sends the site's form submissions to Ratel by email.
 *
 * Deliberately dependency-free: a direct fetch to Resend's REST API rather than an
 * SDK, so the project gains no package for one HTTP call.
 *
 * Behaviour without configuration is the important part. When RESEND_API_KEY or
 * RATEL_NOTIFY_TO is absent the call does not throw and does not pretend to have
 * sent anything: it returns { sent: false, reason } and the caller tells the
 * customer the truth. The site currently runs with no key at all, and a form that
 * silently swallows a lead is exactly the defect this replaces.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type NotifyResult = { sent: boolean; reason?: string };

export type LeadKind = "devis" | "formation";

export type Lead = {
  kind: LeadKind;
  nom: string;
  telephone: string;
  email?: string;
  secteur?: string;
  adresse?: string;
  typeFormation?: string;
  dateSouhaitee?: string;
  besoin?: string;
};

const LABELS: Record<LeadKind, string> = {
  devis: "Demande de devis",
  formation: "Réservation de formation",
};

function line(label: string, value?: string): string {
  return value && value.trim() ? `<tr><td style="padding:4px 12px 4px 0;color:#6b625a">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>` : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLead(lead: Lead): Promise<NotifyResult> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RATEL_NOTIFY_TO;
  const from = process.env.RATEL_NOTIFY_FROM ?? "Site Ratel <onboarding@resend.dev>";

  if (!key) return { sent: false, reason: "RESEND_API_KEY absent" };
  if (!to) return { sent: false, reason: "RATEL_NOTIFY_TO absent" };

  const title = LABELS[lead.kind];
  const html = `
    <div style="font-family:system-ui,sans-serif;color:#16110d">
      <h2 style="color:#c11620;margin:0 0 12px">${title}</h2>
      <table style="border-collapse:collapse;font-size:14px">
        ${line("Nom / Société", lead.nom)}
        ${line("Téléphone", lead.telephone)}
        ${line("Email", lead.email)}
        ${line("Secteur", lead.secteur)}
        ${line("Adresse", lead.adresse)}
        ${line("Type de formation", lead.typeFormation)}
        ${line("Date souhaitée", lead.dateSouhaitee)}
      </table>
      ${lead.besoin?.trim() ? `<p style="margin:16px 0 4px;color:#6b625a;font-size:14px">Besoin</p><p style="margin:0;font-size:14px;white-space:pre-wrap">${escapeHtml(lead.besoin)}</p>` : ""}
    </div>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((a) => a.trim()),
        /* Replying to the notification reaches the customer directly. */
        reply_to: lead.email || undefined,
        subject: `${title} — ${lead.nom}`,
        html,
      }),
    });
    if (!res.ok) return { sent: false, reason: `Resend ${res.status}` };
    return { sent: true };
  } catch {
    /* Network failures must never surface as a crash on a marketing form. */
    return { sent: false, reason: "réseau" };
  }
}
