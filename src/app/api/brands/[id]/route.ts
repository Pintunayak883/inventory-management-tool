import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }) {
  try {
    const brand = await db.brand.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      data: brand,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
export async function PUT(req: NextRequest, { params: { id } }) {
  try {
    const { title } = await req.json();
    const brand = await db.brand.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return NextResponse.json({
      success: true,
      data: brand,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
