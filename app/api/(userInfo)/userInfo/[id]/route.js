import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Listings from "@/Models/listingsModel";
import Booking from "@/Models/bookingModel";
import Bill from "@/Models/billModel";

export async function GET(req, { params }) {
    try {
      const { id } = await params;
  
      await ConnectDb();
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
      }
  
      const userInfo = await User.findById(id).select("-password"); 
  
      if (!userInfo) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ user: userInfo }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  

  export async function DELETE(req, { params }) {
    try {
      const { id } = params;
  
      await ConnectDb();
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
      }
  
       const userInfo = await User.findById(id);
      if (!userInfo) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      
      await userInfo.remove(); 
  
       await User.findByIdAndDelete(id);
  
      return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }


export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { username, email, password, role, isVerified, mobile } =
      await req.json();

    await ConnectDb();

     if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const userExists = await User.findById(id);

    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (email && email !== userExists.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 400 }
        );
      }
      userExists.email = email;
    }

    if (username) userExists.username = username;
    if (role) userExists.role = role;
    if (isVerified !== undefined) userExists.isVerified = isVerified;
    if (mobile) userExists.mobile = mobile;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userExists.password = hashedPassword;
    }

    await userExists.save();

    const updatedUser = await User.findById(id).select("-password");

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },

      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
