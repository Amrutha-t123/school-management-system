import api from "@/lib/api";
import { Department } from "@/types";

export const departmentService = {
  getAll: async () => {
    // ✅ FIX: Added "/api" prefix
    const response = await api.get<Department[]>("/api/departments");
    return response.data;
  },

  create: async (data: Partial<Department>) => {
    // ✅ FIX: Added "/api" prefix
    const response = await api.post<Department>("/api/departments", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Department>) => {
    // ✅ FIX: Added "/api" prefix
    const response = await api.put<Department>(`/api/departments/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    // ✅ FIX: Added "/api" prefix
    await api.delete(`/api/departments/${id}`);
  },
};