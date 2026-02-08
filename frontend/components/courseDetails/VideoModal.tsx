"use client";

import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { LectureVideoPlayer } from "./LectureVideoPlayer";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  courseTitle?: string; // Optional: to make the screen reader announcement better
}

export const VideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  courseTitle,
}: VideoModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 p-4 outline-none animate-in zoom-in-95 duration-300">
          {/* 1. Add the Title for Accessibility */}
          {/* Use sr-only to hide it from sighted users but keep it for screen readers */}
          <Dialog.Title className="sr-only">
            Video Preview: {courseTitle || "Course Lesson"}
          </Dialog.Title>

          {/* 2. Add a Description to satisfy full accessibility requirements */}
          <Dialog.Description className="sr-only">
            Watching the promotional video for this course.
          </Dialog.Description>

          <div className="relative">
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                Close
              </span>
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-[#020617]">
              <LectureVideoPlayer url={videoUrl} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
