import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const FILE_PATH = join(process.cwd(), "app/timeline/layout-data.json");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await readFile(FILE_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ positions: {}, edges: null });
  }
}
