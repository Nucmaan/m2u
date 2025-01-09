import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Bill from "@/Models/billModel";
import Listings from "@/Models/listingsModel";
import moment from "moment";
import { NextResponse } from "next/server";

// GET: Fetch a single bill by ID
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    await ConnectDb();


    const bill = await Bill.findById(id).populate("user owner property");

    if (!bill) {
      return NextResponse.json({ message: "Bill not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Bill fetched successfully", data: bill },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: Update a single bill by ID
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { amount, dueDate, status, paymentDate, comment } = await req.json();

    await ConnectDb();

    const bill = await Bill.findById(id);

    if (!bill) {
      return NextResponse.json({ message: "Bill not found" }, { status: 404 });
    }


    // Parse and validate dueDate
if (dueDate !== undefined) {
    const formattedDueDate = moment(dueDate, "YYYY-MM-DD", true);
    if (formattedDueDate.isValid()) {
      bill.dueDate = formattedDueDate.toDate();
    } else {
      return NextResponse.json(
        { message: "Invalid due date format" },
        { status: 400 }
      );
    }
  }
  
  // Parse and validate paymentDate
  if (paymentDate !== undefined) {
    const formattedPaymentDate = moment(paymentDate, "YYYY-MM-DD", true);
    if (formattedPaymentDate.isValid()) {
      bill.paymentDate = formattedPaymentDate.toDate();
    } else {
      return NextResponse.json(
        { message: "Invalid payment date format" },
        { status: 400 }
      );
    }
  }
  

    // Update the bill fields
    if (amount !== undefined) bill.amount = amount;
    if (status !== undefined) bill.status = status;
    if (comment !== undefined) bill.comment = comment;

    await bill.save();

    return NextResponse.json(
      { message: "Bill updated successfully", data: bill },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}