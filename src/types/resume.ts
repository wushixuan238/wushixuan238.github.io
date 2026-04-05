export interface ResumeHeader {
  name: string;
  website: string;
  email: string;
  phone: string;
}

export interface ResumeEducation {
  logo: string;
  degree: string;
  institution: string;
  years: string;
  description: string;
}

export interface Experience {
  company: string;
  logo: string;
  title: string;
  caption: string;
  description: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  header: ResumeHeader;
  education: ResumeEducation[];
  experiences: Experience[];
  skills: SkillCategory[];
}
