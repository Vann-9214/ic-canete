import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content";

export const alt = "Ivan Cañete (ICCañete) — Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  const profile = getProfile();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0F17",
          padding: "72px 80px",
          border: "1px solid #1E293B",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Header / Eyebrow Pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "#111827",
              border: "1px solid #1E3A8A",
              color: "#60A5FA",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            {profile.handle ? profile.handle.toUpperCase() : "ICCAÑETE"}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#64748B",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            PORTFOLIO
          </div>
        </div>

        {/* Center Content Block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#60A5FA",
              marginTop: 18,
            }}
          >
            {profile.role}
          </div>

          {profile.tagline ? (
            <div
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: "#94A3B8",
                marginTop: 20,
                lineHeight: 1.5,
                maxWidth: "960px",
              }}
            >
              {profile.tagline}
            </div>
          ) : null}
        </div>

        {/* Footer Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1E293B",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              color: "#64748B",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            <span>Software</span>
            <span>·</span>
            <span>Game Dev</span>
            <span>·</span>
            <span>Hardware</span>
          </div>

          <div
            style={{
              display: "flex",
              color: "#60A5FA",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            Engineering & Systems
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
