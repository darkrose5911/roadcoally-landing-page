"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Truck, 
  Users, 
  Handshake,
  CheckCircle,
  Loader2,
  HeadphonesIcon
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error("Subject is required");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Customer Support",
      description: "Get help with orders and deliveries",
      contact: "+1 (555) 123-4567",
      hours: "24/7 Available",
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: "General Inquiries",
      description: "Questions about our services",
      contact: "hello@roadcoally.com",
      hours: "Response within 24h",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Sales & Partnerships",
      description: "Business opportunities",
      contact: "partnerships@roadcoally.com",
      hours: "Mon-Fri, 9AM-6PM",
      color: "text-purple-600"
    },
    {
      icon: HeadphonesIcon,
      title: "Driver Support",
      description: "Support for delivery drivers",
      contact: "drivers@roadcoally.com",
      hours: "24/7 Available",
      color: "text-orange-600"
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get a delivery?",
      answer: "We offer same-day delivery in most areas, with express options available within 2-4 hours."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve major metropolitan areas across the US, with plans to expand nationwide."
    },
    {
      question: "How do I become a driver?",
      answer: "Visit our driver portal or contact our driver support team. We offer flexible schedules and competitive rates."
    },
    {
      question: "What if my package is damaged?",
      answer: "We have comprehensive insurance coverage. Contact our support team immediately for claims assistance."
    },
    {
      question: "Can I track my delivery in real-time?",
      answer: "Yes! Our app provides real-time tracking with GPS updates and delivery notifications."
    },
    {
      question: "Do you offer business delivery services?",
      answer: "Absolutely! We have tailored solutions for businesses of all sizes with volume discounts and API integration."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-emerald-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <MessageCircle className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl font-heading font-bold mb-6">
              Get in Touch with Roadcoally
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Need help with a delivery, have questions about our services, or want to partner with us? 
              We're here to help 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now: (555) 123-4567
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Multiple Ways to Reach Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the best way to contact us based on your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gradient-to-r from-blue-100 to-green-100 p-3 rounded-full">
                      <IconComponent className={`h-8 w-8 ${method.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="font-semibold text-primary">{method.contact}</p>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {method.hours}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Office Information */}
        <Card className="mb-16 bg-gradient-to-r from-white to-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <MapPin className="h-6 w-6 mr-3 text-primary" />
              Our Headquarters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Address</h4>
                <p className="text-muted-foreground">
                  123 Delivery Boulevard<br />
                  Suite 500<br />
                  San Francisco, CA 94105
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <div className="text-muted-foreground space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                  <Badge className="mt-2">
                    Support available 24/7
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response Times</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Email: Within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Phone: Immediate</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Emergency: 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Send className="h-6 w-6 mr-3 text-primary" />
                Contact Form
              </CardTitle>
              <CardDescription>
                We typically respond within 24 hours during business days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Quick answers to common questions about Roadcoally
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Didn't find what you're looking for?
          </p>
          <Button variant="outline" size="lg">
            <MessageCircle className="h-5 w-5 mr-2" />
            Contact Support
          </Button>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Emergency Delivery Issues?</h3>
          <p className="mb-4">
            For urgent delivery problems or safety concerns, contact us immediately
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-white text-red-600 hover:bg-white/90"
          >
            <Phone className="h-5 w-5 mr-2" />
            Emergency Line: (555) 911-HELP
          </Button>
        </div>
      </section>
    </div>
  );
}