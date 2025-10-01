import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import { NextResponse } from "next/server";
import { authUser } from "@/utils/authUser";

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const { answer } = await req.json();
    const user = await authUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this route",
          success: false,
        },
        { status: 401 }
      );
    }

    const ticket = await ticketModel.findByIdAndUpdate(id, {
      isAnswered: true,
      answer,
    });

    if (!ticket) {
      return NextResponse.json(
        {
          message: "Ticket not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Ticket answered successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to answer ticket",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;
    const user = await authUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this route",
          success: false,
        },
        { status: 401 }
      );
    }

    const ticket = await ticketModel.findByIdAndDelete(id);

    if (!ticket) {
      return NextResponse.json(
        {
          message: "Ticket not found or already deleted",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Ticket deleted successfully!",
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to delete ticket",
        success: false,
      },
      { status: 500 }
    );
  }
}
