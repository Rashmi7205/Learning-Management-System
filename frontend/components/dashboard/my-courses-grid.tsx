"use client";

import { Card } from "@/components/ui/card";
import { CourseCard } from "@/components/ui/course-card";
import { Course, Enrollment, Certificate } from "@/lib/types";

interface MyCourseGridProps {
  enrollments: Array<{
    enrollment: Enrollment;
    course: Course;
    certificate?: Certificate;
    daysRemaining?: number;
  }>;
}

export function MyCourseGrid({ enrollments }: MyCourseGridProps) {
  if (enrollments.length === 0) {
    return (
      <Card className="p-8">
        <p className="text-muted-foreground text-center">
          No courses enrolled yet. Browse our catalog to get started!
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrollments.map(({ enrollment, course, certificate, daysRemaining }) => (
        <CourseCard
          key={enrollment._id}
          course={course}
          enrollment={enrollment}
          certificate={certificate}
          daysRemaining={daysRemaining}
        />
      ))}
    </div>
  );
}
