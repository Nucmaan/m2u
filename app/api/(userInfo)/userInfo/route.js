import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import { NextResponse } from "next/server";


export async function GET(req) {

    try {

        await ConnectDb();

        const userInfo  = await  User.find({});

        if (userInfo.length === 0) {
            return NextResponse.json(
                { message: "No user found" },
                { status: 400 }
            );
        }

        return NextResponse.json(
           {
            message: "User fetched successfully",
            Users : userInfo
           },
             { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}