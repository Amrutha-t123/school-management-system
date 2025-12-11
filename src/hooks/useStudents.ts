// src/hooks/useStudents.ts
import { useState, useEffect, useCallback } from 'react';
import { studentService } from '@/services/studentServices';
import { Student } from '@/types';

export function useStudents(departmentId?: string) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      // Pass departmentId to the service if it exists
      const data = await studentService.getAll(departmentId);
      setStudents(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [departmentId]); // Re-run if departmentId changes

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return { 
    students, 
    loading, 
    error, 
    refresh: fetchStudents 
  };
}