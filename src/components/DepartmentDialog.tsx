"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { departmentService } from "@/services/departmentServices"; 
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

interface DepartmentDialogProps {
  department?: any; 
  onSuccess: () => void;
}

export default function DepartmentDialog({ department, onSuccess }: DepartmentDialogProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: department || { name: "", description: "" },
  });

  const onSubmit = async (data: any) => {
    try {
      if (department) {
        await departmentService.update(department.id, data);
      } else {
        await departmentService.create(data);
      }
      setOpen(false);
      reset();
      onSuccess(); 
    } catch (error) {
      alert("Failed to save department");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={department ? "outline" : "default"}>
          {department ? "Edit" : "Add Department"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{department ? "Edit Department" : "Add New Department"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input {...register("name", { required: true })} placeholder="e.g. Science" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input {...register("description")} placeholder="e.g. Physics and Chem" />
          </div>
          <Button type="submit" className="w-full">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}