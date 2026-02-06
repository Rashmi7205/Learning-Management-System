import { useState } from "react";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
  helpfulCount: number;
  notHelpfulCount: number;
  instructorResponse?: string;
}

interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface StudentReviewsProps {
  rating: number;
  totalRatings: number;
  ratingBreakdown: RatingBreakdown;
  reviews: Review[];
}

const StudentReviews = ({
  rating,
  totalRatings,
  ratingBreakdown,
  reviews,
}: StudentReviewsProps) => {
  const [sortBy, setSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState("all");
  const [visibleReviews, setVisibleReviews] = useState(5);

  const getPercentage = (count: number) => {
    return totalRatings > 0 ? (count / totalRatings) * 100 : 0;
  };

  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "all") return true;
    return review.rating === parseInt(filterRating);
  });

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Student Feedback
      </h2>

      {/* Rating Overview */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left md:w-48">
            <div className="text-6xl font-bold text-foreground mb-2">
              {rating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-muted"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Course Rating</p>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <button
                  onClick={() => setFilterRating(star.toString())}
                  className="flex items-center gap-1 w-16 hover:text-primary transition-colors"
                >
                  <Progress
                    value={getPercentage(
                      ratingBreakdown[star as keyof RatingBreakdown],
                    )}
                    className="h-2 flex-1"
                  />
                </button>
                <div className="flex items-center gap-1 w-12">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-sm text-muted-foreground">{star}</span>
                </div>
                <span className="text-sm text-muted-foreground w-12">
                  {Math.round(
                    getPercentage(
                      ratingBreakdown[star as keyof RatingBreakdown],
                    ),
                  )}
                  %
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="text-muted-foreground">
          Reviews ({filteredReviews.length})
        </span>
        <div className="flex gap-2 ml-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.slice(0, visibleReviews).map((review) => (
          <div
            key={review.id}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.user}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h4 className="font-semibold text-foreground">
                    {review.user}
                  </h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  {review.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {review.date}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Helpful Actions */}
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpfulCount})</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    <span>({review.notHelpfulCount})</span>
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>

                {/* Instructor Response */}
                {review.instructorResponse && (
                  <div className="mt-4 pl-4 border-l-2 border-primary/30 bg-primary/5 rounded-r-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        Instructor Response:
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.instructorResponse}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleReviews < filteredReviews.length && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setVisibleReviews((prev) => prev + 5)}
            className="gap-2"
          >
            Load More Reviews
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentReviews;
