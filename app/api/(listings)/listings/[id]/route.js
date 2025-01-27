import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import ConnectDb from "@/Database/dbConfig";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";
import User from "@/Models/authModel";

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

export async function GET(req, { params }) {
  try {
    await ConnectDb();
    const { id } = await params;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { message: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const listing = await Listings.findById(id).populate("owner");
    
    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Listing fetched successfully", data: listing },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await ConnectDb();
    const { id } = await params;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { message: "Invalid listing ID" },
        { status: 400 }
      );
    }

    const listing = await Listings.findById(id);
    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const city = formData.get("city");
    const address = formData.get("address");
    const price = parseFloat(formData.get("price"));
    const bedrooms = parseInt(formData.get("bedrooms"));
    const bathrooms = parseInt(formData.get("bathrooms"));
    const houseType = formData.get("houseType");
    const status = formData.get("status");
    const deposit = parseFloat(formData.get("deposit"));
    const description = formData.get("description");
    const images = formData.getAll("images");

    listing.title = title;
    listing.city = city;
    listing.address = address;
    listing.price = price;
    listing.bedrooms = bedrooms;
    listing.bathrooms = bathrooms;
    listing.houseType = houseType;
    listing.status = status;
    listing.deposit = deposit;
    listing.description = description;

    if (images && images.length > 0) {
      const updatedImageUrls = [];
      for (const file of images) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileUrl = await uploadImageToS3(buffer, `${Date.now()}-${file.name}`);
        updatedImageUrls.push(fileUrl);
      }
      listing.images = updatedImageUrls;
    }

    const updatedListing = await listing.save();

    return NextResponse.json({
      message: "Listing updated successfully",
      data: updatedListing,
    });
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
