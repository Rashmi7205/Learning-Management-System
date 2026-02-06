import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface WhatYouWillLearnProps {
  outcomes: string[];
}

const WhatYouWillLearn = ({ outcomes }: WhatYouWillLearnProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedOutcomes = showAll ? outcomes : outcomes.slice(0, 8);
  const hasMore = outcomes.length > 8;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-bold text-foreground mb-6">
        What You'll Learn
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedOutcomes.map((outcome, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-muted-foreground text-sm leading-relaxed">
              {outcome}
            </span>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 mt-6 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          <span>
            Show {showAll ? "Less" : `All ${outcomes.length} Learning Outcomes`}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
};

export default WhatYouWillLearn;
