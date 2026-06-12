import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();

  const logoScale = spring({
    frame: frame - 5,
    fps: 30,
    config: { damping: 15, stiffness: 120 },
  });

  const titleOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaOpacity = interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Logo */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 22,
          background: "linear-gradient(135deg, #6B8F71 0%, #5A7D60 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${logoScale})`,
          marginBottom: 28,
          boxShadow: "0 12px 40px rgba(107,143,113,0.25)",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>

      {/* Title */}
      <div style={{ opacity: titleOpacity, textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 56,
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
      <div style={{ opacity: taglineOpacity, textAlign: "center", marginTop: 12 }}>
        <p
          style={{
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontSize: 20,
            fontWeight: 400,
            color: "#6B6560",
            margin: 0,
          }}
        >
          Stay focused. Earn calm.
        </p>
      </div>

      {/* CTA hint */}
      <div style={{ opacity: ctaOpacity, marginTop: 40, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "14px 36px",
            borderRadius: 30,
            background: "#6B8F71",
            color: "white",
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            boxShadow: "0 8px 30px rgba(107,143,113,0.3)",
          }}
        >
          Start your first session
        </div>
      </div>
    </AbsoluteFill>
  );
};
