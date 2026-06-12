import { useEffect, useState } from "react";

type State = {
  points: number;
  streak: number;
  sessionsCompleted: number;
  totalFocusMinutes: number;
  lastSessionAt: number | null;
};

const KEY = "bepresent.state.v1";
const DEFAULT: State = {
  points: 240,
  streak: 4,
  sessionsCompleted: 12,
  totalFocusMinutes: 525,
  lastSessionAt: null,
};

function read(): State {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

function write(s: State) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("bepresent:update"));
}

export function useFocusStore() {
  const [state, setState] = useState<State>(DEFAULT);

  useEffect(() => {
    setState(read());
    const h = () => setState(read());
    window.addEventListener("bepresent:update", h);
    return () => window.removeEventListener("bepresent:update", h);
  }, []);

  const update = (patch: Partial<State>) => {
    const next = { ...read(), ...patch };
    write(next);
    setState(next);
  };

  const completeSession = (minutes: number) => {
    const s = read();
    const earned = Math.round(minutes * 2);
    write({
      ...s,
      points: s.points + earned,
      sessionsCompleted: s.sessionsCompleted + 1,
      totalFocusMinutes: s.totalFocusMinutes + minutes,
      streak: s.streak + (s.lastSessionAt && Date.now() - s.lastSessionAt < 36 * 3600 * 1000 ? 0 : 1),
      lastSessionAt: Date.now(),
    });
    return earned;
  };

  const spendPoints = (cost: number) => {
    const s = read();
    if (s.points < cost) return false;
    write({ ...s, points: s.points - cost });
    return true;
  };

  return { state, update, completeSession, spendPoints };
}
