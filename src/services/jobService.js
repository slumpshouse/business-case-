// Mock job service with fake job data
// Returns realistic sample job listings for testing/demo purposes

const MOCK_JOBS = [
    {
        title: 'Senior Software Engineer',
        company: 'TechCorp Solutions',
        location: 'San Francisco, CA',
        salary: '$140,000 - $180,000',
        requirements: 'Bachelor\'s degree in Computer Science, 5+ years experience with React, Node.js, and cloud platforms (AWS/Azure). Strong problem-solving skills.',
        description: 'Build scalable web applications using React, Node.js, and cloud technologies. Lead technical projects and mentor junior developers.',
        url: 'https://example.com/jobs/senior-software-engineer'
    },
    {
        title: 'Registered Nurse',
        company: 'City Medical Center',
        location: 'Chicago, IL',
        salary: '$70,000 - $95,000',
        requirements: 'RN license required, BSN preferred. 2+ years clinical experience, BLS/ACLS certification. Excellent patient care skills.',
        description: 'Provide high-quality patient care in a fast-paced hospital environment. Work with interdisciplinary teams to deliver comprehensive healthcare.',
        url: 'https://example.com/jobs/registered-nurse'
    },
    {
        title: 'Marketing Manager',
        company: 'Growth Agency',
        location: 'Miami, FL',
        salary: '$85,000 - $110,000',
        requirements: 'Bachelor\'s in Marketing or related field, 4+ years digital marketing experience. Proficiency with Google Analytics, SEO/SEM, and social media platforms.',
        description: 'Lead digital marketing campaigns, manage social media strategy, and drive customer acquisition and retention.',
        url: 'https://example.com/jobs/marketing-manager'
    },
    {
        title: 'Elementary School Teacher',
        company: 'Riverside School District',
        location: 'Portland, OR',
        salary: '$52,000 - $68,000',
        requirements: 'Valid teaching license, Bachelor\'s degree in Education. Experience with diverse learners and modern teaching methods.',
        description: 'Inspire and educate elementary students in a supportive environment. Develop lesson plans and foster student growth.',
        url: 'https://example.com/jobs/elementary-teacher'
    },
    {
        title: 'Data Scientist',
        company: 'Analytics Pro',
        location: 'Seattle, WA',
        salary: '$120,000 - $160,000',
        requirements: 'Master\'s degree in Data Science, Statistics, or related field. 3+ years experience with Python, SQL, machine learning frameworks (TensorFlow/PyTorch).',
        description: 'Analyze large datasets and build machine learning models. Work with Python, SQL, and modern ML frameworks to drive data-driven decisions.',
        url: 'https://example.com/jobs/data-scientist'
    },
    {
        title: 'Physical Therapist',
        company: 'Wellness Rehabilitation Center',
        location: 'Denver, CO',
        salary: '$75,000 - $95,000',
        requirements: 'Doctor of Physical Therapy (DPT) degree, state PT license. Strong communication and patient assessment skills.',
        description: 'Help patients recover mobility and manage pain through personalized treatment plans and therapeutic exercises.',
        url: 'https://example.com/jobs/physical-therapist'
    },
    {
        title: 'Accountant',
        company: 'Financial Services Group',
        location: 'Dallas, TX',
        salary: '$60,000 - $80,000',
        requirements: 'Bachelor\'s in Accounting, CPA certification preferred. 3+ years experience with GAAP, financial reporting, and tax preparation.',
        description: 'Manage financial records, prepare tax returns, and ensure compliance with accounting standards. Work with diverse clients.',
        url: 'https://example.com/jobs/accountant'
    },
    {
        title: 'UX Designer',
        company: 'Design Studio Co',
        location: 'Los Angeles, CA',
        salary: '$90,000 - $120,000',
        requirements: 'Bachelor\'s in Design or related field, 3+ years UX/UI experience. Proficiency with Figma, Sketch, Adobe Creative Suite. Strong portfolio required.',
        description: 'Create intuitive user experiences and beautiful interfaces. Conduct user research, wireframing, and usability testing.',
        url: 'https://example.com/jobs/ux-designer'
    },
    {
        title: 'Civil Engineer',
        company: 'Infrastructure Solutions Inc',
        location: 'Phoenix, AZ',
        salary: '$75,000 - $100,000',
        requirements: 'Bachelor\'s degree in Civil Engineering, PE license preferred. 4+ years experience with AutoCAD, project management, and structural design.',
        description: 'Design and oversee construction of infrastructure projects including roads, bridges, and water systems.',
        url: 'https://example.com/jobs/civil-engineer'
    },
    {
        title: 'Human Resources Manager',
        company: 'Corporate Dynamics',
        location: 'Atlanta, GA',
        salary: '$80,000 - $105,000',
        requirements: 'Bachelor\'s in HR or Business, SHRM-CP/PHR certification preferred. 5+ years HR experience including talent acquisition and employee relations.',
        description: 'Lead HR strategy, manage recruitment, employee development, and ensure compliance with employment laws.',
        url: 'https://example.com/jobs/hr-manager'
    },
    {
        title: 'Mechanical Engineer',
        company: 'Advanced Manufacturing Corp',
        location: 'Detroit, MI',
        salary: '$70,000 - $95,000',
        requirements: 'Bachelor\'s in Mechanical Engineering, CAD proficiency (SolidWorks/CATIA). 3+ years experience in product design and manufacturing.',
        description: 'Design mechanical systems and components for automotive and industrial applications. Collaborate with cross-functional teams.',
        url: 'https://example.com/jobs/mechanical-engineer'
    },
    {
        title: 'Graphic Designer',
        company: 'Creative Media Agency',
        location: 'Austin, TX',
        salary: '$55,000 - $75,000',
        requirements: 'Bachelor\'s in Graphic Design or related field. 2+ years experience with Adobe Creative Suite, typography, and brand design. Portfolio required.',
        description: 'Create compelling visual designs for digital and print media. Work on branding, marketing materials, and client projects.',
        url: 'https://example.com/jobs/graphic-designer'
    },
    {
        title: 'Sales Representative',
        company: 'Tech Solutions LLC',
        location: 'Boston, MA',
        salary: '$60,000 - $90,000 + Commission',
        requirements: 'Bachelor\'s degree preferred, 2+ years B2B sales experience. Strong communication and negotiation skills. CRM proficiency (Salesforce).',
        description: 'Drive revenue growth by identifying prospects, building relationships, and closing deals. Meet and exceed quarterly sales targets.',
        url: 'https://example.com/jobs/sales-representative'
    },
    {
        title: 'Dental Hygienist',
        company: 'Bright Smile Dental',
        location: 'Nashville, TN',
        salary: '$65,000 - $80,000',
        requirements: 'Associate\'s degree in Dental Hygiene, state licensure required. CPR certification, excellent patient care and communication skills.',
        description: 'Provide preventive dental care including cleanings, examinations, and patient education in a friendly practice.',
        url: 'https://example.com/jobs/dental-hygienist'
    },
    {
        title: 'Project Manager',
        company: 'Construction Partners',
        location: 'Charlotte, NC',
        salary: '$85,000 - $115,000',
        requirements: 'Bachelor\'s degree, PMP certification preferred. 5+ years project management experience. Proficiency with MS Project and Agile methodologies.',
        description: 'Oversee project timelines, budgets, and resources. Coordinate teams and stakeholders to deliver projects on time and within budget.',
        url: 'https://example.com/jobs/project-manager'
    },
    {
        title: 'Chef de Cuisine',
        company: 'Fine Dining Restaurant Group',
        location: 'New York, NY',
        salary: '$70,000 - $90,000',
        requirements: 'Culinary degree or equivalent experience, 5+ years in fine dining. Strong leadership, menu planning, and food safety knowledge.',
        description: 'Lead kitchen operations, develop seasonal menus, and maintain high culinary standards. Manage kitchen staff and inventory.',
        url: 'https://example.com/jobs/chef-de-cuisine'
    },
    {
        title: 'Paralegal',
        company: 'Law Offices of Smith & Associates',
        location: 'Washington, DC',
        salary: '$55,000 - $75,000',
        requirements: 'Paralegal certificate or Bachelor\'s degree, 3+ years legal experience. Strong research, writing, and organizational skills.',
        description: 'Assist attorneys with case preparation, legal research, document drafting, and client communication.',
        url: 'https://example.com/jobs/paralegal'
    },
    {
        title: 'Pharmacist',
        company: 'HealthCare Pharmacy',
        location: 'Houston, TX',
        salary: '$115,000 - $140,000',
        requirements: 'Doctor of Pharmacy (PharmD) degree, active pharmacist license. Strong knowledge of medications and patient counseling skills.',
        description: 'Dispense medications, provide patient consultations, and collaborate with healthcare providers to optimize patient care.',
        url: 'https://example.com/jobs/pharmacist'
    },
    {
        title: 'Social Media Manager',
        company: 'Digital Brand Studio',
        location: 'Remote',
        salary: '$65,000 - $85,000',
        requirements: 'Bachelor\'s in Marketing/Communications, 3+ years social media management experience. Proficiency with social platforms and analytics tools.',
        description: 'Develop and execute social media strategies, create engaging content, and grow brand presence across all platforms.',
        url: 'https://example.com/jobs/social-media-manager'
    },
    {
        title: 'Electrical Engineer',
        company: 'Power Systems Engineering',
        location: 'San Diego, CA',
        salary: '$80,000 - $110,000',
        requirements: 'Bachelor\'s in Electrical Engineering, PE license preferred. 4+ years experience with power systems, circuit design, and electrical codes.',
        description: 'Design electrical systems for commercial and residential projects. Ensure compliance with safety standards and regulations.',
        url: 'https://example.com/jobs/electrical-engineer'
    },
    {
        title: 'Financial Analyst',
        company: 'Investment Group Partners',
        location: 'Philadelphia, PA',
        salary: '$70,000 - $95,000',
        requirements: 'Bachelor\'s in Finance or Economics, CFA Level 1 preferred. 2+ years experience with financial modeling, Excel, and data analysis.',
        description: 'Analyze financial data, create forecasting models, and provide investment recommendations to clients and stakeholders.',
        url: 'https://example.com/jobs/financial-analyst'
    },
    {
        title: 'Veterinarian',
        company: 'Animal Care Hospital',
        location: 'Minneapolis, MN',
        salary: '$90,000 - $120,000',
        requirements: 'Doctor of Veterinary Medicine (DVM) degree, state veterinary license. Strong diagnostic and surgical skills.',
        description: 'Provide medical care to animals including examinations, surgeries, and emergency treatments. Work with pet owners and veterinary staff.',
        url: 'https://example.com/jobs/veterinarian'
    },
    {
        title: 'Real Estate Agent',
        company: 'Premier Realty Group',
        location: 'Orlando, FL',
        salary: '$45,000 - $100,000 (Commission-based)',
        requirements: 'Real estate license required, 1+ years sales experience preferred. Strong negotiation and customer service skills.',
        description: 'Help clients buy, sell, and rent properties. Conduct property showings, negotiate deals, and build lasting client relationships.',
        url: 'https://example.com/jobs/real-estate-agent'
    },
    {
        title: 'Cybersecurity Analyst',
        company: 'SecureNet Solutions',
        location: 'Arlington, VA',
        salary: '$95,000 - $130,000',
        requirements: 'Bachelor\'s in Cybersecurity or IT, CISSP/CEH certification preferred. 3+ years experience with threat detection and incident response.',
        description: 'Monitor security systems, respond to threats, and implement security protocols to protect organizational data and infrastructure.',
        url: 'https://example.com/jobs/cybersecurity-analyst'
    },
    {
        title: 'Construction Manager',
        company: 'BuildRight Construction',
        location: 'Las Vegas, NV',
        salary: '$80,000 - $110,000',
        requirements: 'Bachelor\'s in Construction Management or Engineering, 5+ years experience. OSHA certification and strong leadership skills.',
        description: 'Oversee construction projects from planning to completion. Manage crews, budgets, timelines, and ensure safety compliance.',
        url: 'https://example.com/jobs/construction-manager'
    },
    {
        title: 'Speech Therapist',
        company: 'Children\'s Therapy Center',
        location: 'Columbus, OH',
        salary: '$65,000 - $85,000',
        requirements: 'Master\'s in Speech-Language Pathology, CCC-SLP certification. Experience working with pediatric patients preferred.',
        description: 'Assess and treat speech, language, and communication disorders in children. Create individualized treatment plans.',
        url: 'https://example.com/jobs/speech-therapist'
    },
    {
        title: 'Flight Attendant',
        company: 'SkyHigh Airlines',
        location: 'Multiple Locations',
        salary: '$40,000 - $65,000',
        requirements: 'High school diploma, excellent customer service skills, ability to pass FAA requirements. Flexible schedule required.',
        description: 'Ensure passenger safety and comfort during flights. Provide excellent service and handle emergency situations professionally.',
        url: 'https://example.com/jobs/flight-attendant'
    },
    {
        title: 'Marine Biologist',
        company: 'Ocean Research Institute',
        location: 'San Diego, CA',
        salary: '$60,000 - $85,000',
        requirements: 'Master\'s or PhD in Marine Biology, 2+ years research experience. SCUBA certification and field work experience required.',
        description: 'Conduct marine ecosystem research, collect data, and contribute to conservation efforts. Field and laboratory work.',
        url: 'https://example.com/jobs/marine-biologist'
    },
    {
        title: 'Interior Designer',
        company: 'Urban Design Studio',
        location: 'San Francisco, CA',
        salary: '$55,000 - $80,000',
        requirements: 'Bachelor\'s in Interior Design, NCIDQ certification preferred. 3+ years experience with AutoCAD, SketchUp, and residential/commercial design.',
        description: 'Create functional and aesthetically pleasing interior spaces. Work with clients, contractors, and vendors on design projects.',
        url: 'https://example.com/jobs/interior-designer'
    },
    {
        title: 'Police Officer',
        company: 'Metro Police Department',
        location: 'Indianapolis, IN',
        salary: '$50,000 - $75,000',
        requirements: 'High school diploma, police academy certification. Clean background check, physical fitness, and strong ethical standards.',
        description: 'Protect and serve the community through law enforcement. Patrol neighborhoods, respond to emergencies, and investigate crimes.',
        url: 'https://example.com/jobs/police-officer'
    },
    {
        title: 'Video Game Developer',
        company: 'Pixel Studios',
        location: 'Los Angeles, CA',
        salary: '$75,000 - $110,000',
        requirements: 'Bachelor\'s in Computer Science or Game Development, 3+ years experience with Unity/Unreal Engine, C++/C#. Strong portfolio required.',
        description: 'Design and develop engaging video games. Work on gameplay mechanics, graphics programming, and collaborate with creative teams.',
        url: 'https://example.com/jobs/video-game-developer'
    },
    {
        title: 'Personal Trainer',
        company: 'Elite Fitness Center',
        location: 'Miami, FL',
        salary: '$35,000 - $65,000',
        requirements: 'Certified Personal Trainer (NASM, ACE, or ISSA), CPR/AED certification. Strong motivational and communication skills.',
        description: 'Help clients achieve fitness goals through personalized workout plans and nutrition guidance. Lead group classes and one-on-one sessions.',
        url: 'https://example.com/jobs/personal-trainer'
    },
    {
        title: 'Architect',
        company: 'Modern Design Associates',
        location: 'Chicago, IL',
        salary: '$70,000 - $100,000',
        requirements: 'Bachelor\'s in Architecture, licensed architect preferred. 4+ years experience with Revit, AutoCAD, and building codes.',
        description: 'Design commercial and residential buildings. Create blueprints, coordinate with engineers, and oversee construction projects.',
        url: 'https://example.com/jobs/architect'
    },
    {
        title: 'Content Writer',
        company: 'Digital Media Co',
        location: 'Remote',
        salary: '$50,000 - $70,000',
        requirements: 'Bachelor\'s in English, Journalism, or Communications. 2+ years writing experience, SEO knowledge, portfolio required.',
        description: 'Create engaging content for websites, blogs, and marketing materials. Research topics and optimize content for search engines.',
        url: 'https://example.com/jobs/content-writer'
    },
    {
        title: 'Restaurant Manager',
        company: 'Hospitality Group LLC',
        location: 'New Orleans, LA',
        salary: '$50,000 - $70,000',
        requirements: 'High school diploma, 3+ years restaurant management experience. Strong leadership, inventory management, and customer service skills.',
        description: 'Oversee daily restaurant operations, manage staff, ensure customer satisfaction, and maintain quality standards.',
        url: 'https://example.com/jobs/restaurant-manager'
    },
    {
        title: 'Occupational Therapist',
        company: 'Recovery Health Services',
        location: 'Baltimore, MD',
        salary: '$70,000 - $90,000',
        requirements: 'Master\'s in Occupational Therapy, state OT license required. Experience with rehabilitation and patient assessment.',
        description: 'Help patients develop, recover, or maintain daily living and work skills through therapeutic interventions.',
        url: 'https://example.com/jobs/occupational-therapist'
    },
    {
        title: 'Environmental Scientist',
        company: 'Green Earth Consulting',
        location: 'Portland, OR',
        salary: '$60,000 - $85,000',
        requirements: 'Bachelor\'s in Environmental Science, 2+ years experience with environmental assessments and regulatory compliance.',
        description: 'Conduct environmental impact studies, analyze pollution data, and develop sustainability solutions for clients.',
        url: 'https://example.com/jobs/environmental-scientist'
    },
    {
        title: 'Air Traffic Controller',
        company: 'Federal Aviation Administration',
        location: 'Dallas, TX',
        salary: '$75,000 - $140,000',
        requirements: 'FAA certification, pass security clearance and medical exams. Strong decision-making and multitasking abilities.',
        description: 'Coordinate aircraft movements, maintain safe distances, and provide pilots with critical flight information.',
        url: 'https://example.com/jobs/air-traffic-controller'
    },
    {
        title: 'Photographer',
        company: 'Creative Vision Photography',
        location: 'Nashville, TN',
        salary: '$40,000 - $75,000',
        requirements: 'Portfolio required, 2+ years professional photography experience. Proficiency with Adobe Lightroom and Photoshop.',
        description: 'Capture professional photos for weddings, events, and commercial clients. Edit and deliver high-quality images.',
        url: 'https://example.com/jobs/photographer'
    }
];

export const fetchJobs = async (searchQuery = '', location = '') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let results = [...MOCK_JOBS];
    
    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        results = results.filter(job => 
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.requirements.toLowerCase().includes(query)
        );
    }
    
    // Filter by location
    if (location && location.trim()) {
        const loc = location.toLowerCase();
        results = results.filter(job => 
            job.location.toLowerCase().includes(loc)
        );
    }
    
    return results;
};

export const searchJobs = async (query) => {
    // Alias to fetchJobs with just a query
    return fetchJobs(query || '', '');
};