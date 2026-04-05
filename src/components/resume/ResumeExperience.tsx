import type { Experience } from "../../types/resume";

interface ResumeExperienceProps {
  data?: Experience[];
}

export const ResumeExperience = ({ data }: ResumeExperienceProps) => {
  const experiences = data || [];

  return (
    <div className="flex gap-10">
      <p className="w-32 min-w-[128px] text-end font-medium text-lg">Experience</p>
      <div className="flex flex-col gap-10">
        {experiences.map((experience) => (
          <div
            className="flex items-start gap-5"
            key={`${experience.company}-${experience.title}`}
          >
            {experience.logo && (
              <img
                alt={experience.company}
                height={44}
                src={experience.logo}
                width={44}
                className="mt-0.5 grayscale opacity-80 shrink-0"
              />
            )}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[17px] text-neutral-900 leading-tight">
                  {experience.title}
                </p>
                <div className="flex items-center gap-2 text-[14px] text-neutral-500">
                   <p>{experience.company}</p>
                   <span>•</span>
                   <p className="whitespace-pre-line tracking-tight">
                    {experience.caption}
                  </p>
                </div>
              </div>
              {experience.description.length > 1 ? (
                <ul className="list-disc pl-5 space-y-1.5 marker:text-neutral-300">
                  {experience.description.map((description) => (
                    <li className="text-[13px] text-neutral-600 leading-relaxed" key={description}>
                      {description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-neutral-600 leading-relaxed">
                  {experience.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
