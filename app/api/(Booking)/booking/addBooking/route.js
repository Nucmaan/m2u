import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Booking from "@/Models/bookingModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, owner, listing, visitingDate, notes } = body;

    // Validate required fields
    if (!user || !owner || !listing || !visitingDate) {
      return NextResponse.json(
        { message: "User, owner, listing, and visiting date are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await ConnectDb();

    // Check if the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the owner exists
    const existingOwner = await User.findById(owner);
    if (!existingOwner) {
      return NextResponse.json({ message: "Owner not found" }, { status: 404 });
    }

    // Check if the listing exists
    const existingListing = await Listings.findById(listing);
    if (!existingListing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    // Create a new booking
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
