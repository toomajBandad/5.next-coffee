import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    // Await the cookies API before using it
    const cookieStore = await cookies();
    cookieStore.delete("token", { path: "/" });

    return NextResponse.json(
      { message: "Sign-out successful", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-out:", error);

    return NextResponse.json(
      { message: "Sign-out failed", success: false },
      { status: 500 }
    );
  }
};