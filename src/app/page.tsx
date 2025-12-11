import Link from "next/link";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { GraduationCap, ArrowRight, UserPlus } from "lucide-react"; // Added UserPlus icon

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="text-center space-y-8 p-8 max-w-2xl">
        
        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 rounded-full">
            <GraduationCap size={64} className="text-blue-600" />
          </div>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          School Management System
        </h1>
        
        {/* Subtitle / Description */}
        <p className="text-lg text-slate-600">
          Welcome to the official portal. Streamline administration, manage departments, 
          track students, and organize teachers—all in one place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          
          {/* Login Button (Primary) */}
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-md px-8 py-6">
              Login to Portal
              <ArrowRight size={18} />
            </Button>
          </Link>

          {/* Register Button (Secondary/Outline) */}
          <Link href="/register">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto gap-2 text-md px-8 py-6 bg-white hover:bg-slate-100"
            >
              Register New User
              <UserPlus size={18} />
            </Button>
          </Link>
          
        </div>
        
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-slate-400 text-sm">
        © 2024 School Admin System. All rights reserved.
      </footer>
    </div>
  );
}