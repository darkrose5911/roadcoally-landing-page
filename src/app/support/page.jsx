"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Mail, Phone, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function SupportPage() {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: ""
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject || !ticketForm.category || !ticketForm.priority || !ticketForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Support ticket submitted successfully!");
    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: ""
    });
  };

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password'. Enter your email address and we'll send you a reset link."
    },
    {
      question: "How can I update my billing information?",
      answer: "Navigate to Settings > Billing to update your payment methods, billing address, and subscription details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from Settings > Subscription. Your access will continue until the end of your current billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all new subscriptions. Contact support for refund requests."
    }
  ];

  const tickets = [
    {
      id: "TICK-001",
      subject: "Login Issues",
      status: "Open",
      priority: "High",
      created: "2 hours ago"
    },
    {
      id: "TICK-002", 
      subject: "Billing Question",
      status: "In Progress",
      priority: "Medium",
      created: "1 day ago"
    },
    {
      id: "TICK-003",
      subject: "Feature Request",
      status: "Resolved",
      priority: "Low",
      created: "3 days ago"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help when you need it. Browse our FAQ, submit a support ticket, or contact us directly.
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-