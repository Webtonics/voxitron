import { BlockError, type Connection, type CrmProvider } from "@/lib/blocks/types";

const API = "https://api.hubapi.com/crm/v3/objects";
// HubSpot's own id for "this note belongs to this contact".
const NOTE_TO_CONTACT_ASSOCIATION = 202;

function hubspotFetch({ secret }: Connection, path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
  });
}

async function failure(response: Response, doing: string): Promise<BlockError> {
  if (response.status === 401) {
    return new BlockError("HubSpot rejected the access token. Create a new one and enter it on the Build screen.");
  }
  if (response.status === 403) {
    return new BlockError("That HubSpot app is missing permissions. Give it crm.objects.contacts read and write.");
  }
  console.error(`HubSpot failed while ${doing}:`, response.status, await response.text());
  return new BlockError(`HubSpot didn't answer while ${doing}. Try again in a moment.`);
}

export const hubspotCrm: CrmProvider = {
  id: "hubspot",
  block: "crm",
  label: "HubSpot (free CRM)",
  fields: [
    {
      key: "token",
      label: "Private app access token",
      hint: "HubSpot: Settings, Integrations, Private apps. Scopes: crm.objects.contacts read and write",
      placeholder: "pat-eu1-...",
      secret: true,
    },
  ],

  parseConfig() {
    return {};
  },

  async check(connection) {
    if (!connection.secret) throw new BlockError("A HubSpot access token is required.");
    const response = await hubspotFetch(connection, "/contacts?limit=1");
    if (!response.ok) throw await failure(response, "checking the connection");
  },

  async saveContact(connection, contact) {
    const [firstName, ...otherNames] = contact.name.trim().split(/\s+/).filter(Boolean);
    const properties: Record<string, string> = { phone: contact.phone };
    if (firstName) properties.firstname = firstName;
    if (otherNames.length > 0) properties.lastname = otherNames.join(" ");
    if (contact.email.trim()) properties.email = contact.email.trim();

    // HubSpot doesn't treat a phone number as unique, so look before creating,
    // or the same customer becomes a new contact every time they message.
    const search = await hubspotFetch(connection, "/contacts/search", {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: "phone", operator: "EQ", value: contact.phone }] }],
        limit: 1,
      }),
    });
    if (!search.ok) throw await failure(search, "looking up the contact");
    const found: { results?: { id: string }[] } = await search.json();
    const existingId = found.results?.[0]?.id;

    const saved = await hubspotFetch(connection, existingId ? `/contacts/${existingId}` : "/contacts", {
      method: existingId ? "PATCH" : "POST",
      body: JSON.stringify({ properties }),
    });
    if (!saved.ok) throw await failure(saved, "saving the contact");
    const { id }: { id: string } = await saved.json();

    if (contact.note.trim()) {
      const note = await hubspotFetch(connection, "/notes", {
        method: "POST",
        body: JSON.stringify({
          properties: { hs_timestamp: new Date().toISOString(), hs_note_body: contact.note.trim() },
          associations: [
            {
              to: { id },
              types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: NOTE_TO_CONTACT_ASSOCIATION }],
            },
          ],
        }),
      });
      if (!note.ok) throw await failure(note, "saving the note");
    }

    return existingId ? "Contact updated." : "Contact saved.";
  },
};
