import { useState, useEffect, useCallback } from 'react';
import { departmentService } from '@/services/departmentServices';
import { Department } from '@/types';

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]); // Default is empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await departmentService.getAll();
      
      // ✅ SAFETY CHECK (സുരക്ഷാ പരിശോധന)
      // Check if the received data is actually an Array (List)
      if (Array.isArray(data)) {
        setDepartments(data);
        setError(null);
      } else {
        // If not array, log it to see what went wrong
        console.error("API Error - Not an array:", data); 
        setDepartments([]); // Prevent crash by setting empty list
        setError("Invalid data received from server");
      }

    } catch (err: any) {
      setError('Failed to fetch departments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return { departments, loading, error, refresh: fetchDepartments };
}