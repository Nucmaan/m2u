import ConnectDb from "@/Database/dbConfig";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Establish a connection to the database
    await ConnectDb();

    // Destructure the ID from the params
    const { id } = await params
    // Validate the ID format (optional, but recommended)
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { message: "Invalid listing ID" },
        { status: 400 }
      );
    }

    // Fetch the listing by ID
    const listing = await Listings.findById(id);

    // Check if the listing exists
    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    // Return a success response with the listing
    return NextResponse.json(
      { message: "Listing fetched successfully", data: listing },
      { status: 200 }
    );
  } catch (error) {
    // Log the error to the server console for debugging
    console.error("Error fetching listing:", error);

    // Return an error response
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message, // Include the error message for debugging
      },
      { status: 500 }
    );
  }
}
