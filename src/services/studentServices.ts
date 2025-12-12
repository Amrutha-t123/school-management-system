import api from "@/lib/api";
import { Student } from "@/types";

export const studentService = {
  getAll: async (departmentId?: string) => {
    // ✅ FIX: Add "/api" to the start of the URL
    const url = departmentId && departmentId !== "all" 
      ? `/api/students?departmentId=${departmentId}` 
      : "/api/students";
      
    const response = await api.get<Student[]>(url);
    return response.data;
  },

  create: async (data: Partial<Student>) => {
    // ✅ FIX: Add "/api" here too
    const response = await api.post<Student>("/api/students", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Student>) => {
    // ✅ FIX: And here
    const response = await api.put<Student>(`/api/students/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    // ✅ FIX: And here
    await api.delete(`/api/students/${id}`);
  }
};