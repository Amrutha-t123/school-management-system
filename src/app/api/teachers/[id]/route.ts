import { NextResponse } from "next/server";

import { teachers } from "@/lib/mockData"; 

type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  
  const teacher = teachers.find((t) => t.id === id);
  
  if (teacher) {
    return NextResponse.json(teacher);
  }
  return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  
  try {
    const body = await request.json();
    const index = teachers.findIndex((t) => t.id === id);

    if (index > -1) {
      teachers[index] = { ...teachers[index], ...body, updatedAt: new Date().toISOString() };
      return NextResponse.json(teachers[index]);
    }
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating teacher" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  
  const index = teachers.findIndex((t) => t.id === id);

  if (index > -1) {
    teachers.splice(index, 1);
    return NextResponse.json({ message: "Teacher deleted successfully" });
  }
  return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
}