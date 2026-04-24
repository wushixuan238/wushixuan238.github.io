import type { ResumeEducation as ResumeEducationData } from "../../types/resume";

interface ResumeEducationProps {
  data?: ResumeEducationData[];
}

export const ResumeEducation = ({ data }: ResumeEducationProps) => {
  return (
    <div className="flex gap-10">
      <p className="w-32 min-w-[128px] text-end font-medium text-lg pt-1">Education</p>
      <div className="flex flex-col gap-8 flex-1">
        {data?.map((item, index) => (
          <div key={index} className="flex items-start gap-5">
            {item.logo && (
              <img
                alt={`${item.institution} logo`}
                height={44}
                src={item.logo}
                width={44}
                className="mt-0.5 grayscale opacity-80 shrink-0"
              />
            )}
            <div className="flex flex-col gap-1.5 flex-1">
              <p className="flex items-center justify-between font-medium text-[16px]">
                <span>{item.degree}</span>
                <span className="text-neutral-500 dark:text-neutral-400 font-normal text-sm">
                  {item.institution}, {item.years}
                </span>
              </p>
              <p className="text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
