import { NextResponse } from "next/server";

import { students } from "@/lib/mockData"; 

type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  
  
  const student = students.find((s) => s.id === id);
  
  if (student) return NextResponse.json(student);
  return NextResponse.json({ message: "Student not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const index = students.findIndex((s) => s.id === id);

    if (index > -1) {
      students[index] = { ...students[index], ...body, updatedAt: new Date().toISOString() };
      return NextResponse.json(students[index]);
    }
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating student" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const index = students.findIndex((s) => s.id === id);

  if (index > -1) {
    students.splice(index, 1);
    return NextResponse.json({ message: "Student deleted successfully" });
  }
  return NextResponse.json({ message: "Student not found" }, { status: 404 });
}