import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { PhoneFrame } from "./SceneIntro";

export const SceneRewards: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textX = interpolate(frame, [0, 18], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const phoneOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phoneY = interpolate(frame, [10, 30], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const rewardsOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const rewards = [
    { emoji: "🍵", name: "Tea break", cost: 50, desc: "Step away for 10 minutes" },
    { emoji: "📺", name: "One episode", cost: 120, desc: "Watch an episode freely" },
    { emoji: "📱", name: "15 min scroll", cost: 80, desc: "Unlock a social app briefly" },
    { emoji: "🍫", name: "Small treat", cost: 200, desc: "Whatever feels good today" },
  ];

  return (
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 80 }}>
      {/* Left: Text */}
      <div style={{ width: 480, opacity: textOpacity, transform: `translateX(${textX}px)` }}>
        <p
          style={{
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#6B8F71",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Rewards
        </p>
        <h2
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 52,
            fontWeight: 500,
            color: "#2D2926",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          A gentle economy
        </h2>
        <p
          style={{
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontSize: 20,
            color: "#6B6560",
            lineHeight: 1.6,
            marginTop: 20,
          }}
        >
          Trade focus minutes for rewards that feel good. Tea breaks, walks, treats — no guilt, just earned rest.
        </p>

        <div style={{ marginTop: 32, display: "flex", gap: 20 }}>
          <BigStat label="240" sub="Points balance" color="#C4956A" />
          <BigStat label="4d" sub="Current streak" color="#6B8F71" />
          <BigStat label="12" sub="Sessions done" />
        </div>
      </div>

      {/* Right: Phone */}
      <div style={{ opacity: phoneOpacity, transform: `translateY(${phoneY}px)` }}>
        <PhoneFrame>
          <div style={{ padding: "16px 12px", height: "100%", overflow: "hidden" }}>
            <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9A948E", marginBottom: 2 }}>Rewards</p>
            <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, color: "#2D2926", margin: "0 0 10px" }}>A gentle economy</p>

            {/* Balance card */}
            <div style={{ borderRadius: 18, background: "#C4956A", padding: 14, color: "white", marginBottom: 10 }}>
              <p style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.7, margin: 0 }}>Balance</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, margin: 0 }}>240</p>
                <p style={{ fontSize: 11, opacity: 0.7, margin: 0 }}>points</p>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 10 }}>
                <span>🔥 4-day streak</span>
                <span>✓ 12 sessions</span>
              </div>
            </div>

            {/* Rewards grid */}
            <div style={{ opacity: rewardsOpacity }}>
              <p style={{ fontSize: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#9A948E", marginBottom: 6 }}>Available</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {rewards.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 12,
                      background: "#FAF8F4",
                      border: "1px solid #E8E3D8",
                      padding: 10,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{r.emoji}</span>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#2D2926", margin: "4px 0 0" }}>{r.name}</p>
                    <p style={{ fontSize: 9, color: "#9A948E", margin: "2px 0 0" }}>{r.desc}</p>
                    <p style={{ fontSize: 10, color: "#6B8F71", fontWeight: 600, marginTop: 4 }}>{r.cost} pts</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};

const BigStat: React.FC<{ label: string; sub: string; color?: string }> = ({ label, sub, color }) => (
  <div>
    <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, fontWeight: 500, color: color || "#2D2926", margin: 0 }}>{label}</p>
    <p style={{ fontSize: 14, color: "#9A948E", marginTop: 4 }}>{sub}</p>
  </div>
);
