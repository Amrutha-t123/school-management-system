"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { studentService } from "@/services/studentServices";
import { departmentService } from "@/services/departmentServices";
import { Student, Department } from "@/types";
import { StudentDialog } from "@/components/StudentDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>("all"); // Default to "all"
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 1. Fetch Departments on load
  useEffect(() => {
    departmentService.getAll().then(setDepartments);
  }, []);

  // 2. Fetch Students whenever 'selectedDept' changes
  useEffect(() => {
    loadStudents();
  }, [selectedDept]); // <--- This ensures it re-runs when filter changes

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      // ✅ FIX: Pass the selectedDept to the service
      const data = await studentService.getAll(selectedDept);
      setStudents(data);
    } catch (error) {
      console.error("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await studentService.delete(deleteId);
      setDeleteId(null);
      loadStudents();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Students</h2>
        
        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <Select value={selectedDept} onValueChange={setSelectedDept}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => { setEditingStudent(undefined); setIsDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-white">
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
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {/* Handles both nested object and string format */}
                    {student.department?.name || student.departmentName || "N/A"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => { setEditingStudent(student); setIsDialogOpen(true); }}
                    >
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setDeleteId(student.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <StudentDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        studentToEdit={editingStudent}
        onSuccess={loadStudents}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}