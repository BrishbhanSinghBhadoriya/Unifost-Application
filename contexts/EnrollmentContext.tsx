import React, { createContext, useContext, useState } from 'react';

export interface Enrollment {
  id: string;
  course_id: string;
  completed: boolean;
  enrolled_at: string;
}

export interface Certificate {
  id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
}

interface EnrollmentContextType {
  enrollments: Enrollment[];
  certificates: Certificate[];
  loading: boolean;
  enroll: (courseId: string) => Promise<{ error?: string }>;
  isEnrolled: (courseId: string) => boolean;
  markCompleted: (courseId: string) => Promise<void>;
  issueCertificate: (courseId: string) => Promise<{ data?: Certificate, error?: string }>;
  getCertificate: (courseId: string) => Certificate | null;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export const EnrollmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(false);

  const enroll = async (courseId: string) => {
    if (isEnrolled(courseId)) {
      return { error: 'unique' };
    }
    const newEnrollment: Enrollment = {
      id: Math.random().toString(36).substr(2, 9),
      course_id: courseId,
      completed: false,
      enrolled_at: new Date().toISOString(),
    };
    setEnrollments([...enrollments, newEnrollment]);
    return {};
  };

  const isEnrolled = (courseId: string) => enrollments.some(e => e.course_id === courseId);

  const markCompleted = async (courseId: string) => {
    setEnrollments(prev => prev.map(e => e.course_id === courseId ? { ...e, completed: true } : e));
  };

  const issueCertificate = async (courseId: string) => {
    const existing = getCertificate(courseId);
    if (existing) return { data: existing };

    const newCert: Certificate = {
      id: Math.random().toString(36).substr(2, 9),
      course_id: courseId,
      certificate_number: `CERT-${Math.floor(Math.random() * 1000000)}`,
      issued_at: new Date().toISOString(),
    };
    setCertificates([...certificates, newCert]);
    return { data: newCert };
  };

  const getCertificate = (courseId: string) => certificates.find(c => c.course_id === courseId) || null;

  return (
    <EnrollmentContext.Provider value={{
      enrollments,
      certificates,
      loading,
      enroll,
      isEnrolled,
      markCompleted,
      issueCertificate,
      getCertificate,
    }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollments = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error('useEnrollments must be used within an EnrollmentProvider');
  }
  return context;
};
