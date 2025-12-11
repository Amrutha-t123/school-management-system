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

export interface Student {
  id: string;
  firstName: string; 
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  departmentId: string;
  departmentName?: string; 
  // If the API returns the department object nested:
  department?: {
    name: string;
  };
}

// ✅ FIXED: Changed 'name' to 'firstName' and 'lastName' to match API
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  salary?: number;
  
  // ✅ Added these two lines to fix the error
  dateOfBirth?: string;
  address?: string;

  departmentId: string;
  departmentName?: string;
  department?: {
    name: string;
  };
}