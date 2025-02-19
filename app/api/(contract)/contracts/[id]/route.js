import ConnectDb from "@/Database/dbConfig";
import Contract from "@/Models/contractModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {

        const { id } = await params;

        if (!id) {
          return NextResponse.json(
            { message: "Contract ID is required" },
            { status: 400 }
          );
        }

        await ConnectDb();

        const existingContract = await Contract.findById(id)
        .populate("property", "status")

        if (!existingContract) {
          return NextResponse.json(
            { message: "Contract not found" },
            { status: 404 }
          );
        }

        return NextResponse.json(
            { message: "Contract fetched successfully",
            existingContract, 
            },{ status: 200 });
        
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "An error occurred" },
            { status: 500 }
          );
    }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Contract ID is required" },
        { status: 400 }
      );
    }

    // Extract only the allowed fields
    const { startDate, endDate, monthlyRent, deposit, status } = await req.json();

    // Validate that at least one field is being updated
    if (!startDate && !endDate && !monthlyRent && !deposit && !status) {
      return NextResponse.json(
        { message: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    // Create the update object dynamically
    const updateData = {};
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;
    if (monthlyRent) updateData.monthlyRent = monthlyRent;
    if (deposit) updateData.deposit = deposit;
    if (status) updateData.status = status;

    // Connect to the database
    await ConnectDb();

    // Update the contract
    const updatedContract = await Contract.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // Return the updated document and enforce validation
    );

    if (!updatedContract) {
      return NextResponse.json(
        { message: "Contract not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Contract updated successfully", contract: updatedContract },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "Contract ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await ConnectDb();

    // Delete the contract
    const deletedContract = await Contract.findByIdAndDelete(id);

    if (!deletedContract) {
      return NextResponse.json(
        { message: "Contract not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Contract deleted successfully", 
        contract: deletedContract,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contract:", error);
    return NextResponse.json(
      { message: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}