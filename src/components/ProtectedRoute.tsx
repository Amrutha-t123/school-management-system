"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  
 
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (!token) {
      
      router.push("/login");
    } else {
      
      setIsAuthenticated(true);
    }
    
    
    setIsLoading(false);
  }, [router]);

  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  
  if (!isAuthenticated) {
    return null;
  }

  
  return <>{children}</>;
}