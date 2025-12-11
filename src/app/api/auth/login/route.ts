import { NextResponse } from "next/server";
import { users } from "../../../../lib/mockData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // @ts-ignore
    const user = users.find((u) => u.email === body.email && u.password === body.password);

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      token: "mock-token-" + user.id,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}