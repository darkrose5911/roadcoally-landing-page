import { Metadata } from 'next';
import { Shield, Eye, Keyboard, Volume2, Users, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Accessibility | Privacy Policy Generator',
  description: 'Our commitment to digital accessibility and inclusive design for all users.',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're committed to ensuring digital accessibility for people with disabilities
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Our Commitment */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                Our Commitment
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-6">
                  Privacy Policy Generator is committed to ensuring that our website is accessible to everyone, 
                  including people with disabilities. We strive to adhere to the Web Content Accessibility 
                  Guidelines (WCAG) 2.1 Level AA standards and continuously work to improve the accessibility 
                  of our platform.
                </p>
                <p>
                  We believe that everyone should have equal access to information and functionality, 
                  regardless of their abilities or the technologies they use to access our website.
                </p>
              </div>
            </section>

            {/* Accessibility Features */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Accessibility Features
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Keyboard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Keyboard Navigation
                      </h3>
                      <p className="text-gray-600">
                        Full keyboard accessibility with logical tab order and visible focus indicators.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Visual Design
                      </h3>
                      <p className="text-gray-600">
                        High contrast ratios, scalable text, and clear visual hierarchy for better readability.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Volume2 className="w-6 h-6 text-purple-600" />