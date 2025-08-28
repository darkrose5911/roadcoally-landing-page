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
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br