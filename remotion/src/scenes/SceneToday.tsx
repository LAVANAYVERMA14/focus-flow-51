import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { PhoneFrame } from "./SceneIntro";

export const SceneToday: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const card1X = interpolate(frame, [5, 25], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const card1Opacity = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const card2X = interpolate(frame, [15, 35], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const card2Opacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const card3X = interpolate(frame, [25, 45], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const card3Opacity = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const textOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textX = interpolate(frame, [50, 70], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const apps = [
    { name: "Instagram", emoji: "📷", used: 47, limit: 30, over: true },
    { name: "TikTok", emoji: "🎵", used: 62, limit: 20, over: true },
    { name: "YouTube", emoji: "▶️", used: 38, limit: 45, over: false },
    { name: "X", emoji: "𝕏", used: 19, limit: 25, over: false },
  ];

  return (
    <AbsoluteFill style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 80 }}>
      {/* Left: Text content */}
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
          Today Tab
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
          Know where your time goes
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
          Track screen time across all your apps. Set daily limits, see which apps run over, and get gentle nudges to stay on track.
        </p>

        <div style={{ marginTop: 32, display: "flex", gap: 24 }}>
          <StatBadge label="4h 12m" sub="Screen time" />
          <StatBadge label="4 apps" sub="Over limit" />
          <StatBadge label="240 pts" sub="Earned today" color="#C4956A" />
        </div>
      </div>

      {/* Right: Phone mockup */}
      <div>
        <PhoneFrame>
          <div style={{ padding: "20px 14px", height: "100%", overflow: "hidden" }}>
            <div style={{ opacity: headerOpacity }}>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9A948E", marginBottom: 2 }}>Friday, June 12</p>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, color: "#2D2926", margin: 0 }}>Good evening</p>
            </div>

            <div
              style={{
                opacity: card1Opacity,
                transform: `translateX(${card1X}px)`,
                marginTop: 14,
                borderRadius: 20,
                background: "#6B8F71",
                padding: 16,
                color: "white",
              }}
            >
              <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.7, margin: 0 }}>Screen time today</p>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, margin: "6px 0 0" }}>4h 12m</p>
              <div style={{ marginTop: 10, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }}>
                <div style={{ width: "75%", height: "100%", borderRadius: 2, background: "#A8C5A5" }} />
              </div>
              <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 10, opacity: 0.8 }}>
                <span>140% of daily limit</span>
                <span>4 apps over limit</span>
              </div>
            </div>

            <div
              style={{
                opacity: card2Opacity,
                transform: `translateX(${card2X}px)`,
                marginTop: 10,
                display: "flex",
                gap: 6,
              }}
            >
              <div style={{ flex: 1, borderRadius: 14, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10, textAlign: "center" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#2D2926", margin: 0 }}>240</p>
                <p style={{ fontSize: 8, color: "#9A948E", margin: "2px 0 0" }}>Points</p>
              </div>
              <div style={{ flex: 1, borderRadius: 14, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10, textAlign: "center" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#2D2926", margin: 0 }}>4d</p>
                <p style={{ fontSize: 8, color: "#9A948E", margin: "2px 0 0" }}>Streak</p>
              </div>
              <div style={{ flex: 1, borderRadius: 14, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10, textAlign: "center" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#2D2926", margin: 0 }}>8h 45m</p>
                <p style={{ fontSize: 8, color: "#9A948E", margin: "2px 0 0" }}>Focus</p>
              </div>
            </div>

            <div style={{ opacity: card3Opacity, transform: `translateX(${card3X}px)`, marginTop: 12 }}>
              <p style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#9A948E", marginBottom: 6 }}>Watching today</p>
              {apps.map((app, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 10px",
                    borderRadius: 12,
                    background: "#FAF8F4",
                    border: "1px solid #E8E3D8",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{app.emoji}</span>
                  <span style={{ fontSize: 11, flex: 1, color: "#2D2926" }}>{app.name}</span>
                  <span style={{ fontSize: 10, color: app.over ? "#C4956A" : "#6B6560", fontWeight: 500 }}>
                    {app.used}m / {app.limit}m
                  </span>
                </div>
              ))}
            </div>
          </div>
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};

const StatBadge: React.FC<{ label: string; sub: string; color?: string }> = ({ label, sub, color }) => (
  <div>
    <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 500, color: color || "#2D2926", margin: 0 }}>{label}</p>
    <p style={{ fontSize: 13, color: "#9A948E", marginTop: 4 }}>{sub}</p>
  </div>
);
