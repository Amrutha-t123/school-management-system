// src/services/studentService.ts
import api from "@/lib/api";
import { Student } from "@/types";

export const studentService = {
  // Get all students (Optional: Filter by Department) [cite: 35, 36]
  getAll: async (departmentId?: string) => {
    // If departmentId exists, add it to URL: /api/students?departmentId=123
    const url = departmentId 
      ? `/api/students?departmentId=${departmentId}` 
      : "/api/students";
      
    const response = await api.get<Student[]>(url);
    return response.data;
  },

  // Get student by ID [cite: 37]
  getById: async (id: string) => {
    const response = await api.get<Student>(`/api/students/${id}`);
    return response.data;
  },

  // Create student  (Note: PDF lists POST /api/students)
  create: async (data: Partial<Student>) => {
    const response = await api.post<Student>("/api/students", data);
    return response.data;
  },

  // Update student [cite: 38]
  update: async (id: string, data: Partial<Student>) => {
    const response = await api.put<Student>(`/api/students/${id}`, data);
    return response.data;
  },

  // Delete student [cite: 39]
  delete: async (id: string) => {
    const response = await api.delete(`/api/students/${id}`);
    return response.data;
  },
};