import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }) {
  try {
    const brand = await db.supplier.findUnique({
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
    const {
      name,
      phone,
      email,
      address,
      contactPerson,
      supplierCode,
      paymentTerms,
      taxID,
      notes,
      location,
      description,
    } = await req.json();
    const brand = await db.supplier.update({
      where: {
        id,
      },
      data: {
        name,
        phone,
        email,
        address,
        contactPerson,
        supplierCode,
        paymentTerms,
        taxID,
        notes,
        location,
        description,
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
