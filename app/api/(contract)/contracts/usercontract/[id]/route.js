import ConnectDb from "@/Database/dbConfig";
import Contract from "@/Models/contractModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await ConnectDb();

    const contracts = await Contract.find({ user: id })
      .populate("property", "title address city price houseType status")
      .populate("user", "username email avatar mobile")
      .populate("owner", "username email avatar mobile")
      .sort({ createdAt: -1 });

    if (!contracts || contracts.length === 0) {
      return NextResponse.json({ contracts: [] }, { status: 200 });
    }

    return NextResponse.json({ contracts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message || "An error occurred" }, { status: 500 });
  }
}
