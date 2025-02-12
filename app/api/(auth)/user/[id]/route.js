import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function GET(req , { params }) {
  try {
    await ConnectDb();
    
    const { id } = await params;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
    try {

      await ConnectDb();

      const { id } = await params;

      const body = await req.json();
      const { userName, email, role, isVerified, mobile, password } = body;

  
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      if (userName) {
        existingUser.username = userName;
      }
      if (email) {
        existingUser.email = email;
      }
      if (role) {
        existingUser.role = role;
      }

      if (isVerified) {
        existingUser.isVerified = isVerified;
      }

      if (mobile) {
        existingUser.mobile = mobile;
      }
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
      }
  
      const updatedUser = await existingUser.save();
  
      return NextResponse.json(
        {
          success: true,
          userInfo: updatedUser,
          message: "User updated successfully",
        },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ error: error.message || " Internal Server Error"
       }, { status: 500 });
    }
  }