import connectToDB from "@/configs/db";
import ContactModel from "@/models/Contact";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const contacts = await ContactModel.find({}, "-__v");

    return NextResponse.json(
      {
        message: "contacts fetched successfully!",
        data: contacts,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch products",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const { name, email, contactNumber, company, body } = await req.json();

    const newContact = await ContactModel.create({
      name,
      email,
      contactNumber,
      company,
      body,
    });

    return NextResponse.json(
      {
        message: "Comment created successfully!",
        data: newContact,
        success: true,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}
