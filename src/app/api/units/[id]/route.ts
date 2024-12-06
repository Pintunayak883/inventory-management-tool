import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }) {
  try {
    const brand = await db.unit.findUnique({
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
    const { title, abbreviation } = await req.json();
    const brand = await db.unit.update({
      where: {
        id,
      },
      data: {
        title,
        abbreviation,
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
