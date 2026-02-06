'use client'

import React from "react"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface BasicInformationStepProps {
  courseData: any
  setCourseData: any
}

const CATEGORIES = [
  'Development',
  'Design',
  'Business',
  'Marketing',
  'Science',
  'Language',
]

const SUBCATEGORIES: Record<string, string[]> = {
  Development: ['Web Development', 'Mobile Development', 'Backend', 'DevOps'],
  Design: ['UI/UX', 'Graphic Design', 'Animation', 'Web Design'],
  Business: ['Management', 'Finance', 'Entrepreneurship', 'Leadership'],
  Marketing: ['Digital Marketing', 'Content Marketing', 'Social Media', 'SEO'],
  Science: ['Biology', 'Chemistry', 'Physics', 'Data Science'],
  Language: ['English', 'Spanish', 'French', 'German'],
}

const POPULAR_TAGS = [
  'Beginner Friendly',
  'Project Based',
  'Hands-on',
  'Interactive',
  'Certification',
  'Live Sessions',
]

export default function BasicInformationStep({ courseData, setCourseData }: BasicInformationStepProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (field: string, value: any) => {
    setCourseData((prev: any) => ({ ...prev, [field]: value }))

    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
      setCourseData((prev: any) => ({ ...prev, slug }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreviewImage(result)
        handleChange('thumbnail', file)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleTag = (tag: string) => {
    const newTags = courseData.tags.includes(tag)
      ? courseData.tags.filter((t: string) => t !== tag)
      : [...courseData.tags, tag].slice(0, 5)
    handleChange('tags', newTags)
  }

  const isFieldValid = (field: string) => {
    if (!touched[field]) return null
    const validations: Record<string, boolean> = {
      title: courseData.title.length >= 10 && courseData.title.length <= 60,
      subtitle: courseData.subtitle.length <= 120,
      description: courseData.description.length >= 200 && courseData.description.length <= 2000,
      category: !!courseData.category,
      subcategory: !!courseData.subcategory,
      level: !!courseData.level,
      thumbnail: !!courseData.thumbnail,
    }
    return validations[field]
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Tell us the fundamentals about your course</p>
      </div>

      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Course Title *
        </label>
        <Input
          value={courseData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, title: true }))}
          placeholder="Choose a clear, descriptive title"
          maxLength={60}
          className="bg-input border-border"
        />
        <div className="flex justify-between mt-2">
          <p className="text-xs text-muted-foreground">Min 10 characters required</p>
          <p className={`text-xs ${courseData.title.length < 10 && touched.title ? 'text-destructive' : 'text-muted-foreground'}`}>
            {courseData.title.length}/60
          </p>
        </div>
      </div>

      {/* Course Subtitle */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Course Subtitle
        </label>
        <Input
          value={courseData.subtitle}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          placeholder="Add a compelling subtitle"
          maxLength={120}
          className="bg-input border-border"
        />
        <p className="text-xs text-muted-foreground mt-2">{courseData.subtitle.length}/120</p>
      </div>

      {/* Course Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Course Description *
        </label>
        <textarea
          value={courseData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
          placeholder="Describe what students will learn"
          minLength={200}
          maxLength={2000}
          rows={6}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex justify-between mt-2">
          <p className="text-xs text-muted-foreground">Min 200 characters required</p>
          <p className={`text-xs ${courseData.description.length < 200 && touched.description ? 'text-destructive' : 'text-muted-foreground'}`}>
            {courseData.description.length}/2000
          </p>
        </div>
      </div>

      {/* Category and Level */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category *
          </label>
          <select
            value={courseData.category}
            onChange={(e) => {
              handleChange('category', e.target.value)
              handleChange('subcategory', '')
            }}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Subcategory *
          </label>
          <select
            value={courseData.subcategory}
            onChange={(e) => handleChange('subcategory', e.target.value)}
            disabled={!courseData.category}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          >
            <option value="">Select a subcategory</option>
            {courseData.category && SUBCATEGORIES[courseData.category]?.map((subcat) => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Language and Level */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Course Language *
          </label>
          <select
            value={courseData.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Chinese</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Course Level *
          </label>
          <div className="flex gap-3">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => handleChange('level', level)}
                className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  courseData.level === level
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Topic Tags (Max 5)
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                courseData.tags.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{courseData.tags.length}/5 tags selected</p>
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Course URL Slug *
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">yoursite.com/course/</span>
          <Input
            value={courseData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            placeholder="auto-generated-from-title"
            className="bg-input border-border flex-1"
          />
          <span className="text-sm text-muted-foreground">✓</span>
        </div>
      </div>

      {/* Thumbnail and Promo Video */}
      <div className="grid grid-cols-2 gap-6">
        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Course Thumbnail *
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            {previewImage ? (
              <div className="relative inline-block">
                <img src={previewImage || "/placeholder.svg"} alt="Preview" className="max-w-xs h-auto rounded-lg" />
                <button
                  onClick={() => {
                    setPreviewImage(null)
                    handleChange('thumbnail', null)
                  }}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-foreground font-medium mb-1">Upload Thumbnail</p>
                <p className="text-xs text-muted-foreground mb-4">or</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload">
                  <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-4">
                  1280x720px, Max 2MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Promo Video */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Promo Video
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <div>
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-foreground font-medium mb-1">Upload Video</p>
              <p className="text-xs text-muted-foreground mb-4">or</p>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="promo-video-upload"
              />
              <label htmlFor="promo-video-upload">
                <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                Max 2 minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Quick Setup */}
      <div className="bg-secondary/50 border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">💰 Pricing Quick Setup</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pricing"
                checked={courseData.isFree}
                onChange={() => handleChange('isFree', true)}
              />
              <span className="text-foreground">Free Course</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pricing"
                checked={!courseData.isFree}
                onChange={() => handleChange('isFree', false)}
              />
              <span className="text-foreground">Paid Course</span>
            </label>
          </div>

          {!courseData.isFree && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Currency
                </label>
                <select
                  value={courseData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>INR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Regular Price *
                </label>
                <Input
                  type="number"
                  value={courseData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                  placeholder="49.99"
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Discount Price
                </label>
                <Input
                  type="number"
                  value={courseData.discountPrice}
                  onChange={(e) => handleChange('discountPrice', parseFloat(e.target.value))}
                  placeholder="29.99"
                  className="bg-input border-border"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
