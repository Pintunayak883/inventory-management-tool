import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }) {
  try {
    const item = await db.item.findUnique({
      where: {
        id: params.id,
      },
      include: {
        category: true,
        brand: true,
        unit: true,
        supplier: true,
        warehouse: true,
      },
    });
    console.log(item);
    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
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
    const itemData = await req.json();
    const item = await db.item.update({
      where: {
        id,
      },
      data: {
        title: itemData.title,
        categoryId: itemData.categoryId,
        sku: itemData.sku,
        barcode: itemData.barcode,
        quantity: parseInt(itemData.qty) || 0, // Default to 0 if parsing fails
        unitId: itemData.unitId,
        brandId: itemData.brandId,
        supplierId: itemData.supplierId,
        sellingPrice: parseFloat(itemData.sellingPrice) || 0.0,
        buyingPrice: parseFloat(itemData.buyingPrice) || 0.0,
        reOrderPoint: parseInt(itemData.reOrderPoint) || 0, // Default to 0
        warehouseId: itemData.warehouseId,
        imageUrl: itemData.imageUrl,
        weight: parseFloat(itemData.weight) || 0.0, // Default to 0.0
        dimensions: itemData.dimensions,
        taxRate: parseFloat(itemData.taxRate) || 0.0, // Default to 0.0
        description: itemData.description,
        notes: itemData.notes,
      },
    });
    return NextResponse.json({
      success: true,
      data: item,
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
