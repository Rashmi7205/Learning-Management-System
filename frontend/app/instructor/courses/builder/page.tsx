'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft, Save, Loader } from 'lucide-react'
import BasicInformationStep from '@/components/course-builder/steps/basic-information'
import CurriculumStep from '@/components/course-builder/steps/curriculum'
import LandingPageStep from '@/components/course-builder/steps/landing-page'
import PricingStep from '@/components/course-builder/steps/pricing'
import SettingsStep from '@/components/course-builder/steps/settings'
import ReviewPublishStep from '@/components/course-builder/steps/review-publish'


const STEPS = [
  { id: 1, title: 'Basic Information', description: 'Course details and thumbnail' },
  { id: 2, title: 'Curriculum', description: 'Structure and lessons' },
  { id: 3, title: 'Landing Page', description: 'Learning outcomes and requirements' },
  { id: 4, title: 'Pricing & Marketing', description: 'Pricing and featured status' },
  { id: 5, title: 'Settings', description: 'Publishing and archiving' },
  { id: 6, title: 'Review & Publish', description: 'Final review and launch' },
]

export default function CourseBuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [courseData, setCourseData] = useState({
    // Basic Information
    title: '',
    subtitle: '',
    description: '',
    category: '',
    subcategory: '',
    slug: '',
    thumbnail: null,
    promoVideo: null,
    language: 'English',
    level: 'Beginner',
    tags: [],

    // Pricing
    isFree: true,
    price: 49.99,
    discountPrice: 29.99,
    currency: 'USD',

    // Curriculum
    sections: [],

    // Landing Page
    whatYouWillLearn: [],
    requirements: [],
    previewLectures: [],

    // Marketing
    isFeatured: false,
    bestseller: false,

    // Publishing
    status: 'draft',
    publishedAt: null,
    isArchived: false,
    archivedAt: null,
  })

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformationStep courseData={courseData} setCourseData={setCourseData} />
      case 2:
        return <CurriculumStep courseData={courseData} setCourseData={setCourseData} />
      case 3:
        return <LandingPageStep courseData={courseData} setCourseData={setCourseData} />
      case 4:
        return <PricingStep courseData={courseData} setCourseData={setCourseData} />
      case 5:
        return <SettingsStep courseData={courseData} setCourseData={setCourseData} />
      case 6:
        return <ReviewPublishStep courseData={courseData} setCourseData={setCourseData} />
      default:
        return null
    }
  }

  const progressPercentage = (currentStep / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Progress Bar */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="px-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create New Course</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of {STEPS.length}</p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSaving ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </>
              )}
            </Button>
          </div>
          <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Steps */}
        <aside className="w-64 bg-card border-r border-border p-6 sticky top-28 h-fit">
          <div className="space-y-2">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepChange(step.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary text-foreground'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-semibold ${
                    currentStep === step.id
                      ? 'bg-primary-foreground text-primary'
                      : 'bg-secondary text-foreground'
                  }`}>
                    {step.id}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{step.title}</p>
                    <p className="text-xs opacity-75">{step.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Card className="bg-card border-border max-w-4xl">
            <div className="p-8">
              {renderStep()}
            </div>
          </Card>

          {/* Footer Actions */}
          <div className="flex justify-between items-center mt-8 max-w-4xl">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex gap-3">
              <Button variant="outline">
                Save as Draft
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === STEPS.length}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              {currentStep === STEPS.length && (
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Publish Course
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
