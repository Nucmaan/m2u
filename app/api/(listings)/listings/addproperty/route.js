import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import ConnectDb from "@/Database/dbConfig";
import Listings from "@/Models/listingsModel";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,

  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadImageToS3(file, fileName) {
  const fileBuffer = file;
  console.log("File name:", fileName);

  // Create a unique file name with timestamp
  const uniqueFileName = `myhome2uFolder/${fileName}-${Date.now()}`;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: uniqueFileName,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  // Generate S3 object URL
  const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${uniqueFileName}`;
  //return fileUrl;
  return fileUrl;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const owner = formData.get("owner");
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

    if (images.length === 0) {
      return NextResponse.json(
        { message: "No images provided." },
        { status: 400 }
      );
    }

    await ConnectDb();

    // Upload each image to S3
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`; // Create a unique file name

      // Upload the image to S3 and get the URL
      const fileUrl = await uploadImageToS3(buffer, fileName);
      imageUrls.push(fileUrl);
    }


   const listing = await Listings.create({
      owner,
      title,
      city,
      address,
      price,
      bedrooms,
      bathrooms,
      houseType,
      status,
      deposit,
      description,
      images: imageUrls,
    });

    console.log("Property added ");

    return NextResponse.json(
      { message: "Property added successfully.", listing },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
