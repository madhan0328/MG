// ─────────────────────────────────────────────────────────────────
// src/data/index.js
// ⭐ ONE FILE FOR ALL YOUR CONTENT — edit here, changes reflect everywhere
// ─────────────────────────────────────────────────────────────────

// To use a profile photo:
// 1. Add your photo to src/assets/images/profile.jpg
// 2. Uncomment the import below and set profileImage to `profileImg`
// import profileImg from '../assets/images/profile.jpg'
import istqb from '../Certificates/Snowpro.json'

export const PERSONAL = {
  name:         'Madhangokul',
  lastname:     '.R',
  role:         'QA Engineer',
  bio:          'I build reliable, well-tested web experiences, bridging development and quality assurance to ship products that work beautifully in the real world.',
  email:        'madhangokul.r@gmail.com',
  github:       'https://github.com/madhan0328',
  linkedin:     'https://linkedin.com/in/madhangokulr',
  instagram:    'https://www.instagram.com/_madhangokul_/',
  whatsapp:     '+919360898954',
  profileImage: null, // replace null with profileImg after import
  location:     'Chennai, India',
  available:    true,
}

// ─── EmailJS ─────────────────────────────────────────────────────
// Sign up at https://www.emailjs.com (free tier available)
// Template variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
export const EMAILJS = {
  serviceId:  'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey:  'YOUR_PUBLIC_KEY',
}

// ─── Navigation ──────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Interests',    href: '#interests' },
  { label: 'Contact',      href: '#contact' },
]

// ─── Experience ──────────────────────────────────────────────────
// Correct import paths for src/logo/
import fidelityLogo from '../Logo/Fidelity.png'
import virtusaLogo  from '../Logo/Virtusa.jpg'

export const EXPERIENCE = [
  {
    id:       1,
    role:     'Apprentice - QA Engineer',
    company:  'Fidelity Investment',
    period:   'March 2025 – March 2026',
    location: 'Chennai, India',
    logo:     fidelityLogo,
    points: [
      'Executed manual and automated test cases for web and API-based applications.',
      'Developed BDD automation scripts using Cucumber with Java.',
      'Performed API testing using Postman to validate REST endpoints.',
      'Collaborated with developers to identify, track, and resolve defects.',
      'Maintained regression suites reducing release cycle time by 20%.',
    ],
    tags: ['Java', 'Selenium','Cucumber', 'Manual Testing', 'Postman',  'SQL'],
  },
  {
    id:       2,
    role:     'QA Trainee',
    company:  'Virtusa',
    period:   'Jan 2023 – Jun 2023',
    location: 'Remote',
    logo:     virtusaLogo,
    points: [
      'Kickstarted QA journey by learning core testing concepts and methodologies.',
      'Wrote and executed test cases using Selenium WebDriver with TestNG framework.',
      'Performed functional, regression, and smoke testing on web applications.',
      'Reported and tracked defects, collaborating with the dev team for resolution.',
    ],
    tags: ['Java','Selenium', 'TestNG',  'Manual Testing', 'Functional Testing'],
  },
]
// ─── Skills ──────────────────────────────────────────────────────
// group: used to visually separate skill categories
export const SKILLS = [
  // ── Quality Assurance ──────────────────────────────────────────
  { id: 's1',  name: 'Java',            group: 'Quality Assurance' },
  { id: 's2',  name: 'Selenium',        group: 'Quality Assurance' },
  { id: 's3',  name: 'TestNG',          group: 'Quality Assurance' },
  { id: 's4',  name: 'Cucumber (BDD)',  group: 'Quality Assurance' },
  { id: 's5',  name: 'Postman',         group: 'Quality Assurance' },
  { id: 's6',  name: 'Manual Testing',  group: 'Quality Assurance' },
  { id: 's7',  name: 'API Testing',     group: 'Quality Assurance' },
  { id: 's8',  name: 'Regression Testing', group: 'Quality Assurance' },

  // ── Data Engineering ───────────────────────────────────────────
  { id: 's9',  name: 'Python',          group: 'Data Engineering' },
  { id: 's10', name: 'Pandas',          group: 'Data Engineering' },
  { id: 's11', name: 'SQL',             group: 'Data Engineering' },
  { id: 's12', name: 'ETL Pipelines',   group: 'Data Engineering' },
  { id: 's13', name: 'Snowflake',       group: 'Data Engineering' },
  { id: 's16', name: 'Airflow',         group: 'Data Engineering' },
  { id: 's14', name: 'Excel',           group: 'Data Engineering' },
  { id: 's15', name: 'Power BI',        group: 'Data Engineering' },

  // ── Languages & Tools ──────────────────────────────────────────
  { id: 's16', name: 'Git & GitHub',    group: 'Languages & Tools' },
  { id: 's17', name: 'JIRA',            group: 'Languages & Tools' },
  { id: 's18', name: 'VS Code',         group: 'Languages & Tools' },
  { id: 's19', name: 'IntelliJ IDEA',   group: 'Languages & Tools' },
  { id: 's20', name: 'Maven',           group: 'Languages & Tools' },
]

export const CERTIFICATES = [
  { 
    id: 1, 
    title: 'ISTQB Foundation level',  
    issuer: 'Indian Testing board', 
    year: '2023', 
    image: "src\Certificates\istqb.jpg", // ✅ Correct (Variable)
    type: 'png'
  },
  { 
    id: 3, 
    title: 'SnowPro Platform',   
    issuer: 'Snowflake',  
    year: '2026', 
    image: null, // ✅ Correct (Variable)
    type: 'json'
  },
]


// ─── Interests ───────────────────────────────────────────────────
export const INTERESTS = [
 
  { id: 1, label: 'Test Automation',   emoji: '🤖' },
  { id: 2, label: 'Data Engineering',  emoji: '🛢️' },
  { id: 3, label: 'Reading Books',     emoji: '📚' },
  { id: 4, label: 'Movies',            emoji: '🎬' },
  { id: 5, label: 'Travel',            emoji: '✈️' },
]


