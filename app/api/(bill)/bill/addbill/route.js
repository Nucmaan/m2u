import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Bill from "@/Models/billModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, owner, property, amount, dueDate, comment } = body;

    if (!user || !owner || !property || !amount || !dueDate || !comment) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await ConnectDb();

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingOwner = await User.findById(owner);
    if (!existingOwner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    const existingProperty = await Listings.findById(property);
    if (!existingProperty) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    const newBill = new Bill({
      user,
      owner,
      property,
      amount,
      dueDate,
      comment,
    });
    await newBill.save();

    return NextResponse.json(
      {
        message: "Bill added successfully",
        bill: newBill,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while adding the bill" },
      { status: 500 }
    );
  }
}
