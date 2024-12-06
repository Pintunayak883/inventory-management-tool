import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const itemData = await req.json();
    const res = await db.item.create({
      data: {
        title: itemData.title,
        category: {
          connect: { id: itemData.categoryId }, // Correct relation for category
        },
        sku: itemData.sku,
        barcode: itemData.barcode || null,
        quantity: parseInt(itemData.qty) || 0,
        unit: {
          connect: { id: itemData.unitId }, // Correct relation for unit
        },
        brand: {
          connect: { id: itemData.brandId }, // Correct relation for brand
        },
        supplier: {
          connect: { id: itemData.supplierId }, // Correct relation for supplier
        },
        sellingPrice: parseFloat(itemData.sellingPrice) || 0.0,
        buyingPrice: parseFloat(itemData.buyingPrice) || 0.0,
        reOrderPoint: parseInt(itemData.reOrderPoint) || 0,
        warehouse: {
          connect: { id: itemData.warehouseId }, // Correct relation for warehouse
        },
        imageUrl: itemData.imageUrl || null,
        weight: parseFloat(itemData.weight) || 0.0,
        dimensions: itemData.dimensions || null,
        taxRate: parseFloat(itemData.taxRate) || 0.0,
        description: itemData.description || null,
        notes: itemData.notes || null,
      },
    });
    console.log("itemdata", res);
    return NextResponse.json({
      success: true,
      data: res,
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
    const items = await db.item.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        supplier: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: items,
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
    const deleteitem = await db.item.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      data: deleteitem,
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
