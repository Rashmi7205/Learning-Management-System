interface CourseRequirementsProps {
  requirements: string[];
}

const CourseRequirements = ({ requirements }: CourseRequirementsProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Requirements</h2>
      <ul className="space-y-3">
        {requirements.map((req, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
            <span>{req}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRequirements;
