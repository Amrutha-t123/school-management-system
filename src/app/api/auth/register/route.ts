import { NextResponse } from "next/server";
import { users, generateId } from "@/lib/mockData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (users.find((u) => u.email === body.email)) {
      return NextResponse.json({ message: "User exists" }, { status: 400 });
    }

    const newUser = {
      id: generateId(),
      email: body.email,
      name: body.name || "New User",
      role: "ADMIN",
      // @ts-ignore
      password: body.password
    };
    // @ts-ignore
    users.push(newUser);

    return NextResponse.json({
      message: "Registered successfully",
      token: "mock-token-" + newUser.id,
      user: newUser
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}