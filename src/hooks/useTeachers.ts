import { useState, useEffect, useCallback } from 'react';
import { teacherService } from '@/services/teacherServices';

import { Teacher } from '@/types/index'; 


export function useTeachers(departmentId?: string) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await teacherService.getAll(departmentId);
      setTeachers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch teachers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [departmentId]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return { teachers, loading, error, refresh: fetchTeachers };
}