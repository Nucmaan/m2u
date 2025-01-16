import ConnectDb from "@/Database/dbConfig";
import Bill from "@/Models/billModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { amount, comment } = await req.json();

    await ConnectDb();

    console.log(amount);

    const bill = await Bill.findById(id);
    if (!bill) {
      return NextResponse.json({ message: "Bill not found" }, { status: 404 });
    }

    bill.paymentDate = Date.now();
    bill.status = "Paid";
    if (amount !== undefined) bill.amount = amount;
    if (comment !== undefined) bill.comment = comment;

    await bill.save();

    return NextResponse.json(
      {
        message: "you have paid the bill successfully",
        data: {
          amount: bill.amount,
          comment: bill.comment,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating bill:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
