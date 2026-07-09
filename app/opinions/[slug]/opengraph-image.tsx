import {ImageResponse} from "next/og";
import {groq} from "next-sanity";
import {client} from "../../../sanity/lib/client";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const query = groq`
*[_type == "opinion" && slug.current == $slug][0]{
  title,
  summary,
  topic,
  "image": coverImage.asset->url
}
`;

function shorten(text: string, max = 95) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
}

export default async function Image({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;

  const opinion = await client.fetch(query, {slug});

  const title = opinion?.title || "Opinion";
  const topic = opinion?.topic || "Opinion";
  const summary = shorten(opinion?.summary || "", 150);
  const image = opinion?.image;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0f172a",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            width: "58%",
            height: "100%",
            padding: "64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 24,
                color: "#f59e0b",
                letterSpacing: 5,
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              Opinion
            </div>

            <div
              style={{
                fontSize: 60,
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              {title}
            </div>

            {summary && (
              <div
                style={{
                  marginTop: 28,
                  fontSize: 26,
                  lineHeight: 1.35,
                  color: "#cbd5e1",
                }}
              >
                {summary}
              </div>
            )}
          </div>

          <div>
            <div style={{fontSize: 24, color: "#fbbf24"}}>
              Dr. Hos Arie Sibarani
            </div>
            <div style={{marginTop: 8, fontSize: 22, color: "#94a3b8"}}>
              {topic} • www.hossibarani.com
            </div>
          </div>
        </div>

        <div
          style={{
            width: "42%",
            height: "100%",
            position: "relative",
            background: "#111827",
          }}
        >
          {image ? (
            <img
              src={`${image}?w=900&h=630&fit=crop&auto=format`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 120,
                color: "#f59e0b",
              }}
            >
              HOS
            </div>
          )}
        </div>
      </div>
    ),
    size
  );
}