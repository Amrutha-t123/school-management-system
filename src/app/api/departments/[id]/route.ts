import { NextResponse } from "next/server";
// ✅ FIXED IMPORT: Using relative path to find mockData from 4 folders deep
import { departments } from "../../../../lib/mockData";

// Helper function to find the index of a department
const findIndex = (id: string) => departments.findIndex((d) => d.id === id);

// PUT: Update a specific Department
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const index = findIndex(params.id);

    // If department not found, return 404
    if (index === -1) {
      return NextResponse.json({ message: "Department not found" }, { status: 404 });
    }

    // Update the department data
    departments[index] = { 
        ...departments[index], 
        ...body, 
        updatedAt: new Date().toISOString() 
    };

    return NextResponse.json(departments[index]);
  } catch (error) {
    return NextResponse.json({ message: "Error updating department" }, { status: 500 });
  }
}

// DELETE: Remove a specific Department
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = findIndex(params.id);

  if (index !== -1) {
    // Remove 1 item at the found index
    departments.splice(index, 1);
    return NextResponse.json({ message: "Department deleted successfully" });
  }

  return NextResponse.json({ message: "Department not found" }, { status: 404 });
}