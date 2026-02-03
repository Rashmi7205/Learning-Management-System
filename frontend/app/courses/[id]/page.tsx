"use client";
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";

import course1 from "@/public/assets/course-1.png";
import course2 from "@/public/assets/course-2.png";
import course3 from "@/public/assets/course-3.png";
import course4 from "@/public/assets/course-4.png";
import instructor1 from "@/public/assets/ist.png";
import instructor2 from "@/public/assets/ist.png";
import testimonial1 from "@/public/assets/ist.png";
import testimonial2 from "@/public/assets/ist.png";
import testimonial3 from "@/public/assets/ist.png";
import { useParams } from "next/navigation";
import CourseHero from "@/components/courseDetails/CourseHero";
import WhatYouWillLearn from "@/components/courseDetails/WhatYouWillLearn";
import CourseRequirements from "@/components/courseDetails/CourseRequirements";
import CourseDescription from "@/components/courseDetails/CourseDescription";
import WhoIsThisFor from "@/components/courseDetails/WhoIsThisFor";
import InstructorSection from "@/components/courseDetails/InstructorSection";
import StudentReviews from "@/components/courseDetails/StudentReviews";
import CourseSidebar from "@/components/courseDetails/CourseSidebar";
import RelatedCourses from "@/components/courseDetails/RelatedCourses";
import CourseCurriculum from "@/components/courseDetails/CourseCurriculum";

