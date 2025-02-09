import ConnectDb from "@/Database/dbConfig";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id: city } = await params;

    await ConnectDb();

    const listings = await Listings.find({ city: { $regex: new RegExp(`^${city}$`, "i") } }).populate("owner");

    if (!listings.length) {
      return NextResponse.json(
        { message: "Your Search not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Your Search successfully fetched",
        Listings: listings
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message
      },
      { status: 500 }
    );
  }
}
