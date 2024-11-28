import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await ConnectDb();

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check for duplicate username
    const existingUserName = await User.findOne({ username });
    if (!existingUserName) {
      return NextResponse.json(
        { success: false, message: "invalid credentials" },
        { status: 400 }
      );
    }
    // Compare password

    const checkPassword = await bcrypt.compare(
      password,
      existingUserName.password
    );

    if (!checkPassword) {
      return NextResponse.json(
        { success: false, message: "invalid credentials" },
        { status: 400 }
      );
    }

    //check if user is verified
    if (!existingUserName.isVerified === true) {
      return NextResponse.json(
        { success: false, message: "Your account is not verified" },
        { status: 403 }
      );
    }
    // Create JWT token

    const token = jwt.sign(
      { id: existingUserName._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    existingUserName.password = undefined;

    return NextResponse.json(
      {
        success: true,
        user: existingUserName,
        message: "User login successful",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
