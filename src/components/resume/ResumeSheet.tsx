import { RESUME_SHEET_SIZE } from "../../data/resume-data";
import type { ResumeData } from "../../types/resume";
import { cn } from "../../lib/utils";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeExperience } from "./ResumeExperience";
import { ResumeHeader } from "./ResumeHeader";
import { ResumeSkills } from "./ResumeSkills";

interface ResumeSheetProps {
  className?: string;
  interactive?: boolean;
  data?: ResumeData;
}

export const ResumeSheet = ({
  className,
  interactive = true,
  data,
}: ResumeSheetProps) => {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-12 bg-white pt-10 pb-20",
        !interactive && "pointer-events-none select-none",
        className
      )}
      style={{
        width: RESUME_SHEET_SIZE.width,
      }}
    >
      <ResumeHeader data={data?.header} />
      <hr className="border-neutral-100 ml-32" />
      <ResumeExperience data={data?.experiences} />
      <hr className="border-neutral-100 ml-32" />
      <ResumeEducation data={data?.education} />
      <hr className="border-neutral-100 ml-32" />
      <ResumeSkills data={data?.skills} />
    </article>
  );
};
