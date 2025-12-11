"use client";
import { useDepartments } from "@/hooks/useDepartments";
import { departmentService } from "@/services/departmentServices"; // Update path if needed
import DepartmentDialog from "@/components/DepartmentDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DepartmentsPage() {
  const { departments, loading, refresh } = useDepartments();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure? This action cannot be undone.")) {
      await departmentService.delete(id);
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Departments</h1>
        <DepartmentDialog onSuccess={refresh} />
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
            ) : departments.length === 0 ? (
               <TableRow><TableCell colSpan={3} className="text-center">No departments found.</TableCell></TableRow>
            ) : (
              // The '?' makes it safe. If departments is null, it won't crash.
               departments?.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>{dept.description}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <DepartmentDialog department={dept} onSuccess={refresh} />
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(dept.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}