export interface Course {
  id: string;
  title: string;
  university: string;
  category: 'Degree' | 'Certification';
  duration: string;
  fees: string;
  eligibility: string;
  specialization?: string[];
  placement_benefits?: string[];
  topics?: string[];
  image?: string;
  rating?: number;
  students?: string;
  discount?: string;
}

export const UNIVERSITY_COURSES: Course[] = [
  // Amity University Online - UG Courses
  {
    id: 'amity-ug-001',
    title: 'Bachelor of Business Administration (BBA)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '3 Years',
    fees: '₹1,99,000- ₹2,50,000',
    eligibility: '10+2 Pass',
    specialization: ['BBA - General', 'Data Analytics In collaboration with HCL Tech', 'Business Analytics in Collaboration with KPMG', 'Travel And Tourism Management'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327058/bba-online-image_xxyvt0.webp',
    rating: 4.8,
    students: '10k+',
  },
  {
    id: 'amity-ug-002',
    title: 'Bachelor of Computer Applications (BCA)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '3 Years',
    fees: '₹1,75,000 - ₹2,50,000',
    eligibility: '10+2 Pass',
    specialization: ['BCA-General', 'Cloud and Security In collaboration with TCS iON', 'Applied Data Engineering In collaboration with KPMG', 'Data Analytics In collaboration with TCS iON', 'Data Engineering In collaboration with HCL Tech', 'Software Engineering In collaboration with HCL Tech', 'Financial Technology And AI In collaboration with paytm'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327069/bca-online-image_awhemy.webp',
    rating: 4.9,
    students: '8k+',
  },
  {
    id: 'amity-ug-003',
    title: 'Bachelor of Commerce (B.Com)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '3 Years',
    fees: '₹1,15,000 - ₹2,75,000',
    eligibility: '10+2 Pass',
    specialization: ['B.Com-General', 'Hons', 'International Finance & Accounting'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327069/bcom_ra3yam.webp',
    rating: 4.7,
    students: '12k+',
  },
  {
    id: 'amity-ug-004',
    title: 'Bachelor of Arts (BA)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '3 Years',
    fees: '₹1,15,000 - ₹1,90,000',
    eligibility: '10+2 Pass',
    specialization: ['BA-General', 'Journalism and Mass Communication', 'Vernacular Languages', 'English', 'Sociology', 'Political Science', 'Economics'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327036/ba_hakemz.webp',
    rating: 4.6,
    students: '15k+',
  },

  // Amity University Online - PG Courses
  {
    id: 'amity-pg-001',
    title: 'Master of Business Administration (MBA)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '2 Years',
    fees: '₹2,25,000 - ₹3,29,000',
    eligibility: 'Graduation',
    specialization: ['Business Analytics', 'Data Science', 'Digital Entrepreneurship', 'Digital Marketing Management', 'Entrepreneurship and Leadership Management', 'Finance and Accounting Management', 'Global Finance Market', 'Hospitality Management', 'Human Resource Management', 'Human Resources Analytics', 'Information Technology Management', 'Insurance Management', 'International Business Management', 'International Finance (ACCA)', 'Marketing & Sales Management', 'Production and Operations Management', 'Retail Management', 'General Management'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327391/mba-online-image_jklc4w.webp',
    rating: 4.9,
    students: '20k+',
  },
  {
    id: 'amity-pg-002',
    title: 'Master of Computer Applications (MCA)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '2 Years',
    fees: '₹1,90,000- ₹2,75,000',
    eligibility: 'Graduation',
    specialization: ['MCA-General', 'Cyber Security In collaboration with HCL Tech', 'Blockchain Technology And Management', 'Machine Learning and Artificial Intelligence', 'Machine Learning and Artificial Intelligence In collaboration with TCS iON', 'Software Engineering', 'Financial Technology & AI In collaboration with Paytm'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327468/mca-online-image_w3f0sx.webp',
    rating: 4.8,
    students: '7k+',
  },
  {
    id: 'amity-pg-003',
    title: 'Master of Commerce (M.Com)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '2 Years',
    fees: '₹1,50,000',
    eligibility: 'Graduation',
    specialization: ['General', 'Financial Management', 'Financial Technology'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327469/mcom-online-image_e79tno.webp',
    rating: 4.7,
    students: '5k+',
  },
  {
    id: 'amity-pg-004',
    title: 'Master of Arts (MA)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '2 Years',
    fees: '₹1,50,000 - ₹1,90,000',
    eligibility: 'Graduation',
    specialization: ['Journalism and Mass Communication', 'Public Policy & Governance'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327388/ma1_rqnrla.webp',
    rating: 4.6,
    students: '4k+',
  },
  {
    id: 'amity-pg-005',
    title: 'Master of Science (M.Sc)',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '2 Years',
    fees: '₹2,50,000',
    eligibility: 'Graduation',
    specialization: ['Data Science'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327469/mcom-online-image_e79tno.webp',
    rating: 4.9,
    students: '3k+',
  },

  // Amity University Online - Integrated Courses
  {
    id: 'amity-int-001',
    title: 'BBA + MBA',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '4.5-5 Years',
    fees: '₹4,02,800',
    eligibility: '10+2 With recognised boards',
    specialization: ['BBA + MBA'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327391/mba-online-image_jklc4w.webp',
    rating: 4.8,
    students: '2k+',
  },
  {
    id: 'amity-int-002',
    title: 'BCA + MCA',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '4.5-5 Years',
    fees: '₹3,55,300',
    eligibility: '10+2 With recognised boards',
    specialization: ['BCA + MCA'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327468/mca-online-image_w3f0sx.webp',
    rating: 4.9,
    students: '1.5k+',
  },
  {
    id: 'amity-int-003',
    title: 'B.Com + MBA',
    university: 'Amity University Online',
    category: 'Degree',
    duration: '4.5-5 Years',
    fees: '₹3,23,000',
    eligibility: '10+2 With recognised boards',
    specialization: ['B.Com + MBA'],
    image: 'https://res.cloudinary.com/didkrwhbu/image/upload/v1762327469/mcom-online-image_e79tno.webp',
    rating: 4.7,
    students: '1k+',
  },

  // Other Universities
  {
    id: 'univ-002',
    title: 'BCA (Online Degree)',
    university: 'Manipal University Jaipur',
    category: 'Degree',
    duration: '3 Years',
    fees: '₹1,20,000',
    eligibility: '10+2 with Mathematics',
    specialization: ['Software Development', 'Data Science', 'Cloud Computing'],
    placement_benefits: ['Industry Mentorship', 'Job Portal Access', 'Resume Building'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    rating: 4.7,
    students: '3k+',
    discount: '10% Off'
  },
  {
    id: 'univ-003',
    title: 'MCA (Computer Applications)',
    university: 'Chandigarh University Online',
    category: 'Degree',
    duration: '2 Years',
    fees: '₹1,80,000',
    eligibility: 'BCA or Graduation in CS',
    specialization: ['AI & ML', 'Cyber Security', 'Full Stack Development'],
    placement_benefits: ['Direct Campus Placement', 'Soft Skills Training'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    students: '4k+',
    discount: '20% Off'
  }
];

export const TOP_UNIVERSITIES = [
  { 
    id: 'u1', 
    name: "Amity University Online", 
    link: "/amity", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327030/amity_vmd34g.webp", 
  }, 
  { 
    id: 'u2', 
    name: "Amrita Vishwa Vidyapeetham", 
    link: "/amrita", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1770874326/amrita_rq4xlg.jpg", 
  }, 
  { 
    id: 'u3', 
    name: "Lovely Professional University", 
    link: "/lpu-online", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327345/lpu_dj3dun.webp", 
  }, 
  { 
    id: 'u4', 
    name: "Manipal University Jaipur", 
    link: "/manipal", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327389/manipal_nqk6jz.webp", 
  }, 
  { 
    id: 'u5', 
    name: "Manipal Academy of Higher Education", 
    link: "/mahe-online", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327389/mahe-uni_dvnm1d.webp", 
  }, 
  { 
    id: 'u6', 
    name: "Sikkim Manipal University", 
    link: "/smu", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327861/smu-uni_bfti15.webp", 
  }, 
  { 
    id: 'u7', 
    name: "Uttaranchal University", 
    link: "/uu", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327868/uu-uni_j3budp.webp", 
  }, 
  { 
    id: 'u8', 
    name: "Chandigarh University Online", 
    link: "/cuOnline", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327089/chandigarh_w0uyzw.webp", 
  }, 
  { 
    id: 'u9', 
    name: "Jain University", 
    link: "/jain", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327239/jain_hn6im7.webp", 
  }, 
  { 
    id: 'u10', 
    name: "Dr. D Y Patil", 
    link: "/dypatil", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327129/dypatil_tbbpf9.webp", 
  }, 
  { 
    id: 'u11', 
    name: "OP Jindal University", 
    link: "/opjindal", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327835/opjindal_jdl7az.webp", 
  }, 
  { 
    id: 'u12', 
    name: "Kurukshetra University", 
    link: "/ku-online", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327280/ku_xu5nkx.webp", 
  }, 
  { 
    id: 'u13', 
    name: "Shoolini University Online", 
    link: "/shoolini", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327856/shoolini_txvq6k.webp", 
  }, 
  { 
    id: 'u14', 
    name: "Vivekananda Global University Online", 
    link: "/vgu", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327869/vgu1_ieijw9.webp", 
  }, 
  { 
    id: 'u15', 
    name: "UPES Online", 
    link: "/upes", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327863/upes_uzkkmm.webp", 
  }, 
  { 
    id: 'u16', 
    name: "Sharda University Online", 
    link: "/sharda", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327855/sharda_mkidbt.webp", 
  }, 
  { 
    id: 'u17', 
    name: "NMIMS University", 
    link: "/nmims", 
    logo: "https://res.cloudinary.com/didkrwhbu/image/upload/v1762327721/nmims_os8kn9.webp", 
  },
];
