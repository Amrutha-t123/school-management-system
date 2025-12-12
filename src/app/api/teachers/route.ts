import { NextResponse } from "next/server";

import { teachers, departments, generateId } from "../../../lib/mockData";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departmentId = searchParams.get("departmentId");

  
  if (departmentId) {
    const filteredTeachers = teachers.filter((t) => t.departmentId === departmentId);
    return NextResponse.json(filteredTeachers);
  }

  
  return NextResponse.json(teachers);
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    
    const department = departments.find((d) => d.id === body.departmentId);

    const newTeacher = {
      id: generateId(),
      ...body, 
      departmentName: department ? department.name : "Unknown Department",
      createdAt: new Date().toISOString()
    };

    teachers.push(newTeacher);

    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating teacher" }, { status: 500 });
  }
}