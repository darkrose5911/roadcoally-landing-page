"use client";

import BackgroundPattern from "@/components/BackgroundPattern";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import { ClickSpark } from "@/components/ClickSpark";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Truck, Shield, Users, ArrowRight, Zap, Clock, MapPin, Phone, Mail, FileText, UserCheck, CreditCard, Gauge } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Basic Plan",
      price: "Free",
      subtitle: "Pay per delivery",
      description: "Perfect for occasional drivers and customers",
      features: [
        "Access to delivery network",
        "Basic customer support",
        "Standard delivery tracking",
        "Commission-based earnings",
        "Mobile app access",
        "Basic analytics"
      ],
      notIncluded: [
        "Priority support",
        "Advanced analytics",
        "Bulk delivery discounts"
      ],
      cta: "Get Started Free",
      popular: false,
      color: "border-white/20"
    },
    {
      name: "Premium Plan",
      price: "$29",
      subtitle: "per month",
      description: "Enhanced features for regular users",
      features: [
        "Everything in Basic",
        "Priority customer support",
        "Advanced delivery tracking",
        "Reduced commission rates",
        "Bulk delivery discounts",
        "Advanced analytics dashboard",
        "Route optimization",
        "Earnings insights"
      ],
      notIncluded: [
        "Custom integrations",
        "Dedicated account manager"
      ],
      cta: "Start Premium Trial",
      popular: true,
      color: "border-white bg-white/5"
    },
    {
      name: "Enterprise Plan",
      price: "Custom",
      subtitle: "tailored pricing",
      description: "Comprehensive solutions for businesses",
      features: [
        "Everything in Premium",
        "Custom integrations",
        "Dedicated account manager",
        "White-label solutions",
        "API access",
        "Advanced reporting",
        "SLA guarantees",
        "Custom onboarding"
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false,
      color: "border-white/20"
    }
  ];

  const comparisonFeatures = [
    {
      feature: "Delivery Access",
      basic: true,
      premium: true,
      enterprise: true
    },
    {
      feature: "Mobile App",
      basic: true,
      premium: true,
      enterprise: true
    },
    {
      feature: "Basic Support",
      basic: true,
      premium: true,
      enterprise: true
    },
    {
      feature: "Priority Support",
      basic: false,
      premium: true,
      enterprise: true
    },
    {
      feature: "Advanced Analytics",
      basic: false,
      premium: true,
      enterprise: true
    },
    {
      feature: "Route Optimization",
      basic: false,
      premium: true,
      enterprise: true
    },
    {
      feature: "Bulk Discounts",
      basic: false,
      premium: true,
      enterprise: true
    },
    {
      feature: "API Access",
      basic: false,
      premium: false,
      enterprise: true
    },
    {
      feature: "Custom Integrations",
      basic: false,
      premium: false,
      enterprise: true
    },
    {
      feature: "Dedicated Manager",
      basic: false,
      premium: false,
      enterprise: true
    }
  ];

  const faqData = [
    {
      question: "How does pay-per-delivery pricing work?",
      answer: "With our Basic plan, you only pay when you use our services. Customers pay delivery fees directly, and drivers earn commission on each successful delivery. There are no monthly subscription costs - you pay as you go."
    },
    {
      question: "What are the commission rates?",
      answer: "Commission rates vary by plan and delivery type. Basic plan users pay standard rates, while Premium subscribers enjoy reduced commission rates. Enterprise customers receive custom pricing based on volume and specific needs."
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Premium plan changes take effect immediately, and you'll be charged or credited on a pro-rated basis. Enterprise customers work with their account manager for plan changes."
    },
    {
      question: "Are there any setup fees?",
      answer: "No setup fees for Basic and Premium plans. You can start using Roadcoally immediately after signing up. Enterprise customers may have custom onboarding fees depending on integration requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and bank transfers. Premium subscriptions are billed monthly, while delivery fees are processed per transaction. Enterprise customers can arrange custom billing terms."
    },
    {
      question: "Is there a free trial available?",
      answer: "The Basic plan is completely free to start - no trial needed. Premium plan includes a 14-day free trial so you can explore advanced features before committing. Enterprise plans include a custom evaluation period."
    },
    {
      question: "What happens if I cancel my subscription?",
      answer: "You can cancel your Premium subscription anytime. You'll continue to have access to Premium features until your billing period ends, then you'll automatically switch to the Basic plan. No cancellation fees apply."
    },
    {
      question: "Do you offer discounts for annual subscriptions?",
      answer: "Yes! Premium subscribers who pay annually receive a 20% discount. Enterprise customers can negotiate custom pricing that may include additional savings for longer-term commitments."
    }
  ];

  return (
    <BackgroundPattern>
      <SmoothScrollWrapper>
        <ClickSpark color="white">
          <div className="min-h-screen">
            <Header currentPath="/pricing" />
            
            <main className="relative">
              {/* Hero Section */}
              <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                      <CreditCard className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Transparent Pricing</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
                      Simple, Transparent
                      <span className="block">Pricing</span>
                    </h1>
                    
                    <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                      Choose the plan that fits your needs. From free pay-per-delivery to comprehensive enterprise solutions, we believe in fair, value-based pricing that grows with you.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" variant="secondary" className="bg-white text-[#00A651] hover:bg-white/90 font-semibold">
                        View All Plans
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                        Talk to Sales
                        <Phone className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pricing Tiers */}
              <section className="relative py-20 lg:py-28">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                      Choose Your Plan
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                      Flexible pricing options designed to scale with your delivery needs
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                      <Card key={index} className={`relative bg-white/5 backdrop-blur-sm border-2 ${tier.color} transition-all duration-300 hover:scale-105 hover:bg-white/10 ${tier.popular ? 'lg:scale-105' : ''}`}>
                        {tier.popular && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <Badge className="bg-white text-[#00A651] hover:bg-white/90 font-semibold px-3 py-1">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-4">
                          <CardTitle className="text-2xl font-heading font-bold text-white mb-2">
                            {tier.name}
                          </CardTitle>
                          <div className="mb-4">
                            <div className="flex items-baseline justify-center gap-1">
                              <span className="text-4xl font-bold text-white">{tier.price}</span>
                              <span className="text-white/70">{tier.subtitle}</span>
                            </div>
                          </div>
                          <CardDescription className="text-white/80 text-base">
                            {tier.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          <div className="space-y-3">
                            {tier.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-white flex-shrink-0" />
                                <span className="text-white/90">{feature}</span>
                              </div>
                            ))}
                            {tier.notIncluded.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-3 opacity-50">
                                <X className="w-5 h-5 text-white/50 flex-shrink-0" />
                                <span className="text-white/50">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Button 
                            className={`w-full font-semibold ${
                              tier.popular 
                                ? 'bg-white text-[#00A651] hover:bg-white/90' 
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                            }`}
                            size="lg"
                          >
                            {tier.cta}
                            {tier.name === "Enterprise Plan" ? <Phone className="ml-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              {/* Comparison Table */}
              <section className="relative py-20 lg:py-28">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                      Compare Features
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                      See what's included in each plan at a glance
                    </p>
                  </div>

                  <div className="max-w-4xl mx-auto">
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/20 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/20">
                              <th className="text-left text-white font-semibold p-6">Features</th>
                              <th className="text-center text-white font-semibold p-6">Basic</th>
                              <th className="text-center text-white font-semibold p-6">Premium</th>
                              <th className="text-center text-white font-semibold p-6">Enterprise</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparisonFeatures.map((row, index) => (
                              <tr key={index} className="border-b border-white/10 last:border-0">
                                <td className="text-white p-6 font-medium">{row.feature}</td>
                                <td className="text-center p-6">
                                  {row.basic ? (
                                    <Check className="w-5 h-5 text-white mx-auto" />
                                  ) : (
                                    <X className="w-5 h-5 text-white/30 mx-auto" />
                                  )}
                                </td>
                                <td className="text-center p-6">
                                  {row.premium ? (
                                    <Check className="w-5 h-5 text-white mx-auto" />
                                  ) : (
                                    <X className="w-5 h-5 text-white/30 mx-auto" />
                                  )}
                                </td>
                                <td className="text-center p-6">
                                  {row.enterprise ? (
                                    <Check className="w-5 h-5 text-white mx-auto" />
                                  ) : (
                                    <X className="w-5 h-5 text-white/30 mx-auto" />
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>
                </div>
              </section>

              {/* How Pricing Works */}
              <section className="relative py-20 lg:py-28">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                      How Pricing Works
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                      Understanding our transparent, value-based pricing model
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/10">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Gauge className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white mb-4">
                          Pay-Per-Use
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          Start free and only pay for what you use. No upfront costs, no hidden fees. Perfect for occasional users who want flexibility.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/10">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white mb-4">
                          Value-Based Tiers
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          Premium plans unlock better rates and advanced features. The more you use Roadcoally, the more you save with reduced commissions.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/10">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white mb-4">
                          Enterprise Solutions
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          Custom pricing for businesses with unique needs. White-label solutions, API access, and dedicated support tailored to your requirements.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-16 text-center">
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/20 max-w-3xl mx-auto">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <Shield className="w-6 h-6 text-white" />
                          <h3 className="text-xl font-heading font-bold text-white">
                            Pricing Guarantee
                          </h3>
                        </div>
                        <p className="text-white/80 text-lg leading-relaxed mb-6">
                          We're committed to fair, transparent pricing. No surprise fees, no complex calculations. What you see is what you pay, and we guarantee competitive rates in the industry.
                        </p>
                        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          Learn More About Our Guarantee
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="relative py-20 lg:py-28">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                      Got questions about pricing? We've got answers.
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                      {faqData.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`item-${index}`}
                          className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-6 transition-all duration-300 hover:bg-white/10"
                        >
                          <AccordionTrigger className="text-white hover:text-white/80 text-left font-semibold">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-white/80 leading-relaxed pt-2 pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  <div className="mt-12 text-center">
                    <p className="text-white/80 mb-4">
                      Still have questions?
                    </p>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Contact Support
                      <Mail className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </section>

              {/* Ready to Get Started CTA */}
              <section className="relative py-20 lg:py-28">
                <div className="container mx-auto px-6 lg:px-8">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 max-w-4xl mx-auto">
                    <CardContent className="p-12 text-center">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Truck className="w-10 h-10 text-white" />
                      </div>
                      
                      <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
                        Ready to Get Started?
                      </h2>
                      
                      <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of drivers and customers already using Roadcoally. Start free today and scale as you grow.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-[#00A651] hover:bg-white/90 font-semibold">
                          Start Free Today
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold">
                          Schedule Demo
                          <Clock className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-white/20">
                        <div className="flex items-center gap-2 text-white/70">
                          <UserCheck className="w-4 h-4" />
                          <span className="text-sm">No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">Setup in minutes</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Shield className="w-4 h-4" />
                          <span className="text-sm">Cancel anytime</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </main>

            {/* Legal Links Footer */}
            <footer className="relative py-12 border-t border-white/10">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-white/60 text-sm">
                    © 2024 Roadcoally. All rights reserved.
                  </div>
                  
                  <div className="flex flex-wrap gap-6 text-sm">
                    <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 inline mr-1" />
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                      <FileText className="w-4 h-4 inline mr-1" />
                      Terms of Service
                    </Link>
                    <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ClickSpark>
      </SmoothScrollWrapper>
    </BackgroundPattern>
  );
}