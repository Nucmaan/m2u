import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Booking from "@/Models/bookingModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, owner, listing, visitingDate, notes } = body;

    if (!user || !owner || !listing || !visitingDate) {
      return NextResponse.json(
        { message: "User, owner, listing, and visiting date are required" },
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

    const existingListing = await Listings.findById(listing);
    if (!existingListing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    const existingBooking = await Booking.findOne({
      user: existingUser._id,
      listing: existingListing._id,
      visitingDate: {
        $gte: new Date(visitingDate).setHours(0, 0, 0, 0), // Start of the day
        $lte: new Date(visitingDate).setHours(23, 59, 59, 999), // End of the day
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "you have already scheduled a visit" },
        { status: 400 }
      );
    }

    const newVisit = new Booking({
      user: existingUser._id,
      owner: existingOwner._id,
      listing: existingListing._id,
      visitingDate: new Date(visitingDate),
      notes,
    });

    await newVisit.save();

    return NextResponse.json(
      { message: "Visit saved successfully", booking: newVisit },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
