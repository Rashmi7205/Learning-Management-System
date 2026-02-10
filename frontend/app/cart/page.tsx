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
  moveToCart
} from "@/lib/store/slices/cartSlice"; // Adjust this path to your slice file
import Footer from "@/components/home-page/Footer";
import Header from "@/components/home-page/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // 1. Get real data from Redux instead of local state
  const { items: cartItems, wishlistItems,loading } = useSelector(
    (state: RootState) => state.cart
  );

  // 2. Fetch data on mount
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchWishlist());
  }, [dispatch]);

  // 3. Calculation logic
  const subtotal = cartItems.reduce((sum, item: any) => sum + item.discountPrice, 0);
  const originalSubtotal = cartItems.reduce((sum, item: any) => sum + item.price, 0);
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
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-slate-200">
      <Header />
      <main className="flex-grow">
        <div className="text-white py-16 relative overflow-hidden border-b border-white/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2845D6]/10 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h1 className="font-display text-4xl font-bold mb-3 tracking-tight">
              Shopping Cart
            </h1>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <Link href="/" className="hover:text-[#2845D6] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-700" />
              <span className="text-slate-300">Cart</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading && cartItems.length === 0 ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin w-10 h-10 text-[#2845D6]" />
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-[32px] border-2 border-dashed border-white/10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#2845D6]/10 mb-6">
                <ShoppingCart className="w-10 h-10 text-[#2845D6]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Your cart is feeling lonely.
              </h2>
              <Link href="/courses">
                <Button className="bg-[#2845D6] hover:bg-[#1f38b0] rounded-full px-8 hover:scale-105 transition-all">
                  Explore Courses <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      {cartItems.length} Courses in Cart
                      <span className="h-px w-12 bg-white/10" />
                    </h2>
                    <Button
                      variant="ghost"
                      className="text-sm text-slate-400 hover:text-red-400"
                      onClick={handleClearCart}
                    >
                      Clear All
                    </Button>
                  </div>

                  {cartItems.map((item: any) => (
                    <div
                      key={item._id}
                      className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 hover:border-[#2845D6]/30 transition-all shadow-xl"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={item.thumbnail?.secureUrl || item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <Link
                              href={`/courses/${item.title
                                .toLowerCase()
                                .trim()
                                .replace(/[^a-z0-9\s-]/g, "")
                                .replace(/\s+/g, "-")}?cid=${item._id}`}
                            >
                              <h3 className="font-bold text-white text-lg group-hover:text-[#2845D6] transition-colors">
                                {item.title}
                              </h3>
                            </Link>
                            <button
                              onClick={() => handleRemove(item._id)}
                              className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Instructor Section with Shadcn Avatar */}
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="h-6 w-6 border border-white/10">
                              <AvatarImage
                                src={item.instructor?.avatar}
                                alt={item.instructor?.firstName}
                              />
                              <AvatarFallback className="text-[10px] bg-[#2845D6] text-white">
                                {item.instructor?.firstName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-slate-400">
                              By{" "}
                              <span className="text-slate-200 font-medium">
                                {item.instructor?.firstName}{" "}
                                {item.instructor?.lastName}
                              </span>
                            </p>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-black text-white">
                                ${item.discountPrice}
                              </span>
                              <span className="text-sm text-slate-500 line-through">
                                ${item.price}
                              </span>
                            </div>
                            <button
                              onClick={() => handleSaveForLater(item._id)}
                              className="text-xs font-bold text-slate-400 hover:text-[#2845D6] flex items-center gap-1.5 uppercase tracking-wider transition-colors"
                            >
                              <Heart className="w-3.5 h-3.5" /> Save for Later
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Saved for Later Section */}
                {wishlistItems.length > 0 && (
                  <div className="pt-8 border-t border-white/5">
                    <h2 className="text-xl font-bold text-white mb-6">
                      Saved for later
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {wishlistItems.map((item: any) => (
                        <div
                          key={item._id}
                          className="group bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:border-white/20 transition-all"
                        >
                          <div className="w-24 h-16 relative rounded-lg overflow-hidden shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                            <Image
                              src={item.thumbnail?.secureUrl || item.thumbnail}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate mb-1">
                              {item.title}
                            </h4>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-[#06D001]">
                                ${item.discountPrice}
                              </span>
                              <button
                                onClick={() => handleMoveToCart(item._id)}
                                className="text-xs font-bold text-[#2845D6] hover:text-white transition-colors"
                              >
                                Move to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-[#1E293B] rounded-[32px] shadow-2xl border border-white/10 p-8">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Order Summary
                    </h3>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-slate-400 text-sm">
                        <span>Original Price</span>
                        <span className="line-through">
                          ${originalSubtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#06D001] font-bold text-sm">
                        <span>Savings</span>
                        <span>-${totalSavings.toFixed(2)}</span>
                      </div>
                      <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                        <span className="font-bold text-slate-400 uppercase text-xs">
                          Total Amount
                        </span>
                        <span className="text-4xl font-black text-[#2845D6] tracking-tighter">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-6">
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-white outline-none"
                      />
                      <Button
                        onClick={applyPromoCode}
                        variant="outline"
                        className="rounded-xl border-white/10 text-white"
                      >
                        Apply
                      </Button>
                    </div>
                    <Button className="w-full bg-[#2845D6] hover:bg-[#1f38b0] h-14 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02]">
                      Checkout Now
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