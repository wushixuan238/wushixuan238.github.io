import type { SkillCategory } from "../../types/resume";

interface ResumeSkillsProps {
  data?: SkillCategory[];
}

export const ResumeSkills = ({ data }: ResumeSkillsProps) => {
  const skillCategories = data || [];

  return (
    <div className="flex gap-10">
      <p className="w-32 min-w-[128px] text-end font-medium text-lg">Skills</p>
      <div className="flex gap-16">
        {skillCategories.map((category) => (
          <div className="flex flex-col gap-2.5" key={category.category}>
            <p className="font-semibold text-neutral-400 uppercase tracking-widest text-[11px]">
              {category.category}
            </p>
            <div className="flex flex-col gap-1">
              {category.skills.map((skill) => (
                <p key={skill} className="text-[13px] text-neutral-700">{skill}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
