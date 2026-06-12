import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();

  const logoScale = spring({
    frame: frame - 10,
    fps: 30,
    config: { damping: 15, stiffness: 120 },
  });

  const titleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [20, 40], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const taglineOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [40, 60], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const deviceOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const deviceY = interpolate(frame, [55, 80], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* App icon / logo */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 24,
          background: "linear-gradient(135deg, #6B8F71 0%, #5A7D60 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale})`,
          marginBottom: 32,
          boxShadow: "0 12px 40px rgba(107,143,113,0.25)",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 64,
            fontWeight: 500,
            color: "#2D2926",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          BePresent
        </h1>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: "center",
          marginTop: 16,
        }}
      >
        <p
          style={{
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontSize: 22,
            fontWeight: 400,
            color: "#6B6560",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          Focus & Screen Time Control
        </p>
      </div>

      {/* Phone mockup preview */}
      <div
        style={{
          opacity: deviceOpacity,
          transform: `translateY(${deviceY}px)`,
          marginTop: 48,
        }}
      >
        <PhoneFrame>
          <div style={{ padding: "20px 16px" }}>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#9A948E", marginBottom: 4 }}>Friday, June 12</p>
            <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, color: "#2D2926", margin: 0 }}>Good evening</p>
            <div style={{ marginTop: 16, borderRadius: 20, background: "#6B8F71", padding: 16, color: "white" }}>
              <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.7, margin: 0 }}>Screen time today</p>
              <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, margin: "8px 0 0" }}>4h 12m</p>
              <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }}>
                <div style={{ width: "75%", height: "100%", borderRadius: 2, background: "#A8C5A5" }} />
              </div>
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
              <div style={{ flex: 1, borderRadius: 14, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10, textAlign: "center" }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#2D2926", margin: 0 }}>240</p>
                <p style={{ fontSize: 9, color: "#9A948E", margin: "4px 0 0" }}>Points</p>
              </div>
              <div style={{ flex: 1, borderRadius: 14, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10, textAlign: "center" }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#2D2926", margin: 0 }}>4d</p>
                <p style={{ fontSize: 9, color: "#9A948E", margin: "4px 0 0" }}>Streak</p>
              </div>
              <div style={{ flex: 1, borderRadius: 14, background: "#FAF8F4", border: "1px solid #E8E3D8", padding: 10, textAlign: "center" }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#2D2926", margin: 0 }}>8h 45m</p>
                <p style={{ fontSize: 9, color: "#9A948E", margin: "4px 0 0" }}>Focus</p>
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};

export const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        width: 260,
        height: 520,
        borderRadius: 36,
        background: "#FAF8F4",
        border: "8px solid #2D2926",
        boxShadow: "0 30px 80px -20px rgba(45,41,38,0.3)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 24,
          background: "#2D2926",
          borderRadius: "0 0 14px 14px",
          zIndex: 10,
        }}
      />
      <div style={{ paddingTop: 28, height: "100%", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};
