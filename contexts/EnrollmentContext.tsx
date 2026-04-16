import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  doc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { useAuth } from './AuthContext';

export interface Enrollment {
  id: string;
  course_id: string;
  user_id: string;
  completed: boolean;
  enrolled_at: any;
  progress: number;
}

export interface Certificate {
  id: string;
  course_id: string;
  user_id: string;
  certificate_number: string;
  issued_at: any;
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
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  // Load enrollments from Firestore
  useEffect(() => {
    if (!user) {
      setEnrollments([]);
      setCertificates([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Listen to enrollments
    const enrollmentsQuery = query(
      collection(db, 'enrollments'), 
      where('user_id', '==', user.id)
    );

    const unsubscribeEnrollments = onSnapshot(enrollmentsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Enrollment[];
      setEnrollments(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching enrollments:", error);
      setLoading(false);
    });

    // Listen to certificates
    const certsQuery = query(
      collection(db, 'certificates'), 
      where('user_id', '==', user.id)
    );

    const unsubscribeCerts = onSnapshot(certsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Certificate[];
      setCertificates(data);
    });

    return () => {
      unsubscribeEnrollments();
      unsubscribeCerts();
    };
  }, [user]);

  const enroll = async (courseId: string) => {
    if (!user) return { error: 'Please login to enroll' };
    
    if (isEnrolled(courseId)) {
      return { error: 'Already enrolled in this course' };
    }

    try {
      const enrollmentData = {
        course_id: courseId,
        user_id: user.id,
        completed: false,
        progress: 0,
        enrolled_at: serverTimestamp(),
      };

      await addDoc(collection(db, 'enrollments'), enrollmentData);
      return {};
    } catch (error: any) {
      console.error("Enrollment error:", error);
      return { error: error.message };
    }
  };

  const isEnrolled = (courseId: string) => enrollments.some(e => e.course_id === courseId);

  const markCompleted = async (courseId: string) => {
    if (!user) return;
    const enrollment = enrollments.find(e => e.course_id === courseId);
    if (enrollment) {
      const enrollmentRef = doc(db, 'enrollments', enrollment.id);
      await updateDoc(enrollmentRef, { completed: true, progress: 1 });
    }
  };

  const issueCertificate = async (courseId: string) => {
    if (!user) return { error: 'Please login' };
    
    const existing = getCertificate(courseId);
    if (existing) return { data: existing };

    try {
      const newCertData = {
        course_id: courseId,
        user_id: user.id,
        certificate_number: `CERT-${Math.floor(Math.random() * 1000000)}`,
        issued_at: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'certificates'), newCertData);
      return { data: { id: docRef.id, ...newCertData } as any };
    } catch (error: any) {
      return { error: error.message };
    }
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
