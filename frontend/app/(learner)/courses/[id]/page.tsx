'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Star,
  Users,
  BookOpen,
  Clock,
  Award,
  FileText,
  Video,
  Download,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  PlayCircle
} from 'lucide-react';

export default function CourseDetailsPage() {
  const [expandedWeeks, setExpandedWeeks] = useState({ week1: true });
  const [couponCode, setCouponCode] = useState('');

  const toggleWeek = (week) => {
    setExpandedWeeks(prev => ({ ...prev, [week]: !prev[week] }));
  };

  const courseWeeks = [
    {
      id: 'week1',
      title: 'Week 1: Introduction to Prompt Engineering',
      description: 'Learn the foundations of how prompts function through AI models.',
      lessons: [
        { title: 'How AI Interprets Prompts', duration: '15 min', type: 'video' },
        { title: 'The Structure of a Good Prompt', duration: '20 min', type: 'video' },
        { title: 'First Prompt Practice (Hands-On)', duration: '25 min', type: 'practice' }
      ]
    },
    {
      id: 'week2',
      title: 'Week 2: Prompting for Productivity & Creativity',
      description: 'Explore practical uses of prompts in daily work.',
      lessons: [
        { title: 'Writing Better Emails with AI', duration: '18 min', type: 'video' },
        { title: 'Creative Content Generation', duration: '22 min', type: 'video' },
        { title: 'Brainstorming Techniques', duration: '20 min', type: 'practice' }
      ]
    },
    {
      id: 'week3',
      title: 'Week 3: Advanced Techniques',
      description: 'Master advanced prompting strategies.',
      lessons: [
        { title: 'Chain-of-Thought Prompting', duration: '25 min', type: 'video' },
        { title: 'Few-Shot Learning', duration: '20 min', type: 'video' },
        { title: 'Building Custom Templates', duration: '30 min', type: 'practice' }
      ]
    },
    {
      id: 'week4',
      title: 'Week 4: Real-World Applications',
      description: 'Apply your skills to real-world scenarios.',
      lessons: [
        { title: 'Case Studies Analysis', duration: '25 min', type: 'video' },
        { title: 'Final Project Guidelines', duration: '15 min', type: 'reading' },
        { title: 'Course Completion & Certificate', duration: '5 min', type: 'certificate' }
      ]
    }
  ];

  return (
    <div className="min-h-screen text-foreground">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center gap-2 text-sm text-accent-500">
          <span className="hover:text-foreground cursor-pointer">Home</span>
          <span>›</span>
          <span className="hover:text-foreground cursor-pointer">Courses</span>
          <span>›</span>
          <span className="text-foreground">AI & Automation</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground leading-tight">
                Master the Art of Prompt Engineering — Unlock the Power of AI
              </h1>
              <p className="text-base sm:text-lg text-foreground mb-6 leading-relaxed">
                Learn how to write effective prompts for ChatGPT, Midjourney, Claude, and more.
                Ideal for marketers, designers, developers, and curious learners.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">4.9</span>
                  <span className="text-foreground text-sm">(2,500+ reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent-foreground" />
                  <span className="text-foreground text-sm">5,747 members</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="outline" className="py-1.5 px-3 text-sm border-blue-200 text-blue-700 bg-blue-50">
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                  No prior AI experience needed
                </Badge>
                <Badge variant="outline" className="py-1.5 px-3 text-sm border-gray-200 text-accent-foreground bg-gray-50">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  4 weeks · Self-paced
                </Badge>
                <Badge variant="outline" className="py-1.5 px-3 text-sm border-gray-200 text-accent-foreground bg-gray-50">
                  <Award className="h-3.5 w-3.5 mr-1.5" />
                  Certificate upon completion
                </Badge>
              </div>

              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                Add to Wishlist
              </Button>
            </div>

            {/* Tabs Section */}
            <div className="border-t pt-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 space-x-8">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent pb-3 px-0 font-semibold"
                  >
                    Course Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="syllabus"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent pb-3 px-0 font-semibold"
                  >
                    Course Syllabus
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructor"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent pb-3 px-0 font-semibold"
                  >
                    Instructor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8 mt-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">What You'll Learn:</h2>
                    <div className="space-y-4">
                      {[
                        'Craft precise prompts for various AI tools',
                        'Use prompt patterns to generate better outputs',
                        'Apply AI in writing, design, coding, and productivity',
                        'Avoid common prompt mistakes',
                        'Automate workflows using prompt chaining'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-accent-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-6">Who This Course Is For:</h2>
                    <div className="space-y-4">
                      {[
                        'Beginners new to AI tools',
                        'Content creators & marketers',
                        'Designers exploring Midjourney',
                        'Developers building prompt-based apps',
                        'Anyone curious about using AI more effectively'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-accent-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="syllabus" className="mt-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Course Syllabus</h2>
                    <div className="flex gap-4 sm:gap-6 text-sm text-foreground mb-6">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-indigo-600" />
                        <span>4 Weeks</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="h-4 w-4 text-indigo-600" />
                        <span>12 Lessons</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-indigo-600" />
                        <span>~4 Hours</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {courseWeeks.map((week) => (
                        <div key={week.id} className="border border-gray-200 rounded-lg overflow-hidden ">
                          <button
                            onClick={() => toggleWeek(week.id)}
                            className="w-full p-5 flex items-center justify-between   transition-colors text-left"
                          >
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">{week.title}</h3>
                              <p className="text-sm text-foreground">{week.description}</p>
                            </div>
                            {expandedWeeks[week.id] ? (
                              <ChevronUp className="h-5 w-5 text-accent-foreground flex-shrink-0 ml-4" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-accent-foreground flex-shrink-0 ml-4" />
                            )}
                          </button>

                          {expandedWeeks[week.id] && (
                            <div className="p-4 space-y-1  border-t">
                              {week.lessons.map((lesson, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded  transition-colors group">
                                  <div className="flex items-center gap-3">
                                    {lesson.type === 'video' && <PlayCircle className="h-4 w-4 text-indigo-600" />}
                                    {lesson.type === 'practice' && <FileText className="h-4 w-4 text-indigo-600" />}
                                    {lesson.type === 'reading' && <BookOpen className="h-4 w-4 text-indigo-600" />}
                                    {lesson.type === 'certificate' && <Award className="h-4 w-4 text-indigo-600" />}
                                    <span className="text-sm text-accent-foreground group-hover:text-foreground">{lesson.title}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="mt-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Instructor</h2>
                    <div className="flex items-start gap-4 sm:gap-6">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel"
                        alt="Daniel R."
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-foreground">Daniel R.</h3>
                        <p className="text-sm text-foreground mb-4">
                          AI Educator | Former Data Strategist at OpenAI
                        </p>
                        <div className="flex gap-6 text-sm text-foreground mb-4">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4 text-indigo-600" />
                            <span>10 Courses</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-indigo-600" />
                            <span>15,432 students</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-gray-300">
                          View Instructor Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <Card className="overflow-hidden shadow-lg border-gray-200">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop"
                      alt="Course preview"
                      className="w-full h-52 object-cover"
                    />
                  </div>
                </CardContent>
                <CardHeader className="pb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-foreground">$49</span>
                    <span className="text-xl text-accent-foreground line-through">$69</span>
                  </div>
                  <CardDescription className="text-foreground">One-time payment</CardDescription>
                  <p className="text-sm text-red-600 font-medium mt-1">
                    Promo will ends in 12-02
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-foreground" size="lg">
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50" size="lg">
                    Enroll Now
                  </Button>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="font-bold text-foreground mb-4">What You'll Get</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm">
                        <Video className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="text-accent-foreground">Lifetime access to 12 video lessons</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <FileText className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="text-accent-foreground">Prompt templates & real-world use cases</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Users className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="text-accent-foreground">Peer learning group access</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <Award className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="text-accent-foreground">Mini projects + certificate</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="font-bold text-foreground mb-3">Use Coupon</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Input coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="border-gray-300"
                      />
                      <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 px-6">
                        Redeem
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}