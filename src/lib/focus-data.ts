export type AppUsage = {
  id: string;
  name: string;
  category: "social" | "video" | "productivity" | "messaging" | "news" | "other";
  emoji: string;
  minutesToday: number;
  limitMinutes: number;
  blocked?: boolean;
};

export const trackedApps: AppUsage[] = [
  { id: "ig", name: "Instagram", category: "social", emoji: "📷", minutesToday: 47, limitMinutes: 30, blocked: true },
  { id: "tt", name: "TikTok", category: "video", emoji: "🎵", minutesToday: 62, limitMinutes: 20, blocked: true },
  { id: "yt", name: "YouTube", category: "video", emoji: "▶️", minutesToday: 38, limitMinutes: 45 },
  { id: "x", name: "X", category: "social", emoji: "𝕏", minutesToday: 19, limitMinutes: 25, blocked: true },
  { id: "wa", name: "WhatsApp", category: "messaging", emoji: "💬", minutesToday: 22, limitMinutes: 60 },
  { id: "rd", name: "Reddit", category: "social", emoji: "👽", minutesToday: 14, limitMinutes: 20, blocked: true },
  { id: "nf", name: "Netflix", category: "video", emoji: "🎬", minutesToday: 0, limitMinutes: 60 },
  { id: "sp", name: "Spotify", category: "other", emoji: "🎧", minutesToday: 53, limitMinutes: 240 },
];

export const weekHistory = [
  { day: "Mon", screen: 312, focus: 45 },
  { day: "Tue", screen: 287, focus: 75 },
  { day: "Wed", screen: 245, focus: 90 },
  { day: "Thu", screen: 198, focus: 120 },
  { day: "Fri", screen: 276, focus: 60 },
  { day: "Sat", screen: 354, focus: 30 },
  { day: "Sun", screen: 221, focus: 105 },
];

export const categoryBreakdown = [
  { name: "Social", value: 142, color: "var(--chart-2)" },
  { name: "Video", value: 100, color: "var(--chart-1)" },
  { name: "Messaging", value: 22, color: "var(--chart-3)" },
  { name: "Music", value: 53, color: "var(--chart-4)" },
];

export const rewards = [
  { id: "tea", name: "Tea break", cost: 50, emoji: "🍵", desc: "Step away for 10 minutes, guilt-free" },
  { id: "ep", name: "One episode", cost: 120, emoji: "📺", desc: "Watch an episode without blocking" },
  { id: "scroll", name: "15 min scroll", cost: 80, emoji: "📱", desc: "Unlock a social app briefly" },
  { id: "walk", name: "Walk reward", cost: 40, emoji: "🚶", desc: "A reminder to stretch outside" },
  { id: "treat", name: "Small treat", cost: 200, emoji: "🍫", desc: "Whatever feels good today" },
  { id: "off", name: "Day off", cost: 500, emoji: "🌿", desc: "Skip a focus goal tomorrow" },
];

export const fmtMins = (m: number) => {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h ? `${h}h ${r}m` : `${r}m`;
};
