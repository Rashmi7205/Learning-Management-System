import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InstructorDashboardPage() {
  const stats = [
    { label: "Total Students", value: "342", color: "bg-blue-500" },
    { label: "Active Courses", value: "5", color: "bg-green-500" },
    { label: "Total Earnings", value: "$4,250", color: "bg-yellow-500" },
    { label: "Avg Rating", value: "4.8★", color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your courses and track student progress.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Create Course
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg opacity-80`}
              ></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Top Performing Courses
          </h2>
          <div className="space-y-3">
            {[
              { name: "React Fundamentals", students: 142, rating: 4.9 },
              { name: "Advanced TypeScript", students: 89, rating: 4.7 },
              { name: "Next.js Mastery", students: 111, rating: 4.8 },
            ].map((course) => (
              <div
                key={course.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{course.name}</p>
                  <p className="text-xs text-gray-600">
                    {course.students} students
                  </p>
                </div>
                <span className="text-sm font-semibold text-yellow-500">
                  {course.rating}★
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Student Feedback
          </h2>
          <div className="space-y-3">
            {[
              {
                name: "Alex Johnson",
                course: "React",
                feedback: "Excellent content!",
              },
              {
                name: "Sarah Lee",
                course: "TypeScript",
                feedback: "Very clear explanations",
              },
              {
                name: "Mike Chen",
                course: "Next.js",
                feedback: "Would like more examples",
              },
            ].map((review, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{review.name}</p>
                  <span className="text-xs text-gray-600">{review.course}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  "{review.feedback}"
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
