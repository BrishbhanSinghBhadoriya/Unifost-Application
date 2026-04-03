import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  course_interested?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'enrolled' | 'closed';
  created_at: any;
}

const ENQUIRIES_COLLECTION = 'enquiries';

export const enquiryService = {
  createEnquiry: async (enquiry: Omit<Enquiry, 'id' | 'created_at'>): Promise<{ id?: string; error?: string }> => {
    try {
      const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), {
        ...enquiry,
        created_at: serverTimestamp(),
        status: 'pending'
      });
      return { id: docRef.id };
    } catch (error: any) {
      console.error('Error creating enquiry:', error);
      return { error: error.message };
    }
  },

  getAllEnquiries: async (): Promise<{ data?: Enquiry[]; error?: string }> => {
    try {
      const q = query(collection(db, ENQUIRIES_COLLECTION), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const enquiries = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        created_at: doc.data().created_at?.toDate()?.toISOString() || new Date().toISOString()
      } as Enquiry));
      return { data: enquiries };
    } catch (error: any) {
      console.error('Error fetching enquiries:', error);
      return { error: error.message };
    }
  },

  updateStatus: async (id: string, status: string): Promise<{ error?: string }> => {
    try {
      const docRef = doc(db, ENQUIRIES_COLLECTION, id);
      await updateDoc(docRef, { status });
      return {};
    } catch (error: any) {
      console.error('Error updating enquiry status:', error);
      return { error: error.message };
    }
  },
};
