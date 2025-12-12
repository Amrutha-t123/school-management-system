import { useState, useEffect, useCallback } from 'react';
import { departmentService } from '@/services/departmentServices';
import { Department } from '@/types';

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await departmentService.getAll();
      
      
      if (Array.isArray(data)) {
        setDepartments(data);
        setError(null);
      } else {
        
        console.error("API Error - Not an array:", data); 
        setDepartments([]); 
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