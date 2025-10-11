import connectToDB from "@/configs/db";
import ContactModel from "@/models/Contact";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          message: "Contact ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    const deletedContact = await ContactModel.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json(
        {
          message: "No contact found with the provided ID",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Contact deleted successfully!",
        data: deletedContact,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
