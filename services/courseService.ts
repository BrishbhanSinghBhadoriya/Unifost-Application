import { CertificationCourse, CERTIFICATION_COURSES, getCertificationById } from '@/constants/indianCourses';

export const courseService = {
  getAllCourses: async (): Promise<{ data?: CertificationCourse[]; error?: string }> => {
    try {
      // Simulate network request
      return { data: CERTIFICATION_COURSES };
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      return { error: error.message };
    }
  },

  getCourseById: async (id: string): Promise<{ data?: CertificationCourse; error?: string }> => {
    try {
      const course = getCertificationById(id);
      if (course) {
        return { data: course };
      } else {
        return { error: 'Course not found' };
      }
    } catch (error: any) {
      console.error('Error fetching course:', error);
      return { error: error.message };
    }
  },

  getFeaturedCourses: async (): Promise<{ data?: CertificationCourse[]; error?: string }> => {
    try {
      const courses = CERTIFICATION_COURSES.slice(0, 5);
      return { data: courses };
    } catch (error: any) {
      console.error('Error fetching featured courses:', error);
      return { error: error.message };
    }
  },

  getTrendingCourses: async (): Promise<{ data?: CertificationCourse[]; error?: string }> => {
    try {
      const courses = CERTIFICATION_COURSES.slice(4, 9);
      return { data: courses };
    } catch (error: any) {
      console.error('Error fetching trending courses:', error);
      return { error: error.message };
    }
  }
};
