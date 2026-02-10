import { Heart, Share2, Check, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseDetailsData } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "@/lib/store/slices/cartSlice";
import { useRouter } from "next/navigation";

interface SidebarProps {
  course: CourseDetailsData;
  features: any[];
}

export const CourseSidebar = ({ course, features }: SidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();

  const {
    items: cartItems,
    wishlistItems,
    loading
  } = useSelector((state: RootState) => state.cart);

  const isInCart = cartItems.some((item: any) => item._id === course._id);
  const isWishlisted = wishlistItems.some(
    (item: any) => item._id === course._id,
  );

  const handleEnrollClick = () => {
    if (isInCart) {
      navigate.push("/cart");
    } else {
      dispatch(addToCart(course._id));
    }
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(course._id));
    } else {
      dispatch(addToWishlist(course._id));
    }
  };

  return (
    <aside className="sticky top-24">
      <div className="bg-slate-900/50 backdrop-blur-2xl rounded-[32px] border border-white/10 p-8 shadow-2xl overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full pointer-events-none" />

        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-5xl font-black text-white">
            ₹{course.discountPrice}
          </span>
          <span className="text-xl text-slate-500 line-through">
            ₹{course.price}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          {/* Enroll / Add to Cart Button */}
          <Button
            onClick={handleEnrollClick}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isInCart ? (
              <>
                <ShoppingCart className="w-5 h-5" /> Go to Cart
              </>
            ) : (
              "Enroll Now"
            )}
          </Button>

          <div className="grid grid-cols-2 gap-4">
            {/* Wishlist Toggle Button */}
            <Button
              variant="outline"
              disabled={loading}
              onClick={handleWishlistToggle}
              className={`cursor-pointer h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 transition-all ${
                isWishlisted ? "text-red-500 border-red-500/50" : "text-white "
              }`}
            >
              <Heart
                className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`}
              />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <Share2 className="w-5 h-5 mr-2" /> Share
            </Button>
          </div>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-8">
          <p className="font-bold text-white text-sm uppercase tracking-widest">
            Included in Course:
          </p>
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-slate-400 group"
            >
              <feature.icon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="w-6 h-6 text-emerald-500" />
          </div>
          <p className="text-xs text-emerald-200 font-medium">
            30-Day Money-Back Guarantee
          </p>
        </div>
      </div>
    </aside>
  );
};
