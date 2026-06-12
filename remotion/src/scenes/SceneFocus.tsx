import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { PhoneFrame } from "./SceneIntro";

export const SceneFocus: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textX = interpolate(frame, [0, 18], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const phoneOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phoneY = interpolate(frame, [10, 30], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const ringProgress = interpolate(frame, [30, 90], [0, 75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringDash = (ringProgress / 100) * 289;

  const blockedOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const presets = ["25 min", "50 min", "90 min"];

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
          Focus Sessions
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
          One thing at a time
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
          Pomodoro-style timer with app blocking. Distractions pause while you work. Earn points for every minute of deep focus.
        </p>

        <div style={{ marginTop: 32 }}>
          <FeatureItem icon="⏱️" text="25 / 50 / 90 min presets" delay={40} />
          <FeatureItem icon="🔒" text="Auto-block distracting apps" delay={55} />
          <FeatureItem icon="✨" text="2× points per focused minute" delay={70} />
        </div>
      </div>

      {/* Right: Phone */}
      <div style={{ opacity: phoneOpacity, transform: `translateY(${phoneY}px)` }}>
        <PhoneFrame>
          <div style={{ padding: "20px 14px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9A948E", marginBottom: 2, alignSelf: "flex-start" }}>Focus</p>
            <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, color: "#2D2926", margin: "0 0 24px", alignSelf: "flex-start" }}>One thing at a time</p>

            {/* Timer Ring */}
            <div style={{ position: "relative", width: 160, height: 160 }}>
              <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                <circle cx="50" cy="50" r="46" stroke="#E8E3D8" strokeWidth="2.5" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="#6B8F71"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${ringDash} 289`}
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, color: "#2D2926", margin: 0 }}>18:45</p>
                <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9A948E", marginTop: 4 }}>in session</p>
              </div>
            </div>

            {/* Presets */}
            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              {presets.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: i === 0 ? "1px solid #6B8F71" : "1px solid #E8E3D8",
                    background: i === 0 ? "#6B8F71" : "#FAF8F4",
                    color: i === 0 ? "white" : "#6B6560",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {p}
                </div>
              ))}
            </div>

            {/* Begin button */}
            <div
              style={{
                marginTop: 16,
                padding: "12px 48px",
                borderRadius: 30,
                background: "#6B8F71",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>▶</span> Begin
            </div>

            {/* Blocked apps */}
            <div style={{ opacity: blockedOpacity, marginTop: 20, alignSelf: "flex-start", width: "100%" }}>
              <p style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#9A948E", marginBottom: 8 }}>Blocked during focus</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                {["📷", "🎵", "𝕏", "👽"].map((e, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: "#F0EBE2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      {e}
                    </div>
                    <div style={{ position: "absolute", bottom: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#6B8F71", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "white", fontSize: 9 }}>🔒</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize: 9, color: "#9A948E", marginTop: 12, textAlign: "center" }}>
              Earn <span style={{ color: "#2D2926", fontWeight: 600 }}>50 points</span> when this session completes.
            </p>
          </div>
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};

const FeatureItem: React.FC<{ icon: string; text: string; delay: number }> = ({ icon, text, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x = interpolate(frame, [delay, delay + 12], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, opacity, transform: `translateX(${x}px)` }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 16, color: "#4A4540" }}>{text}</span>
    </div>
  );
};
