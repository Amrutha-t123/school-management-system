"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Building2, Loader2 } from "lucide-react";
// Import the services
import { departmentService } from "@/services/departmentServices";
import { studentService } from "@/services/studentServices";
import { teacherService } from "@/services/teacherServices";

export default function DashboardPage() {
  // State to hold the numbers
  const [stats, setStats] = useState({
    departments: 0,
    students: 0,
    teachers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Fetch all data from the API
        const [depts, students, teachers] = await Promise.all([
          departmentService.getAll(),
          studentService.getAll(),
          teacherService.getAll(),
        ]);

        // 2. Count the items (.length) and update state
        setStats({
          departments: depts.length || 0,
          students: students.length || 0,
          teachers: teachers.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        Dashboard Overview
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Departments Card */}
        <DashboardCard
          title="Total Departments"
          count={stats.departments}
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          loading={isLoading}
          subtext="Active departments"
        />

        {/* Students Card */}
        <DashboardCard
          title="Total Students"
          count={stats.students}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          loading={isLoading}
          subtext="Enrolled students"
        />

        {/* Teachers Card */}
        <DashboardCard
          title="Total Teachers"
          count={stats.teachers}
          icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
          loading={isLoading}
          subtext="Faculty members"
        />
      </div>
    </div>
  );
}

// Helper Component for the Cards
function DashboardCard({
  title,
  count,
  icon,
  loading,
  subtext,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  loading: boolean;
  subtext: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 mt-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-xs text-muted-foreground">Loading...</span>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{count}</div>
            <p className="text-xs text-muted-foreground">{subtext}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}