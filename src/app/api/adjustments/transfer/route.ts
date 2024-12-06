import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      transferStockQty,
      itemId,
      notes,
      givingWarehouseId,
      receivingWarehouseId,
      referenceNumber,
    } = await req.json();

    // Log values to confirm they are correct
    console.log({
      transferStockQty: parseInt(transferStockQty, 10),
      itemId,
      notes,
      givingWarehouseId,
      receivingWarehouseId,
      referenceNumber,
    });

    // Check if transferStockQty is a number
    if (isNaN(transferStockQty)) {
      throw new Error("transferStockQty must be a valid number");
    }

    // Create the transfer record
    const adjustments = await db.transferStockAdjustment.create({
      data: {
        transferStockQty: parseInt(transferStockQty, 10),
        itemId,
        notes,
        givingWarehouseId,
        receivingWarehouseId,
        referenceNumber,
      },
    });
    console.log(adjustments);
    return NextResponse.json({
      success: true,
      message: "Inventory transfer logged successfully",
      adjustments,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error.message || "An error occurred during the transfer process.",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const Transferadjustment = await db.transferStockAdjustment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({
      message: "Fetch Transfer Stock",
      success: true,
      data: Transferadjustment,
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
    const deletetransferStockAdjustment =
      await db.transferStockAdjustment.delete({
        where: {
          id,
        },
      });
    return NextResponse.json({
      success: true,
      data: deletetransferStockAdjustment,
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
