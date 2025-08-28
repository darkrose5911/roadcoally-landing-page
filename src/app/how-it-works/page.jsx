import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, FileText, Calendar, BarChart3, Shield } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Sign Up & Setup",
      description: "Create your account and set up your organization profile in minutes",
      icon: Users,
      details: [
        "Quick registration process",
        "Organization configuration", 
        "Team member invitations",
        "Initial settings setup"
      ]
    },
    {
      number: "02",
      title: "Create Projects",
      description: "Set up your projects with custom workflows and requirements",
      icon: FileText,
      details: [
        "Project templates",
        "Custom workflows",
        "Requirement definitions",
        "Milestone planning"
      ]
    },
    {
      number: "03",
      title: "Schedule & Track",
      description: "Plan your timeline and track progress with our intuitive tools",
      icon: Calendar,
      details: [
        "Interactive scheduling",
        "Real-time progress tracking",
        "Automated notifications",
        "Deadline management"
      ]
    },
    {
      number: "04",
      title: "Analyze & Optimize",
      description: "Get insights from comprehensive analytics and reporting",
      icon: BarChart3,
      details: [
        "Performance metrics",
        "Custom reports",
        "Trend analysis",
        "Optimization recommendations"
      ]
    }
  ];

  const benefits = [
    {
      title: "Streamlined Workflow",
      description: "Eliminate bottlenecks and improve team efficiency with automated processes",
      icon: CheckCircle
    },
    {
      title: "Enhanced Collaboration",
      description: "Keep everyone aligned with real-time updates and communication tools",
      icon: Users
    },
    {
      title: "Data-Driven Decisions",
      description: "Make informed choices with comprehensive analytics and insights",
      icon: BarChart3
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            How It Works
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple Steps to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Success
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get started with our platform in just four easy steps. From setup to success, 
            we'll guide you through every stage of your journey.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 opacity-50 rounded-bl-3xl"></div>
                <div className="absolute top-4 left-4">
                  <div className="text-6xl font-bold text-gray-100 group-hover:text-blue-100 transition-colors">
                    {step.number}
                  </div>
                </div>
                <CardContent className="p-8 pt-16">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <step.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the benefits that thousands of teams trust for their success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of teams who trust our platform for their success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}