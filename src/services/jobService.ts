
import { Job, UserSkills } from '@/types/job';

// Mock job listings data
export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$70,000 - $90,000",
    requiredSkills: ["React", "Next.js", "JavaScript", "Tailwind CSS"],
    matchScore: 85
  },
  {
    id: 2,
    title: "UI Engineer",
    company: "DesignPro",
    location: "New York, USA",
    salary: "$80,000 - $100,000",
    requiredSkills: ["Figma", "React", "CSS"],
    matchScore: 70
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Innovation Labs",
    location: "San Francisco, USA",
    salary: "$90,000 - $120,000",
    requiredSkills: ["React", "Node.js", "TypeScript", "MongoDB"],
    matchScore: 45
  }
];

// Mock user skills
export const userSkills: UserSkills = {
  skills: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"]
};

export const fetchJobs = async (): Promise<Job[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return jobs;
};

export const fetchUserSkills = async (): Promise<UserSkills> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return userSkills;
};
