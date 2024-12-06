import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }) {
  try {
    const addStockAdjustment = await db.addStockAdjustment.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      data: addStockAdjustment,
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
    const {
      referenceNumber,
      addStockQty,
      notes,
      receivingWarehouseId,
      itemId,
    } = await req.json();

    const addStockAdjustment = await db.addStockAdjustment.update({
      where: {
        id,
      },
      data: {
        referenceNumber,
        addStockQty: parseInt(addStockQty, 10), // Use the parsed integer value
        notes,
        receivingWarehouseId,
        item: {
          connect: { id: itemId }, // Make sure itemId is valid
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: addStockAdjustment,
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
