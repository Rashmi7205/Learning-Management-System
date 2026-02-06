'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, AlertCircle, Eye } from 'lucide-react'
import { useState } from 'react'

interface ReviewPublishStepProps {
  courseData: any
  setCourseData: any
}

export default function ReviewPublishStep({ courseData, setCourseData }: ReviewPublishStepProps) {
  const [publishOption, setPublishOption] = useState('publish')

  // Required checklist
  const checklist = {
    title: !!courseData.title,
    description: !!courseData.description,
    thumbnail: !!courseData.thumbnail,
    sections: (courseData.sections?.length || 0) > 0,
    category: (courseData.category?.length || 0) > 0,
    pricing: courseData.isFree || (courseData.price > 0),
  }

  // Recommended checklist
  const recommended = {
    promoVideo: !!courseData.promoVideo,
    lectures: (courseData.sections?.reduce((sum: number, section: any) => sum + (section.lectures?.length || 0), 0) || 0) >= 5,
    learningOutcomes: (courseData.whatYouWillLearn?.filter((item: string) => item).length || 0) > 0,
    requirements: (courseData.requirements?.filter((item: string) => item).length || 0) > 0,
    previewLectures: (courseData.previewLectures?.length || 0) > 0,
  }

  const allRequiredMet = Object.values(checklist).every(v => v)
  const recommendedMet = Object.values(recommended).filter(v => v).length
  const qualityScore = Math.round((Object.values(checklist).filter(v => v).length / Object.keys(checklist).length) * 100 * 0.7 + (recommendedMet / Object.keys(recommended).length) * 100 * 0.3)

  // Calculate course stats
  const totalSections = courseData.sections?.length || 0
  const totalLectures = courseData.sections?.reduce((sum: number, section: any) => sum + (section.lectures?.length || 0), 0) || 0
  const totalDuration = courseData.sections?.reduce((sum: number, section: any) =>
    sum + (section.lectures?.reduce((lsum: number, lecture: any) => lsum + (lecture.duration || 0), 0) || 0), 0) || 0

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Publish</h2>
        <p className="text-muted-foreground">Final check before launching your course</p>
      </div>

      {/* Course Readiness Checklist */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">📋 Course Readiness Checklist</h3>

        <div className="space-y-6">
          {/* Required Items */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">✅ Required Items (Must Complete)</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${checklist.title ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {checklist.title ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">Course title and description</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${checklist.thumbnail ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {checklist.thumbnail ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">Course thumbnail image</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${checklist.sections ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {checklist.sections ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">At least 1 section with content</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${checklist.category ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {checklist.category ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">Category selected</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${checklist.pricing ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {checklist.pricing ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">Pricing configured</span>
              </div>
            </div>
          </div>

          {/* Recommended Items */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">⚠️ Recommended Items (Improve Course Quality)</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${recommended.promoVideo ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {recommended.promoVideo ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">Promotional video added</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${recommended.lectures ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {recommended.lectures ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">At least 5 lectures (currently: {totalLectures})</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${recommended.learningOutcomes ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {recommended.learningOutcomes ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">Learning outcomes defined</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${recommended.requirements ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {recommended.requirements ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">Requirements listed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-sm ${recommended.previewLectures ? 'bg-accent text-accent-foreground' : 'bg-secondary'}`}>
                  {recommended.previewLectures ? '✓' : '○'}
                </div>
                <span className="text-sm text-foreground">Preview lectures selected</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Course Statistics */}
      <Card className="bg-secondary/50 border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Course Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Sections</p>
            <p className="text-2xl font-bold text-foreground">{totalSections}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lectures</p>
            <p className="text-2xl font-bold text-foreground">{totalLectures}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Duration</p>
            <p className="text-2xl font-bold text-foreground">{formatDuration(totalDuration)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-2xl font-bold text-foreground">
              {courseData.isFree ? 'Free' : `${courseData.currency} ${courseData.discountPrice}`}
            </p>
          </div>
        </div>
      </Card>

      {/* Quality Score */}
      <Card className="bg-accent/10 border border-accent/30 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">📊 Quality Score: {qualityScore}/100</h3>
        <div className="mb-4">
          <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${qualityScore}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-foreground">
          {qualityScore >= 85 ? 'Great! Your course is ready to publish' :
           qualityScore >= 70 ? 'Good! Consider adding recommended items for better quality' :
           'Complete required items before publishing'}
        </p>
      </Card>

      {/* Preview Button */}
      <div className="text-center">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Eye className="w-4 h-4" />
          Preview as Student
        </Button>
      </div>

      {/* Publishing Action */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Publishing Action</h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <input
              type="radio"
              name="publish-action"
              value="publish"
              checked={publishOption === 'publish'}
              onChange={(e) => setPublishOption(e.target.value)}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-foreground">Publish Now</p>
              <p className="text-sm text-muted-foreground">Goes live immediately</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <input
              type="radio"
              name="publish-action"
              value="schedule"
              checked={publishOption === 'schedule'}
              onChange={(e) => setPublishOption(e.target.value)}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-foreground">Schedule Publish</p>
              <p className="text-sm text-muted-foreground">📅 Select Date & Time</p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <input
              type="radio"
              name="publish-action"
              value="review"
              checked={publishOption === 'review'}
              onChange={(e) => setPublishOption(e.target.value)}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-foreground">Submit for Admin Review</p>
              <p className="text-sm text-muted-foreground">Requires approval before going live</p>
            </div>
          </label>
        </div>
      </Card>

      {/* Warning */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <p className="text-sm text-yellow-400">
          ⚠️ Important: Once published, students can enroll. Major changes will notify students.
        </p>
      </div>
    </div>
  )
}
