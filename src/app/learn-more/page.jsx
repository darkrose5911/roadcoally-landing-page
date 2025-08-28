import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Target, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function LearnMorePage() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Learning",
      description: "Access a vast library of courses, tutorials, and resources designed by industry experts."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a vibrant community of learners and professionals sharing knowledge and experiences."
    },
    {
      icon: Award,
      title: "Certification Programs",
      description: "Earn recognized certifications that validate your skills and boost your career prospects."
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "AI-powered recommendations tailored to your learning style and career goals."
    }
  ];

  const benefits = [
    "Learn at your own pace with flexible scheduling",
    "Access courses from anywhere with our mobile app",
    "Get hands-on experience with real-world projects",
    "Network with industry professionals and mentors",
    "Stay updated with the latest industry trends",
    "Track your progress with detailed analytics"
  ];

  const stats = [
    { number: "50K+", label: "Active Learners" },
    { number: "500+", label: "Expert Instructors" },
    { number: "1000+", label: "Courses Available" },
    { number: "95%", label: "Completion Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Learn More About Our Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Transform Your
            <span className="text-blue-600 block">Learning Journey</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Discover how our innovative platform revolutionizes the way you learn, 
            grow, and achieve your professional goals through cutting-edge technology 
            and expert-curated content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience learning like never before with our comprehensive suite of features 
              designed to accelerate your growth and success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                What You'll Get
              </h2>
              <p className="text-xl text-slate-600">
                Unlock your potential with these amazing benefits
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of learners who have already transformed their careers 
                with our platform. Your success story starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-blue-600">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button variant="ghost">
                ← Back to Home
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="ghost">
                Browse Courses
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">
                About Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}