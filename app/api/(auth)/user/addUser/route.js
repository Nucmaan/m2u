import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    await ConnectDb();

    const body = await req.json();

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, 
        message: "Email already exists" },
        { status: 400 }
      );
    }
    // Check for duplicate username
    const existingUserName = await User.findOne({ username });

    if (existingUserName) {
      return NextResponse.json(
        { success: false, message: "username already exists" },
        { status: 400 }
      );
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });


    return NextResponse.json({
      success: true,
      user,
      message:
        "User created successfully",
    },{
      status : 201,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
