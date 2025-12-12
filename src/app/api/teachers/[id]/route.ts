import { NextResponse } from "next/server";

import { teachers, departments } from "../../../../lib/mockData";


const findIndex = (id: string) => teachers.findIndex((t) => t.id === id);


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const teacher = teachers.find((t) => t.id === params.id);

  if (!teacher) {
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
  }

  return NextResponse.json(teacher);
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const index = findIndex(params.id);

    if (index === -1) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

   
    let deptName = teachers[index].departmentName;
    
    if (body.departmentId && body.departmentId !== teachers[index].departmentId) {
       const newDept = departments.find(d => d.id === body.departmentId);
       if (newDept) {
         deptName = newDept.name;
       }
    }

    
    teachers[index] = { 
        ...teachers[index], 
        ...body, 
        departmentName: deptName 
    };

    return NextResponse.json(teachers[index]);
  } catch (error) {
    return NextResponse.json({ message: "Error updating teacher" }, { status: 500 });
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = findIndex(params.id);

  if (index !== -1) {
    teachers.splice(index, 1);
    return NextResponse.json({ message: "Teacher deleted successfully" });
  }

  return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
}