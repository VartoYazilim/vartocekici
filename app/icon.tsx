import { ImageResponse } from "next/og";

// PNG favicon — Google/Android arama sonuçlarında daha güvenilir görünür.
// (SVG favicon bazı Google crawler'larında alınmıyordu.)
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1115",
          borderRadius: 14,
        }}
      >
        {/* "7/24" — lime, bold, tek satır */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 900,
            fontSize: 30,
            color: "#A3E635",
            letterSpacing: -2,
          }}
        >
          <span>7</span>
          <div
            style={{
              width: 5,
              height: 38,
              background: "#A3E635",
              margin: "0 1px",
              transform: "skewX(-20deg)",
              borderRadius: 2,
            }}
          />
          <span>24</span>
        </div>
      </div>
    ),
    size,
  );
}
