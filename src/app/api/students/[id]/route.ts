import { NextResponse } from "next/server";

import { students, departments } from "../../../../lib/mockData";


const findIndex = (id: string) => students.findIndex((s) => s.id === id);


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const index = findIndex(params.id);

    if (index === -1) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    
    let deptName = students[index].departmentName;
    
    if (body.departmentId && body.departmentId !== students[index].departmentId) {
       const newDept = departments.find(d => d.id === body.departmentId);
       if (newDept) {
         deptName = newDept.name;
       }
    }

    
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


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = findIndex(params.id);

  if (index !== -1) {
    students.splice(index, 1);
    return NextResponse.json({ message: "Student deleted successfully" });
  }

  return NextResponse.json({ message: "Student not found" }, { status: 404 });
}