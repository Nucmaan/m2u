import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Contract from "@/Models/contractModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const ownerId = await params.id;

    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner ID is required" },
        { status: 400 }
      );
    }

    await ConnectDb();


    // Find contracts for the specified owner
    const contracts = await Contract.find({ owner: ownerId })
      .populate("property", "title address city price") // Populate property details
      .populate("user", "username email") // Populate user details
      .populate("owner", "username email") // Populate owner details
      .sort({ createdAt: -1 }); // Sort by latest contracts

    // Check if contracts are found
    if (!contracts.length) {
      return NextResponse.json(
        { message: "No contracts found for this owner" },
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
