"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Datatable} from '@/components/instructor/Datatable'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Mail,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Download,
} from "lucide-react";


const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    email: "john@university.edu",
    enrollment: "Python 101, Web Dev 201",
    completion: 85,
    status: "Excellent",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@university.edu",
    enrollment: "Web Dev 201, UI/UX Design",
    completion: 92,
    status: "Excellent",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@university.edu",
    enrollment: "Data Science 301",
    completion: 68,
    status: "Good",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@university.edu",
    enrollment: "Python 101",
    completion: 45,
    status: "Needs Support",
  },
  {
    id: 5,
    name: "Alex Chen",
    email: "alex@university.edu",
    enrollment: "Web Dev 201, Data Science 301",
    completion: 78,
    status: "Good",
  },
  {
    id: 6,
    name: "Jessica Lee",
    email: "jessica@university.edu",
    enrollment: "UI/UX Design",
    completion: 88,
    status: "Excellent",
  },
];

const performanceData = [
  { range: "90-100%", students: 15 },
  { range: "80-89%", students: 28 },
  { range: "70-79%", students: 32 },
  { range: "60-69%", students: 18 },
  { range: "Below 60%", students: 8 },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Excellent":
      return "bg-green-500/20 text-green-400";
    case "Good":
      return "bg-blue-500/20 text-blue-400";
    case "Needs Support":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

export default function StudentsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all your students
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-card p-6 border-border">
          <p className="text-muted-foreground text-sm">Total Students</p>
          <p className="text-3xl font-bold text-foreground mt-2">925</p>
          <p className="text-xs text-green-500 mt-2">↑ 12% this semester</p>
        </Card>
        <Card className="bg-card p-6 border-border">
          <p className="text-muted-foreground text-sm">Avg. Completion</p>
          <p className="text-3xl font-bold text-foreground mt-2">79%</p>
          <p className="text-xs text-green-500 mt-2">↑ 3% this month</p>
        </Card>
        <Card className="bg-card p-6 border-border">
          <p className="text-muted-foreground text-sm">At Risk</p>
          <p className="text-3xl font-bold text-red-500 mt-2">26</p>
          <p className="text-xs text-muted-foreground mt-2">
            Need intervention
          </p>
        </Card>
        <Card className="bg-card p-6 border-border">
          <p className="text-muted-foreground text-sm">Avg. Grade</p>
          <p className="text-3xl font-bold text-foreground mt-2">B+</p>
          <p className="text-xs text-muted-foreground mt-2">3.4 GPA</p>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Performance Distribution */}
        <Card className="bg-card p-6 border-border col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Performance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="range" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="students" fill="#a78bfa" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-card p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Engagement
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Forum Activity
                </span>
                <span className="text-sm font-medium text-foreground">73%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "73%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Assignment Turn-in
                </span>
                <span className="text-sm font-medium text-foreground">91%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: "91%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Module Completion
                </span>
                <span className="text-sm font-medium text-foreground">68%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Student List using Data Table */}
      <Card className="bg-card border-border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Student List
          </h3>
        </div>
        <DataTable
          columns={studentColumns}
          data={mockStudents.map((student) => ({
            id: student.id,
            name: student.name,
            email: student.email,
            course: student.enrollment,
            courseLectures: "24",
            courseDuration: "12 hrs",
            enrolledAt: "2024-01-15",
            enrolledTimeAgo: "5 days ago",
            progress: student.completion,
            status:
              student.status.toLowerCase() === "excellent"
                ? "completed"
                : student.status.toLowerCase() === "needs support"
                  ? "expired"
                  : "active",
            statusExtra:
              student.status === "Needs Support"
                ? "Intervention needed"
                : undefined,
          }))}
          searchPlaceholder="Search students by name or email..."
          searchKey="name"
          pageSize={10}
        />
      </Card>
    </div>
  );
}
