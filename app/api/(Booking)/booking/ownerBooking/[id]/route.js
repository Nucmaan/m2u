import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Booking from "@/Models/bookingModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Owner ID is required" },
        { status: 400 }
      );
    }

    
    await ConnectDb();

    const bookings = await Booking.find({ owner: id })
      .populate("user", "name email") // Populate user details (optional)
      .populate("listing", "title city address price"); // Populate listing details (optional)



    if (!bookings.length) {
      return NextResponse.json(
        { message: "No bookings found for this owner" },
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
