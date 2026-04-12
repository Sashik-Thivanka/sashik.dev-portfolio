import e1_1 from '../assets/images/events/1-1.jpeg'
import e1_2 from '../assets/images/events/1-2.jpeg'
import e1_3 from '../assets/images/events/1-3.jpeg'
import e1_4 from '../assets/images/events/1-4.jpg'

import e2_1 from '../assets/images/events/2-1.jpeg'
import e2_2 from '../assets/images/events/2-2.jpeg'
import e2_3 from '../assets/images/events/2-3.jpeg'
import e2_4 from '../assets/images/events/2-4.jpeg'

import e3_1 from '../assets/images/events/3-1.jfif'
import e3_2 from '../assets/images/events/3-2.jfif'
import e3_3 from '../assets/images/events/3-3.jfif'

import e5_2 from '../assets/images/events/5-2.jpeg'
import e5_3 from '../assets/images/events/5-3.jpeg'
import e5_4 from '../assets/images/events/5-4.jpeg'
import e5_5 from '../assets/images/events/5-5.jpeg'

import e7_1 from '../assets/images/events/7-1.jpg'
import e7_2 from '../assets/images/events/7-2.jpg'
import e7_3 from '../assets/images/events/7-3.jpg'
import e7_4 from '../assets/images/events/7-4.jpg'

const U = 'https://images.unsplash.com/photo-'

