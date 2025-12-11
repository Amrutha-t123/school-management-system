import { NextResponse } from "next/server";
// ✅ FIXED IMPORT: Using relative path to guarantee it works
import { departments, generateId } from "../../../lib/mockData"; 

export async function GET() {
  return NextResponse.json(departments);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newDept = {
    id: generateId(),
    name: body.name,
    description: body.description,
    createdAt: new Date().toISOString()
  };
  departments.push(newDept);
  return NextResponse.json(newDept, { status: 201 });
}