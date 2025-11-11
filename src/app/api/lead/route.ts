import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2025-11-11",
  token: process.env.SANITY_WRITE_TOKEN, // RW token (server-side)
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    if (!process.env.SANITY_WRITE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Falta SANITY_WRITE_TOKEN en variables de entorno" },
        { status: 500 }
      );
    }

    const { name, phone, address, note, plan } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Nombre y teléfono son obligatorios" },
        { status: 400 }
      );
    }

    // Sanea un poco el teléfono (solo dígitos)
    const phoneDigits = String(phone).replace(/\D/g, "");

    const doc = await client.create({
      _type: "lead",
      name,
      phone: phoneDigits,
      address: address || "",
      note: note || "",
      plan: plan || "",
      status: "nuevo",
      // Puedes agregar metadata adicional si querés:
      // source: "web",
    });

    return NextResponse.json({ ok: true, id: doc._id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || "Error inesperado" }, { status: 500 });
  }
}
