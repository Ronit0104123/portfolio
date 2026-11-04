import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name} · ${profile.role}`;
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0d0c0a",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6f6a60",
          }}
        >
          {`${profile.location} / ${profile.role}`}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#ece7dc",
            }}
          >
            Ronit&nbsp;<span style={{ color: "#f0643a" }}>Jain</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.35,
              color: "#a49e92",
              marginTop: 36,
              maxWidth: 940,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #282621",
            paddingTop: 24,
            fontSize: 22,
            color: "#6f6a60",
          }}
        >
          <div style={{ display: "flex" }}>ronitjain.dev</div>
          <div style={{ display: "flex" }}>{profile.availability}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
