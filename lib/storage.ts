const RELICS_KEY = "hsr_relics";
const NEXT_ID_KEY = "hsr_next_relic_id";

export interface RelicData {
  setId: number;
  name: string;
  character: string;
  hatStats: StatBlock | null;
  gloveStats: StatBlock | null;
  shoesStats: StatBlock | null;
  bodyStats: StatBlock | null;
  sphereStats: StatBlock | null;
  ropeStats: StatBlock | null;
}

export interface StatBlock {
  mainS: string | null;
  sub1: string | null;
  sub2: string | null;
  sub3: string | null;
  sub4: string | null;
}

function getNextId(): number {
  const current = parseInt(localStorage.getItem(NEXT_ID_KEY) || "0", 10);
  const next = current + 1;
  localStorage.setItem(NEXT_ID_KEY, String(next));
  return next;
}

export function getAllRelics(): RelicData[] {
  const raw = localStorage.getItem(RELICS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getCharacters(): { char: string }[] {
  const relics = getAllRelics();
  const seen = new Set<string>();
  const chars: { char: string }[] = [];
  for (const relic of relics) {
    if (relic.character && !seen.has(relic.character)) {
      seen.add(relic.character);
      chars.push({ char: relic.character });
    }
  }
  return chars;
}

export function saveRelic(relic: Omit<RelicData, "setId">): RelicData {
  const relics = getAllRelics();
  const newRelic: RelicData = { ...relic, setId: getNextId() };
  relics.push(newRelic);
  localStorage.setItem(RELICS_KEY, JSON.stringify(relics));
  return newRelic;
}

export function updateRelic(updated: RelicData): boolean {
  const relics = getAllRelics();
  const index = relics.findIndex((r) => r.setId === updated.setId);
  if (index === -1) return false;
  relics[index] = updated;
  localStorage.setItem(RELICS_KEY, JSON.stringify(relics));
  return true;
}

export function deleteRelicById(setId: number): boolean {
  const relics = getAllRelics();
  const filtered = relics.filter((r) => r.setId !== setId);
  if (filtered.length === relics.length) return false;
  localStorage.setItem(RELICS_KEY, JSON.stringify(filtered));
  return true;
}

export interface ExportPayload {
  version: 1;
  exportedAt: string;
  relics: RelicData[];
}

export function exportData(): ExportPayload {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    relics: getAllRelics(),
  };
}

export function importData(payload: ExportPayload): { count: number } {
  if (!payload || payload.version !== 1 || !Array.isArray(payload.relics)) {
    throw new Error("Invalid import file format.");
  }

  const maxId = payload.relics.reduce(
    (max, r) => Math.max(max, r.setId ?? 0),
    0,
  );
  localStorage.setItem(RELICS_KEY, JSON.stringify(payload.relics));
  localStorage.setItem(NEXT_ID_KEY, String(maxId));
  return { count: payload.relics.length };
}

export function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
