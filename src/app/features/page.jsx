import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, TrendingUp, Shield, Zap, Globe, Clock, Target } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-tenant Architecture",
      description: "Secure, scalable multi-tenancy with complete data isolation",
      benefits: ["Data isolation", "Custom branding", "Role-based access", "Tenant analytics"]
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Real-time insights and comprehensive reporting dashboards",
      benefits: ["Real-time metrics", "Custom reports", "Data visualization", "Export capabilities"]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with encryption and compliance standards",
      benefits: ["End-to-end encryption", "SOC 2 compliance", "Two-factor auth", "Audit logs"]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Optimized performance with global CDN and caching",
      benefits: ["Sub-second load times", "Global CDN", "Smart caching", "Auto-scaling"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Multi-language support and international compliance",
      benefits: ["50+ languages", "Local regulations", "Currency support", "Time zones"]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Round-the-clock expert support and monitoring",
      benefits: ["Live chat support", "99.9% uptime SLA", "Health monitoring", "Priority response"]
    }
  ];

  const useCases = [
    {
      title: "Enterprise SaaS",
      description: "Scale your SaaS application with enterprise-grade features",
      features: ["Multi-tenancy", "Advanced analytics", "Enterprise security"]
    },
    {
      title: "E-commerce Platform",
      description: "Build powerful online stores with global reach",
      features: ["Payment processing", "Inventory management", "International support"]
    },
    {
      title: "Content Management",
      description: "Manage and distribute content across multiple channels",
      features: ["Multi-channel publishing", "Version control", "Collaboration tools"]
    },
    {
      title: "Business Intelligence",
      description: "Transform data into actionable business insights",
      features: ["Data visualization", "Custom dashboards", "Predictive analytics"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            <Target className="h-4 w-4 mr-2" />
            Powerful Features
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            Everything You Need
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Comprehensive features designed to scale with your business. From multi-tenant architecture 
            to advanced analytics, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Core Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built with modern technologies and best practices to deliver exceptional performance and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Perfect For Any Use Case
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you're building a SaaS platform, e-commerce site, or enterprise application, 
              our features adapt to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 hover:from-blue-50 hover:to-indigo-50"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">{useCase.title}</CardTitle>
                  <CardDescription className="text-slate-600">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of businesses already using our platform to scale and grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100">
                <Link href="/signup">Start Your Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}