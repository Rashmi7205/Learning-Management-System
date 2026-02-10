import { User, Mail, Phone, MapPin, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarUpload } from "./AvatarUpload";

interface ProfileOverviewProps {
  user: any;
  initials: string;
}

export const ProfileOverview = ({ user, initials }: ProfileOverviewProps) => {
  const infoItems = [
    { icon: Mail, label: "Email", value: user?.email },
    { icon: Phone, label: "Phone", value: user?.phone || "Not provided" },
    { icon: MapPin, label: "Country", value: user?.country || "Not provided" },
    { icon: Users, label: "Gender", value: user?.gender || "Not specified" },
  ];

  return (
    <Card className="mb-6 border-2 border-border overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4">
        <CardTitle className="text-xl">Profile Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:col-span-1 space-y-3">
            <AvatarUpload user={user} initials={initials} />
            <div className="text-center">
              <h2 className="text-xl font-bold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm font-medium text-blue-500 uppercase tracking-wider">
                {user?.role || "Member"}
              </p>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-muted/20 rounded-2xl border border-border/50"
              >
                <div className="p-2 bg-background rounded-lg shadow-sm">
                  <item.icon className="text-primary w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold truncate max-w-[180px]">
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
