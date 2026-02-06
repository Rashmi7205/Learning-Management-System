'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, ChevronDown, ChevronUp, Trash2, GripVertical, Video, BookOpen, FileText, HelpCircle, DownloadCloud } from 'lucide-react'

interface Section {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  expanded: boolean
}

interface Lesson {
  id: string
  title: string
  description?: string
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'resource'
  duration: number
  // Video specific
  videoUrl?: { publicId: string; secureUrl: string }
  videoProvider?: string
  attachments?: { filename: string; publicId: string; secureUrl: string }[]
  isPreview?: boolean
  isDownloadable?: boolean
  expanded?: boolean
}

interface CurriculumStepProps {
  courseData: any
  setCourseData: any
}

const LESSON_TYPES = [
  { id: 'video', label: 'Video Lesson', icon: Video },
  { id: 'text', label: 'Text/Article', icon: BookOpen },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  { id: 'assignment', label: 'Assignment', icon: FileText },
  { id: 'resource', label: 'Resource', icon: DownloadCloud },
]

export default function CurriculumStep({ courseData, setCourseData }: CurriculumStepProps) {
  const [sections, setSections] = useState<Section[]>(courseData.sections || [])
  const [newSectionTitle, setNewSectionTitle] = useState('')
  const [selectedLesson, setSelectedLesson] = useState<{ sectionId: string; lessonId: string } | null>(null)

  const addSection = () => {
    if (newSectionTitle.trim()) {
      const newSection: Section = {
        id: Date.now().toString(),
        title: newSectionTitle,
        description: '',
        lessons: [],
        expanded: true,
      }
      const updated = [...sections, newSection]
      setSections(updated)
      setCourseData((prev: any) => ({ ...prev, sections: updated }))
      setNewSectionTitle('')
    }
  }

  const deleteSection = (sectionId: string) => {
    const updated = sections.filter(s => s.id !== sectionId)
    setSections(updated)
    setCourseData((prev: any) => ({ ...prev, sections: updated }))
  }

  const toggleSection = (sectionId: string) => {
    const updated = sections.map(s =>
      s.id === sectionId ? { ...s, expanded: !s.expanded } : s
    )
    setSections(updated)
  }

  const addLesson = (sectionId: string, type: string) => {
    const updated = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lessons: [
            ...s.lessons,
            {
              id: Date.now().toString(),
              title: `New ${type} Lesson`,
              type: type as any,
              duration: 10,
            },
          ],
        }
      }
      return s
    })
    setSections(updated)
    setCourseData((prev: any) => ({ ...prev, sections: updated }))
  }

  const deleteLesson = (sectionId: string, lessonId: string) => {
    const updated = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lessons: s.lessons.filter(l => l.id !== lessonId),
        }
      }
      return s
    })
    setSections(updated)
    setCourseData((prev: any) => ({ ...prev, sections: updated }))
  }

  const updateLesson = (sectionId: string, lessonId: string, updates: any) => {
    const updated = sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lessons: s.lessons.map(l =>
            l.id === lessonId ? { ...l, ...updates } : l
          ),
        }
      }
      return s
    })
    setSections(updated)
    setCourseData((prev: any) => ({ ...prev, sections: updated }))
  }

  const toggleLessonExpand = (sectionId: string, lessonId: string) => {
    updateLesson(sectionId, lessonId, {
      expanded: !sections.find(s => s.id === sectionId)?.lessons.find(l => l.id === lessonId)?.expanded,
    })
  }

  const totalDuration = sections.reduce(
    (sum, section) => sum + section.lessons.reduce((l, lesson) => l + lesson.duration, 0),
    0
  )

  const totalLessons = sections.reduce((sum, s) => sum + s.lessons.length, 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Build Your Curriculum</h2>
        <p className="text-muted-foreground">Organize your course with sections and lessons</p>
      </div>

      {/* Curriculum Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-secondary border-border p-4">
          <p className="text-sm text-muted-foreground">Sections</p>
          <p className="text-2xl font-bold text-foreground">{sections.length}</p>
        </Card>
        <Card className="bg-secondary border-border p-4">
          <p className="text-sm text-muted-foreground">Total Lessons</p>
          <p className="text-2xl font-bold text-foreground">{totalLessons}</p>
        </Card>
        <Card className="bg-secondary border-border p-4">
          <p className="text-sm text-muted-foreground">Course Duration</p>
          <p className="text-2xl font-bold text-foreground">{Math.round(totalDuration / 60)}h {totalDuration % 60}m</p>
        </Card>
      </div>

      {/* Add New Section */}
      <div className="flex gap-2">
        <Input
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSection()}
          placeholder="Enter section title (e.g., 'Getting Started')"
          className="bg-input border-border flex-1"
        />
        <Button onClick={addSection} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.length === 0 ? (
          <Card className="bg-secondary border-border p-8 text-center">
            <p className="text-muted-foreground">No sections yet. Create your first section to get started!</p>
          </Card>
        ) : (
          sections.map((section) => (
            <Card key={section.id} className="bg-card border-border overflow-hidden">
              {/* Section Header */}
              <div className="p-4 bg-secondary flex items-center justify-between cursor-pointer hover:bg-secondary/80"
                onClick={() => toggleSection(section.id)}>
                <div className="flex items-center gap-3 flex-1">
                  <GripVertical className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{section.title}</p>
                    <p className="text-xs text-muted-foreground">{section.lessons.length} lessons</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={(e) => {
                    e.stopPropagation()
                    deleteSection(section.id)
                  }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {section.expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Section Content */}
              {section.expanded && (
                <div className="p-4 space-y-4">
                  {/* Lessons */}
                  {section.lessons.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {section.lessons.map((lesson) => {
                        const lessonType = LESSON_TYPES.find(t => t.id === lesson.type)
                        const LessonIcon = lessonType?.icon || BookOpen
                        const isExpanded = lesson.expanded
                        return (
                          <div key={lesson.id} className="border border-border rounded-lg bg-card overflow-hidden">
                            {/* Lesson Header */}
                            <div
                              className="p-3 bg-secondary flex items-center justify-between cursor-pointer hover:bg-secondary/80 transition-colors"
                              onClick={() => toggleLessonExpand(section.id, lesson.id)}
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <GripVertical className="w-4 h-4 text-muted-foreground" />
                                <LessonIcon className="w-4 h-4 text-primary" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                                  <p className="text-xs text-muted-foreground">{lessonType?.label}</p>
                                </div>
                                <span className="text-xs text-muted-foreground">{lesson.duration} min</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={(e) => {
                                  e.stopPropagation()
                                  deleteLesson(section.id, lesson.id)
                                }}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </div>

                            {/* Lesson Content Editor */}
                            {isExpanded && (
                              <div className="p-4 space-y-4 border-t border-border">
                                {/* Title & Description */}
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                                    <Input
                                      value={lesson.title}
                                      onChange={(e) => updateLesson(section.id, lesson.id, { title: e.target.value })}
                                      className="bg-input border-border"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                                    <textarea
                                      value={lesson.description || ''}
                                      onChange={(e) => updateLesson(section.id, lesson.id, { description: e.target.value })}
                                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
                                      rows={3}
                                      placeholder="Add lesson description..."
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">Duration (minutes)</label>
                                    <Input
                                      type="number"
                                      value={lesson.duration}
                                      onChange={(e) => updateLesson(section.id, lesson.id, { duration: parseInt(e.target.value) || 0 })}
                                      className="bg-input border-border"
                                    />
                                  </div>
                                </div>

                                {/* Video Lesson Content */}
                                {lesson.type === 'video' && (
                                  <div className="space-y-4 pt-4 border-t border-border">
                                    {/* Video Settings */}
                                    <div className="space-y-3">
                                      <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">Video Provider</label>
                                        <select
                                          value={lesson.videoProvider || 'local'}
                                          onChange={(e) => updateLesson(section.id, lesson.id, { videoProvider: e.target.value })}
                                          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
                                        >
                                          <option value="local">Local Upload</option>
                                          <option value="youtube">YouTube</option>
                                          <option value="vimeo">Vimeo</option>
                                        </select>
                                      </div>
                                    </div>

                                    {/* Local Video Upload */}
                                    {(lesson.videoProvider === 'local' || !lesson.videoProvider) && (
                                      <div>
                                        <h4 className="font-medium text-foreground mb-3">Upload Video File</h4>
                                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                                          <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                          <p className="text-foreground font-medium mb-2">Upload Video File</p>
                                          <p className="text-xs text-muted-foreground mb-3">Drag and drop or click to browse</p>
                                          <input
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            id={`video-upload-${lesson.id}`}
                                          />
                                          <label htmlFor={`video-upload-${lesson.id}`}>
                                            <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                                              <span>Choose File</span>
                                            </Button>
                                          </label>
                                          <p className="text-xs text-muted-foreground mt-2">Max 2GB, MP4/WebM/MOV</p>
                                        </div>
                                      </div>
                                    )}

                                    {/* YouTube Video URL */}
                                    {lesson.videoProvider === 'youtube' && (
                                      <div>
                                        <h4 className="font-medium text-foreground mb-3">YouTube Video URL</h4>
                                        <div className="space-y-3">
                                          <Input
                                            type="url"
                                            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                            value={lesson.videoUrl?.secureUrl || ''}
                                            onChange={(e) => updateLesson(section.id, lesson.id, {
                                              videoUrl: { publicId: '', secureUrl: e.target.value }
                                            })}
                                            className="bg-input border-border"
                                          />
                                          <p className="text-xs text-muted-foreground">Paste the full YouTube video URL</p>
                                        </div>
                                      </div>
                                    )}

                                    {/* Vimeo Video URL */}
                                    {lesson.videoProvider === 'vimeo' && (
                                      <div>
                                        <h4 className="font-medium text-foreground mb-3">Vimeo Video URL</h4>
                                        <div className="space-y-3">
                                          <Input
                                            type="url"
                                            placeholder="https://vimeo.com/123456789"
                                            value={lesson.videoUrl?.secureUrl || ''}
                                            onChange={(e) => updateLesson(section.id, lesson.id, {
                                              videoUrl: { publicId: '', secureUrl: e.target.value }
                                            })}
                                            className="bg-input border-border"
                                          />
                                          <p className="text-xs text-muted-foreground">Paste the full Vimeo video URL</p>
                                        </div>
                                      </div>
                                    )}

                                    {/* Preview and Downloadable */}
                                    <div className="space-y-4 pt-4 border-t border-border">
                                      <div className="flex items-center gap-3">
                                        <input
                                          type="checkbox"
                                          id={`preview-${lesson.id}`}
                                          checked={lesson.isPreview || false}
                                          onChange={(e) => updateLesson(section.id, lesson.id, { isPreview: e.target.checked })}
                                        />
                                        <label htmlFor={`preview-${lesson.id}`} className="text-sm font-medium text-foreground cursor-pointer">
                                          Mark as Preview Lecture (free)
                                        </label>
                                      </div>

                                      <div className="flex items-center gap-3">
                                        <input
                                          type="checkbox"
                                          id={`download-${lesson.id}`}
                                          checked={lesson.isDownloadable || false}
                                          onChange={(e) => updateLesson(section.id, lesson.id, { isDownloadable: e.target.checked })}
                                        />
                                        <label htmlFor={`download-${lesson.id}`} className="text-sm font-medium text-foreground cursor-pointer">
                                          Allow students to download
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Attachments */}
                                <div className="pt-4 border-t border-border">
                                  <h4 className="font-medium text-foreground mb-3">Attachments & Resources</h4>
                                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                                    <DownloadCloud className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-foreground font-medium mb-1">Upload Resources</p>
                                    <p className="text-xs text-muted-foreground mb-3">PDF, DOCX, ZIP, etc.</p>
                                    <input
                                      type="file"
                                      multiple
                                      className="hidden"
                                      id={`attachments-${lesson.id}`}
                                    />
                                    <label htmlFor={`attachments-${lesson.id}`}>
                                      <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                                        <span>Add Attachments</span>
                                      </Button>
                                    </label>
                                  </div>
                                  {lesson.attachments && lesson.attachments.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                      {lesson.attachments.map((att, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                                          <span className="text-sm text-foreground">{att.filename}</span>
                                          <button
                                            onClick={() => {
                                              const updated = lesson.attachments?.filter((_, i) => i !== idx) || []
                                              updateLesson(section.id, lesson.id, { attachments: updated })
                                            }}
                                            className="text-destructive hover:text-destructive/80"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Add Lesson Menu */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-3">Add Lesson Content</p>
                    <div className="grid grid-cols-5 gap-2">
                      {LESSON_TYPES.map((type) => {
                        const Icon = type.icon
                        return (
                          <button
                            key={type.id}
                            onClick={() => addLesson(section.id, type.id)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                          >
                            <Icon className="w-5 h-5 text-primary" />
                            <span className="text-xs text-foreground text-center">{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Tips */}
      <Card className="bg-secondary border-border p-4">
        <p className="text-sm font-medium text-foreground mb-2">Tips for a Great Curriculum</p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li>Organize content into logical sections</li>
          <li>Keep individual lessons focused and concise</li>
          <li>Mix content types to maintain engagement</li>
          <li>Include quizzes to reinforce learning</li>
        </ul>
      </Card>
    </div>
  )
}
