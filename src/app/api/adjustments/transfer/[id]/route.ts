import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }) {
  try {
    const transferStockAdjustment = await db.transferStockAdjustment.findUnique(
      {
        where: {
          id,
        },
      }
    );
    return NextResponse.json({
      success: true,
      data: transferStockAdjustment,
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
      transferStockQty,
      itemId,
      notes,
      givingWarehouseId,
      receivingWarehouseId,
      referenceNumber,
    } = await req.json();

    // Validation
    if (
      !transferStockQty ||
      !itemId ||
      !notes ||
      !givingWarehouseId ||
      !receivingWarehouseId ||
      !referenceNumber
    ) {
      return NextResponse.json(
        { message: "All fields are required.", success: false },
        { status: 400 }
      );
    }

    const parsedQty = parseInt(transferStockQty, 10);
    if (isNaN(parsedQty)) {
      return NextResponse.json(
        { message: "Invalid stock quantity.", success: false },
        { status: 400 }
      );
    }

    // Check if the record exists
    const transferStockAdjustment = await db.transferStockAdjustment.findUnique(
      {
        where: { id },
      }
    );

    if (!transferStockAdjustment) {
      return NextResponse.json(
        { message: "Transfer stock adjustment not found.", success: false },
        { status: 404 }
      );
    }

    // Update record
    const updatedAdjustment = await db.transferStockAdjustment.update({
      where: { id },
      data: {
        transferStockQty: parsedQty,
        itemId,
        notes,
        givingWarehouseId,
        receivingWarehouseId,
        referenceNumber,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedAdjustment,
    });
  } catch (error: any) {
    console.error("Error updating transfer stock adjustment:", error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
