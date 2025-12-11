import { NextResponse } from "next/server";
// ✅ FIXED IMPORT: Using relative path to find mockData from 4 folders deep
import { students, departments } from "../../../../lib/mockData";

// Helper to find the index of a student
const findIndex = (id: string) => students.findIndex((s) => s.id === id);

// GET: Fetch a single student by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}

// PUT: Update a specific Student
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const index = findIndex(params.id);

    if (index === -1) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    // Logic: If the departmentId is changed, we must also update the departmentName
    let deptName = students[index].departmentName;
    
    if (body.departmentId && body.departmentId !== students[index].departmentId) {
       const newDept = departments.find(d => d.id === body.departmentId);
       if (newDept) {
         deptName = newDept.name;
       }
    }

    // Update the student data
    students[index] = { 
        ...students[index], 
        ...body, 
        departmentName: deptName 
    };

    return NextResponse.json(students[index]);
  } catch (error) {
    return NextResponse.json({ message: "Error updating student" }, { status: 500 });
  }
}

// DELETE: Remove a specific Student
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = findIndex(params.id);

  if (index !== -1) {
    students.splice(index, 1);
    return NextResponse.json({ message: "Student deleted successfully" });
  }

  return NextResponse.json({ message: "Student not found" }, { status: 404 });
}