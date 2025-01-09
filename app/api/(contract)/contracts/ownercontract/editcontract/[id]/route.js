import ConnectDb from "@/Database/dbConfig";
import User from "@/Models/authModel";
import Booking from "@/Models/bookingModel";
import Contract from "@/Models/contractModel";
import Listings from "@/Models/listingsModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await ConnectDb();

  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Contract ID is required" },
        { status: 400 }
      );
    }

    const contract = await Contract.findById(id)
      .populate("booking")
      .populate("property")
      .populate("user")
      .populate("owner");

    if (!contract) {
      return NextResponse.json(
        { message: "Contract not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contract, { status: 200 });
  } catch (error) {
    console.error("Error fetching contract:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  await ConnectDb();

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "Contract ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedContract = await Contract.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
      .populate("booking")
      .populate("property")
      .populate("user")
      .populate("owner");

    if (!updatedContract) {
      return NextResponse.json(
        { message: "Contract not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedContract, { status: 200 });
  } catch (error) {
    console.error("Error updating contract:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
