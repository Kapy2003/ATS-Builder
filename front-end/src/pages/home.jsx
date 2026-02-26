import Hero from '../components/hero';
import FeatureCard from '../components/featurecard';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Hero />

      <section className="mt-24 pb-20">
        <div className="flex items-center gap-8 mb-10">
          <h2 className="text-4xl font-bold bg-[#B9FF66] px-4 py-1 rounded-md inline-block">
            AI Features
          </h2>
          <p className="text-lg max-w-md text-gray-700">
            Streamline your hiring pipeline with AI-powered tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard 
            titleLine1="Resume Parsing" 
            titleLine2="Engine" 
            variant="light" 
          />
          <FeatureCard 
            titleLine1="Automated" 
            titleLine2="Candidate Scoring" 
            variant="green" 
          />
          <FeatureCard 
            titleLine1="Smart Interview" 
            titleLine2="Scheduling" 
            variant="dark" 
          />
        </div>
      </section>
    </div>
  );
};

export default Home;