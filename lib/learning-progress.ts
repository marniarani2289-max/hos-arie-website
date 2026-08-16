"use client";

export type LearningProgressData = Record<string, unknown>;

export async function saveModuleProgress(
  storageKey: string,
  moduleNumber: number,
  data: LearningProgressData,
) {
  localStorage.setItem(storageKey, JSON.stringify(data));

  const countWords = (value: unknown) =>
    typeof value === "string" && value.trim()
      ? value.trim().split(/\s+/).length
      : 0;
  const cloudData = {
    readingDone: data.readingDone,
    analysisDone: data.analysisDone,
    podcastDone: data.podcastDone,
    score: data.score,
    reflectionWords: countWords(data.reflection),
    essayWords: countWords(data.essay),
  };

  try {
    const response = await fetch("/api/progress/sync", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ modules: [{ moduleNumber, data: cloudData }] }),
    });

    return response.ok;
  } catch {
    // The browser copy remains available and ProgressSync retries later.
    return false;
  }
}
