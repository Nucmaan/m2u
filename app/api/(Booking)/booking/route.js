import ConnectDb from "@/Database/dbConfig";
import Booking from "@/Models/bookingModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectDb();

    const bookings = await Booking.find()
      .populate("user", "name email") // Populates user field with name and email
      .populate("owner", "name email") // Populates owner field with name and email
      .populate("listing", "title address price") // Populates listing field with title, address, and price
      .sort({ createdAt: -1 }); // Sorts bookings by newest first

    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
