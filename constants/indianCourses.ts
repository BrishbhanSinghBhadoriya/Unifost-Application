export interface CertificationCourse {
  id: string;
  title: string;
  university: string;
  category: string;
  duration: string;
  fees: string;
  eligibility: string;
  topics: string[];
  certificate_type: 'Certificate' | 'PG Certificate' | 'Advanced Certificate';
  image?: string;
  discount?: string;
}

export const CERTIFICATION_COURSES: CertificationCourse[] = [
  // ==================== VALUE ADDED CERTIFICATION COURSES ====================
  
  // --- IT & TECH CERTIFICATIONS ---
  {
    id: 'vac-cert-001',
    title: 'Certificate in Artificial Intelligence',
    university: 'AI & Future Tech Track',
    category: 'Artificial Intelligence',
    duration: '3-4 Months',
    fees: '₹20,000 - ₹35,000',
    eligibility: 'Any background',
    topics: ['AI Fundamentals', 'Machine Learning Basics', 'Neural Networks', 'AI Tools', 'Real-world Applications'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-002',
    title: 'Certificate in Business Analytics',
    university: 'Data-Driven Business Track',
    category: 'Business Analytics',
    duration: '2-3 Months',
    fees: '₹18,000 - ₹32,000',
    eligibility: 'Any Graduation',
    topics: ['Data Analysis', 'Business Intelligence', 'BI Tools', 'Visualization', 'Decision Making'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-003',
    title: 'Certificate in Digital Marketing',
    university: 'Digital Growth & Branding Track',
    category: 'Digital Marketing',
    duration: '2-3 Months',
    fees: '₹15,000 - ₹28,000',
    eligibility: 'Any background',
    topics: ['SEO/SEM', 'Social Media Marketing', 'Email Marketing', 'Content Strategy', 'Google Analytics'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-004',
    title: 'Certificate in e-Commerce',
    university: 'Online Business & Retail Tech Track',
    category: 'Business',
    duration: '2-3 Months',
    fees: '₹18,000 - ₹30,000',
    eligibility: 'Any background',
    topics: ['e-Commerce Fundamentals', 'Online Store Setup', 'Payment Gateways', 'Digital Marketing for eCommerce', 'Logistics & Supply Chain'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-005',
    title: 'Certificate in Java Programming',
    university: 'Core Programming & Software Dev Track',
    category: 'Programming',
    duration: '3-4 Months',
    fees: '₹20,000 - ₹35,000',
    eligibility: '10+2 with basic computer knowledge',
    topics: ['Java Basics', 'OOP Concepts', 'Data Structures', 'JDBC', 'Mini Projects'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-006',
    title: 'Certificate in PHP Development',
    university: 'Web Backend Development Track',
    category: 'Programming',
    duration: '3-4 Months',
    fees: '₹18,000 - ₹30,000',
    eligibility: '10+2 with basic computer knowledge',
    topics: ['PHP Fundamentals', 'MySQL Integration', 'Form Handling', 'Session Management', 'Web Application Development'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-007',
    title: 'Certificate in .NET Development',
    university: 'Microsoft Tech Stack Track',
    category: 'Programming',
    duration: '3-4 Months',
    fees: '₹20,000 - ₹35,000',
    eligibility: '10+2 with basic computer knowledge',
    topics: ['C# Basics', 'ASP.NET', 'MVC Framework', 'Entity Framework', 'Web APIs'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-008',
    title: 'Certificate in Android Development',
    university: 'Mobile App Innovation Track',
    category: 'App Development',
    duration: '3-4 Months',
    fees: '₹22,000 - ₹38,000',
    eligibility: 'IT Background preferred',
    topics: ['Android Studio', 'Java/Kotlin', 'UI Design', 'APIs Integration', 'App Deployment on Play Store'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-009',
    title: 'Certificate in C++ Programming',
    university: 'Competitive Programming & DSA Track',
    category: 'Programming',
    duration: '2-3 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background',
    topics: ['C++ Basics', 'OOP in C++', 'Pointers & Memory', 'STL', 'Problem Solving'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-010',
    title: 'Certificate in Linux Administration',
    university: 'Open Source & Server Management Track',
    category: 'IT Skills',
    duration: '2-3 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'IT Background preferred',
    topics: ['Linux Commands', 'File System', 'Shell Scripting', 'User Management', 'Networking in Linux'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-011',
    title: 'Certificate in Cyber Security',
    university: 'Ethical Hacking & Digital Defense Track',
    category: 'Cybersecurity',
    duration: '3-4 Months',
    fees: '₹25,000 - ₹40,000',
    eligibility: 'IT Background preferred',
    topics: ['Network Security', 'Ethical Hacking Basics', 'Firewalls & IDS', 'Cryptography', 'Compliance & Legal Framework'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-012',
    title: 'Certificate in Website Designing',
    university: 'UI/UX & Creative Web Design Track',
    category: 'Web Development',
    duration: '2-3 Months',
    fees: '₹15,000 - ₹28,000',
    eligibility: 'Any background',
    topics: ['HTML5 & CSS3', 'JavaScript Basics', 'Responsive Design', 'UI/UX Principles', 'Figma Prototyping'],
    certificate_type: 'Certificate'
  },

  // --- PRINTING & PACKAGING CERTIFICATIONS ---
  {
    id: 'vac-cert-013',
    title: 'Certificate in Printing & Packaging Management',
    university: 'Print Industry & Packaging Excellence Track',
    category: 'Printing & Packaging',
    duration: '6 Months',
    fees: '₹35,000 - ₹55,000',
    eligibility: 'Any Graduation',
    topics: ['Printing Technologies', 'Packaging Design', 'Quality Control', 'Supply Chain in Print Industry', 'Sustainability in Packaging'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-014',
    title: 'Certificate in Printing & Packaging',
    university: 'Print Production & Design Track',
    category: 'Printing & Packaging',
    duration: '3-4 Months',
    fees: '₹20,000 - ₹35,000',
    eligibility: '10+2 passed',
    topics: ['Offset Printing', 'Flexography', 'Packaging Materials', 'Label Design', 'Industry Standards'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-015',
    title: 'Certificate in 3D Printing',
    university: 'Advanced Manufacturing & Prototyping Track',
    category: 'Manufacturing Technology',
    duration: '2-3 Months',
    fees: '₹18,000 - ₹30,000',
    eligibility: 'Any background',
    topics: ['3D Printing Fundamentals', 'CAD/CAM Basics', 'Material Science', 'FDM & SLA Technologies', 'Prototyping'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-016',
    title: 'Certificate in Entrepreneurship in Printing & Packaging',
    university: 'Print Business & Startup Launchpad Track',
    category: 'Entrepreneurship',
    duration: '3-4 Months',
    fees: '₹20,000 - ₹35,000',
    eligibility: 'Any background',
    topics: ['Business Planning', 'Print Industry Overview', 'Market Research', 'Startup Funding', 'Business Development'],
    certificate_type: 'Certificate'
  },

  // --- FINANCE & BUSINESS CERTIFICATIONS ---
  {
    id: 'vac-cert-017',
    title: 'NISM Certification (Securities Market)',
    university: 'Stock Market & Investment Track',
    category: 'Finance',
    duration: '1-2 Months',
    fees: '₹5,000 - ₹15,000',
    eligibility: 'Any background',
    topics: ['Capital Markets', 'Mutual Funds', 'Derivatives', 'Equity & Debt Markets', 'SEBI Regulations'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-018',
    title: 'Certificate in Six Sigma',
    university: 'Process Excellence & Quality Management Track',
    category: 'Operations',
    duration: '2-3 Months',
    fees: '₹25,000 - ₹45,000',
    eligibility: 'Any Graduation',
    topics: ['Six Sigma Fundamentals', 'DMAIC Methodology', 'Statistical Tools', 'Process Improvement', 'Green/Yellow Belt Prep'],
    certificate_type: 'Certificate'
  },

  // --- SOCIAL & PROFESSIONAL DEVELOPMENT ---
  {
    id: 'vac-cert-019',
    title: 'Certificate in Corporate Social Responsibility (CSR)',
    university: 'Sustainable Business & ESG Track',
    category: 'Business',
    duration: '2-3 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background',
    topics: ['CSR Frameworks', 'Stakeholder Management', 'Sustainability Reporting', 'ESG Principles', 'Community Engagement'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-020',
    title: 'Certificate in Personality Development and Communication Skills',
    university: 'Professional Growth & Life Skills Track',
    category: 'Soft Skills',
    duration: '1-2 Months',
    fees: '₹10,000 - ₹18,000',
    eligibility: 'Any background',
    topics: ['Personal Branding', 'Public Speaking', 'Body Language', 'Interpersonal Skills', 'Professional Etiquette'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-021',
    title: 'Certificate in Environmental Awareness',
    university: 'Climate Action & Green Sustainability Track',
    category: 'Environmental Science',
    duration: '1-2 Months',
    fees: '₹8,000 - ₹15,000',
    eligibility: 'Any background',
    topics: ['Climate Change Basics', 'Pollution & Waste', 'Environmental Laws', 'Sustainable Practices', 'Green Economy'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vac-cert-022',
    title: 'Certificate Course in Human Rights',
    university: 'Social Justice & Legal Awareness Track',
    category: 'Law',
    duration: '1-2 Months',
    fees: '₹8,000 - ₹15,000',
    eligibility: 'Any background',
    topics: ['Human Rights Fundamentals', 'UN Conventions', 'Constitutional Rights', 'Social Justice', 'Case Studies'],
    certificate_type: 'Certificate'
  },
];

export const getCertificationById = (id: string): CertificationCourse | undefined => {
  return CERTIFICATION_COURSES.find(c => c.id === id);
};

export const getCertificationsByUniversity = (university: string): CertificationCourse[] => {
  return CERTIFICATION_COURSES.filter(c => c.university.toLowerCase().includes(university.toLowerCase()));
};

export const getCertificationsByCategory = (category: string): CertificationCourse[] => {
  return CERTIFICATION_COURSES.filter(c => c.category.toLowerCase() === category.toLowerCase());
};

export const getAllCertificationCategories = (): string[] => {
  const categories = new Set(CERTIFICATION_COURSES.map(c => c.category));
  return Array.from(categories).sort();
};

export const searchCertifications = (query: string): CertificationCourse[] => {
  const lowerQuery = query.toLowerCase();
  return CERTIFICATION_COURSES.filter(c =>
    c.title.toLowerCase().includes(lowerQuery) ||
    c.university.toLowerCase().includes(lowerQuery) ||
    c.category.toLowerCase().includes(lowerQuery) ||
    c.topics.some(t => t.toLowerCase().includes(lowerQuery))
  );
};

export const getCertificationsByDuration = (duration: 'short' | 'medium' | 'long'): CertificationCourse[] => {
  return CERTIFICATION_COURSES.filter(c => {
    const dur = c.duration.toLowerCase();
    if (duration === 'short') return dur.includes('week') || dur.includes('month') && !dur.includes('6') && !dur.includes('12');
    if (duration === 'medium') return (dur.includes('3') || dur.includes('4') || dur.includes('6')) && dur.includes('month');
    if (duration === 'long') return dur.includes('year') || dur.includes('12');
    return false;
  });
};

export const getFreeCertifications = (): CertificationCourse[] => {
  return CERTIFICATION_COURSES.filter(c => c.fees.includes('FREE') || c.fees === '₹0');
};

export const getUniversityCertificationCount = (): { [key: string]: number } => {
  const counts: { [key: string]: number } = {};
  CERTIFICATION_COURSES.forEach(c => {
    counts[c.university] = (counts[c.university] || 0) + 1;
  });
  return counts;
};