import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Contract from "@/Models/contractModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Extract user ID from request parameters

    const userId = params.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    await ConnectDb();

    // Find contracts associated with the user
    const contracts = await Contract.find({ user: userId })
      .populate("property", "title address city price") // Populate property details, make sure property references Listings
      .populate("user", "username email avatar") // Populate user details
      .populate("owner", "username email avatar") // Populate owner details
      .sort({ createdAt: -1 }); // Sort by latest contracts

    if (!contracts.length) {
      return NextResponse.json(
        { message: "No contracts found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ contracts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
