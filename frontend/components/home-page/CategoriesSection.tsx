import {
  Palette,
  Code,
  TrendingUp,
  Megaphone,
  Camera,
  Music,
  Heart,
  Briefcase,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Art & Design",
    count: 45,
    icon: Palette,
    color: "bg-pink/10 text-pink",
  },
  {
    id: 2,
    name: "Development",
    count: 78,
    icon: Code,
    color: "bg-blue/10 text-blue",
  },
  {
    id: 3,
    name: "Business",
    count: 56,
    icon: TrendingUp,
    color: "bg-green/10 text-green",
  },
  {
    id: 4,
    name: "Marketing",
    count: 34,
    icon: Megaphone,
    color: "bg-orange/10 text-orange",
  },
  {
    id: 5,
    name: "Photography",
    count: 28,
    icon: Camera,
    color: "bg-purple/10 text-purple",
  },
  {
    id: 6,
    name: "Music",
    count: 22,
    icon: Music,
    color: "bg-yellow/10 text-yellow",
  },
  {
    id: 7,
    name: "Health",
    count: 19,
    icon: Heart,
    color: "bg-destructive/10 text-destructive",
  },
  {
    id: 8,
    name: "Finance",
    count: 31,
    icon: Briefcase,
    color: "bg-primary/10 text-primary",
  },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 section-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Explore Top Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect course category to match your career goals and
            interests.
          </p>
        </div>

        {/* Categories Grid - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-card rounded-2xl border border-border p-6 card-hover shadow-soft cursor-pointer group text-center"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                <category.icon className="w-8 h-8" />
              </div>

              {/* Category Info */}
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.count} Courses
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
