import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Camera } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateUserAvatar } from "@/lib/store/slices/authSlice";
import { AppDispatch } from "@/lib/store/store";

export const AvatarUpload = ({
  user,
  initials,
}: {
  user: any;
  initials: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await dispatch(updateUserAvatar(file));
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Profile Container */}
      <div
        className="relative group w-32 h-32 md:w-40 md:h-40 cursor-pointer overflow-hidden rounded-full border-4 border-background shadow-xl"
        onClick={handleIconClick}
      >
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage
            src={user?.avatar?.secureUrl}
            className="object-cover w-full h-full"
          />
          <AvatarFallback className="text-3xl bg-slate-200 dark:bg-slate-800 text-primary font-black">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* The Bottom Dark Overlay with Camera Icon */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-black/60 flex items-center justify-center transition-all duration-300 group-hover:bg-black/80">
          {isUploading ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Camera className="w-6 h-6 text-white" />
          )}
        </div>
      </div>
    </div>
  );
};
