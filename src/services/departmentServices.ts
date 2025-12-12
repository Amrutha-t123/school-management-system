import api from "@/lib/api";
import { Department } from "@/types";

export const departmentService = {
  getAll: async () => {
   
    const response = await api.get<Department[]>("/api/departments");
    return response.data;
  },

  create: async (data: Partial<Department>) => {
    
    const response = await api.post<Department>("/api/departments", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Department>) => {
    
    const response = await api.put<Department>(`/api/departments/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    
    await api.delete(`/api/departments/${id}`);
  },
};