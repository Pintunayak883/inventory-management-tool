import db from "@/lib/db"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, abbreviation } = await req.json();

    // Ensure you use the correct model name (singular)
    const unit = await db.unit.create({
      data: {
        title,
        abbreviation,
      },
    });
    console.log(unit);

    return NextResponse.json({
      success: true,
      data: unit,
    });
  } catch (error: any) {
    console.error(error); // Log the error for debugging
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

export async function GET(req: NextRequest) {
  try {
    const unit = await db.unit.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({
      success: true,
      data: unit,
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

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    console.log("id on backend=", id);
    const deleteunit = await db.unit.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      data: deleteunit,
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
