import ahuLogo from "../assets/resume/ahu.svg";
import githubResumeLogo from "../assets/resume/github.webp";
import type { ResumeData } from "../types/resume";

export const resumeData: ResumeData = {
  header: {
    name: "Yujun Pan",
    website: "https://yujunpan.me",
    email: "boyisolatin7@163.com",
    phone: "+86 15755134787",
  },
  education: [
    {
      logo: ahuLogo,
      degree: "Master of Software Engineering",
      institution: "Anhui University",
      years: "2023-2026",
      description:
        "Courses: Advanced Software Engineering, Distributed Systems, Cloud Computing, System Architecture",
    },
    {
      logo: ahuLogo,
      degree: "B.Eng. in Software Engineering",
      institution: "Anhui University",
      years: "2019-2023",
      description:
        "Courses: Data Structures, Operating Systems, Computer Networks, Database Systems, Software Requirements Engineering",
    },
  ],
  experiences: [
    {
      company: "GitHub",
      logo: githubResumeLogo,
      title: "Senior Design Engineer, Core UX",
      caption: "03/2026 - Current",
      description: ["Exploring AI x design system"],
    },
  ],
  skills: [
    {
      category: "AI Agent",
      skills: ["Design system", "High-fidelity craft", "Vector tools"],
    },
    {
      category: "Frontend",
      skills: [
        "React, React Native, TypeScript",
        "Prototyping",
        "Component composition",
      ],
    },
    {
      category: "Backend",
      skills: ["Java", "Python", "Golang"],
    },
  ],
};

export const RESUME_SHEET_SIZE = {
  width: 840,
};
