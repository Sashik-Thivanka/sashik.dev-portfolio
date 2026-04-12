import p1_1 from '../assets/images/projects/1-1.png'
import p1_2 from '../assets/images/projects/1-2.png'
import p1_3 from '../assets/images/projects/1-3.png'
import p1_4 from '../assets/images/projects/1-4.png'
import p2_1 from '../assets/images/projects/2-1.png'
import p2_2 from '../assets/images/projects/2-2.png'
import p2_3 from '../assets/images/projects/2-3.png'
import p2_4 from '../assets/images/projects/2-4.png'
import p2_5 from '../assets/images/projects/2-5.png'
import p3_1 from '../assets/images/projects/3-1.png'
import p3_2 from '../assets/images/projects/3-2.png'
import p3_3 from '../assets/images/projects/3-3.png'
import p3_4 from '../assets/images/projects/3-4.png'
import p3_5 from '../assets/images/projects/3-5.png'
import p4_1 from '../assets/images/projects/4-1.png'
import p4_2 from '../assets/images/projects/4-2.png'
import p4_3 from '../assets/images/projects/4-3.png'
import p4_4 from '../assets/images/projects/4-4.png'
import p4_0 from '../assets/images/projects/4-0.png'
import p5_1 from '../assets/images/projects/5-1.png'
import p5_2 from '../assets/images/projects/5-2.png'
import p5_3 from '../assets/images/projects/5-3.png'
import p5_4 from '../assets/images/projects/5-4.png'
import p5_5 from '../assets/images/projects/5-5.png'

const F = 'https://framerusercontent.com/images/'

export const projects = [
  {
    id: '01',
    title: 'Genzipher',
    tag: 'Hackathon Project',
    date: 'February 2026',
    description:
      'Built and maintained the complete technical infrastructure for GenZipher 1.0, UCSC CSSL GenZ Chapter\'s flagship hackathon featuring a CTF and Buildathon. Engineered the event website with Next.js, deployed a custom-themed CTFd instance with automated milestone notifications, and orchestrated challenge infrastructure using KCTF and Kubernetes-in-Docker on a single VPS — powering hundreds of participants end-to-end.',
    category: 'Hackathon Project',
    client: 'CSSL GenZ Chapter of UCSC',
    duration: '2 months',
    location: 'Colombo, Sri Lanka',
    liveUrl: 'https://www.genzipher.lk/',
    contributors: ['Tharusha Jayasooriya', 'Induwara Uthasara'],
    bg:    p1_1,
    inner: p1_2,
    images: [p1_1, p1_2, p1_3, p1_4],
  },
  {
    id: '02',
    title: 'DriveGuard',
    tag: 'Real Time Driver Monitoring System',
    date: 'May, 2025',
    description:
      'An AI-powered driver safety platform built with Next.js and Azure AI services, delivering real-time detection of drowsiness, phone usage, and overspeeding via live webcam analysis. Features role-based dashboards for drivers and fleet admins, incident analytics, and multi-channel alerts — reducing road risk through intelligent, continuous monitoring.',
    category: 'Road safety',
    client: 'Idealize ',
    duration: '4 – 5 Months',
    location: 'Colombo, Sri Lanka',
    liveUrl: '',
    contributors: ['Induwara Uthsara', 'Nahla Ifshaq'],
    bg:    p2_1,
    inner: p2_3,
    images: [p2_2, p2_3, p2_4, p2_5],
  },
  {
    id: '03',
    title: 'National Health Hub',
    tag: 'Hospital Management System',
    date: 'August, 2025',
    description:
      'A full-stack healthcare management platform spanning an admin dashboard and Expo mobile app, streamlining the entire patient journey from registration and queue management to doctor scheduling, medicine tracking, and inventory control — digitizing hospital operations to reduce wait times and improve care delivery at scale.',
    category: 'Hospital Management System',
    client: 'Techtriathlon',
    duration: '5-6 months',
    location: 'Colombo, Sri Lanka',
    liveUrl: '',
    contributors: ['Yasiru Lakintha', 'Tharusha Jayasooriya', 'Induwara Uthasara'],
    bg:    p3_1,
    inner: p3_2,
    images: [p3_1, p3_2, p3_3, p3_4, p3_5],
  },
  {
    id: '04',
    title: 'Secure Web Server',
    tag: 'Web Server',
    date: 'February 2026',
    description:
      'A high-performance web server built from the ground up in C using POSIX system calls, supporting HTTPS with multi-threaded request handling for concurrent connections. Implements advanced security hardening features — demonstrating deep systems programming expertise in memory management, socket programming, and low-level network communication.',
    category: 'Systems & Network Programming',
    duration: '1 – 2 Weeks',
    location: 'Gampaha, Sri Lanka',
    liveUrl: '',
    contributors: [],
    bg:    p4_0,
    inner: p4_2,
    images: [p4_1, p4_2, p4_3, p4_4],
  },
  {
    id: '05',
    title: 'Travel Mate',
    tag: 'Travel Planning App',
    date: 'January 7, 2025',
    description:
      'A comprehensive MERN stack travel platform combining flight booking, hotel reservations, and holiday planning into a single seamless experience. Deployed on AWS cloud infrastructure for scalability and reliability, offering travelers a unified end-to-end journey planning solution — from discovery to booking, all in one place.',
    category: 'Travel Planning App',
    client: 'Travel Mate',
    duration: '5-6 months',
    location: 'Colombo, Sri Lanka',
    liveUrl: '',
    contributors: ['Tharindu Hashan', 'Derick Fernando','Anjalee Ishara'],
    bg:    p5_1,
    inner: p5_2,
    images: [p5_1, p5_2, p5_3, p5_4, p5_5],
  },
]