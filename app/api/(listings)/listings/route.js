import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    
    await ConnectDb();

    const listings = await Listings.find({}).populate("owner");

    if (listings.length === 0) {
      return NextResponse.json(
        { message: "No listings found" },
        { status: 400 } 
      );
    }


    return NextResponse.json(
      { 
        message: "All listings fetched successfully", 
        Listings: listings 
      },
      { status: 200 }
    );
  } catch (error) {
    
    console.error("Error fetching listings:", error);

    return NextResponse.json(
      { 
        message: "Internal server error", 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
