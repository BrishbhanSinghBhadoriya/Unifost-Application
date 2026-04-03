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
}

export const CERTIFICATION_COURSES: CertificationCourse[] = [
  // ==================== MANIPAL UNIVERSITY ====================
  {
    id: 'manip-cert-001',
    title: 'Post Graduate Certificate in Data Science & Machine Learning',
    university: 'Manipal Institute of Technology',
    category: 'Data Science',
    duration: '9 Months',
    fees: '₹85,000 - ₹1,20,000',
    eligibility: 'Bachelor\'s Degree in any discipline',
    topics: ['Python Programming', 'Database Management & SQL', 'Statistical Techniques', 'EDA & Feature Engineering', 'Machine Learning Models', 'Data Visualization', 'Capstone Projects'],
    certificate_type: 'PG Certificate'
  },
  {
    id: 'manip-cert-002',
    title: 'Certificate in Supply Chain Management & Logistics',
    university: 'Manipal Academy of Higher Education',
    category: 'Supply Chain',
    duration: '6 Months',
    fees: '₹40,000 - ₹60,000',
    eligibility: 'Graduation in any discipline',
    topics: ['Supply Chain Fundamentals', 'Logistics Strategy', 'Inventory Management', 'Global Logistics', 'Procurement Management', 'Customer Value Management'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-003',
    title: 'Certificate in Anaesthesia Technology',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '6-12 Months',
    fees: '₹30,000 - ₹50,000',
    eligibility: '10+2 passed or Nursing qualification',
    topics: ['Anaesthesia Principles', 'Operation Theatre Assistance', 'Patient Monitoring', 'Equipment Handling', 'Safety Procedures'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-004',
    title: 'Certificate in Dialysis Technology',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '6-12 Months',
    fees: '₹30,000 - ₹50,000',
    eligibility: '10+2 passed or Nursing qualification',
    topics: ['Dialysis Equipment Operation', 'Patient Care Procedures', 'Water Treatment', 'Infection Control', 'Troubleshooting'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-005',
    title: 'Certificate in ECG (Electrocardiography) Technology',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '3-6 Months',
    fees: '₹25,000 - ₹40,000',
    eligibility: '10+2 passed or Medical background',
    topics: ['ECG Machine Operation', 'Cardiac Rhythm Interpretation', 'Patient Positioning', 'Report Generation', 'Cardiology Basics'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-006',
    title: 'Certificate in EEG (Electroencephalography) Technology',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '6 Months',
    fees: '₹30,000 - ₹45,000',
    eligibility: '10+2 passed or Medical background',
    topics: ['EEG Equipment Operation', 'Recording Techniques', 'Electrode Placement', 'Seizure Detection', 'Report Writing'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-007',
    title: 'Certificate in ENT (Ear, Nose, Throat) Procedures',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '6 Months',
    fees: '₹30,000 - ₹45,000',
    eligibility: '10+2 passed or Medical background',
    topics: ['ENT Anatomy', 'Instrument Handling', 'Procedure Assistance', 'Patient Care', 'Safety Management'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-008',
    title: 'Certificate in Ophthalmology (Eye Care)',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '6 Months',
    fees: '₹30,000 - ₹45,000',
    eligibility: '10+2 passed or Medical background',
    topics: ['Eye Anatomy', 'Ophthalmic Procedures', 'Vision Testing', 'Instrument Handling', 'Patient Assistance'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-009',
    title: 'Certificate in Laboratory Technician Skills',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '6 Months',
    fees: '₹25,000 - ₹40,000',
    eligibility: '10+2 passed',
    topics: ['Lab Safety', 'Sample Collection', 'Testing Procedures', 'Equipment Maintenance', 'Report Handling'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-010',
    title: 'Certificate in Medical Records Management',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '3-6 Months',
    fees: '₹20,000 - ₹35,000',
    eligibility: '10+2 passed',
    topics: ['Record Keeping', 'Data Management', 'Privacy Laws', 'Filing Systems', 'Digital Records'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-011',
    title: 'Certificate in Pulmonary (Respiratory) Procedures',
    university: 'Manipal College of Health Professions',
    category: 'Healthcare',
    duration: '6 Months',
    fees: '₹30,000 - ₹45,000',
    eligibility: '10+2 passed or Medical background',
    topics: ['Respiratory Anatomy', 'Lung Function Testing', 'Breathing Procedures', 'Equipment Handling', 'Patient Care'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-012',
    title: 'Certificate in French Language (Various Levels)',
    university: 'Manipal Department of Languages',
    category: 'Languages',
    duration: '3-6 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background (age 14+)',
    topics: ['French Grammar', 'Conversation', 'Reading', 'Writing', 'Cultural Knowledge'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-013',
    title: 'Certificate in German Language (Various Levels)',
    university: 'Manipal Department of Languages',
    category: 'Languages',
    duration: '3-6 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background (age 14+)',
    topics: ['German Grammar', 'Conversation Skills', 'Reading & Writing', 'Pronunciation', 'Cultural Context'],
    certificate_type: 'Certificate'
  },
  {
    id: 'manip-cert-014',
    title: 'Post Graduate Certificate in Business Analytics',
    university: 'Manipal University Online',
    category: 'Business Analytics',
    duration: '12 Months',
    fees: '₹1,20,000 - ₹1,40,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Data Analysis', 'Business Intelligence', 'Analytics Tools', 'Visualization', 'Decision Making'],
    certificate_type: 'PG Certificate'
  },
  {
    id: 'manip-cert-015',
    title: 'Post Graduate Certificate in Entrepreneurship',
    university: 'Manipal University Online',
    category: 'Business',
    duration: '12 Months',
    fees: '₹1,20,000 - ₹1,40,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Business Planning', 'Startup Development', 'Fundraising', 'Marketing Strategy', 'Leadership Skills'],
    certificate_type: 'PG Certificate'
  },

  // ==================== AMITY UNIVERSITY ====================
  {
    id: 'amity-cert-001',
    title: 'AI Certification Program (8 Modules)',
    university: 'Amity School of AI',
    category: 'Artificial Intelligence',
    duration: '3 Months',
    fees: '₹45,000 (or FREE with scholarship)',
    eligibility: 'Any Graduation',
    topics: ['AI Fundamentals', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'AI in Healthcare', 'AI Ethics', 'Business Applications'],
    certificate_type: 'Certificate'
  },
  {
    id: 'amity-cert-002',
    title: 'Blockchain Management - Post Graduate Program',
    university: 'Amity University Online',
    category: 'Blockchain',
    duration: '6 Months',
    fees: '₹80,000 - ₹1,20,000',
    eligibility: 'Bachelor\'s Degree (Any stream)',
    topics: ['Blockchain Fundamentals', 'Smart Contracts', 'Cryptocurrency', 'Ethereum Development', 'DeFi & DAOs', 'Security & Cryptography', 'Real-world Applications'],
    certificate_type: 'PG Certificate'
  },
  {
    id: 'amity-cert-003',
    title: 'Data Science - Post Graduate Diploma/Certificate',
    university: 'Amity University Online',
    category: 'Data Science',
    duration: '6-8 Weeks (8 Modules)',
    fees: '₹60,000 - ₹90,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Data Modeling', 'Machine Learning', 'Advanced Analytics', 'Python Programming', 'Data Visualization', 'Statistical Analysis', 'Industry Projects'],
    certificate_type: 'PG Certificate'
  },
  {
    id: 'amity-cert-004',
    title: 'KPMG Data Analytics Certification',
    university: 'Amity University + KPMG',
    category: 'Business Analytics',
    duration: '32 Hours / 6-8 Weeks',
    fees: '₹25,000 (or FREE)',
    eligibility: 'Any Graduation',
    topics: ['Data Processing', 'Regression Techniques', 'Business Intelligence', 'Data Visualization', 'BI Tools', 'KPMG Internship'],
    certificate_type: 'Certificate'
  },
  {
    id: 'amity-cert-005',
    title: 'Free AI & ML Certification (Pre-Degree)',
    university: 'Amity Open Learn',
    category: 'AI/ML',
    duration: 'Self-paced',
    fees: '₹0 (FREE)',
    eligibility: 'Any background',
    topics: ['AI Basics', 'Machine Learning Concepts', 'Practical Applications', 'Project-based Learning'],
    certificate_type: 'Certificate'
  },
  {
    id: 'amity-cert-006',
    title: 'Free Data Science Certification (Pre-Degree)',
    university: 'Amity Open Learn',
    category: 'Data Science',
    duration: 'Self-paced',
    fees: '₹0 (FREE)',
    eligibility: 'Any background',
    topics: ['Data Fundamentals', 'Analytics Concepts', 'Visualization', 'Real-world Applications'],
    certificate_type: 'Certificate'
  },
  {
    id: 'amity-cert-007',
    title: 'Free Digital Marketing Certification (Pre-Degree)',
    university: 'Amity Open Learn',
    category: 'Digital Marketing',
    duration: 'Self-paced',
    fees: '₹0 (FREE)',
    eligibility: 'Any background',
    topics: ['Digital Strategy', 'SEO/SEM', 'Social Media', 'Email Marketing', 'Analytics'],
    certificate_type: 'Certificate'
  },
  {
    id: 'amity-cert-008',
    title: 'Free Cloud Computing Certification (Pre-Degree)',
    university: 'Amity Open Learn',
    category: 'Cloud Computing',
    duration: 'Self-paced',
    fees: '₹0 (FREE)',
    eligibility: 'IT Background preferred',
    topics: ['Cloud Fundamentals', 'AWS/Azure/GCP', 'Architecture', 'Deployment'],
    certificate_type: 'Certificate'
  },

  // ==================== SHARDA UNIVERSITY ====================
  {
    id: 'sharda-cert-001',
    title: 'Certificate in Digital Marketing',
    university: 'Sharda University Online',
    category: 'Digital Marketing',
    duration: '6 Months',
    fees: '₹45,000 - ₹65,000',
    eligibility: 'Any Graduation',
    topics: ['SEO', 'SEM', 'Social Media Marketing', 'Email Marketing', 'Content Strategy', 'Google Analytics', 'Digital Analytics'],
    certificate_type: 'Certificate'
  },
  {
    id: 'sharda-cert-002',
    title: 'Certificate in Web Development Basics',
    university: 'Sharda University',
    category: 'Web Development',
    duration: '3-4 Months',
    fees: '₹30,000 - ₹50,000',
    eligibility: '10+2 passed',
    topics: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Web Design Principles'],
    certificate_type: 'Certificate'
  },
  {
    id: 'sharda-cert-003',
    title: 'Certificate in Advanced Excel',
    university: 'Sharda University',
    category: 'Software Skills',
    duration: '4-6 Weeks',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background',
    topics: ['Formulas', 'Data Analysis', 'Pivot Tables', 'Charts', 'Advanced Functions'],
    certificate_type: 'Certificate'
  },
  {
    id: 'sharda-cert-004',
    title: 'Certificate in Business Communication Skills',
    university: 'Sharda University',
    category: 'Soft Skills',
    duration: '2-3 Months',
    fees: '₹20,000 - ₹35,000',
    eligibility: 'Any background',
    topics: ['Professional Communication', 'Presentation Skills', 'Written Communication', 'Interpersonal Skills'],
    certificate_type: 'Certificate'
  },

  // ==================== UPES ====================
  {
    id: 'upes-cert-001',
    title: 'Certificate in Data Science & Analytics',
    university: 'UPES Online',
    category: 'Data Science',
    duration: '6-9 Months',
    fees: '₹85,000 - ₹1,20,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Python Programming', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization', 'Analytics Tools'],
    certificate_type: 'Certificate'
  },
  {
    id: 'upes-cert-002',
    title: 'Certificate in Cloud Computing (AWS/Azure/GCP)',
    university: 'UPES Online',
    category: 'Cloud Computing',
    duration: '3-6 Months',
    fees: '₹60,000 - ₹90,000',
    eligibility: 'IT Background preferred',
    topics: ['AWS Fundamentals', 'Azure Cloud', 'GCP Basics', 'Cloud Architecture', 'Security', 'Deployment'],
    certificate_type: 'Certificate'
  },
  {
    id: 'upes-cert-003',
    title: 'Certificate in Cybersecurity Basics',
    university: 'UPES Online',
    category: 'Cybersecurity',
    duration: '4-6 Months',
    fees: '₹50,000 - ₹80,000',
    eligibility: 'IT Background preferred',
    topics: ['Network Security', 'Ethical Hacking', 'Data Protection', 'Cryptography', 'Security Best Practices'],
    certificate_type: 'Certificate'
  },
  {
    id: 'upes-cert-004',
    title: 'Certificate in AI & Machine Learning Basics',
    university: 'UPES Online',
    category: 'AI/ML',
    duration: '3-4 Months',
    fees: '₹45,000 - ₹75,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['AI Fundamentals', 'ML Algorithms', 'Neural Networks', 'Practical Projects', 'Industry Applications'],
    certificate_type: 'Certificate'
  },
  {
    id: 'upes-cert-005',
    title: 'Certificate in Renewable Energy Management',
    university: 'UPES',
    category: 'Energy',
    duration: '6 Months',
    fees: '₹55,000 - ₹85,000',
    eligibility: 'Engineering/Science background',
    topics: ['Solar Energy', 'Wind Energy', 'Energy Management', 'Sustainability', 'Policy Framework'],
    certificate_type: 'Certificate'
  },

  // ==================== LPU (Lovely Professional University) ====================
  {
    id: 'lpu-cert-001',
    title: 'Certificate in Web Development & Design',
    university: 'LPU',
    category: 'Web Development',
    duration: '3-4 Months',
    fees: '₹35,000 - ₹55,000',
    eligibility: '10+2 passed',
    topics: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX Basics'],
    certificate_type: 'Certificate'
  },
  {
    id: 'lpu-cert-002',
    title: 'Certificate in Mobile App Development',
    university: 'LPU',
    category: 'App Development',
    duration: '4-6 Months',
    fees: '₹45,000 - ₹75,000',
    eligibility: 'IT Background preferred',
    topics: ['Android Development', 'iOS Basics', 'Cross-platform Development', 'Deployment', 'Testing'],
    certificate_type: 'Certificate'
  },
  {
    id: 'lpu-cert-003',
    title: 'Certificate in Cloud Computing (AWS)',
    university: 'LPU',
    category: 'Cloud Computing',
    duration: '3-4 Months',
    fees: '₹50,000 - ₹80,000',
    eligibility: 'IT Background preferred',
    topics: ['AWS Fundamentals', 'EC2', 'S3', 'Databases', 'Architecture', 'Certification Prep'],
    certificate_type: 'Certificate'
  },
  {
    id: 'lpu-cert-004',
    title: 'Certificate in Data Science Basics',
    university: 'LPU',
    category: 'Data Science',
    duration: '3-4 Months',
    fees: '₹40,000 - ₹65,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Python', 'Data Analysis', 'Statistics', 'Visualization', 'ML Basics'],
    certificate_type: 'Certificate'
  },
  {
    id: 'lpu-cert-005',
    title: 'Certificate in Cybersecurity',
    university: 'LPU',
    category: 'Cybersecurity',
    duration: '4-6 Months',
    fees: '₹55,000 - ₹85,000',
    eligibility: 'IT Background',
    topics: ['Network Security', 'Ethical Hacking', 'Penetration Testing', 'Firewalls', 'Incident Response'],
    certificate_type: 'Certificate'
  },
  {
    id: 'lpu-cert-006',
    title: 'Certificate in Digital Marketing',
    university: 'LPU',
    category: 'Digital Marketing',
    duration: '2-3 Months',
    fees: '₹30,000 - ₹50,000',
    eligibility: 'Any background',
    topics: ['SEO', 'SEM', 'Social Media Marketing', 'Analytics', 'Content Strategy'],
    certificate_type: 'Certificate'
  },

  // ==================== CHANDIGARH UNIVERSITY ====================
  {
    id: 'cu-cert-001',
    title: 'Certificate in Digital Marketing',
    university: 'Chandigarh University',
    category: 'Digital Marketing',
    duration: '4-6 Weeks',
    fees: '₹25,000 - ₹40,000',
    eligibility: 'Any background',
    topics: ['Digital Strategy', 'SEO/SEM', 'Social Media', 'Email Marketing', 'Google Analytics'],
    certificate_type: 'Certificate'
  },
  {
    id: 'cu-cert-002',
    title: 'Certificate in Web Development',
    university: 'Chandigarh University',
    category: 'Web Development',
    duration: '8-10 Weeks',
    fees: '₹35,000 - ₹55,000',
    eligibility: 'IT Background preferred',
    topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Backend Basics'],
    certificate_type: 'Certificate'
  },
  {
    id: 'cu-cert-003',
    title: 'KPMG Certificate in Business Analytics',
    university: 'Chandigarh University + KPMG',
    category: 'Business Analytics',
    duration: '6-8 Weeks',
    fees: '₹30,000 - ₹50,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Data Analysis', 'BI Tools', 'Business Intelligence', 'Problem Solving', 'Reporting'],
    certificate_type: 'Certificate'
  },
  {
    id: 'cu-cert-004',
    title: 'Harvard Business Review Certification Programs',
    university: 'Chandigarh University',
    category: 'Business',
    duration: 'Self-paced (4-8 weeks)',
    fees: '₹15,000 - ₹35,000',
    eligibility: 'Any background',
    topics: ['Strategic Thinking', 'Leadership', 'Business Excellence', 'Innovation'],
    certificate_type: 'Certificate'
  },

  // ==================== KURUKSHETRA UNIVERSITY ====================
  {
    id: 'kuk-cert-001',
    title: 'Certificate in Supply Chain Management',
    university: 'Kurukshetra University',
    category: 'Supply Chain',
    duration: '6-12 Months',
    fees: '₹35,000 - ₹55,000',
    eligibility: 'Any Graduation',
    topics: ['Supply Chain Fundamentals', 'Logistics', 'Inventory Control', 'Procurement', 'Vendor Management'],
    certificate_type: 'Certificate'
  },
  {
    id: 'kuk-cert-002',
    title: 'Tally Prime - Accounting Certification',
    university: 'Kurukshetra University',
    category: 'Accounting',
    duration: '2-3 Months',
    fees: '₹10,000 - ₹20,000',
    eligibility: 'Any background',
    topics: ['Tally Software', 'Accounting Basics', 'GST Compliance', 'Financial Reporting', 'Payroll Management'],
    certificate_type: 'Certificate'
  },
  {
    id: 'kuk-cert-003',
    title: 'Certificate in French Language (Beginner to Advanced)',
    university: 'Kurukshetra University',
    category: 'Languages',
    duration: '3-6 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background (age 14+)',
    topics: ['French Grammar', 'Conversation', 'Reading & Writing', 'Pronunciation', 'Cultural Knowledge'],
    certificate_type: 'Certificate'
  },
  {
    id: 'kuk-cert-004',
    title: 'Certificate in German Language (Beginner to Advanced)',
    university: 'Kurukshetra University',
    category: 'Languages',
    duration: '3-6 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background (age 14+)',
    topics: ['German Grammar', 'Conversation Skills', 'Reading & Writing', 'Pronunciation', 'Culture'],
    certificate_type: 'Certificate'
  },
  {
    id: 'kuk-cert-005',
    title: 'Certificate in Japanese Language',
    university: 'Kurukshetra University',
    category: 'Languages',
    duration: '3-6 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background (age 14+)',
    topics: ['Japanese Writing', 'Hiragana & Katakana', 'Basic Conversation', 'Culture', 'Business Japanese'],
    certificate_type: 'Certificate'
  },
  {
    id: 'kuk-cert-006',
    title: 'Certificate in Communication Skills',
    university: 'Kurukshetra University',
    category: 'Soft Skills',
    duration: '2-3 Months',
    fees: '₹15,000 - ₹25,000',
    eligibility: 'Any background',
    topics: ['Verbal Communication', 'Non-verbal Communication', 'Presentation', 'Listening Skills', 'Professional Etiquette'],
    certificate_type: 'Certificate'
  },
  {
    id: 'kuk-cert-007',
    title: 'Certificate in Yoga & Wellness',
    university: 'Kurukshetra University',
    category: 'Health & Wellness',
    duration: '1-3 Months',
    fees: '₹10,000 - ₹20,000',
    eligibility: 'Any age/background',
    topics: ['Yoga Asanas', 'Pranayama', 'Meditation', 'Health Benefits', 'Lifestyle Management'],
    certificate_type: 'Certificate'
  },
  {
    id: 'kuk-cert-008',
    title: 'Certificate in Basic Computer & Web Design',
    university: 'Kurukshetra University',
    category: 'IT Skills',
    duration: '2-3 Months',
    fees: '₹12,000 - ₹22,000',
    eligibility: 'Any background',
    topics: ['Computer Basics', 'Internet', 'Web Design Basics', 'HTML Fundamentals', 'Web Hosting'],
    certificate_type: 'Certificate'
  },

  // ==================== OP JINDAL GLOBAL UNIVERSITY ====================
  {
    id: 'jindal-cert-001',
    title: 'Certificate in Public Policy Basics',
    university: 'OP Jindal Global University',
    category: 'Public Policy',
    duration: '3-4 Months',
    fees: '₹40,000 - ₹60,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Policy Analysis', 'Governance', 'Public Administration', 'Legal Framework', 'Policy Making'],
    certificate_type: 'Certificate'
  },
  {
    id: 'jindal-cert-002',
    title: 'Certificate in International Relations',
    university: 'OP Jindal Global University',
    category: 'International Relations',
    duration: '4-6 Weeks',
    fees: '₹35,000 - ₹55,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Geopolitics', 'Diplomacy', 'International Law', 'Global Issues', 'Strategic Relations'],
    certificate_type: 'Certificate'
  },

  // ==================== AMRITA UNIVERSITY ====================
  {
    id: 'amrita-cert-001',
    title: 'Certificate in Cybersecurity Essentials',
    university: 'Amrita University',
    category: 'Cybersecurity',
    duration: '4-6 Months',
    fees: '₹50,000 - ₹80,000',
    eligibility: 'IT Background preferred',
    topics: ['Network Security', 'Threat Analysis', 'Defense Mechanisms', 'Best Practices', 'Compliance'],
    certificate_type: 'Certificate'
  },
  {
    id: 'amrita-cert-002',
    title: 'Certificate in Cloud Technology',
    university: 'Amrita University',
    category: 'Cloud Computing',
    duration: '3-4 Months',
    fees: '₹45,000 - ₹75,000',
    eligibility: 'IT Background',
    topics: ['Cloud Fundamentals', 'AWS', 'Azure', 'GCP', 'Architecture & Security'],
    certificate_type: 'Certificate'
  },

  // ==================== SHOOLINI UNIVERSITY ====================
  {
    id: 'shoolini-cert-001',
    title: 'Certificate in Biotechnology Essentials',
    university: 'Shoolini University',
    category: 'Biotechnology',
    duration: '3-4 Months',
    fees: '₹40,000 - ₹60,000',
    eligibility: 'Science Background',
    topics: ['Molecular Biology', 'Genetic Engineering', 'Lab Techniques', 'Research Methods'],
    certificate_type: 'Certificate'
  },
  {
    id: 'shoolini-cert-002',
    title: 'Certificate in Environmental Science',
    university: 'Shoolini University',
    category: 'Environmental Science',
    duration: '3-4 Months',
    fees: '₹35,000 - ₹55,000',
    eligibility: 'Science Background',
    topics: ['Ecology', 'Conservation', 'Sustainability', 'Environmental Policy', 'Climate Change'],
    certificate_type: 'Certificate'
  },

  // ==================== DR. D.Y. PATIL UNIVERSITY ====================
  {
    id: 'dypatil-cert-001',
    title: 'Certificate in Healthcare Management',
    university: 'Dr. D.Y. Patil University',
    category: 'Healthcare',
    duration: '4-6 Months',
    fees: '₹50,000 - ₹75,000',
    eligibility: 'Any background',
    topics: ['Hospital Management', 'Patient Care', 'Healthcare Laws', 'Quality Management', 'Finance'],
    certificate_type: 'Certificate'
  },
  {
    id: 'dypatil-cert-002',
    title: 'Certificate in Nursing Excellence',
    university: 'Dr. D.Y. Patil University',
    category: 'Healthcare',
    duration: '3-4 Months',
    fees: '₹35,000 - ₹55,000',
    eligibility: 'Nursing Background',
    topics: ['Advanced Nursing', 'Patient Care', 'Clinical Skills', 'Communication', 'Leadership'],
    certificate_type: 'Certificate'
  },

  // ==================== SIKKIM MANIPAL UNIVERSITY ====================
  {
    id: 'smu-cert-001',
    title: 'Certificate in Healthcare Administration',
    university: 'Sikkim Manipal University',
    category: 'Healthcare',
    duration: '4-6 Months',
    fees: '₹45,000 - ₹70,000',
    eligibility: 'Medical/Healthcare background',
    topics: ['Hospital Administration', 'Healthcare Management', 'Quality Assurance', 'Patient Services'],
    certificate_type: 'Certificate'
  },

  // ==================== UTTARANCHAL UNIVERSITY ====================
  {
    id: 'uu-cert-001',
    title: 'Certificate in Environmental Law',
    university: 'Uttaranchal University',
    category: 'Law',
    duration: '1 Year / 6 Months (Diploma/Certificate)',
    fees: '₹35,000 - ₹55,000',
    eligibility: 'Graduation in Any Subject',
    topics: ['Environmental Policy', 'National Laws', 'International Treaties', 'Waste Management', 'Climate Laws'],
    certificate_type: 'Certificate'
  },
  {
    id: 'uu-cert-002',
    title: 'Certificate in Labour Law & Compliance',
    university: 'Uttaranchal University',
    category: 'Law',
    duration: '3-4 Months',
    fees: '₹30,000 - ₹50,000',
    eligibility: 'Any background',
    topics: ['Labour Laws', 'Employee Rights', 'Compliance', 'Regulations', 'HR Legal Framework'],
    certificate_type: 'Certificate'
  },

  // ==================== VIVEKANANDA GLOBAL UNIVERSITY ====================
  {
    id: 'vgu-cert-001',
    title: 'Certificate in IT Fundamentals',
    university: 'Vivekananda Global University',
    category: 'IT Skills',
    duration: '2-3 Months',
    fees: '₹20,000 - ₹35,000',
    eligibility: 'Any background',
    topics: ['Computer Basics', 'Operating Systems', 'Networking Fundamentals', 'Internet Security'],
    certificate_type: 'Certificate'
  },
  {
    id: 'vgu-cert-002',
    title: 'Certificate in Database Management (SQL)',
    university: 'Vivekananda Global University',
    category: 'IT Skills',
    duration: '4-6 Weeks',
    fees: '₹25,000 - ₹40,000',
    eligibility: 'IT Background preferred',
    topics: ['SQL Fundamentals', 'Database Design', 'Queries', 'Optimization', 'Best Practices'],
    certificate_type: 'Certificate'
  },

  // ==================== JAIN UNIVERSITY ====================
  {
    id: 'jain-cert-001',
    title: 'Certificate in Business Management',
    university: 'Jain University',
    category: 'Business',
    duration: '3-4 Months',
    fees: '₹30,000 - ₹50,000',
    eligibility: 'Any background',
    topics: ['Business Fundamentals', 'Management Principles', 'Organizational Behavior', 'Leadership'],
    certificate_type: 'Certificate'
  },
  {
    id: 'jain-cert-002',
    title: 'Certificate in Digital Marketing & Social Media',
    university: 'Jain University',
    category: 'Digital Marketing',
    duration: '2-3 Months',
    fees: '₹25,000 - ₹40,000',
    eligibility: 'Any background',
    topics: ['Digital Strategy', 'Social Media Marketing', 'Content Creation', 'Analytics', 'Campaigns'],
    certificate_type: 'Certificate'
  },

  // ==================== NMIMS (Narsee Monjee Institute) ====================
  {
    id: 'nmims-cert-001',
    title: 'Certificate in Financial Markets',
    university: 'NMIMS',
    category: 'Finance',
    duration: '2-3 Months',
    fees: '₹40,000 - ₹65,000',
    eligibility: 'Any background',
    topics: ['Stock Markets', 'Trading', 'Investment Basics', 'Portfolio Management', 'Risk Analysis'],
    certificate_type: 'Certificate'
  },
  {
    id: 'nmims-cert-002',
    title: 'Certificate in Corporate Finance',
    university: 'NMIMS',
    category: 'Finance',
    duration: '3-4 Months',
    fees: '₹45,000 - ₹70,000',
    eligibility: 'Bachelor\'s Degree',
    topics: ['Financial Management', 'Valuation', 'Capital Budgeting', 'Dividend Policy', 'Case Studies'],
    certificate_type: 'Certificate'
  }
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