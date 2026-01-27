'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bookmark, BookOpen, Clock, Star, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface CourseCardProps {
  course: {
    _id: string
    title: string
    subtitle?: string
    thumbnail: {
      publicId: string
      secureUrl: string
    }
    instructor?: string
    totalLectures: number
    totalDuration: number
    price: number
    discountPrice?: number
    isFree: boolean
    currency: string
    rating: number
    totalReviews: number
    bestseller?: boolean
    isFeatured?: boolean
  }
  instructorInfo?: {
    name: string
    avatar: string
  }
}

const GRADIENT_COLORS = [
  'from-purple-400 to-purple-600',
  'from-cyan-300 to-cyan-500',
  'from-green-400 to-green-600',
  'from-blue-400 to-blue-600',
  'from-pink-400 to-pink-600',
  'from-orange-400 to-orange-600',
]

export function CourseCard({ course, instructorInfo }: CourseCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const gradientIndex = course._id.charCodeAt(0) % GRADIENT_COLORS.length
  const gradientColor = GRADIENT_COLORS[gradientIndex]
  const displayPrice = course.discountPrice && !course.isFree ? course.discountPrice : course.price
  const hours = Math.round(course.totalDuration / 60)

  return (
    <Card className="bg-card border-border overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Image Container with Gradient Overlay */}
      <div className={`relative bg-gradient-to-br ${gradientColor} h-40 overflow-hidden`}>
        {course.thumbnail?.secureUrl && (
          <Image
            src={course.thumbnail.secureUrl || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover opacity-80"
          />
        )}

        {/* Bookmark Icon */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-primary/10 transition-colors shadow-md"
        >
          <Bookmark className="w-5 h-5 text-foreground fill-current" />
        </button>

        {/* Bestseller Badge */}
        {course.bestseller && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Bestseller
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Lessons and Duration */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.totalLectures} Lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{hours} hours</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-4 line-clamp-2 leading-tight">
          {course.title}
        </h3>

        {/* Instructor Info with Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {instructorInfo?.avatar && (
              <Image
                src={instructorInfo.avatar || "/placeholder.svg"}
                alt={instructorInfo.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium text-muted-foreground">
              {instructorInfo?.name || 'Instructor'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-foreground">
              {course.rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({course.totalReviews})
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-4"></div>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            {course.isFree ? (
              <span className="text-lg font-bold text-foreground">Free</span>
            ) : (
              <div>
                {course.discountPrice && course.price > course.discountPrice && (
                  <span className="text-sm text-muted-foreground line-through mr-2">
                    {course.currency} {course.price.toFixed(2)}
                  </span>
                )}
                <span className="text-lg font-bold text-foreground">
                  {course.currency} {displayPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2">
            Enroll
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