// Mock course data
const courseData = {
  id: 1,
  category: "Development",
  subcategory: "Web Development",
  title: "Master React Development - Complete Guide 2024",
  subtitle:
    "Learn React from scratch and build production-ready applications with hooks, context, Redux, and real-world projects",
  image: course1,
  price: 499,
  originalPrice: 2999,
  isFree: false,
  discountPercentage: 83,
  urgencyMessage: "2 days left at this price!",
  rating: 4.8,
  totalRatings: 2847,
  totalStudents: 12345,
  lastUpdated: "January 2024",
  language: "English",
  subtitles: ["English", "Hindi", "Spanish"],
  badges: ["Bestseller", "Highest Rated"],

  learningOutcomes: [
    "Build full-stack React applications from scratch",
    "Master React Hooks and State Management",
    "Understand components, props, and JSX",
    "Deploy React apps to production servers",
    "Work with APIs and fetch data",
    "Implement authentication and authorization",
    "Use Redux and Zustand for state management",
    "Build responsive layouts with Tailwind CSS",
    "Test React applications with Jest and React Testing Library",
    "Optimize React apps for performance",
    "Work with TypeScript in React projects",
    "Build reusable component libraries",
  ],

  courseIncludes: {
    videoHours: 24,
    articles: 15,
    resources: 45,
    hasLifetimeAccess: true,
    hasMobileAccess: true,
    hasCertificate: true,
  },

  curriculum: [
    {
      title: "Introduction to React",
      duration: "35 min",
      lectures: [
        {
          title: "Welcome to the Course",
          type: "video" as const,
          duration: "5:30",
          isPreview: true,
        },
        {
          title: "What is React?",
          type: "video" as const,
          duration: "8:45",
          isPreview: true,
        },
        {
          title: "Setting Up Development Environment",
          type: "video" as const,
          duration: "12:20",
          isLocked: true,
        },
        {
          title: "Quiz: React Fundamentals",
          type: "quiz" as const,
          isLocked: true,
        },
        {
          title: "Resources: Starter Files",
          type: "resource" as const,
          isLocked: true,
        },
      ],
    },
    {
      title: "React Components Deep Dive",
      duration: "1h 45min",
      lectures: [
        {
          title: "Understanding Components",
          type: "video" as const,
          duration: "15:00",
          isLocked: true,
        },
        {
          title: "Functional vs Class Components",
          type: "video" as const,
          duration: "12:30",
          isLocked: true,
        },
        {
          title: "Props and PropTypes",
          type: "video" as const,
          duration: "18:00",
          isLocked: true,
        },
        {
          title: "Component Composition",
          type: "video" as const,
          duration: "14:00",
          isLocked: true,
        },
        {
          title: "Article: Best Practices",
          type: "article" as const,
          isLocked: true,
        },
        {
          title: "Project: Building a Card Component",
          type: "video" as const,
          duration: "25:00",
          isLocked: true,
        },
      ],
    },
    {
      title: "State & Props Mastery",
      duration: "1h 20min",
      lectures: [
        {
          title: "Understanding State",
          type: "video" as const,
          duration: "16:00",
          isLocked: true,
        },
        {
          title: "useState Hook Deep Dive",
          type: "video" as const,
          duration: "20:00",
          isLocked: true,
        },
        {
          title: "Lifting State Up",
          type: "video" as const,
          duration: "15:00",
          isLocked: true,
        },
        {
          title: "Quiz: State Management",
          type: "quiz" as const,
          isLocked: true,
        },
      ],
    },
    {
      title: "React Hooks Complete Guide",
      duration: "2h 10min",
      lectures: [
        {
          title: "useEffect Hook",
          type: "video" as const,
          duration: "22:00",
          isLocked: true,
        },
        {
          title: "useContext Hook",
          type: "video" as const,
          duration: "18:00",
          isLocked: true,
        },
        {
          title: "useReducer Hook",
          type: "video" as const,
          duration: "20:00",
          isLocked: true,
        },
        {
          title: "useMemo & useCallback",
          type: "video" as const,
          duration: "25:00",
          isLocked: true,
        },
        {
          title: "Custom Hooks",
          type: "video" as const,
          duration: "30:00",
          isLocked: true,
        },
        {
          title: "Project: Building Custom Hooks",
          type: "video" as const,
          duration: "35:00",
          isLocked: true,
        },
      ],
    },
    {
      title: "Working with APIs",
      duration: "1h 30min",
      lectures: [
        {
          title: "Fetch API Basics",
          type: "video" as const,
          duration: "15:00",
          isLocked: true,
        },
        {
          title: "Axios Integration",
          type: "video" as const,
          duration: "12:00",
          isLocked: true,
        },
        {
          title: "React Query Introduction",
          type: "video" as const,
          duration: "20:00",
          isLocked: true,
        },
        {
          title: "Error Handling",
          type: "video" as const,
          duration: "18:00",
          isLocked: true,
        },
        {
          title: "Loading States",
          type: "video" as const,
          duration: "15:00",
          isLocked: true,
        },
      ],
    },
  ],

  requirements: [
    "Basic knowledge of HTML and CSS",
    "Understanding of JavaScript fundamentals",
    "A computer with internet connection",
    "No prior React experience necessary",
  ],

  description: `Are you ready to master React? This comprehensive course takes you from complete beginner to advanced React developer. Whether you're just starting out or looking to level up your skills, this course has everything you need.

React is the most popular JavaScript library for building user interfaces, used by companies like Facebook, Netflix, Airbnb, and thousands of others. Learning React opens doors to amazing career opportunities and allows you to build modern, responsive web applications.

In this course, we'll cover everything from the basics to advanced concepts, including hooks, context API, state management with Redux, testing, and deployment. You'll build multiple real-world projects that you can add to your portfolio.`,

  highlights: [
    "Core React concepts including components, props, and state",
    "Modern React features like Hooks and Context API",
    "State management with Redux and Zustand",
    "Building real-world projects from scratch",
    "Testing with Jest and React Testing Library",
    "Deployment to production servers",
  ],

  targetAudience: [
    {
      icon: "beginner" as const,
      description: "Beginners who want to learn React from scratch",
    },
    {
      icon: "student" as const,
      description: "Students looking to build portfolio projects",
    },
    {
      icon: "professional" as const,
      description: "Professionals switching to frontend development",
    },
    {
      icon: "advanced" as const,
      description: "Developers who want to master modern React",
    },
  ],

  instructors: [
    {
      name: "Millar Richard",
      title: "Web Developer & Educator",
      image: instructor1,
      rating: 4.9,
      reviews: 2847,
      students: 45678,
      courses: 12,
      bio: "John is a full-stack developer with 10+ years of experience in web development. He's passionate about teaching and has helped thousands of students land their dream jobs in tech. With a background in computer science from MIT and experience at companies like Google and Meta, John brings real-world expertise to his teaching.",
      socialLinks: {
        website: "https://example.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      name: "Jhon Doe",
      title: "WordPress Developer & UI/UX Designer",
      image: instructor2,
      rating: 4.8,
      reviews: 1523,
      students: 32456,
      courses: 8,
      bio: "Jane is a senior frontend developer and technical writer. She specializes in React and TypeScript, and has contributed to several open-source projects. Her teaching style focuses on practical, hands-on learning with real-world examples.",
    },
  ],

  reviews: [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: testimonial1,
      rating: 5,
      comment:
        "Excellent course! The instructor explains everything clearly and the projects are very practical. I went from knowing nothing about React to building my own applications. Highly recommend for anyone wanting to learn React.",
      date: "2 weeks ago",
      isVerified: true,
      helpfulCount: 234,
      notHelpfulCount: 12,
      instructorResponse:
        "Thank you for the kind words, Sarah! So glad you're enjoying the course. 🙏",
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar: testimonial2,
      rating: 4,
      comment:
        "Great content but could use more advanced examples. Overall very satisfied with my purchase. The explanations are clear and the pace is good for beginners.",
      date: "1 month ago",
      isVerified: true,
      helpfulCount: 156,
      notHelpfulCount: 8,
    },
    {
      id: 3,
      user: "Emily Brown",
      avatar: testimonial3,
      rating: 5,
      comment:
        "This is exactly what I needed to transition into frontend development. The instructor's teaching style is engaging and the projects are relevant to real-world scenarios. Worth every penny!",
      date: "1 month ago",
      isVerified: true,
      helpfulCount: 189,
      notHelpfulCount: 5,
    },
  ],

  ratingBreakdown: {
    5: 2135,
    4: 427,
    3: 199,
    2: 57,
    1: 29,
  },
};

