import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { transferStockQty, notes, receivingBranchId } = await req.json();
    const adjustments = { transferStockQty, notes, receivingBranchId };
    console.log(adjustments);

    return NextResponse.json({
      success: true,
      adjustments,
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
