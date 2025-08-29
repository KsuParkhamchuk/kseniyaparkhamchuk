import { fetchObj } from "@/app/r2/config";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const srcKey = searchParams.get("srcKey");
  let imageSrc = "";

  try {
    if (!srcKey) {
      return new Response(
        JSON.stringify({ error: "Missing srcKey parameter" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const imgObj = await fetchObj(srcKey);

    if (!imgObj.Body) {
      return new Response(JSON.stringify({ error: "Image object is empty" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const buffer = imgObj.Body as Buffer;
    const base64 = buffer.toString("base64");
    const mimeType = imgObj.ContentType || "image/jpeg";
    imageSrc = `data:${mimeType};base64,${base64}`;
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ url: imageSrc }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
