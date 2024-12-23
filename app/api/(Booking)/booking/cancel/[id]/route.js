import ConnectDb from "@/Database/dbConfig";
import Booking from "@/Models/bookingModel";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Booking ID is required" },
        { status: 400 }
      );
    }

    await ConnectDb();

    const existingBooking = await Booking.findById(id);
    if (!existingBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Booking deleted successfully", booking: deletedBooking },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
