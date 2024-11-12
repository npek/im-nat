import BulletPoint from "./BulletPoint";

interface ExperienceProps {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
}

export const ExperienceItem = ({
  jobTitle,
  company,
  startDate,
  endDate,
  bulletPoints,
}: ExperienceProps) => {
  return (
    <div className="flex flex-col">
      <label className="font-bold">{jobTitle}</label>
      <label className="pb-2">
        {company}, {startDate} - {endDate}
      </label>
      {bulletPoints.map((b, index) => {
        return <BulletPoint key={jobTitle + index}>{b}</BulletPoint>;
      })}
    </div>
  );
};
