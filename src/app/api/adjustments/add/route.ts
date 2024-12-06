import db from "@/lib/db"; // Assuming this imports your Prisma Client instance
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Destructure the request JSON body to get inventory addition details
    const {
      referenceNumber,
      addStockQty,
      notes,
      receivingWarehouseId,
      itemId, // This should represent the ID of the item
    } = await req.json();

    console.log("Selected Item ID:", itemId); // Debugging log

    // Check if itemId is defined
    if (!itemId) {
      return NextResponse.json(
        {
          message: "Item ID must be provided.",
          success: false,
        },
        { status: 400 }
      );
    }

    const inventoryAdjustment = await db.addStockAdjustment.create({
      data: {
        referenceNumber,
        addStockQty,
        notes,
        receivingWarehouseId,
        item: {
          connect: { id: itemId }, // Use the correct itemId here
        },
      },
    });

    console.log("Inventory Addition Recorded:", inventoryAdjustment);

    // Respond with a success message and the recorded inventory adjustment data
    return NextResponse.json({
      success: true,
      message: "Inventory addition recorded successfully",
      data: inventoryAdjustment,
    });
  } catch (error: any) {
    console.error("Error adding inventory:", error); // Log the error for debugging
    return NextResponse.json(
      {
        message:
          error.message || "An error occurred during the addition process.",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const Addadjustment = await db.addStockAdjustment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({
      message: "Fetch Add Stock",
      success: true,
      data: Addadjustment,
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
    console.log("Delete Request Endpoint:", id);

    const deleteaddStockAdjustment = await db.addStockAdjustment.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      data: deleteaddStockAdjustment,
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
