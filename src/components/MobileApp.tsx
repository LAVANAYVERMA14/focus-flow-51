import { useEffect, useMemo, useState } from "react";
import { Home, Timer, BarChart3, Gift, Sparkles, Play, Pause, RotateCcw, Lock, Check, Flame, Leaf } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, PieChart, Pie } from "recharts";
import { trackedApps, weekHistory, categoryBreakdown, rewards, fmtMins } from "@/lib/focus-data";
import { useFocusStore } from "@/lib/focus-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Tab = "home" | "focus" | "stats" | "rewards";

export default function MobileApp() {
  const [tab, setTab] = useState<Tab>("home");
  return (
    <div className="min-h-screen w-full bg-canvas text-foreground">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Desktop frame */}
      <div className="mx-auto flex min-h-screen max-w-[440px] flex-col bg-background shadow-[0_30px_80px_-30px_rgba(40,30,20,0.25)] md:my-6 md:min-h-[calc(100vh-3rem)] md:rounded-[36px] md:border md:border-border">
        <div className="flex-1 overflow-hidden pb-24">
          {tab === "home" && <HomeScreen onStartFocus={() => setTab("focus")} />}
          {tab === "focus" && <FocusScreen />}
          {tab === "stats" && <StatsScreen />}
          {tab === "rewards" && <RewardsScreen />}
        </div>
        <BottomNav tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}

