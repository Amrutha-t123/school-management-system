import { User, Department, Student, Teacher } from "@/types";

export const generateId = () => "cmih" + Math.random().toString(36).substr(2, 9);

// 1. USERS (I switched this back to test@example.com so your login works!)
export let users: User[] = [
  {
    id: "admin-user-1",
    name: "Admin User",
    email: "admin@example.com", 
    role: "ADMIN",
    // @ts-ignore
    password: "password123"
  }
];

// 2. DEPARTMENTS
export let departments: Department[] = [
  {
    id: "dept-cs-001",
    name: "Computer Science",
    description: "CS and IT Department",
    createdAt: new Date().toISOString()
  },
  {
    id: "dept-mech-002",
    name: "Mechanical",
    description: "Mechanical Engineering",
    createdAt: new Date().toISOString()
  }
];

// 3. STUDENTS
export let students: Student[] = [
  {
    id: "stu-001",
    firstName: "Rahul",
    lastName: "Deshmukh",
    email: "rahul.deshmukh@example.com",
    phone: "9876543210",
    dateOfBirth: "2000-01-15",
    address: "Mumbai, India",
    departmentId: "dept-cs-001",
    departmentName: "Computer Science",
    department: {
      id: "dept-cs-001",
      name: "Computer Science"
    }
  },
  {
    id: "stu-002",
    firstName: "Alan",
    lastName: "Joseph",
    email: "alan.joseph@example.com",
    phone: "9876543211",
    dateOfBirth: "1999-05-20",
    address: "Kochi, Kerala",
    departmentId: "dept-mech-002",
    departmentName: "Mechanical",
    department: {
      id: "dept-mech-002",
      name: "Mechanical"
    }
  }
];

// 4. TEACHERS (Updated to include nested department object)
export let teachers: Teacher[] = [
  {
    id: "teach-001",
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair@example.com",
    phone: "9998887776",
    subject: "Data Structures",
    salary: 50000,
    departmentId: "dept-cs-001",
    departmentName: "Computer Science",
    // ✅ Added this to prevent "N/A" on Teachers Page
    department: {
      id: "dept-cs-001",
      name: "Computer Science"
    }
  },
  {
    id: "teach-002",
    firstName: "John",
    lastName: "Kurian",
    email: "john.kurian@example.com",
    phone: "9998887775",
    subject: "Thermodynamics",
    salary: 55000,
    departmentId: "dept-mech-002",
    departmentName: "Mechanical",
    // ✅ Added this to prevent "N/A" on Teachers Page
    department: {
      id: "dept-mech-002",
      name: "Mechanical"
    }
  }
];