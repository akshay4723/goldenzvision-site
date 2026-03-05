import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

function cleanString(v: unknown, max = 4000) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Accept multiple possible values
    const inquiryType = cleanString(body?.inquiryType || body?.requestType, 50);

    const allowedTypes = [
      "consultation",
      "custom",
      "product",
      "custom_service",
      "buy_product",
    ];

    if (!allowedTypes.includes(inquiryType)) {
      return NextResponse.json(
        {
          ok: false,
          message: `Invalid inquiryType: ${inquiryType}`,
        },
        { status: 400 }
      );
    }

    const payload = {
      inquiryType,

      name: cleanString(body?.name, 200),
      company: cleanString(body?.company, 200),
      email: cleanString(body?.email, 200),
      phone: cleanString(body?.phone, 60),
      country: cleanString(body?.country, 120),

      message: cleanString(body?.message, 4000),
      timeline: cleanString(body?.timeline, 200),
      budget: cleanString(body?.budget, 200),

      custom: body?.custom ?? null,
      product: body?.product ?? null,

      createdAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || "",
    };

    if (!payload.email) {
      return NextResponse.json(
        { ok: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const db = adminDb();

    const ref = await db.collection("client_requests").add(payload);

    return NextResponse.json({
      ok: true,
      id: ref.id,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        message: err?.message || "Server error",
      },
      { status: 500 }
    );
  }
}