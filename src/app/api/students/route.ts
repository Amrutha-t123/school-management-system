import { NextResponse } from "next/server";
// Use relative path
import { students, departments, generateId } from "../../../lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");

  if (departmentId) {
    const filteredStudents = students.filter((s) => s.departmentId === departmentId);
    return NextResponse.json(filteredStudents);
  }
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Find the full department object
    const department = departments.find((d) => d.id === body.departmentId);

    const newStudent = {
      id: generateId(),
      ...body,
      // ✅ FIX: Save the department details as an object
      department: department ? { id: department.id, name: department.name } : null,
      departmentName: department ? department.name : "Unknown",
      createdAt: new Date().toISOString()
    };

    students.push(newStudent);

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating student" }, { status: 500 });
  }
}