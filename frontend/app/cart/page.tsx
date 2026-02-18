"use client";
import { useEffect, useState } from "react";
import {
  X,
  ShoppingCart,
  Heart,
  Trash2,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Star,
  Loader2, // Added for loading states
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import {
  fetchCart,
  removeFromCart,
  moveToWishlist,
  clearCart,
  fetchWishlist,
  moveToCart,
} from "@/lib/store/slices/cartSlice";
import Footer from "@/components/home-page/Footer";
import Header from "@/components/home-page/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { paymentService } from "@/lib/services/api";
import { generateSlug } from "@/lib/utils";
import { CartItem } from "@/lib/types";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      // 1. Initialize Razorpay SDK
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) throw new Error("Razorpay SDK failed to load");

      // 2. Call Service to Create Order
      const courseIds = cartItems.map((item: any) => item._id);
      const { data: orderData } = await paymentService.initiate(courseIds);

      // 3. Configure Razorpay Popup
      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: "Knowledge Lab",
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          // 4. Verify via Service
          const verification = await paymentService.verify({
            ...response,
            orderId: orderData.orderId, // Mongo ID
          });

          if (verification.success) {
            toast.success("Welcome to the Lab!");
            dispatch(clearCart());
            window.location.href = "/learner/courses";
          }
        },
        theme: { color: "#2845D6" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error.message || "Payment initiation failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const {
    items: cartItems,
    wishlistItems,
    loading,
  } = useSelector((state: RootState) => state.cart);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);

  // 3. Calculation logic
  const subtotal = cartItems.reduce(
    (sum, item: any) => sum + item.discountPrice,
    0,
  );
  const originalSubtotal = cartItems.reduce(
    (sum, item: any) => sum + item.price,
    0,
  );
  const totalSavings = originalSubtotal - subtotal;
  const total = subtotal - discount;

  // 4. Dispatch Actions
  const handleRemove = (id: string) => dispatch(removeFromCart(id));
  const handleSaveForLater = (id: string) => dispatch(moveToWishlist(id));
  const handleMoveToCart = (id: string) => dispatch(moveToCart(id));
  const handleClearCart = () => dispatch(clearCart());

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(subtotal * 0.2);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-slate-200 overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {/* Banner Section */}
        <div className="text-white py-8 md:py-16 relative overflow-hidden border-b border-white/5">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#2845D6]/10 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h1 className="font-display text-2xl md:text-4xl font-bold mb-3 tracking-tight">
              Shopping Cart
            </h1>
            <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm font-medium">
              <Link href="/" className="hover:text-[#2845D6] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-700" />
              <span className="text-slate-300">Cart</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {loading && cartItems.length === 0 ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin w-10 h-10 text-[#2845D6]" />
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 md:py-24 bg-white/5 backdrop-blur-sm rounded-[24px] md:rounded-[32px] border-2 border-dashed border-white/10 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#2845D6]/10 mb-6">
                <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-[#2845D6]" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-white mb-4">
                Your cart is feeling lonely.
              </h2>
              <Link href="/courses">
                <Button className="bg-[#2845D6] hover:bg-[#1f38b0] rounded-full px-8">
                  Explore Courses <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            /* MAIN CONTENT GRID */
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 md:gap-10 items-start">
              {/* LEFT SIDE: CART ITEMS */}
              <div className="w-full lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-3">
                      {cartItems?.length} Courses
                      <span className="hidden sm:block h-px w-12 bg-white/10" />
                    </h2>
                    <Button
                      variant="ghost"
                      className="text-xs md:text-sm text-slate-400 hover:text-red-400 h-auto p-0"
                      onClick={handleClearCart}
                    >
                      Clear All
                    </Button>
                  </div>

                  {cartItems?.map((item: CartItem) => (
                    <div
                      key={item._id}
                      className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 md:p-5 hover:border-[#2845D6]/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                        {/* Thumbnail */}
                        <div className="relative w-full sm:w-40 md:w-48 aspect-video rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={
                              item?.thumbnail?.secureUrl || "/placeholder.png"
                            }
                            alt={item?.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <Link
                              href={`/courses/${generateSlug(item?.title || "")}?cid=${item?._id}`}
                            >
                              <h3 className="font-bold text-white text-base md:text-lg group-hover:text-[#2845D6] transition-colors line-clamp-2">
                                {item?.title}
                              </h3>
                            </Link>
                            <button
                              onClick={() => handleRemove(item?._id)}
                              className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="h-5 w-5 md:h-6 md:w-6">
                              <AvatarFallback className="text-[8px] md:text-[10px] bg-[#2845D6] text-white">
                                {item?.instructor?.firstName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-xs md:text-sm text-slate-400 truncate">
                              By{" "}
                              <span className="text-slate-200">
                                {item?.instructor?.firstName}
                              </span>
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl md:text-2xl font-black text-white">
                                ₹{item?.discountPrice}
                              </span>
                              <span className="text-xs md:text-sm text-slate-500 line-through">
                                ₹{item?.price}
                              </span>
                            </div>
                            <button
                              onClick={() => handleSaveForLater(item?._id)}
                              className="text-[10px] md:text-xs font-bold text-slate-400 hover:text-[#2845D6] flex items-center gap-1.5 uppercase tracking-wider"
                            >
                              <Heart className="w-3 h-3 md:w-3.5 md:h-3.5" />
                              <span className="hidden xs:inline">
                                Save for Later
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: SUMMARY CARD */}
              <div className="w-full lg:col-span-1 order-1 lg:order-2">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <div className="bg-[#1E293B] rounded-[24px] md:rounded-[32px] shadow-2xl border border-white/10 p-6 md:p-8">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-6">
                      Order Summary
                    </h3>
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-slate-400 text-xs md:text-sm">
                        <span>Original Price</span>
                        <span className="line-through">
                          ₹{originalSubtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#06D001] font-bold text-xs md:text-sm">
                        <span>Savings</span>
                        <span>-₹{totalSavings.toFixed(2)}</span>
                      </div>
                      <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                        <span className="font-bold text-slate-400 uppercase text-[10px]">
                          Total Amount
                        </span>
                        <span className="text-3xl md:text-4xl font-black text-[#2845D6] tracking-tighter">
                          ₹{total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="flex gap-2 mb-6">
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="SAVE20"
                        className="flex-1 px-3 py-2 bg-black/20 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-[#2845D6]/50"
                      />
                      <Button
                        onClick={applyPromoCode}
                        variant="outline"
                        className="rounded-xl border-white/10 text-white text-xs h-10"
                      >
                        Apply
                      </Button>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full bg-[#2845D6] hover:bg-[#1f38b0] h-12 md:h-14 rounded-2xl text-base md:text-lg font-bold"
                    >
                      {isProcessing ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Checkout Now"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default CartPage;
