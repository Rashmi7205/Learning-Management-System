import { Card } from "@/components/ui/card";

export default function LearnerProgressPage() {
  const progressData = [
    { course: "React Fundamentals", completed: 65, total: 100 },
    { course: "Advanced TypeScript", completed: 100, total: 100 },
    { course: "Next.js Mastery", completed: 30, total: 100 },
    { course: "Web Design Principles", completed: 0, total: 100 },
  ];

  const achievements = [
    {
      badge: "🏆",
      title: "Fast Learner",
      description: "Completed 3 courses in 3 months",
    },
    {
      badge: "⭐",
      title: "Star Student",
      description: "Achieved 100% in a course",
    },
    {
      badge: "🚀",
      title: "Getting Started",
      description: "Enrolled in your first course",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
        <p className="text-gray-600 mt-2">
          Track your learning journey and achievements.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm font-medium opacity-90">Total Learning Hours</p>
          <p className="text-3xl font-bold mt-2">42 hrs</p>
          <p className="text-xs opacity-75 mt-2">↑ 5 hrs this week</p>
        </Card>
        <Card className="p-6 bg-linear-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm font-medium opacity-90">Courses Completed</p>
          <p className="text-3xl font-bold mt-2">5</p>
          <p className="text-xs opacity-75 mt-2">62% completion rate</p>
        </Card>
        <Card className="p-6 bg-linear-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm font-medium opacity-90">Streak Days</p>
          <p className="text-3xl font-bold mt-2">12</p>
          <p className="text-xs opacity-75 mt-2">Keep it up!</p>
        </Card>
      </div>

      {/* Course Progress Details */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Course Progress
        </h2>
        <div className="space-y-6">
          {progressData.map((item) => (
            <div key={item.course}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{item.course}</p>
                <span className="text-sm font-semibold text-gray-700">
                  {item.completed}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                  style={{ width: `${item.completed}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg"
            >
              <span className="text-4xl mb-2">{achievement.badge}</span>
              <h3 className="font-bold text-gray-900">{achievement.title}</h3>
              <p className="text-xs text-gray-600 mt-1">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
