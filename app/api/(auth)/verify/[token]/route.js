import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { token } = params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        {
          status: 400,
        }
      );
    }

    await ConnectDb();

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        {
          status: 404,
        }
      );
    }

    user.isVerified = true;
    await user.save();

    return NextResponse.json(
      { success: true, message: "user verified now" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
