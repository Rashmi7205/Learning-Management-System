import { Card } from "@/components/ui/card";

export default function InstructorAnalyticsPage() {
  const analyticsData = [
    { metric: "Total Course Views", value: "12,543", change: "+12%" },
    { metric: "New Enrollments", value: "342", change: "+8%" },
    { metric: "Student Completion Rate", value: "73%", change: "+5%" },
    { metric: "Average Course Rating", value: "4.8/5", change: "+0.2" },
  ];

  const coursePerformance = [
    {
      name: "React Fundamentals",
      views: 3200,
      enrollments: 142,
      completion: 85,
    },
    {
      name: "Advanced TypeScript",
      views: 2100,
      enrollments: 89,
      completion: 78,
    },
    { name: "Next.js Mastery", views: 2850, enrollments: 111, completion: 72 },
    { name: "Web Design", views: 1500, enrollments: 45, completion: 65 },
    { name: "Python Basics", views: 2893, enrollments: 155, completion: 81 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">
          Track your course performance and student engagement.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item) => (
          <Card key={item.metric} className="p-6">
            <p className="text-gray-600 text-sm font-medium">{item.metric}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {item.value}
            </p>
            <p className="text-sm text-green-600 font-semibold mt-2">
              {item.change}
            </p>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Course Performance Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Enrollments
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Completion Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {coursePerformance.map((course) => (
                <tr
                  key={course.name}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {course.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {course.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {course.enrollments}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${course.completion}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-semibold text-gray-900">
                        {course.completion}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 h-80 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600 font-medium">
              📊 Enrollment Trend Chart
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Chart component would go here
            </p>
          </div>
        </Card>
        <Card className="p-6 h-80 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-600 font-medium">
              📈 Revenue Breakdown Chart
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Chart component would go here
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
