import { User, Mail, Phone, MapPin, Users, ShieldCheck } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarUpload } from "./AvatarUpload";

interface ProfileOverviewProps {
  user: any;
  initials: string;
}

export const ProfileOverview = ({ user, initials }: ProfileOverviewProps) => {
  const infoItems = [
    { icon: Mail, label: "Email Address", value: user?.email },
    {
      icon: Phone,
      label: "Phone Number",
      value: user?.phone || "Not provided",
    },
    {
      icon: MapPin,
      label: "Current Country",
      value: user?.country || "Not provided",
    },
    {
      icon: Users,
      label: "Gender Identity",
      value: user?.gender || "Not specified",
    },
  ];

  return (
    <Card className="mb-8 bg-white/5 border-white/10 overflow-hidden backdrop-blur-md rounded-[2rem]">
      {/* Subtle Header Gradient */}
      <CardHeader className="bg-gradient-to-r from-[#2845D6]/10 to-transparent border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2845D6]" />
          <CardTitle className="text-xl font-bold text-white tracking-tight">
            Profile Overview
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Left Section: Avatar & Identity */}
          <div className="flex flex-col items-center md:col-span-1 space-y-4">
            <div className="relative group">
              {/* Decorative Ring */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#2845D6] to-[#06D001] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative">
                <AvatarUpload user={user} initials={initials} />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-black text-white leading-tight">
                {user?.firstName} {user?.lastName}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 bg-[#2845D6]/10 rounded-full border border-[#2845D6]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06D001] animate-pulse" />
                <p className="text-[10px] font-black text-[#2845D6] uppercase tracking-[0.15em]">
                  {user?.role || "Member"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Info Tiles */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoItems.map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-4 p-4 bg-white/[0.03] hover:bg-white/[0.07] rounded-2xl border border-white/5 transition-all duration-300"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#2845D6]/50 transition-colors">
                  <item.icon className="text-[#2845D6] w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase font-bold text-slate-500 tracking-[0.15em] mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-200 truncate pr-2">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
