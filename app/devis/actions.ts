"use server";

import { sendLead, type Lead, type LeadKind } from "@/lib/notify";
import { serverClient } from "@/lib/supabase-server";
import { FORMATION_TYPES, SECTORS } from "@/lib/products";

export type SubmitState =
  | { status: "idle" }
  | { status: "ok"; recorded: boolean; emailed: boolean }
  | { status: "error"; message: string };

function text(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Resolve select values back to their human labels for the email. */
function labelFor(list: { id: string; label: string }[], id: string): string | undefined {
  return list.find((x) => x.id === id)?.label;
}

/**
 * Receives a quote or training request and emails it to Ratel.
 *
 * Reachable by direct POST, so everything is validated here rather than trusting the
 * form. There is no authentication by design: this is a public contact form.
 */
export async function submitLead(_prev: SubmitState, form: FormData): Promise<SubmitState> {
  const kind: LeadKind = text(form, "objet") === "formation" ? "formation" : "devis";

  const nom = text(form, "nom");
  const telephone = text(form, "telephone");

  /* Mirrors the browser's required attributes. A direct POST bypasses those. */
  if (!nom) return { status: "error", message: "Merci d'indiquer votre nom ou votre société." };
  if (!telephone) return { status: "error", message: "Merci d'indiquer un numéro de téléphone." };
  if (kind === "formation" && !text(form, "adresse")) {
    return { status: "error", message: "Merci d'indiquer l'adresse du site à former." };
  }

  const secteurId = text(form, "secteur");
  const typeId = text(form, "typeFormation");

  const lead: Lead = {
    kind,
    nom,
    telephone,
    email: text(form, "email") || undefined,
    secteur: secteurId ? (labelFor(SECTORS, secteurId) ?? secteurId) : undefined,
    adresse: text(form, "adresse") || undefined,
    typeFormation: typeId ? (labelFor(FORMATION_TYPES, typeId) ?? typeId) : undefined,
    dateSouhaitee: text(form, "dateSouhaitee") || undefined,
    besoin: text(form, "besoin") || undefined,
  };

  /* Persisting comes first and matters most. An email can bounce, a key can expire,
     an inbox can be missed; a row in the database means the request is never lost and
     Ratel can work the backlog from the back-office. The notification is a
     convenience layered on top, not the system of record. */
  let recorded = false;
  const db = serverClient();
  if (db) {
    const { error } = await db.from("leads").insert({
      kind,
      name: lead.nom,
      phone: lead.telephone,
      email: lead.email ?? null,
      sector: lead.secteur ?? null,
      address_line: lead.adresse ?? null,
      training_type: lead.typeFormation ?? null,
      preferred_date: lead.dateSouhaitee || null,
      message: lead.besoin ?? null,
    });
    if (error) console.error("[lead] enregistrement échoué", error.message);
    else recorded = true;
  }

  const { sent, reason } = await sendLead(lead);
  if (!sent) console.warn(`[lead] mail non envoyé (${reason})`, { kind, nom });

  /* Only a total failure of both paths is worth telling the customer about: it is the
     one case where writing again, or calling, is genuinely necessary. */
  return { status: "ok", recorded, emailed: sent };
}
