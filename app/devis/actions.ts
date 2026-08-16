"use server";

import { sendLead, type Lead, type LeadKind } from "@/lib/notify";
import { FORMATION_TYPES, SECTORS } from "@/lib/products";

export type SubmitState =
  | { status: "idle" }
  | { status: "ok"; delivered: boolean }
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

  const { sent, reason } = await sendLead(lead);

  if (!sent) {
    /* The submission is still acknowledged, but the confirmation screen must not
       claim a message reached anyone. The reason is logged for the developer, never
       shown to the customer. */
    console.warn(`[lead] non délivré (${reason})`, { kind, nom });
  }

  return { status: "ok", delivered: sent };
}
