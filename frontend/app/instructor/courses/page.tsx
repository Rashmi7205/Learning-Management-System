import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function InstructorCoursesPage() {
  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      students: 142,
      modules: 8,
      status: "Published",
      rating: 4.9,
      revenue: "$2,130",
    },
    {
      id: 2,
      title: "Advanced TypeScript",
      students: 89,
      modules: 6,
      status: "Published",
      rating: 4.7,
      revenue: "$1,335",
    },
    {
      id: 3,
      title: "Next.js Mastery",
      students: 111,
      modules: 10,
      status: "Published",
      rating: 4.8,
      revenue: "$1,665",
    },
    {
      id: 4,
      title: "Web Design Principles",
      students: 0,
      modules: 5,
      status: "Draft",
      rating: 0,
      revenue: "$0",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">Manage and edit your courses.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ New Course</Button>
      </div>

      {/* Courses Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Course Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Modules
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{course.title}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {course.students}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {course.modules}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {course.rating > 0 ? (
                      <span className="text-yellow-500 font-semibold">
                        {course.rating}★
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {course.revenue}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Edit
                    </button>
                    <span className="text-gray-300">|</span>
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
