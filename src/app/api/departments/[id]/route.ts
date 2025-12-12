import { NextResponse } from "next/server";

import { departments } from "@/lib/mockData"; 

type Params = Promise<{ id: string }>;

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  const { id } = await params;
  
  
  const department = departments.find((d) => d.id === id);

  if (department) {
    return NextResponse.json(department);
  }
  return NextResponse.json({ message: "Department not found" }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  const { id } = await params;
  
  try {
    const body = await request.json();
    const index = departments.findIndex((d) => d.id === id);

    if (index > -1) {
      departments[index] = { ...departments[index], ...body, updatedAt: new Date().toISOString() };
      return NextResponse.json(departments[index]);
    }
    return NextResponse.json({ message: "Department not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating department" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  const { id } = await params;
  
  const index = departments.findIndex((d) => d.id === id);

  if (index > -1) {
    departments.splice(index, 1);
    return NextResponse.json({ message: "Department deleted successfully" });
  }
  return NextResponse.json({ message: "Department not found" }, { status: 404 });
}