import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, location, warehouseType, description } = await req.json();

    if (!warehouseType) {
      throw new Error("warehouseType is required");
    }

    const warehouse = await db.warehouse.create({
      data: {
        title,
        location,
        warehouseType,
        description: description || null, // Optional field
      },
    });

    return NextResponse.json({
      success: true,
      data: warehouse,
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

export async function GET(req: NextRequest) {
  try {
    const warehouses = await db.warehouse.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true, // `items` relation ko include kar raha hai
      },
    });

    return NextResponse.json({
      success: true,
      data: warehouses,
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
    const deletewarehouse = await db.warehouse.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      data: deletewarehouse,
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
