import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 사용자 등록 (POST)
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, name } = data;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: { email, name },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}

// 사용자 전체 조회 (GET)
export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
