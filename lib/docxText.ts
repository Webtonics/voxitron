import mammoth from "mammoth";

// Word files are read here in the app, not in n8n: n8n's Extract From File
// node handles PDF but not .docx, and the only n8n route was a paid
// converter (CloudConvert). app/api/knowledge-base/route.ts sends the text
// on to n8n as if it had been pasted.

const ENTITIES: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"' };

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

/**
 * Pulls readable text out of a .docx. Table rows stay on one line
 * ("Ankara | 4500"), so a price list keeps each item next to its price.
 */
export async function docxToText(buffer: Buffer): Promise<string> {
  const { value: html } = await mammoth.convertToHtml(
    { buffer },
    // Skip images: mammoth would otherwise inline each one as base64, only for it to be stripped.
    { convertImage: mammoth.images.imgElement(async () => ({ src: "" })) }
  );

  return (
    html
      // A cell can hold several paragraphs: join them so the row stays on one line.
      .replace(/<(t[dh])[^>]*>([\s\S]*?)<\/\1>/g, (_match, _tag, cell: string) =>
        `${stripTags(cell.replace(/<\/p>|<br\s*\/?>/g, " ")).trim()} | `
      )
      .replace(/ \| <\/tr>/g, "\n")
      .replace(/<li[^>]*>/g, "- ")
      .replace(/<(ul|ol)[^>]*>|<br\s*\/?>/g, "\n")
      .replace(/<\/(p|h[1-6]|li|table)>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&(amp|lt|gt|quot);/g, (entity) => ENTITIES[entity])
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}
