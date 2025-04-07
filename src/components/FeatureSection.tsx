
import React from "react";
import { 
  Globe, 
  Database, 
  Users, 
  FileSpreadsheet, 
  Mic, 
  Zap
} from "lucide-react";

const features = [
  {
    icon: <Globe className="h-8 w-8 text-lingua-500" />,
    title: "Low-Resource Languages",
    description:
      "Support for languages commonly overlooked by mainstream translation tools but vital for agricultural communities.",
  },
  {
    icon: <Database className="h-8 w-8 text-lingua-500" />,
    title: "Data Collection",
    description:
      "Purpose-built tools for gathering agricultural terminology and knowledge in the field.",
  },
  {
    icon: <Users className="h-8 w-8 text-lingua-500" />,
    title: "Text Translation",
    description:
      "Accurate translations of written agricultural content between English and local languages.",
  },
  {
    icon: <FileSpreadsheet className="h-8 w-8 text-lingua-500" />,
    title: "Agricultural Datasets",
    description:
      "Specialized vocabulary for farming, crop management, irrigation, and sustainable practices.",
  },
  {
    icon: <Mic className="h-8 w-8 text-lingua-500" />,
    title: "Voice Translation",
    description:
      "Speak and hear translations, making knowledge accessible regardless of literacy levels.",
  },
  {
    icon: <Zap className="h-8 w-8 text-lingua-500" />,
    title: "Real-Time Processing",
    description:
      "Fast translation processing to support immediate communication needs in agricultural settings.",
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bridging Language Gaps in Agriculture
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform is specifically designed to address the unique challenges
            of agricultural data collection across language barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-card rounded-xl p-6 border border-border shadow-sm transition-all hover:border-lingua-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 p-3 bg-lingua-50 rounded-lg inline-block dark:bg-lingua-900/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
