import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full -z-10" />

      <div className="text-center space-y-8 max-w-md">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl mx-auto mb-6">
            <FileQuestion className="w-12 h-12 text-blue-500 animate-bounce" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Course Not Found
          </h1>
          <p className="text-slate-400 text-lg">
            The learning path you're looking for has moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            asChild
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 h-12 rounded-xl font-bold transition-all"
          >
            <Link href="/courses">
              <ArrowLeft className="w-4 h-4 mr-2" /> Browse Courses
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 h-12 rounded-xl transition-all"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" /> Back Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-12 text-slate-600 text-sm font-mono">
        Error Code: 404_COURSE_MISSING
      </div>
    </div>
  );
}
