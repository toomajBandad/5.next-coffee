import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import { NextResponse } from "next/server";
import { authUser } from "@/utils/authUser";

export async function GET() {
  try {
    await connectToDB();
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
    const tickets = await ticketModel.find({}, "-__v").populate("userID");

    return NextResponse.json(
      {
        message: "tickets fetched successfully!",
        data: tickets,
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

    const { department, subDepartment, title, body, priority } =
      await req.json();

    const newTicket = await ticketModel.create({
      userID: user._id,
      department,
      subDepartment,
      title,
      body,
      priority,
    });

    return NextResponse.json(
      {
        message: "Ticket created successfully!",
        data: newTicket,
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
