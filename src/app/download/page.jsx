import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Smartphone, Monitor, Globe, Zap, Shield, Users } from "lucide-react";

export default function DownloadPage() {
  const platforms = [
    {
      name: "Windows",
      icon: Monitor,
      version: "v2.1.0",
      size: "45.2 MB",
      description: "Full desktop experience with all features",
      downloadUrl: "#",
      requirements: "Windows 10 or later"
    },
    {
      name: "macOS",
      icon: Monitor,
      version: "v2.1.0",
      size: "52.8 MB",
      description: "Native Mac application with system integration",
      downloadUrl: "#",
      requirements: "macOS 11.0 or later"
    },
    {
      name: "iOS",
      icon: Smartphone,
      version: "v2.0.8",
      size: "28.4 MB",
      description: "Optimized for iPhone and iPad",
      downloadUrl: "#",
      requirements: "iOS 14.0 or later"
    },
    {
      name: "Android",
      icon: Smartphone,
      version: "v2.0.9",
      size: "31.7 MB",
      description: "Available on Google Play Store",
      downloadUrl: "#",
      requirements: "Android 8.0 or later"
    },
    {
      name: "Web App",
      icon: Globe,
      version: "Latest",
      size: "~5 MB",
      description: "Access from any modern browser",
      downloadUrl: "#",
      requirements: "Modern web browser"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance across all platforms"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encryption and privacy protection"
    },
    {
      icon: Users,
      title: "Cross-Platform Sync",
      description: "Seamless synchronization between all your devices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Download Our App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the best experience on your favorite platform. Available for all major devices and operating systems.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Download Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 group-hover:bg-blue-50 transition-colors">
                  <platform.icon className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-colors" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {platform.name}
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {platform.version}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {platform.size}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 min-h-[3rem] flex items-center justify-center">
                  {platform.description}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {platform.requirements}
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Check out our comprehensive guides and documentation to get the most out of your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}