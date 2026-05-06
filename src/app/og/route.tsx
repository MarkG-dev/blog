import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Gentle Future";
  const subtitle =
    searchParams.get("subtitle") ||
    "From maximum functionality to maximum well-being";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Top left — logo */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "60px",
            display: "flex",
            fontSize: "14px",
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            color: "#c8b8a0",
            fontFamily: "monospace",
          }}
        >
          GENTLE FUTURE
        </div>

        {/* Subtle accent line */}
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "60px",
            width: "40px",
            height: "1px",
            background: "#c8b8a0",
            opacity: 0.4,
          }}
        />

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: 600,
              color: "#f0f0f0",
              lineHeight: 1.15,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#666666",
              maxWidth: "700px",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "60px",
            display: "flex",
            fontSize: "12px",
            color: "#666666",
            fontFamily: "monospace",
          }}
        >
          gentlefuture.co
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