const relatedCourses = [
  {
    id: 2,
    title: "JavaScript Complete Bootcamp 2024",
    instructor: "Millar Richard",
    instructorImage: "/assets/ist.png",
    image: "/assets/course-2.png",
    rating: 4.8,
    reviews: 1523,
    price: 799,
    isFree: false,
  },
  {
    id: 3,
    title: "TypeScript for React Developers",
    instructor: "Jhon Doe",
    instructorImage: "/assets/ist.png",
    image: "/assets/course-3.png",
    rating: 4.7,
    reviews: 892,
    price: 899,
    isFree: false,
  },
  {
    id: 4,
    title: "Next.js Complete Course",
    instructor: "Millar Richard",
    instructorImage: "/assets/ist.png",
    image: "/assets/course-4.png",
    rating: 4.9,
    reviews: 2341,
    price: 1099,
    isFree: false,
  },
  {
    id: 5,
    title: "Node.js Backend Mastery",
    instructor: "Jhon Doe",
    instructorImage: "/assets/ist.png",
    image: "/assets/course-1.png",
    rating: 4.6,
    reviews: 756,
    price: 0,
    isFree: true,
  },
];

const studentsAlsoBought = [
  {
    id: 6,
    title: "CSS Mastery: From Basics to Advanced",
    instructor: "Millar Richard",
    instructorImage: "/assets/ist.png",
    image: "/assets/course-3.png",
    rating: 4.5,
    reviews: 543,
    price: 599,
    isFree: false,
  },
  {
    id: 7,
    title: "Git & GitHub Complete Guide",
    instructor: "Jhon Doe",
    instructorImage: "/assets/ist.png",
    image: "/assets/course-2.png",
    rating: 4.8,
    reviews: 1234,
    price: 0,
    isFree: true,
  },
  {
    id: 8,
    title: "Redux Toolkit Master Course",
    instructor: "Millar Richard",
    instructorImage: "/assets/ist.png",
    image: "/assets/course-4.png",
    rating: 4.7,
    reviews: 678,
    price: 699,
    isFree: false,
  },
];

const CourseDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <CourseHero
        category={courseData.category}
        subcategory={courseData.subcategory}
        title={courseData.title}
        subtitle={courseData.subtitle}
        rating={courseData.rating}
        totalRatings={courseData.totalRatings}
        totalStudents={courseData.totalStudents}
        lastUpdated={courseData.lastUpdated}
        instructor={{
          name: courseData.instructors[0].name,
          image: "/asstes/ist.png",
        }}
        language={courseData.language}
        subtitles={courseData.subtitles}
        badges={courseData.badges}
      />

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* What You'll Learn */}
              <WhatYouWillLearn outcomes={courseData.learningOutcomes} />

              {/* Course Curriculum */}
              <CourseCurriculum
                curriculum={courseData.curriculum}
                totalSections={courseData.curriculum.length}
                totalLectures={courseData.curriculum.reduce(
                  (acc, s) => acc + s.lectures.length,
                  0,
                )}
                totalDuration="24h 35m"
              />

              {/* Requirements */}
              <CourseRequirements requirements={courseData.requirements} />

              {/* Description */}
              <CourseDescription
                description={courseData.description}
                highlights={courseData.highlights}
              />

              {/* Who Is This For */}
              <WhoIsThisFor audiences={courseData.targetAudience} />

              {/* Instructor */}
              <InstructorSection
                instructors={courseData.instructors.map((i) => ({
                  ...i,
                  image: "/assets/ist.png",
                }))}
              />

              {/* Student Reviews */}
              <StudentReviews
                rating={courseData.rating}
                totalRatings={courseData.totalRatings}
                ratingBreakdown={courseData.ratingBreakdown}
                reviews={courseData.reviews.map((review) => ({
                  ...review,
                  avatar: "/assets/ist.png",
                }))}
              />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <CourseSidebar
                image={"/assets/course-1.png"}
                price={courseData.price}
                originalPrice={courseData.originalPrice}
                isFree={courseData.isFree}
                discountPercentage={courseData.discountPercentage}
                urgencyMessage={courseData.urgencyMessage}
                courseIncludes={courseData.courseIncludes}
                instructors={courseData.instructors.map((i) => ({
                  name: i.name,
                  role: i.title,
                  image: "/assets/ist.png",
                }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* More Courses by Instructor */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedCourses
            title={`More Courses by ${courseData.instructors[0].name}`}
            courses={relatedCourses}
            showViewAll
          />
        </div>
      </section>

      {/* Students Also Bought */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedCourses
            title="Students Also Bought"
            courses={studentsAlsoBought}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetails;
