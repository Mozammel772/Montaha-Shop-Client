// app/api/auth/verify-session/route.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ valid: false });
  }

  try {
    // JWT locally verify করো আগে
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!,
    ) as JwtPayload;

    if (!decoded?.userId) {
      return NextResponse.json({ valid: false });
    }

    // ✅ Express backend-এ call করো — সে DB থেকে tokenVersion check করবে
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/me`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    // 401 = tokenVersion mismatch বা invalid session
    return NextResponse.json({ valid: response.ok });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
