import { Leaf, BarChart3, Users, Shield } from "lucide-react";
import Link from "next/link";
// import { button } from "@/components/ui/button";
// import { div, div } from "@/components/ui/div";
// import { Leaf, BarChart3, Users, Shield } from "lucide-react";
// import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Smart Waste Management for 
                  <span className="bg-gradient-hero bg-clip-text text-transparent"> Schools</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  carbonIQ empowers students and schools to collect, analyze, and act on waste site data. 
                  Transform environmental monitoring into actionable insights.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/register"
                  className="bg-eco-primary text-white px-8 py-6 rounded-lg text
                  text-lg font-semibold hover:bg-eco-secondary transition-colors duration-200"
                >
                  Get Started
                </Link>
                <button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-eco-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Schools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-eco-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-eco-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Data Points</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/clean.webp" 
                alt="Students collecting waste data with tablets at a clean waste management site"
                className="rounded-2xl shadow-eco w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Waste Data Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for educational institutions to monitor, track, and optimize waste management practices
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-eco-light bg-eco-light/50 hover:shadow-soft transition-all duration-300">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Environmental Impact</h3>
                <p className="text-muted-foreground text-sm">
                  Track and measure environmental impact across campus waste sites
                </p>
              </div>
            </div>
            
            <div className="border-eco-light bg-eco-light/50 hover:shadow-soft transition-all duration-300">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Data Analytics</h3>
                <p className="text-muted-foreground text-sm">
                  Real-time analytics and reporting for informed decision making
                </p>
              </div>
            </div>
            
            <div className="border-eco-light bg-eco-light/50 hover:shadow-soft transition-all duration-300">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Student Engagement</h3>
                <p className="text-muted-foreground text-sm">
                  Easy-to-use platform designed for student data collectors
                </p>
              </div>
            </div>
            
            <div className="border-eco-light bg-eco-light/50 hover:shadow-soft transition-all duration-300">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-eco-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">School Administration</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive oversight and management tools for administrators
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Transform Waste Management at Your School?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join hundreds of schools already using carbonIQ to make data-driven environmental decisions
            </p>
            <Link 
              href="/register"
              className="bg-eco-primary text-white px-8 py-6 rounded-lg text
              text-lg font-semibold hover:bg-eco-secondary transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-eco-primary" />
            {/* <span className="text-2xl font-bold text-foreground">carbonIQ</span> */}
            <img 
              src="/logo2.png" 
              alt="Students collecting waste data with tablets at a clean waste management site"
              className="rounded-2xl shadow-eco w-[60%] h-auto"
            />
          </div>
          <p className="text-muted-foreground">
            Empowering schools with smart waste management solutions
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
