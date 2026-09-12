type ReplyTimeMessage = {
  conversation_id: string;
  direction: "inbound" | "outbound";
  sent_at: string;
};

/**
 * Pairs each inbound message with the next outbound message in the same
 * conversation and averages the gap, in seconds. Returns null when there
 * are no such pairs yet (nothing to report, not a zero reply time).
 */
export function computeAverageReplyTimeSeconds(
  messages: ReplyTimeMessage[]
): number | null {
  const byConversation = new Map<string, ReplyTimeMessage[]>();
  for (const message of messages) {
    const list = byConversation.get(message.conversation_id);
    if (list) {
      list.push(message);
    } else {
      byConversation.set(message.conversation_id, [message]);
    }
  }

  const deltas: number[] = [];

  for (const list of byConversation.values()) {
    const sorted = [...list].sort(
      (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
    );

    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      if (current.direction === "inbound" && next.direction === "outbound") {
        const deltaSeconds =
          (new Date(next.sent_at).getTime() - new Date(current.sent_at).getTime()) / 1000;
        if (deltaSeconds >= 0) {
          deltas.push(deltaSeconds);
        }
      }
    }
  }

  if (deltas.length === 0) {
    return null;
  }

  return deltas.reduce((sum, d) => sum + d, 0) / deltas.length;
}

/**
 * Median first-reply time in seconds across the given conversations. Median
 * resists a single slow outlier better than a mean, which is why Overview
 * uses this instead of computeAverageReplyTimeSeconds for its hero metric.
 * Returns null when there's nothing to report yet, not a zero.
 */
export function computeMedianReplyTimeSeconds(firstReplySeconds: (number | null)[]): number | null {
  const values = firstReplySeconds.filter((v): v is number => v !== null).sort((a, b) => a - b);
  if (values.length === 0) return null;

  const mid = Math.floor(values.length / 2);
  return values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
}

export function formatReplyTimeMono(seconds: number): string {
  const totalSeconds = Math.round(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}
