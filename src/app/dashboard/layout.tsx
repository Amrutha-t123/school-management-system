"use client";

import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        {/* Fixed Sidebar */}
        <Sidebar />
        
        {/* Main Content  */}
        <main className="flex-1 ml-64 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}