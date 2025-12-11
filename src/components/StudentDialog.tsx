"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { studentService } from "@/services/studentServices"; // Update path
import { useDepartments } from "@/hooks/useDepartments"; // To show dept list
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";

interface Props {
  student?: any;
  onSuccess: () => void;
}

export default function StudentDialog({ student, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const { departments } = useDepartments(); // Get departments for dropdown
  const { register, handleSubmit, reset } = useForm({
    defaultValues: student || { firstName: "", lastName: "", email: "", departmentId: "" }
  });

  const onSubmit = async (data: any) => {
    try {
      if (student) await studentService.update(student.id, data);
      else await studentService.create(data);
      setOpen(false); reset(); onSuccess();
    } catch (e) { alert("Error saving student"); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={student ? "outline" : "default"}>{student ? "Edit" : "Add Student"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{student ? "Edit" : "Add"} Student</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>First Name</Label><Input {...register("firstName")} required /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input {...register("lastName")} required /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input {...register("email")} type="email" required /></div>
          
          <div className="space-y-2">
            <Label>Department</Label>
            <select {...register("departmentId")} className="w-full border p-2 rounded-md bg-white">
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}