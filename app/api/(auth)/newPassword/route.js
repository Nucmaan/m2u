import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Make sure ConnectDb is imported if it's not already
import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Request Body:", body); // Log the incoming request body
        const { token, newPassword } = body;

        // Check if token and new password are provided
        if (!token || !newPassword) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Verify the token and decode the user ID
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded); // Log the decoded token
        } catch (error) {
            console.error("JWT verification failed:", error); // Log the JWT error for debugging
            return NextResponse.json({ message: "Invalid token request new token and try again" }, { status: 400 });
        }

        // Connect to the database
        await ConnectDb();
        console.log("Connected to the database"); // Log successful DB connection

        // Find the user by the decoded user ID and update the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword }, { new: true });

        if (!user) {
            console.error("User not found:", decoded.userId); // Log when the user is not found
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error during password update:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
