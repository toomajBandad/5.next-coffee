import connectToDB from "@/configs/db";
import departmentModel from "@/models/Department";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const departments = await departmentModel.find({}, "-__v");

    return NextResponse.json(
      {
        message: "departments fetched successfully!",
        departments: departments,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch departments",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { title } = await req.json();

    const newDepartment = await departmentModel.create({
      title,
    });

    return NextResponse.json(
      {
        message: "Department created successfully!",
        data: newDepartment,
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
