import { ArrowLeft, Shield, FileText, Eye, Lock, Scale, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-900">Terms of Service</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Please read these terms carefully before using our services
          </p>
          <p className="text-sm text-gray-500">
            Last updated: December 2024
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 lg:p-12">
              
              {/* Quick Navigation */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-blue-600" />
                  Quick Navigation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <a href="#acceptance" className="text-blue-600 hover:text-blue-800 transition-colors">1. Acceptance of Terms</a>
                  <a href="#services" className="text-blue-600 hover:text-blue-800 transition-colors">2. Description of Services</a>
                  <a href="#accounts" className="text-blue-600 hover:text-blue-800 transition-colors">3. User Accounts</a>
                  <a href="#conduct" className="text-blue-600 hover:text-blue-800 transition-colors">4. User Conduct</a>
                  <a href="#content" className="text-blue-600 hover:text-blue-800 transition-colors">5. Content and Intellectual Property</a>
                  <a href="#privacy" className="text-blue-600 hover:text-blue-800 transition-colors">6. Privacy and Data Protection</a>
                  <a href="#limitation" className="text-blue-600 hover:text-blue-800 transition-colors">7. Limitation of Liability</a>
                  <a href="#termination" className="text-blue-600 hover:text-blue-800 transition-colors">8. Termination</a>
                </div>
              </div>

              {/* Terms Sections */}
              <div className="space-y-12">
                
                {/* Section 1 */}
                <section id="acceptance">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-6 w-6 mr-3 text-green-600" />
                    1. Acceptance of Terms
                  </h2>
                  <div className="prose prose-gray max-w-none