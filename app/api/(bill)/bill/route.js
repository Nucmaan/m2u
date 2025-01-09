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
            .populate("user", "username email") // Populate specific fields from the User model
            .populate("owner", "username email") // Populate specific fields from the User model
            .populate("property", "title address"); // Populate specific fields from the Listings model

        if (bills.length === 0) {
            return NextResponse.json(
                { message: "No bills found" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Bills fetched successfully", data: bills }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}
