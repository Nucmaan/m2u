import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadImageToS3(buffer, fileName) {
  const uniqueFileName = `myhome2uFolder/${fileName}-${Date.now()}`;
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: uniqueFileName,
    Body: buffer,
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${uniqueFileName}`;
}

async function deleteImageFromS3(imageUrl) {
  if (!imageUrl.includes("amazonaws.com")) return; 

  const key = imageUrl.split(".amazonaws.com/")[1]; 
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: key,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
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

    console.log(id);
    console.log(avatarFile);


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
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
