import api from "@/lib/api";
import { Teacher } from "@/types";

export const teacherService = {
  getAll: async (departmentId?: string) => {
    // ✅ FIX: Added "/api" prefix AND logic for filtering
    const url = departmentId && departmentId !== "all" 
      ? `/api/teachers?departmentId=${departmentId}` 
      : "/api/teachers";

    const response = await api.get<Teacher[]>(url);
    return response.data;
  },

  create: async (data: Partial<Teacher>) => {
    // ✅ FIX: Added "/api" prefix
    const response = await api.post<Teacher>("/api/teachers", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Teacher>) => {
    // ✅ FIX: Added "/api" prefix
    const response = await api.put<Teacher>(`/api/teachers/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    // ✅ FIX: Added "/api" prefix
    await api.delete(`/api/teachers/${id}`);
  },
};