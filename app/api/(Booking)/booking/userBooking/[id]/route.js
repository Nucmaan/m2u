import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Booking from "@/Models/bookingModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    await ConnectDb();

    const bookings = await Booking.find({ user: id })
      .populate("owner", "name email") // Populate owner details (optional)
      .populate("listing", "title address price"); // Populate listing details (optional)

    if (!bookings.length) {
      return NextResponse.json(
        { message: "No bookings found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
