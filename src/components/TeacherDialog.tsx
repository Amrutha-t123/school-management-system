"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { teacherService } from "@/services/teacherServices"; // Ensure this service exists
import { useDepartments } from "@/hooks/useDepartments"; // To show departments in dropdown
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface Props {
  teacher?: any; // If passed, we are in Edit Mode
  onSuccess: () => void; // Function to refresh the list after saving
}

export default function TeacherDialog({ teacher, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { departments } = useDepartments(); // Fetch departments for the dropdown

  const { register, handleSubmit, reset } = useForm({
    defaultValues: teacher || {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      phone: "",
      departmentId: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (teacher) {
        await teacherService.update(teacher.id, data); // Edit existing
      } else {
        await teacherService.create(data); // Create new
      }
      setOpen(false);
      reset();
      onSuccess(); // Refresh parent page
    } catch (error) {
      alert("Failed to save teacher details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={teacher ? "outline" : "default"}>
          {teacher ? "Edit" : "Add Teacher"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{teacher ? "Edit Teacher" : "Add New Teacher"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input {...register("firstName", { required: true })} placeholder="Jane" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input {...register("lastName", { required: true })} placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input {...register("email", { required: true })} type="email" placeholder="jane@school.com" />
          </div>

          <div className="space-y-2">
            <Label>Subject</Label>
            <Input {...register("subject", { required: true })} placeholder="Mathematics" />
          </div>

          <div className="space-y-2">
            <Label>Department</Label>
            <select
              {...register("departmentId", { required: true })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Save Teacher"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}