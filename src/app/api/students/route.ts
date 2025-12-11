import { NextResponse } from "next/server";
// ✅ FIXED IMPORT: Using relative path to find mockData from 3 folders deep
import { students, departments, generateId } from "../../../lib/mockData";

// GET: Fetch all students (Optional: Filter by Department ID)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");

  // If a departmentId is provided in the URL, filter the list
  if (departmentId) {
    const filteredStudents = students.filter((s) => s.departmentId === departmentId);
    return NextResponse.json(filteredStudents);
  }

  // Otherwise, return all students
  return NextResponse.json(students);
}

// POST: Create a new Student
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Find the department to get its name (for display purposes)
    const department = departments.find((d) => d.id === body.departmentId);

    const newStudent = {
      id: generateId(),
      ...body, // Spreads firstName, lastName, email, etc.
      departmentName: department ? department.name : "Unknown Department",
      createdAt: new Date().toISOString()
    };

    students.push(newStudent);

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating student" }, { status: 500 });
  }
}