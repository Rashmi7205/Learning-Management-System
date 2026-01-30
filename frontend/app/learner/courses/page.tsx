import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LearnerCoursesPage() {
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "John Doe",
      progress: 65,
      duration: "8 weeks",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Advanced TypeScript",
      instructor: "Jane Smith",
      progress: 100,
      duration: "6 weeks",
      status: "Completed",
    },
    {
      id: 3,
      title: "Next.js Mastery",
      instructor: "Mike Johnson",
      progress: 30,
      duration: "10 weeks",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Web Design Principles",
      instructor: "Sarah Williams",
      progress: 0,
      duration: "5 weeks",
      status: "Not Started",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-2">
          Browse and manage your enrolled courses.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex space-x-2">
        <Button className="bg-blue-600 hover:bg-blue-700">All Courses</Button>
        <Button className="bg-gray-200 text-gray-900 hover:bg-gray-300">
          In Progress
        </Button>
        <Button className="bg-gray-200 text-gray-900 hover:bg-gray-300">
          Completed
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-32 bg-linear-to-r from-blue-500 to-blue-600"></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    by {course.instructor}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : course.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600 font-medium">
                    Progress
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  📚 {course.duration}
                </span>
                <Button className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1">
                  {course.progress === 100 ? "Review" : "Continue"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
