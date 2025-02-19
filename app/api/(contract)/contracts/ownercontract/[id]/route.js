import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Contract from "@/Models/contractModel";
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


    const contracts = await Contract.find({ owner: id })
      .populate("property", "title address city price houseType status")
      .populate("user", "username email mobile") 
      .populate("owner", "username email mobile") 
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
