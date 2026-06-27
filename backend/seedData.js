import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Setting from './models/Setting.js';
import Experience from './models/Experience.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Education from './models/Education.js';
import Certification from './models/Certification.js';

dotenv.config();

export const resumeData = {
  settings: {
    fullName: 'Abhay Kumar Upadhyay',
    title: 'Data Analyst',
    tagline: 'Detail-oriented Data Analyst passionate about data-centric problem solving',
    email: 'abhayupadhyay807@gmail.com',
    phone: '+91 9006786961',
    location: 'Gopalganj, Bihar, India',
    resumeLink: '',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com/in/abhay-kumar-upadhyay-314613381',
    twitter: '',
    instagram: '',
    website: '',
    hero: {
      headingLine1: "Hi, I'm",
      headingLine2: 'Abhay Kumar Upadhyay',
      headingLine3: 'Data Analyst',
      subheading: 'Detail-oriented Data Analyst with a strong academic foundation in computer applications and data-centric problem solving. Skilled in data collection, cleaning, analysis, and visualization using Python, SQL, and Power BI.',
      primaryButtonText: 'View My Work',
      primaryButtonLink: '#projects',
      secondaryButtonText: 'Download Resume',
      secondaryButtonLink: '#contact',
      profileImage: '',
      heroImages: []
    },
    navbar: {
      logoText: 'Abhay',
      logoAccent: 'Upadhyay',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '#about' },
        { name: 'Skills', path: '#skills' },
        { name: 'Experience', path: '#experience' },
        { name: 'Projects', path: '#projects' },
        { name: 'Education', path: '#education' },
        { name: 'Certifications', path: '#certifications' },
        { name: 'Contact', path: '#contact' }
      ],
      ctaText: 'Hire Me',
      ctaPath: '#contact'
    },
    about: {
      heading: 'About Me',
      subheading: 'My Journey in Data Analytics',
      bio: 'I am a passionate and detail-oriented Data Analyst with a strong academic foundation in computer applications. I specialize in data collection, cleaning, analysis, and visualization using Python, SQL, and Power BI. Experienced in applying analytical techniques to extract actionable insights from structured datasets and support data-driven decision-making.\n\nI consistently apply agile learning practices to independently complete end-to-end analytics projects from data ingestion to insight delivery. I am eager to build my career in data analytics while continuously adopting modern tools and methodologies.',
      profileImage: '',
      yearsOfExperience: '1',
      projectsCompleted: '2',
      technologiesMastered: '8',
      openToWork: true
    },
    footer: {
      tagline: 'Analyzing data to build insights and drive decisions.',
      quickLinks: [
        { name: 'About', path: '#about' },
        { name: 'Skills', path: '#skills' },
        { name: 'Projects', path: '#projects' }
      ],
      copyrightText: '© 2026 Abhay Kumar Upadhyay. All rights reserved.'
    },
    theme: {
      primaryColor: '#8b5cf6', // Violet
      accentColor: '#ec4899', // Pink
      backgroundColor: '#0f0f17', // Slate Dark
      fontFamily: 'Inter'
    }
  },
  experiences: [
    {
      company: 'Thinknext Technologies Pvt. Ltd.',
      role: 'Data Analytics Intern (Training Program)',
      location: 'Mohali, Punjab',
      startDate: 'Jun 2025',
      endDate: 'Jul 2025',
      isCurrent: false,
      description: '6-week structured training program in Data Analytics.',
      responsibilities: [
        'Completed a 6-week structured training program in Data Analytics with hands-on practice in Power BI, SQL, and Python.',
        'Built interactive Power BI dashboards using cleaned datasets, applying DAX formulas and data modeling concepts.',
        'Executed SQL queries for data extraction, filtering, aggregation, and reporting across relational databases.',
        'Conducted Exploratory Data Analysis (EDA) in Python using Pandas, NumPy, Matplotlib, and Seaborn to identify patterns and trends.'
      ],
      achievements: [
        'Gained hands-on experience on end-to-end data pipelines.',
        'Successfully completed internship requirements with a training certificate.'
      ],
      techStack: ['Power BI', 'SQL', 'Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      companyLogo: '',
      order: 1
    }
  ],
  projects: [
    {
      title: 'Vendor Performance Analysis Dashboard',
      slug: 'vendor-performance-analysis-dashboard',
      category: 'Data Analysis',
      description: 'Developed a data-driven solution to evaluate vendor performance using datasets covering purchases, sales, and invoices.',
      longDescription: 'Developed a data-driven solution to evaluate vendor performance using datasets covering purchases, sales, and invoices. Calculated key metrics including total purchase value, sales revenue, freight cost, and vendor contribution percentages. Built insights to support procurement decisions by comparing vendor costs with revenue generation for strategic planning. Identified cost-efficient vendors and recommended improved purchasing strategies to enhance overall profitability.',
      techStack: ['SQL', 'SQLite', 'Power BI', 'Data Modeling'],
      image: '',
      gallery: [],
      githubLink: 'https://github.com',
      liveLink: '',
      features: [
        'Vendor evaluation covering purchases, sales, and invoices.',
        'Calculation of total purchase value, sales revenue, freight cost, and contribution percentages.',
        'Procurement cost-to-revenue comparison tool.',
        'Cost-efficient vendor identification and recommendation panel.'
      ],
      outcomes: [
        'Improved procurement decision efficiency.',
        'Recommended strategies that enhance overall profitability.'
      ],
      isFeatured: true,
      order: 1
    },
    {
      title: 'Crimes Against Women Analysis Dashboard',
      slug: 'crimes-against-women-analysis-dashboard',
      category: 'Data Visualization',
      description: 'Developed an interactive Power BI dashboard to analyze crimes against women in India across trends, crime types, and regions.',
      longDescription: 'Developed an interactive Power BI dashboard to analyze crimes against women in India across trends, crime types, and regions. Created KPI cards displaying over 105,000 total reported cases, crime rate metrics, and year-over-year trend analysis. Performed year-wise and state-wise analysis to identify crime patterns and highlight high-risk geographic regions. Visualized crime type distribution (rape, domestic violence, kidnapping) with interactive filters for granular insights.',
      techStack: ['Power BI', 'Microsoft Excel'],
      image: '',
      gallery: [],
      githubLink: 'https://github.com',
      liveLink: '',
      features: [
        'Analysis of crimes against women in India across trends, types, and regions.',
        'KPI cards for 105,000+ total reported cases and YoY trend analysis.',
        'Year-wise and state-wise crime pattern mapping.',
        'Interactive filters for crime type distribution (rape, domestic violence, kidnapping).'
      ],
      outcomes: [
        'Identified and highlighted high-risk geographic regions.',
        'Provided granular insight filtering for policy makers and analysts.'
      ],
      isFeatured: true,
      order: 2
    }
  ],
  skills: [
    { name: 'SQL', category: 'Database', proficiency: 90, order: 1 },
    { name: 'SQLite', category: 'Database', proficiency: 80, order: 2 },
    { name: 'Power BI', category: 'Tools', proficiency: 90, order: 1 },
    { name: 'Microsoft Excel', category: 'Tools', proficiency: 85, order: 2 },
    { name: 'VS Code', category: 'Tools', proficiency: 85, order: 3 },
    { name: 'Canva', category: 'Tools', proficiency: 70, order: 4 },
    { name: 'Python', category: 'Backend', proficiency: 85, order: 1 },
    { name: 'Pandas', category: 'Backend', proficiency: 85, order: 2 },
    { name: 'NumPy', category: 'Backend', proficiency: 75, order: 3 },
    { name: 'Matplotlib', category: 'Backend', proficiency: 75, order: 4 },
    { name: 'Seaborn', category: 'Backend', proficiency: 75, order: 5 }
  ],
  education: [
    {
      institution: 'IK Gujral Punjab Technical University',
      degree: 'Bachelor of Computer Application (BCA)',
      field: 'Computer Applications',
      startYear: '2023',
      endYear: '2026 (Expected)',
      grade: 'Expected First Class',
      description: 'Focus on computer applications, programming, databases, and core IT subjects.',
      logo: '',
      order: 1
    },
    {
      institution: 'Baba Banda Singh Bahadur Engineering College',
      degree: 'Pre-University Education',
      field: 'General Education',
      startYear: '2023',
      endYear: '2023',
      grade: 'Grade: A',
      description: 'Completed pre-university education with excellent academic records.',
      logo: '',
      order: 2
    }
  ],
  certifications: [
    {
      title: 'Data Analytics Training Certificate',
      issuer: 'Thinknext Technologies Pvt. Ltd., Mohali, Punjab',
      issuedDate: 'Jul 2025',
      expiryDate: '',
      credentialId: 'TNT/DA/2025',
      credentialUrl: '',
      image: '',
      skills: ['Power BI', 'SQL', 'Python'],
      order: 1
    }
  ]
};

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio-abhay';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding');

    // Settings
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      await Setting.create(resumeData.settings);
      console.log('Settings seeded successfully');
    } else {
      console.log('Settings already exist, skipping');
    }

    // Experiences
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      await Experience.insertMany(resumeData.experiences);
      console.log('Experiences seeded successfully');
    } else {
      console.log('Experiences already exist, skipping');
    }

    // Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(resumeData.projects);
      console.log('Projects seeded successfully');
    } else {
      console.log('Projects already exist, skipping');
    }

    // Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(resumeData.skills);
      console.log('Skills seeded successfully');
    } else {
      console.log('Skills already exist, skipping');
    }

    // Education
    const educationCount = await Education.countDocuments();
    if (educationCount === 0) {
      await Education.insertMany(resumeData.education);
      console.log('Education seeded successfully');
    } else {
      console.log('Education already exist, skipping');
    }

    // Certifications
    const certificationCount = await Certification.countDocuments();
    if (certificationCount === 0) {
      await Certification.insertMany(resumeData.certifications);
      console.log('Certifications seeded successfully');
    } else {
      console.log('Certifications already exist, skipping');
    }

    console.log('Database seeding completed');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

// Check if run directly
if (import.meta.url === `file://${process.argv[1]}` || (process.argv[1] && process.argv[1].endsWith('seedData.js'))) {
  seedData();
}
