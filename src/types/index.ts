// src/types/index.ts
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

// src/types/index.ts

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  departmentId: string;
  departmentName?: string;
  
  // ✅ UPDATE THIS PART: Add 'id' here
  department?: {
    id: string;     // <--- This was missing!
    name: string;
  };
}

// You might need to do the same for Teacher if you get a similar error later:
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  salary?: number;
  dateOfBirth?: string;
  address?: string;
  departmentId: string;
  departmentName?: string;
  
  // ✅ Add this for Teacher too if needed
  department?: {
    id: string;
    name: string;
  };
}