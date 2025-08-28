import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Eye, Lock, Users, Mail, Clock, FileText, AlertTriangle } from 'lucide-react';

export default function DataProtectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Data Protection Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We are committed to protecting your privacy and ensuring the security of your personal data.
            </p>
            <div className="flex justify-center mt-6">
              <Badge variant="secondary" className="text-sm">
                Last updated: December 2024
              </Badge>
            </div>
          </div>

          {/* Quick Overview */}
          <Card className="mb-8 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Quick Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Secure Storage</h3>
                  <p className="text-sm text-gray-600">End-to-end encryption</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">No Data Sharing</h3>
                  <p className="text-sm text-gray-600">We never sell your data</p>
                </div>
                <div className="text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold">GDPR Compliant</h3>
                  <p className="text-sm text-gray-600">Full compliance guaranteed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>1. Data We Collect</CardTitle>
              <CardDescription>
                We collect only the minimum data necessary to provide our services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Name and email address (for account creation)</li>
                  <li>Profile information you choose to provide</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Usage Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Pages visited and features used</li>
                  <li>Time spent on the platform</li>
                  <li>Device and browser information</li>
                  <li>IP address (for security purposes)</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Technical Data</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Cookies and similar technologies</li>
                  <li>Log files and error reports</li>
                  <li>Performance metrics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Data */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>2. How We Use Your Data</CardTitle>
              <CardDescription>
                Your data is used solely to improve your experience and provide our services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    Service Provision
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Account management and authentication</li>
                    <li>Personalized user experience</li>
                    <li>Customer support and assistance</li>
                    <li>Service improvements and updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    Communication
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Important service announcements</li>
                    <li>Security alerts and notifications</li>
                    <li>Response to your inquiries</li>
                    <li>Optional marketing communications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                3. Data Security
              </CardTitle>
              <CardDescription>
                We implement industry-standard security measures to protect your data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Technical Safeguards</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>256-bit SSL/TLS encryption</li>
                    <li>Secure data centers</li>
                    <li>Regular security audits</li>
                    <li>Access controls and monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Organizational Measures</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Staff training on data protection</li>
                    <li>Limited access on need-to-know basis</li>
                    <li>Regular backup