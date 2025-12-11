import { User, Department, Student, Teacher } from "@/types";

// Helper to generate IDs
export const generateId = () => "cmih" + Math.random().toString(36).substr(2, 20);

// ========================================================
// 1. MOCK USERS
// Extracted from "Register User" response
// ========================================================
export let users: User[] = [
  {
    id: "existing-id",
    name: "Test User",
    email: "test@example.com",
    role: "ADMIN",
    // @ts-ignore
    password: "password123" 
  },
  
  {
    id: "my-id-1",
    name: "My Name",
    email: "myemail@gmail.com",  
    role: "ADMIN",
    // @ts-ignore
    password: "mypassword"      
  }
];

// ========================================================
// 2. MOCK DEPARTMENTS
// Extracted from "Get All Departments" response
// ========================================================
export let departments: Department[] = [
  {
    id: "cmih31hwc00044cqnp90dd9vy",
    name: "Science",
    description: "Department of Science and Engineering",
    createdAt: "2025-11-27T06:58:45.635Z"
  },
  {
    id: "cmih3079a00024cqncg6kmn3w",
    name: "Computer Science Updated",
    description: "Updated description for CS Department",
    createdAt: "2025-11-27T06:57:45.189Z"
  }
];

// ========================================================
// 3. MOCK STUDENTS
// Extracted from "Get All Students" response
// ========================================================
export let students: Student[] = [
  {
    id: "cmih34qc000084cqngc71gxxl",
    firstName: "John",
    lastName: "Doe 2",
    email: "john.doe2@example.com",
    phone: "+1234567890",
    dateOfBirth: "2000-01-15T00:00:00.000Z",
    address: "123 Main St, City, State",
    // Matches "Computer Science Updated" ID
    departmentId: "cmih3079a00024cqncg6kmn3w", 
    departmentName: "Computer Science Updated"
  },
  {
    id: "cmih3358k00064cqn5j9e8tqh",
    firstName: "John Updated",
    lastName: "Doe Updated",
    email: "john.updated@example.com",
    phone: "+1234567891",
    dateOfBirth: "2000-01-15T00:00:00.000Z",
    address: "456 Updated St, City, State",
    // Matches "Computer Science Updated" ID
    departmentId: "cmih3079a00024cqncg6kmn3w",
    departmentName: "Computer Science Updated"
  }
];

// ========================================================
// 4. MOCK TEACHERS
// Extracted from "Get All Teachers" response
// ========================================================
export let teachers: Teacher[] = [
  {
    id: "cmih375ex000c4cqnxtk05fue",
    firstName: "Jane",
    lastName: "Smith 2",
    email: "jane.smith2@example.com",
    phone: "+1234567890",
    dateOfBirth: "1985-05-20T00:00:00.000Z",
    address: "789 Oak Ave, City, State",
    subject: "Computer Science",
    salary: 60000,
    // Matches "Computer Science Updated" ID
    departmentId: "cmih3079a00024cqncg6kmn3w",
    departmentName: "Computer Science Updated"
  },
  {
    id: "cmih35t9v000a4cqnug04o6hu",
    firstName: "Jane Updated",
    lastName: "Smith Updated",
    email: "jane.updated@example.com",
    phone: "+1234567891",
    dateOfBirth: "1985-05-20T00:00:00.000Z",
    address: "321 Pine St, City, State",
    subject: "Data Science",
    salary: 65000,
    // Matches "Computer Science Updated" ID
    departmentId: "cmih3079a00024cqncg6kmn3w",
    departmentName: "Computer Science Updated"
  }
];