import ConnectDb from "@/Database/dbConfig";
import Booking from "@/Models/bookingModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Await params to access user ID
    const { id } = await params;

    // Validate the input
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await ConnectDb();

    // Find bookings for the user
    const bookings = await Booking.find({ user: id })
      .populate("owner", "name email") // Populate owner details (optional)
      .populate("listing", "title address price"); // Populate listing details (optional)

    // Check if bookings exist
    if (!bookings.length) {
      return NextResponse.json(
        { message: "No bookings found for this user" },
        { status: 404 }
      );
    }

    // Return the user's bookings
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
