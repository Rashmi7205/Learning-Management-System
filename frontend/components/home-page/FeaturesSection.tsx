import { Zap, Shield, Users, Trophy, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Learn at Your Pace",
    description:
      "Access courses anytime, anywhere. Learn on your schedule with lifetime access.",
    color: "bg-orange/10 text-orange",
  },
  {
    icon: Shield,
    title: "Industry Certificates",
    description:
      "Earn recognized certificates that boost your resume and career prospects.",
    color: "bg-green/10 text-green",
  },
  {
    icon: Users,
    title: "Active Community",
    description:
      "Join 50,000+ learners. Network, collaborate, and grow together.",
    color: "bg-blue/10 text-blue",
  },
  {
    icon: Trophy,
    title: "Hands-on Projects",
    description:
      "Build real-world projects to add to your portfolio and demonstrate skills.",
    color: "bg-yellow/10 text-yellow",
  },
  {
    icon: Clock,
    title: "Regular Updates",
    description:
      "Courses are updated regularly to reflect the latest industry standards.",
    color: "bg-pink/10 text-pink",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our dedicated support team.",
    color: "bg-primary/10 text-primary",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            The Tuition Advantage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-6 card-hover shadow-soft group"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
