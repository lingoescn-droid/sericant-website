import { ImageResponse } from "next/og";

export const alt = "Sericant — China and Hong Kong Company Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background: "#f2f1eb",
          color: "#0a0a0a",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ fontSize: 25, fontWeight: 800, letterSpacing: "-0.04em" }}>SERICANT</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.055em" }}>
            Know who you&apos;re doing business with in China.
          </div>
          <div style={{ marginTop: 30, fontSize: 25, color: "#66665f" }}>
            Source-based company intelligence · Mainland China & Hong Kong
          </div>
        </div>
      </div>
    ),
    size
  );
}
