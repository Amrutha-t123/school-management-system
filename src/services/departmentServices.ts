// src/services/departmentService.ts
import api from "@/lib/api";
import { Department } from "@/types";

export const departmentService = {
  // Get all departments [cite: 29]
  getAll: async () => {
    const response = await api.get<Department[]>("/api/departments");
    return response.data;
  },

  // Get department by ID [cite: 31]
  getById: async (id: string) => {
    const response = await api.get<Department>(`/api/departments/${id}`);
    return response.data;
  },

  // Create department [cite: 30]
  create: async (data: Partial<Department>) => {
    const response = await api.post<Department>("/api/departments", data);
    return response.data;
  },

  // Update department [cite: 32]
  update: async (id: string, data: Partial<Department>) => {
    const response = await api.put<Department>(`/api/departments/${id}`, data);
    return response.data;
  },

  // Delete department [cite: 33]
  delete: async (id: string) => {
    const response = await api.delete(`/api/departments/${id}`);
    return response.data;
  },
};