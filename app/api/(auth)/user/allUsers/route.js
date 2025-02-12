import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await ConnectDb();

        const users = await User.find({});

        if (!users.length) {
            return NextResponse.json(
                { message: "No users found" },
                { status: 404 } // 404 is more appropriate than 400
            );
        }

        return NextResponse.json(
            {
                success: true,
                users,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
