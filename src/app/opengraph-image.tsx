import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07080d",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, #8b8cff40, transparent 45%), radial-gradient(circle at 10% 90%, #5ef2c230, transparent 45%), linear-gradient(#1c2030 1px, transparent 1px), linear-gradient(90deg, #1c2030 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 44px 44px, 44px 44px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#5ef2c2",
            fontSize: 24,
            marginBottom: 28,
          }}
        >
          <div style={{ display: "flex" }}>●</div>
          <div style={{ display: "flex" }}>{profile.availability}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#e9ebf3",
            letterSpacing: "-0.02em",
          }}
        >
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#8b8cff", marginTop: 18 }}>
          {profile.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#9aa0b4",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
