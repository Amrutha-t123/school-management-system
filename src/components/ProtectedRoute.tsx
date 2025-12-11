"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  
  // 1. Initialize state to TRUE (We are loading by default)
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 2. This code ONLY runs on the client browser
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login
      router.push("/login");
    } else {
      // If token exists, allow access
      setIsAuthenticated(true);
    }
    
    // 3. Loading is finished
    setIsLoading(false);
  }, [router]);

  // 4. Show Spinner while loading (Matches Server behavior)
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // 5. If not authenticated, show nothing (while redirecting)
  if (!isAuthenticated) {
    return null;
  }

  // 6. If authenticated, show the Dashboard
  return <>{children}</>;
}