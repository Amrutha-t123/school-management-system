
import api from "@/lib/api";
import { Teacher } from "@/types";

export const teacherService = {
  // Get all teachers (Optional: Filter by Department) [cite: 41, 42]
  getAll: async (departmentId?: string) => {
    // If departmentId exists, add it to URL: /api/teachers?departmentId=123
    const url = departmentId 
      ? `/api/teachers?departmentId=${departmentId}` 
      : "/api/teachers";

    const response = await api.get<Teacher[]>(url);
    return response.data;
  },

  // Get teacher by ID [cite: 45]
  getById: async (id: string) => {
    const response = await api.get<Teacher>(`/api/teachers/${id}`);
    return response.data;
  },

  // Create teacher [cite: 43]
  create: async (data: Partial<Teacher>) => {
    const response = await api.post<Teacher>("/api/teachers", data);
    return response.data;
  },

  // Update teacher [cite: 46]
  update: async (id: string, data: Partial<Teacher>) => {
    const response = await api.put<Teacher>(`/api/teachers/${id}`, data);
    return response.data;
  },

  // Delete teacher [cite: 46]
  delete: async (id: string) => {
    const response = await api.delete(`/api/teachers/${id}`);
    return response.data;
  },
};