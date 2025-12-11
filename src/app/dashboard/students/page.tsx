"use client";
import { useState } from "react";
import { useStudents } from "@/hooks/useStudents";
import { useDepartments } from "@/hooks/useDepartments";
import { studentService } from "@/services/studentServices"; // Update path
import StudentDialog from "@/components/StudentDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function StudentsPage() {
  const [selectedDept, setSelectedDept] = useState("");
  const { students, loading, refresh } = useStudents(selectedDept); // Filter by dept
  const { departments } = useDepartments();

  const handleDelete = async (id: string) => {
    if (confirm("Delete this student?")) {
      await studentService.delete(id);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>
        
        {/* Filter Dropdown */}
        <select 
          className="border p-2 rounded-md" 
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        
        <StudentDialog onSuccess={refresh} />
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow> :
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.firstName} {student.lastName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.department?.name || "N/A"}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <StudentDialog student={student} onSuccess={refresh} />
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(student.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}