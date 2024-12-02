import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { token } = await params;

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    // Connect to the database
    await ConnectDb();

    // Find the user by ID
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        { success: false, message: "User is already verified" },
        { status: 400 }
      );
    }

    // Verify the user
    user.isVerified = true;
    await user.save();

    return NextResponse.json(
      { success: true, message: "User verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle token expiration
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { success: false, message: "Token expired. Please request a new verification link." },
        { status: 400 }
      );
    }

    // Generic error handler
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
