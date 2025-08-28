import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Heart } from "lucide-react";

export default function About() {
  const stats = [
    {
      icon: Users,
      label: "Active Users",
      value: "10,000+",
      description: "Users tracking their health daily"
    },
    {
      icon: Target,
      label: "Goals Achieved",
      value: "50,000+",
      description: "Health goals successfully reached"
    },
    {
      icon: Award,
      label: "Success Rate",
      value: "85%",
      description: "Users reaching their targets"
    },
    {
      icon: Heart,
      label: "Lives Improved",
      value: "25,000+",
      description: "People living healthier lives"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      bio: "15+ years in preventive medicine",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      bio: "Former Google engineer, health tech expert",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Lisa Rodriguez",
      role: "Head of Design",
      bio: "UX specialist focused on healthcare",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Dr. James Wilson",
      role: "Research Director",
      bio: "PhD in Health Psychology",
      image: "/api/placeholder/150/150"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">HealthTracker</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to make health tracking simple, effective, and accessible to everyone. 
            Our platform empowers you to take control of your wellness journey with data-driven insights.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="px-4 py-2">Health & Wellness</Badge>
            <Badge variant="secondary" className="px-4 py-2">Data Analytics</Badge>
            <Badge variant="secondary" className="px-4 py-2">Personal Growth</Badge>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-lg font-medium text-gray-700 mb-1">{stat.label}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1