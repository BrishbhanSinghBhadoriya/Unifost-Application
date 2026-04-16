export interface Video {
  id: string;
  title: string;
  description?: string; // Added description
  duration: string;
  isFree: boolean;
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  videos: Video[];
}

export interface Course {
  id: string;
  title: string;
  university?: string; // Added university
  shortDescription: string;
  description: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice: number;
  thumbnail: string;
  image: string; // for compatibility with CourseCard
  instructor: {
    name: string;
    title: string;
    role: string; // for compatibility with CourseCard
    avatar: string;
    bio: string;
    rating: number;
    students: number;
    courses: number;
  };
  rating: number;
  totalRatings: number;
  totalStudents: number;
  highlights: string[];
  modules: Module[];
  tags: string[];
  language: string;
  curriculum: string[]; // for compatibility with CourseCard
  isFeatured?: boolean;
  isTrending?: boolean;
}

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    university: 'IIT Bombay', // Added demo university
    shortDescription: 'Master modern web development from frontend to backend.',
    description: 'This comprehensive course covers everything you need to become a professional full-stack web developer. You will learn HTML, CSS, JavaScript, React, Node.js, and more.',
    category: 'Web Development',
    duration: '1 Year',
    level: 'Beginner',
    price: 499,
    originalPrice: 999,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    instructor: {
      name: 'John Doe',
      title: 'Senior Full Stack Developer',
      role: 'Senior Developer',
      avatar: 'https://i.pravatar.cc/150?u=john',
      bio: 'John has over 10 years of experience in building scalable web applications.',
      rating: 4.9,
      students: 15000,
      courses: 12,
    },
    rating: 4.8,
    totalRatings: 1250,
    totalStudents: 5000,
    highlights: [
      'Build 10+ real-world projects',
      'Learn React, Node.js, and MongoDB',
      'Career guidance and resume building',
      'Lifetime access to course materials',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Web Development',
        videos: [
          { 
            id: 'v1', 
            title: 'Welcome to the Course', 
            description: 'A brief introduction to the course and what you will learn.', // Added demo description
            duration: '5:00', 
            isFree: true, 
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
          },
          { 
            id: 'v2', 
            title: 'How the Web Works', 
            description: 'Understanding the basic architecture of the World Wide Web.', // Added demo description
            duration: '10:00', 
            isFree: true, 
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
          },
        ],
      },
      {
        id: 'm2',
        title: 'HTML & CSS Basics',
        videos: [
          { 
            id: 'v3', 
            title: 'HTML5 Elements', 
            description: 'Learning about the new elements introduced in HTML5.', // Added demo description
            duration: '15:00', 
            isFree: false, 
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
          },
          { 
            id: 'v4', 
            title: 'CSS3 Styling', 
            description: 'Advanced styling techniques using CSS3.', // Added demo description
            duration: '20:00', 
            isFree: false, 
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
          },
        ],
      },
    ],
    tags: ['Web', 'React', 'Node', 'Full Stack'],
    language: 'English',
    curriculum: ['HTML/CSS/JS', 'React & Next.js', 'Node.js & Express', 'MongoDB & PostgreSQL'],
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Data Science & Machine Learning',
    university: 'IIM Ahmedabad', // Added demo university
    shortDescription: 'Learn data analysis, visualization, and ML models.',
    description: 'Dive deep into the world of data. Learn how to extract insights from data and build predictive models using Python and popular ML libraries.',
    category: 'Data Science',
    duration: '6 Months',
    level: 'Intermediate',
    price: 299,
    originalPrice: 599,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    instructor: {
      name: 'Jane Smith',
      title: 'Data Scientist at Tech Corp',
      role: 'Data Scientist',
      avatar: 'https://i.pravatar.cc/150?u=jane',
      bio: 'Jane is a passionate data scientist with a PhD in Statistics.',
      rating: 4.8,
      students: 8000,
      courses: 5,
    },
    rating: 4.9,
    totalRatings: 850,
    totalStudents: 3200,
    highlights: [
      'Hands-on experience with Python',
      'Real-world data analysis projects',
      'Learn Scikit-learn and TensorFlow',
      'Interactive coding exercises',
    ],
    modules: [
      {
        id: 'm1',
        title: 'Python for Data Science',
        videos: [
          { 
            id: 'v5', 
            title: 'Introduction to Python', 
            description: 'Getting started with Python programming for data science.', // Added demo description
            duration: '8:00', 
            isFree: true, 
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
          },
          { 
            id: 'v6', 
            title: 'NumPy and Pandas', 
            description: 'Essential libraries for data manipulation in Python.', // Added demo description
            duration: '12:00', 
            isFree: false, 
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' 
          },
        ],
      },
    ],
    tags: ['Data Science', 'Python', 'ML', 'AI'],
    language: 'English',
    curriculum: ['Python for Data Science', 'Statistical Analysis', 'Machine Learning Models', 'Deep Learning'],
    isTrending: true,
  },
];

export const getCourseById = (id: string) => COURSES.find(c => c.id === id);
export const getFeaturedCourses = () => COURSES.slice(0, 2);
export const getTrendingCourses = () => COURSES.slice(0, 2);
