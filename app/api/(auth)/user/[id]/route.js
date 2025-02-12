import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import { NextResponse } from "next/server";


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


export async function PUT(req) {
    try {
      await ConnectDb();
  
      const formData = await req.formData();
      const id = formData.get("id");
      const username = formData.get("username");
      const password = formData.get("password");
      const mobile = formData.get("mobile");
      const avatarFile = formData.get("avatar"); 
  
      const defaultAvatar =
        "https://myhome2u-storage.s3.ap-southeast-2.amazonaws.com/myhome2uFolder/NasriDevLab.jpg";
  
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
  
      if (username) {
        existingUser.username = username;
      }
      if (mobile) {
        existingUser.mobile = mobile;
      }
  
      if (avatarFile && avatarFile.size > 0) {
        
        if (existingUser.avatar && existingUser.avatar !== defaultAvatar) {
          await deleteImageFromS3(existingUser.avatar); 
        }
  
        const buffer = Buffer.from(await avatarFile.arrayBuffer());
        const fileUrl = await uploadImageToS3(buffer, avatarFile.name);
        existingUser.avatar = fileUrl;
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
      console.error(error);
      return NextResponse.json({ error: error.message || ""
       }, { status: 500 });
    }
  }