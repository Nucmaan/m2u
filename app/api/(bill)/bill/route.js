import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Bill from "@/Models/billModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await ConnectDb();

        // Fetch bills and populate user, owner, and property fields
        const bills = await Bill.find({})
            .populate("user", "username email mobile") 
            .populate("owner", "username email mobile") 
            .populate("property", "title address price"); 

        return NextResponse.json(
            { message: bills.length > 0 ? "Bills fetched successfully" : "No bills found", data: bills }, 
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
