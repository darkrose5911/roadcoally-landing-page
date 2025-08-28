import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">
            Learn how we use cookies to improve your experience
          </p>
          <Badge variant="outline" className="mt-2">
            Last updated: December 2024
          </Badge>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                What are Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Essential Cookies</h3>
                <p className="text-gray-600 mb-2">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                </p>
                <Badge>Required</Badge>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 mb-2">
                  We use analytics cookies to understand how visitors interact with our website. This helps us improve our content and user experience.
                </p>
                <Badge variant="secondary">Optional</Badge>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Preference Cookies</h3>
                <p className="text-gray-600 mb-2">
                  These cookies remember your preferences and settings to provide you with a personalized experience.
                </p>
                <Badge variant="secondary">Optional</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We may use third-party services that set their own cookies. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Google Analytics - for website analytics and performance monitoring</li>
                <li>Authentication services - for secure login functionality</li>
                <li>Content delivery networks - for faster page loading</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                You have several options for managing cookies:
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Browser Settings</h4>
                  <p className="text-blue-700 text-sm">
                    Most browsers allow you to control cookies through their settings. You can usually find these options in the "Privacy" or "Security" section.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Cookie Banner</h4>
                  <p className="text-green-700 text-sm">
                    When you first visit our site, you can choose which types of cookies to accept through our cookie banner.
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900">Opt-Out Links</h4>
                  <p className="text-purple-700 text-sm">
                    Some third-party services provide direct opt-out mechanisms for their cookies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Session Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Deleted when you close your browser
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Persistent Cookies</h4>
                  <p className="text-sm text-gray-600">
                    Stored for a specific period (typically 30 days to 2 years)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                If you have questions about our cookie policy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you have any questions about how we use cookies or would like to exercise your rights regarding cookies, 
                please contact us at privacy@ourwebsite.com or through our contact form.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}