import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sendEmail from "@/helpers/sendVerificationEmail";

export async function POST(req) {
  try {
    await ConnectDb();

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Enter email to reset password." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 400 }
      );
    }

    // Generate a token with 1-hour expiration
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the email

      await sendEmail(email, token, "resetPassword");
   

    return NextResponse.json(
      { success: true, message: "Email sent successfully. Check your inbox." },
      { status: 200 }
    );
  } catch (error) {
   return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
