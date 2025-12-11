import api from "@/lib/api";
import { AuthResponse, User } from "@/types";

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Register
  register: async (data: Partial<User> & { password?: string }) => {
    const response = await api.post<AuthResponse>("/api/auth/register", data);
    return response.data;
  },

  // Login
  login: async (data: LoginData) => {
    const response = await api.post<AuthResponse>("/api/auth/login", data);
    return response.data;
  },
};

export default authService;
