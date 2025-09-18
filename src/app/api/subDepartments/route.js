import connectToDB from "@/configs/db";
import subDepartmentModel from "@/models/SubDepartment";
import "@/models/Department";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const subDepartments = await subDepartmentModel.find({}, "-__v");

    return NextResponse.json(
      {
        message: "subDepartments fetched successfully!",
        subDepartments: subDepartments,
        success: true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message || "Failed to fetch subDepartments",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { title, department } = await req.json();

    const newSubDepartment = await subDepartmentModel.create({
      title,
      department,
    });

    return NextResponse.json(
      {
        message: "subDepartment created successfully!",
        data: newSubDepartment,
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
