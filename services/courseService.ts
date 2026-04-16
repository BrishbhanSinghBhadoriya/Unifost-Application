import { CertificationCourse, CERTIFICATION_COURSES, getCertificationById } from '@/constants/indianCourses';
import { UNIVERSITY_COURSES, Course as UniversityCourse } from '@/constants/universityCourses';

export type AnyCourse = CertificationCourse | UniversityCourse;

export const courseService = {
  getAllCourses: async (): Promise<{ data?: AnyCourse[]; error?: string }> => {
    try {
      // Combine both types of courses
      const allCourses = [
        ...UNIVERSITY_COURSES,
        ...CERTIFICATION_COURSES
      ];
      return { data: allCourses };
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      return { error: error.message };
    }
  },

  getCourseById: async (id: string): Promise<{ data?: AnyCourse; error?: string }> => {
    try {
      // Check in University Courses first
      const univCourse = UNIVERSITY_COURSES.find(c => c.id === id);
      if (univCourse) return { data: univCourse };

      // Then check in Certification Courses
      const certCourse = getCertificationById(id);
      if (certCourse) return { data: certCourse };

      return { error: 'Course not found' };
    } catch (error: any) {
      console.error('Error fetching course:', error);
      return { error: error.message };
    }
  },

  getFeaturedCourses: async (): Promise<{ data?: AnyCourse[]; error?: string }> => {
    try {
      // Featured are usually Degree courses now
      const courses = UNIVERSITY_COURSES.slice(0, 5);
      return { data: courses };
    } catch (error: any) {
      console.error('Error fetching featured courses:', error);
      return { error: error.message };
    }
  },

  getTrendingCourses: async (): Promise<{ data?: AnyCourse[]; error?: string }> => {
    try {
      const courses = CERTIFICATION_COURSES.slice(0, 5);
      return { data: courses };
    } catch (error: any) {
      console.error('Error fetching trending courses:', error);
      return { error: error.message };
    }
  }
};
