import { useState } from "react";
import {
  Play,
  Clock,
  BookOpen,
  Users,
  Download,
  Award,
  Monitor,
  Share2,
  Heart,
  Gift,
  Tag,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface CourseSidebarProps {
  image: string;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  discountPercentage?: number;
  urgencyMessage?: string;
  courseIncludes: {
    videoHours: number;
    articles: number;
    resources: number;
    hasLifetimeAccess: boolean;
    hasMobileAccess: boolean;
    hasCertificate: boolean;
  };
  instructors: {
    name: string;
    role: string;
    image: string;
  }[];
}

const CourseSidebar = ({
  image,
  price,
  originalPrice,
  isFree,
  discountPercentage,
  urgencyMessage,
  courseIncludes,
  instructors,
}: CourseSidebarProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="sticky top-24 bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
      {/* Video Preview */}
      <div className="relative group cursor-pointer">
        <Image
          src={image}
          alt="Course preview"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <Play className="w-8 h-8 text-primary fill-primary" />
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <span className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
            Preview This Course
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Price */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl font-bold text-foreground">
              {isFree ? "Free" : `₹${price.toLocaleString()}`}
            </span>
            {originalPrice && !isFree && (
              <span className="text-lg text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
            {discountPercentage && !isFree && (
              <span className="text-sm font-semibold text-green bg-green/10 px-2 py-1 rounded">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
          {urgencyMessage && (
            <p className="text-sm text-destructive font-medium mt-2 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4" />
              {urgencyMessage}
            </p>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 mb-4">
          <Button className="w-full btn-cta gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
          <Button variant="outline" className="w-full font-semibold">
            Buy Now
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mb-6">
          30-Day Money-Back Guarantee
        </p>

        {/* Course Includes */}
        <div className="border-t border-border pt-6">
          <h4 className="font-semibold text-foreground mb-4">
            This course includes:
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{courseIncludes.videoHours} hours on-demand video</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>{courseIncludes.articles} articles</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Download className="w-4 h-4 text-primary" />
              <span>{courseIncludes.resources} downloadable resources</span>
            </li>
            {courseIncludes.hasLifetimeAccess && (
              <li className="flex items-center gap-3 text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span>Full lifetime access</span>
              </li>
            )}
            {courseIncludes.hasMobileAccess && (
              <li className="flex items-center gap-3 text-muted-foreground">
                <Monitor className="w-4 h-4 text-primary" />
                <span>Access on mobile and TV</span>
              </li>
            )}
            {courseIncludes.hasCertificate && (
              <li className="flex items-center gap-3 text-muted-foreground">
                <Award className="w-4 h-4 text-primary" />
                <span>Certificate of completion</span>
              </li>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="border-t border-border pt-6 mt-6">
          <div className="flex items-center justify-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share this course</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button variant="outline" className="flex-1">
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    LinkedIn
                  </Button>
                </div>
                <div className="flex gap-2 mt-4">
                  <Input
                    value="https://lms.com/course/..."
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="secondary">Copy</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              size="sm"
              className={`${isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={`w-4 h-4 mr-1 ${isWishlisted ? "fill-current" : ""}`}
              />
              Wishlist
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Gift className="w-4 h-4 mr-1" />
                  Gift
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>🎁 Gift This Course</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Recipient Email:
                    </label>
                    <Input placeholder="friend@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Personal Message (Optional):
                    </label>
                    <Input placeholder="Happy Birthday! Hope you enjoy this..." />
                  </div>
                  <p className="text-lg font-bold">
                    Price: ₹{price.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button className="flex-1 btn-cta">Send Gift</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Coupon */}
        <div className="border-t border-border pt-6 mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Tag className="w-4 h-4" />
            <span>Apply Coupon</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button variant="secondary">Apply</Button>
          </div>
        </div>

        {/* Instructors */}
        <div className="border-t border-border pt-6 mt-6">
          <h4 className="text-sm text-muted-foreground mb-4">A course by</h4>
          <div className="space-y-4">
            {instructors.map((instructor, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h5 className="font-semibold text-foreground text-sm hover:text-primary cursor-pointer transition-colors">
                    {instructor.name}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {instructor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
