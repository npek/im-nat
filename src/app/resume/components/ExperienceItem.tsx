import DisplayLabel from "@/app/components/DisplayLabel";
import BulletPoint from "../../components/BulletPoint";

interface ExperienceProps {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
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
      <DisplayLabel className="font-bold" textType="h3">
        {jobTitle}
      </DisplayLabel>
      <DisplayLabel className="pb-2">
        {company}, {startDate} - {endDate ? `${endDate}` : "Present"}
      </DisplayLabel>
      {bulletPoints.map((b, index) => {
        return <BulletPoint key={jobTitle + index}>{b}</BulletPoint>;
      })}
    </div>
  );
};
