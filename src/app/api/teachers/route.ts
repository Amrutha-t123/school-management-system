import { NextResponse } from "next/server";
// ✅ FIXED IMPORT: Using relative path to find mockData from 3 folders deep
import { teachers, departments, generateId } from "../../../lib/mockData";

// GET: Fetch all teachers (Optional: Filter by Department ID)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");

  // If a departmentId is provided in the URL, filter the list
  if (departmentId) {
    const filteredTeachers = teachers.filter((t) => t.departmentId === departmentId);
    return NextResponse.json(filteredTeachers);
  }

  // Otherwise, return all teachers
  return NextResponse.json(teachers);
}

// POST: Create a new Teacher
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Find the department to get its name (for display purposes)
    const department = departments.find((d) => d.id === body.departmentId);

    const newTeacher = {
      id: generateId(),
      ...body, // Spreads firstName, lastName, subject, salary, etc.
      departmentName: department ? department.name : "Unknown Department",
      createdAt: new Date().toISOString()
    };

    teachers.push(newTeacher);

    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating teacher" }, { status: 500 });
  }
}