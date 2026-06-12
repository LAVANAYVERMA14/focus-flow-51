import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const PersistentBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 720], [0, 30], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #F5F0E8 0%, #EDE8DE 40%, #E8E3D8 70%, #F0EBE2 100%)",
      }}
    >
      {/* Subtle floating shapes */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,143,113,0.06) 0%, transparent 70%)",
          top: -100 + drift * 0.5,
          right: -150 + drift * 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,149,106,0.05) 0%, transparent 70%)",
          bottom: -80 - drift * 0.4,
          left: -100 - drift * 0.2,
        }}
      />
    </AbsoluteFill>
  );
};