export const volunteeringItems = [
  {
    id: '01',
    name: 'Sri lanka AI Forum',
    src: U + '1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    date: 'january 2026',
    description:
      'Led an intensive 8-week coding bootcamp for underprivileged youth, teaching HTML, CSS, JavaScript fundamentals and project-based thinking in a structured, supportive environment.',
    role: 'Lead Instructor',
    organization: 'IEEE AI Driven Sri Lanka',
    duration: '8 Weeks',
    location: 'Colombo, Sri Lanka',
    impact: '',
    images: [
      e1_1,
      e1_2,
      e1_3,
      e1_4,
    ],
  },
  {
    id: '02',
    name: 'Sri lanka AI Forum',
    src: U + '1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
    date: 'january 2026',
    description:
      'Organized a national discussion on AI with industry experts, bringing together stakeholders from academia, government, and industry to discuss the future of AI in Sri Lanka.',
    role: 'Industry Outreach and Research Team member',
    organization: 'AI Driven Sri Lanka',
    duration: '4 Months',
    location: 'Colombo, Sri Lanka',
    impact: 'National Discussion on AI with Industry Experts',
    images: [
      e1_1,
      e1_2,
      e1_3,
      e1_4,
    ],
  },
  {
    id: '03',
    name: 'GenZipher 1.0',
    src: U + '1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
    date: 'February 2026',
    description:
      'Served as an Organizing Committee member for UCSC CSSL GenZ Chapter\'s flagship hackathon, providing on-floor technical support to participants during the CTF and Buildathon rounds. Developed real-time scoring and analytics systems, assisted delegates in resolving technical issues, and coordinated with the OC to ensure smooth event operations throughout.',
    role: 'Web Developer',
    organization: 'CSSL GenZ chapter of UCSC',
    duration: '4 Months',
    location: 'Colombo, Sri Lanka',
    impact: 'Architected a real-time scoring system and analytics dashboard, ensuring fair evaluation and data-driven engagement for all participants.',
    images: [
      e2_1,
      e2_2,
      e2_3,
      e2_4,
    ],
  },
  {
    id: '04',
    name: 'Hour of AI',
    src: U + '1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    date: 'October 2025',
    description:
      'Audited 14 local government and NGO websites for WCAG 2.1 compliance, compiled detailed accessibility reports, and guided dev teams through remediation priorities.',
    role: 'Accessibility Consultant',
    organization: 'Open Web SL',
    duration: '3 Weeks',
    location: 'Colombo, Sri Lanka',
    impact: '14 Sites Audited',
    images: [
      e3_1,
      e3_2,
      e3_3,
    ],
  },
  {
    id: '05',
    name: 'Blitz 2.0',
    src: U + '1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    date: 'January 2024',
    description:
      'Set up a fortnightly drop-in tech clinic in a community centre, offering free digital skills support, device troubleshooting, and basic internet safety training for elderly residents.',
    role: 'Community Tech Volunteer',
    organization: 'Digital Neighbours',
    duration: 'Ongoing',
    location: 'Negombo, Sri Lanka',
    impact: '80+ Residents Helped',
    images: [
      U + '1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
      U + '1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
      U + '1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: '06',
    name: 'Edex Edu Expo 2026',
    src: U + '1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    date: 'February 2024',
    description:
      'Built an open-source data dashboard to visualise public transport and utility outage data, giving citizens real-time insight into service disruptions across the Western Province.',
    role: 'Frontend Developer',
    organization: 'CivicTech Lanka',
    duration: '6 Weeks',
    location: 'Colombo, Sri Lanka',
    impact: '2 000+ Daily Users',
    images: [
      U + '1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
      U + '1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=900&q=80',
      U + '1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: '07',
    name: 'Oration 2026',
    src: U + '1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=900&q=80',
    date: 'March 2024',
    description:
      'Founded and ran a monthly open-source study group for junior developers, working through real GitHub issues together, teaching code review culture, and celebrating first-time contributors.',
    role: 'Group Organiser',
    organization: 'FOSS Lanka',
    duration: 'Monthly',
    location: 'Remote / Colombo',
    impact: '30 Active Members',
    images: [
     e7_1,
     e7_2,
     e7_3,
     e7_4,
    ],
  },
  {
    id: '08',
    name: 'Akhankara 2026',
    src: U + '1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    date: 'April 2024',
    description:
      'Rapidly designed and deployed an emergency information landing page within 48 hours for a local flood relief effort, consolidating hotlines, shelter maps, and donation links in one accessible place.',
    role: 'Emergency Web Developer',
    organization: 'Relief Connect SL',
    duration: '48 Hours',
    location: 'Ratnapura, Sri Lanka',
    impact: '5 000+ Visits in 72 hrs',
    images: [
      e5_2,
      e5_3,
      e5_4,
      e5_5,
    ],
  },
  {
    id: '09',
    name: 'Tech Day Workshop Series 26',
    src: U + '1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    date: 'May 2024',
    description:
      'Ran a free community design clinic over four weekends, helping local small businesses with branding basics, social media templates, and simple Canva/Figma workflows to improve their online presence.',
    role: 'Design Mentor',
    organization: 'SME Elevate Programme',
    duration: '4 Weekends',
    location: 'Kurunegala, Sri Lanka',
    impact: '18 Businesses Supported',
    images: [
      U + '1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
      U + '1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
      U + '1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: '11',
    name: 'Mandahasa',
    src: U + '1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    date: 'June 2024',
    description:
      'Mentored six young developers aged 16–22 over six months through a structured programme, covering portfolio building, interview prep, GitHub workflows, and navigating the tech job market.',
    role: 'Tech Mentor',
    organization: 'NextGen Devs SL',
    duration: '6 Months',
    location: 'Colombo, Sri Lanka',
    impact: '6 Mentees, 4 Hired',
    images: [
      U + '1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
      U + '1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=80',
      U + '1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: '10',
    name: 'Volunteer Research Sprint',
    src: U + '1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=80',
    date: 'August 2024',
    description:
      'Joined a one-week volunteer UX research sprint for a mental-health app startup, conducting user interviews, synthesising findings, and delivering an actionable insight report to their product team.',
    role: 'UX Researcher',
    organization: 'MindBridge App',
    duration: '1 Week Sprint',
    location: 'Remote',
    impact: '12 User Interviews',
    images: [
      U + '1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=80',
      U + '1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
      U + '1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: '11',
    name: 'Local Makers Network',
    src: U + '1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    date: 'October 2024',
    description:
      'Co-founded a local makers and creatives network, organising monthly meetups, skill-swaps, and a shared digital resource hub connecting designers, developers, and hardware hobbyists across the city.',
    role: 'Co-Founder & Organiser',
    organization: 'Makers Lanka',
    duration: 'Ongoing',
    location: 'Colombo, Sri Lanka',
    impact: '120+ Member Community',
    images: [
      U + '1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
      U + '1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      U + '1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    ],
  },
]
