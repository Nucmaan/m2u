import ConnectDb from "@/Database/dbConfig";
import Booking from "@/Models/bookingModel";
import { NextResponse } from "next/server";

// Connect to the database
ConnectDb();

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const booking = await Booking.findById(id).populate("user owner listing");

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    if (status) booking.status = status;

    await booking.save();

    return NextResponse.json(
      { message: "Booking updated successfully", booking },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
