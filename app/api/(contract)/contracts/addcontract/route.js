import ConnectDb from "@/Database/dbConfig";
import Booking from "@/Models/bookingModel";
import Contract from "@/Models/contractModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      bookingId,
      propertyId,
      userId,
      ownerId,
      startDate,
      endDate,
      monthlyRent,
      deposit,
      houseStatus,
      termsAndConditions,
    } = await req.json();

    if (!(bookingId && propertyId && userId && ownerId && startDate && endDate && monthlyRent && deposit)) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    await ConnectDb();

    const bookingExists = await Booking.findById(bookingId);
    if (!bookingExists) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    const propertyExists = await Listings.findById(propertyId);

    if (!propertyExists) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    propertyExists.status = houseStatus;

    await propertyExists.save();


    const newContract = new Contract({
      booking: bookingId,
      property: propertyId,
      user: userId,
      owner: ownerId,
      startDate,
      endDate,
      monthlyRent,
      deposit,
      termsAndConditions,
    });

    await newContract.save();

    return NextResponse.json(
      { 
        message: "Contract created successfully", 
        contract: newContract 
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