/* ---------- HOME ---------- */
function HomeScreen({ onStartFocus }: { onStartFocus: () => void }) {
  const { state } = useFocusStore();
  const totalToday = trackedApps.reduce((s, a) => s + a.minutesToday, 0);
  const dailyGoal = 180;
  const pct = Math.min(100, Math.round((totalToday / dailyGoal) * 100));
  const overLimit = trackedApps.filter((a) => a.minutesToday > a.limitMinutes);

  return (
    <ScrollView>
      <Header
        eyebrow="Friday, June 12"
        title="Good evening"
        sub="A quiet hour ahead is enough."
      />

      {/* Hero stat */}
      <div className="mx-5 mt-6 rounded-3xl bg-primary p-6 text-primary-foreground">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] opacity-70">Screen time today</p>
            <p className="mt-2 font-display text-5xl">{fmtMins(totalToday)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] opacity-70">Goal</p>
            <p className="mt-2 font-display text-2xl">{fmtMins(dailyGoal)}</p>
          </div>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-primary-foreground/15">
          <div
            className={cn("h-full rounded-full transition-all", pct > 100 ? "bg-clay" : "bg-sage")}
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs opacity-80">
          <span>{pct}% of daily limit</span>
          <span>{overLimit.length} apps over limit</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mx-5 mt-4 grid grid-cols-3 gap-3">
        <StatCard icon={<Sparkles className="size-4" />} label="Points" value={state.points} />
        <StatCard icon={<Flame className="size-4" />} label="Streak" value={`${state.streak}d`} />
        <StatCard icon={<Leaf className="size-4" />} label="Focus" value={fmtMins(state.totalFocusMinutes)} />
      </div>

      {/* Start focus CTA */}
      <button
        onClick={onStartFocus}
        className="mx-5 mt-5 flex w-[calc(100%-2.5rem)] items-center justify-between rounded-2xl border border-border bg-card p-5 text-left transition hover:bg-secondary"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Ready?</p>
          <p className="mt-1 font-display text-2xl">Start a focus session</p>
          <p className="mt-1 text-sm text-muted-foreground">Distractions paused. Points earned.</p>
        </div>
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Play className="size-5 fill-current" />
        </div>
      </button>

      {/* Apps over limit */}
      <SectionTitle>Watching today</SectionTitle>
      <div className="mx-5 space-y-2">
        {trackedApps.slice(0, 5).map((a) => {
          const over = a.minutesToday > a.limitMinutes;
          const pct = Math.min(100, (a.minutesToday / a.limitMinutes) * 100);
          return (
            <div key={a.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-lg">
                  {a.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-medium">{a.name}</p>
                    <p className={cn("text-sm tabular-nums", over ? "text-clay-foreground" : "text-muted-foreground")}>
                      {fmtMins(a.minutesToday)} / {fmtMins(a.limitMinutes)}
                    </p>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", over ? "bg-clay" : "bg-sage")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                {a.blocked && <Lock className="size-4 shrink-0 text-muted-foreground" />}
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-6" />
    </ScrollView>
  );
}

/* ---------- FOCUS ---------- */
const PRESETS = [
  { label: "25 min", value: 25 },
  { label: "50 min", value: 50 },
  { label: "90 min", value: 90 },
];

function FocusScreen() {
  const [duration, setDuration] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const { completeSession } = useFocusStore();

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          setRunning(false);
          const earned = completeSession(duration);
          toast.success(`Session complete · +${earned} points`, {
            description: "Nicely done. Take a breath.",
          });
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, duration, completeSession]);

  const pct = ((duration * 60 - remaining) / (duration * 60)) * 100;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  const reset = (d = duration) => {
    setDuration(d);
    setRemaining(d * 60);
    setRunning(false);
  };

  const blocked = trackedApps.filter((a) => a.blocked);

  return (
    <ScrollView>
      <Header eyebrow="Focus" title="One thing at a time" sub="The timer holds you; the apps wait." />

      {/* Ring */}
      <div className="relative mx-auto mt-10 grid size-72 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90">
          <circle cx="50" cy="50" r="46" stroke="var(--color-muted)" strokeWidth="2" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 289} 289`}
            className="transition-[stroke-dasharray] duration-1000 ease-linear"
          />
        </svg>
        <div className="text-center">
          <p className="font-display text-6xl tabular-nums">{mm}:{ss}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {running ? "in session" : remaining === 0 ? "complete" : "ready"}
          </p>
        </div>
      </div>

      {/* Presets */}
      <div className="mx-5 mt-8 flex justify-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => reset(p.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition",
              duration === p.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="mx-5 mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="grid size-14 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:bg-secondary"
        >
          <RotateCcw className="size-5" />
        </button>
        <button
          onClick={() => setRunning((r) => !r)}
          className="grid h-16 w-44 place-items-center rounded-full bg-primary text-primary-foreground transition active:scale-[0.98]"
        >
          {running ? (
            <span className="flex items-center gap-2 font-medium">
              <Pause className="size-5 fill-current" /> Pause
            </span>
          ) : (
            <span className="flex items-center gap-2 font-medium">
              <Play className="size-5 fill-current" /> {remaining === 0 ? "Restart" : "Begin"}
            </span>
          )}
        </button>
      </div>

      <SectionTitle>Blocked during focus</SectionTitle>
      <div className="mx-5 grid grid-cols-4 gap-3">
        {blocked.map((a) => (
          <div key={a.id} className="flex flex-col items-center gap-2">
            <div className="relative grid size-14 place-items-center rounded-2xl bg-secondary text-2xl">
              {a.emoji}
              <div className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                <Lock className="size-3" />
              </div>
            </div>
            <p className="truncate text-xs text-muted-foreground">{a.name}</p>
          </div>
        ))}
      </div>
      <p className="mx-5 mt-4 text-center text-xs text-muted-foreground">
        Earn <span className="text-foreground">{duration * 2} points</span> when this session completes.
      </p>
      <div className="h-6" />
    </ScrollView>
  );
}

/* ---------- STATS ---------- */
function StatsScreen() {
  const totalWeek = useMemo(() => weekHistory.reduce((s, d) => s + d.screen, 0), []);
  const focusWeek = useMemo(() => weekHistory.reduce((s, d) => s + d.focus, 0), []);

  return (
    <ScrollView>
      <Header eyebrow="This week" title="Quiet progress" sub="Small drops, calmer days." />

      <div className="mx-5 mt-6 grid grid-cols-2 gap-3">
        <BigStat label="Screen time" value={fmtMins(Math.round(totalWeek / 7))} sub="daily avg" />
        <BigStat label="Focus time" value={fmtMins(focusWeek)} sub="this week" tone="sage" />
      </div>

      {/* Bar chart */}
      <div className="mx-5 mt-4 rounded-3xl border border-border bg-card p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-lg">Daily screen time</p>
          <p className="text-xs text-muted-foreground">minutes</p>
        </div>
        <div className="mt-4 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekHistory} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <Tooltip
                cursor={{ fill: "var(--color-muted)" }}
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="screen" radius={[8, 8, 4, 4]} fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Focus area chart */}
      <div className="mx-5 mt-4 rounded-3xl border border-border bg-card p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-lg">Focus minutes</p>
          <p className="text-xs text-muted-foreground">trend</p>
        </div>
        <div className="mt-4 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weekHistory} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-sage)" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="var(--color-sage)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="focus" stroke="var(--color-sage-foreground)" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categories */}
      <div className="mx-5 mt-4 rounded-3xl border border-border bg-card p-5">
        <p className="font-display text-lg">Where the day went</p>
        <div className="mt-3 flex items-center gap-4">
          <div className="size-32 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="value" innerRadius={36} outerRadius={56} stroke="none">
                  {categoryBreakdown.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            {categoryBreakdown.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-sm">
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                <span className="min-w-0 flex-1 truncate text-muted-foreground">{c.name}</span>
                <span className="tabular-nums">{fmtMins(c.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionTitle>Insights</SectionTitle>
      <div className="mx-5 space-y-2">
        <Insight tone="sage" text="Your screen time dropped 23% mid-week. Whatever you did Thursday — repeat it." />
        <Insight tone="clay" text="TikTok consistently runs 3× over its limit. Want to lower the daily cap?" />
        <Insight text="Best focus window: 9–11am. Most sessions you completed started here." />
      </div>
      <div className="h-6" />
    </ScrollView>
  );
}

/* ---------- REWARDS ---------- */
function RewardsScreen() {
  const { state, spendPoints } = useFocusStore();
  const [redeemed, setRedeemed] = useState<string[]>([]);

  const claim = (id: string, cost: number, name: string) => {
    if (spendPoints(cost)) {
      setRedeemed((r) => [...r, id]);
      toast.success(`${name} claimed`, { description: "Enjoy it. You earned it." });
    } else {
      toast.error("Not enough points yet", { description: "Stack a few more focus sessions." });
    }
  };

  return (
    <ScrollView>
      <Header eyebrow="Rewards" title="A gentle economy" sub="Trade focus for things that feel good." />

      <div className="mx-5 mt-6 rounded-3xl bg-clay p-6 text-clay-foreground">
        <p className="text-xs uppercase tracking-[0.18em] opacity-70">Balance</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="font-display text-5xl">{state.points}</p>
          <p className="text-sm opacity-70">points</p>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1"><Flame className="size-4" /> {state.streak}-day streak</span>
          <span className="flex items-center gap-1"><Check className="size-4" /> {state.sessionsCompleted} sessions</span>
        </div>
      </div>

      <SectionTitle>Available</SectionTitle>
      <div className="mx-5 grid grid-cols-2 gap-3">
        {rewards.map((r) => {
          const claimed = redeemed.includes(r.id);
          const afford = state.points >= r.cost;
          return (
            <button
              key={r.id}
              disabled={claimed}
              onClick={() => claim(r.id, r.cost, r.name)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-2xl border bg-card p-4 text-left transition",
                claimed ? "opacity-50" : afford ? "border-border hover:bg-secondary" : "border-border",
              )}
            >
              <div className="text-3xl">{r.emoji}</div>
              <p className="font-medium leading-tight">{r.name}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">{r.desc}</p>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Sparkles className={cn("size-3", afford ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("tabular-nums", afford ? "text-foreground" : "text-muted-foreground")}>
                  {claimed ? "Claimed" : `${r.cost} pts`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="h-6" />
    </ScrollView>
  );
}

/* ---------- shared ---------- */
function ScrollView({ children }: { children: React.ReactNode }) {
  return <div className="h-full overflow-y-auto">{children}</div>;
}

function Header({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="px-5 pt-10">
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight">{title}</h1>
      {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-5 mb-3 mt-7 text-xs uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </p>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">{icon} <span>{label}</span></div>
      <p className="mt-2 font-display text-xl">{value}</p>
    </div>
  );
}

function BigStat({ label, value, sub, tone }: { label: string; value: string; sub: string; tone?: "sage" }) {
  return (
    <div className={cn("rounded-3xl border p-5", tone === "sage" ? "border-transparent bg-sage text-sage-foreground" : "border-border bg-card")}>
      <p className="text-xs uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      <p className="mt-1 text-xs opacity-70">{sub}</p>
    </div>
  );
}

function Insight({ text, tone }: { text: string; tone?: "sage" | "clay" }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 text-sm leading-relaxed",
        tone === "sage" && "border-transparent bg-sage text-sage-foreground",
        tone === "clay" && "border-transparent bg-clay text-clay-foreground",
        !tone && "border-border bg-card text-foreground",
      )}
    >
      {text}
    </div>
  );
}

function BottomNav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Today", icon: <Home className="size-5" /> },
    { id: "focus", label: "Focus", icon: <Timer className="size-5" /> },
    { id: "stats", label: "Stats", icon: <BarChart3 className="size-5" /> },
    { id: "rewards", label: "Rewards", icon: <Gift className="size-5" /> },
  ];
  return (
    <div className="absolute bottom-0 left-1/2 w-full max-w-[440px] -translate-x-1/2 px-4 pb-4 md:bottom-6">
      <div className="flex items-center justify-around rounded-full border border-border bg-card/95 px-2 py-2 shadow-[0_10px_30px_-10px_rgba(40,30,20,0.15)] backdrop-blur">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setTab(it.id)}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-[10px] font-medium uppercase tracking-wider transition",
              tab === it.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "grid size-9 place-items-center rounded-full transition",
                tab === it.id ? "bg-primary text-primary-foreground" : "bg-transparent",
              )}
            >
              {it.icon}
            </span>
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}
