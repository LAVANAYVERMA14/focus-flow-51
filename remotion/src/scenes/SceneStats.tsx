import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { PhoneFrame } from "./SceneIntro";

export const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textX = interpolate(frame, [0, 18], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const phoneOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phoneY = interpolate(frame, [10, 30], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const bar1H = interpolate(frame, [35, 55], [0, 65], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar2H = interpolate(frame, [40, 60], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar3H = interpolate(frame, [45, 65], [0, 50], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar4H = interpolate(frame, [50, 70], [0, 42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar5H = interpolate(frame, [55, 75], [0, 72], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar6H = interpolate(frame, [60, 80], [0, 92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar7H = interpolate(frame, [65, 85], [0, 58], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const pieReveal = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const insightsOpacity = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const bars = [bar1H, bar2H, bar3H, bar4H, bar5H, bar6H, bar7H];

  return (
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 80 }}>
      {/* Left: Phone with charts */}
      <div style={{ opacity: phoneOpacity, transform: `translateY(${phoneY}px)` }}>
        <PhoneFrame>
          <div style={{ padding: "16px 12px", height: "100%", overflow: "hidden" }}>
            <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9A948E", marginBottom: 2 }}>This week</p>
            <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, color: "#2D2926", margin: "0 0 12px" }}>Quiet progress</p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <div style={{ flex: 1, borderRadius: 12, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10 }}>
                <p style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9A948E", margin: 0 }}>Screen time</p>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, color: "#2D2926", margin: "4px 0 0" }}>5h 12m</p>
                <p style={{ fontSize: 8, color: "#9A948E", marginTop: 2 }}>daily avg</p>
              </div>
              <div style={{ flex: 1, borderRadius: 12, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10 }}>
                <p style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9A948E", margin: 0 }}>Focus time</p>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, color: "#6B8F71", margin: "4px 0 0" }}>8h 15m</p>
                <p style={{ fontSize: 8, color: "#9A948E", marginTop: 2 }}>this week</p>
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ borderRadius: 16, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 12, marginBottom: 8 }}>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 13, color: "#2D2926", margin: "0 0 8px" }}>Daily screen time</p>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 80, gap: 6 }}>
                {bars.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div
                      style={{
                        width: "100%",
                        height: `${h}%`,
                        borderRadius: "6px 6px 2px 2px",
                        background: i === 3 ? "#6B8F71" : "#D5CFC7",
                        transition: "none",
                      }}
                    />
                    <span style={{ fontSize: 7, color: "#9A948E" }}>{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie chart */}
            <div style={{ opacity: pieReveal, borderRadius: 16, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10, display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="60" height="60" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E8E3D8" strokeWidth="20" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#6B8F71" strokeWidth="20" strokeDasharray={`${75 * 2.51} ${251 - 75 * 2.51}`} strokeDashoffset={-62.8} transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#C4956A" strokeWidth="20" strokeDasharray={`${50 * 2.51} ${251 - 50 * 2.51}`} strokeDashoffset={-125.6 - 62.8} transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#8BA8C4" strokeWidth="20" strokeDasharray={`${30 * 2.51} ${251 - 30 * 2.51}`} strokeDashoffset={-125.6 - 125.6 - 62.8} transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D4C4A0" strokeWidth="20" strokeDasharray={`${45 * 2.51} ${251 - 45 * 2.51}`} strokeDashoffset={-125.6 - 125.6 - 75.3 - 62.8} transform="rotate(-90 50 50)" />
              </svg>
              <div style={{ flex: 1 }}>
                <LegendItem color="#6B8F71" label="Social" value="142m" />
                <LegendItem color="#C4956A" label="Video" value="100m" />
                <LegendItem color="#8BA8C4" label="Messaging" value="22m" />
                <LegendItem color="#D4C4A0" label="Music" value="53m" />
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>

      {/* Right: Text */}
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
          Insights
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
          See your patterns clearly
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
          Weekly bar charts, focus trend lines, and category breakdowns. Spot the habits that drain your attention and the ones that restore it.
        </p>

        <div style={{ opacity: insightsOpacity, marginTop: 32 }}>
          <InsightCard
            color="#6B8F71"
            text="Your screen time dropped 23% mid-week. Whatever you did Thursday — repeat it."
          />
          <div style={{ marginTop: 10 }}>
            <InsightCard
              color="#C4956A"
              text="TikTok consistently runs 3× over its limit. Want to lower the daily cap?"
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const LegendItem: React.FC<{ color: string; label: string; value: string }> = ({ color, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
    <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
    <span style={{ fontSize: 10, color: "#6B6560", flex: 1 }}>{label}</span>
    <span style={{ fontSize: 10, color: "#2D2926", fontWeight: 600 }}>{value}</span>
  </div>
);

const InsightCard: React.FC<{ color: string; text: string }> = ({ color, text }) => (
  <div
    style={{
      padding: "14px 18px",
      borderRadius: 14,
      background: "#FAF8F4",
      border: "1px solid #E8E3D8",
      borderLeft: `3px solid ${color}`,
    }}
  >
    <p style={{ fontSize: 15, color: "#4A4540", lineHeight: 1.5, margin: 0 }}>{text}</p>
  </div>
);
