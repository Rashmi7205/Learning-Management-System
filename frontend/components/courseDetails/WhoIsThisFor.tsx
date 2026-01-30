import { User, GraduationCap, Briefcase, Rocket } from "lucide-react";

interface Audience {
  icon: "beginner" | "student" | "professional" | "advanced";
  description: string;
}

interface WhoIsThisForProps {
  audiences: Audience[];
}

const WhoIsThisFor = ({ audiences }: WhoIsThisForProps) => {
  const getIcon = (iconType: Audience["icon"]) => {
    switch (iconType) {
      case "beginner":
        return <User className="w-5 h-5 text-primary" />;
      case "student":
        return <GraduationCap className="w-5 h-5 text-primary" />;
      case "professional":
        return <Briefcase className="w-5 h-5 text-primary" />;
      case "advanced":
        return <Rocket className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">
        Who this course is for:
      </h2>
      <ul className="space-y-4">
        {audiences.map((audience, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {getIcon(audience.icon)}
            </div>
            <span className="text-muted-foreground pt-2">
              {audience.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhoIsThisFor;
