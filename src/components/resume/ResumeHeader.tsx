import type { ResumeHeader as ResumeHeaderData } from "../../types/resume";

interface ResumeHeaderProps {
  data?: ResumeHeaderData;
}

export const ResumeHeader = ({ data }: ResumeHeaderProps) => {
  return (
    <div className="flex gap-10">
      <p className="w-32 text-end font-medium text-xl">{data?.name}</p>
      <div className="flex flex-col gap-1 text-[13px]">
        <a
          className="underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-3 hover:text-neutral-900 dark:hover:text-white text-neutral-600 dark:text-neutral-300 transition-colors"
          href={data?.website}
          target="_blank"
          rel="noreferrer"
        >
          {data?.website.replace("https://", "")}
        </a>
        <a
          className="underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-3 hover:text-neutral-900 dark:hover:text-white text-neutral-600 dark:text-neutral-300 transition-colors"
          href={`mailto:${data?.email}`}
        >
          {data?.email}
        </a>
        <p className="text-neutral-500 dark:text-neutral-400">{data?.phone}</p>
      </div>
    </div>
  );
};
