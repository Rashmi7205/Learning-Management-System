"use client";
import { useState } from "react";
import {
  X,
  ShoppingCart,
  Heart,
  Trash2,
  Gift,
  Tag,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/home-page/Footer";
import Header from "@/components/home-page/Header";

// Mock cart data
const mockCartItems = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp 2024",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    price: 89.99,
    originalPrice: 199.99,
    instructor: "Sarah Chen",
    rating: 4.9,
    totalHours: 60,
    lectures: 320,
  },
  {
    _id: "2",
    title: "UI/UX Design Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    price: 79.99,
    originalPrice: 179.99,
    instructor: "Marcus Rodriguez",
    rating: 4.8,
    totalHours: 45,
    lectures: 180,
  },
];

const savedForLater = [
  {
    _id: "3",
    title: "Python for Data Science",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
    price: 94.99,
    originalPrice: 189.99,
    instructor: "Dr. James Park",
    rating: 4.9,
  },
];

const recommendations = [
  {
    _id: "4",
    title: "Advanced JavaScript Patterns",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=225&fit=crop",
    price: 69.99,
    originalPrice: 149.99,
    rating: 4.7,
    students: 12500,
  },
  {
    _id: "5",
    title: "React & TypeScript",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    price: 74.99,
    originalPrice: 159.99,
    rating: 4.8,
    students: 15200,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [saved, setSaved] = useState(savedForLater);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);
  const total = subtotal - discount;

  const removeFromCart = (id: string) => setCartItems(prev => prev.filter(item => item._id !== id));
  const moveToSaved = (item: any) => { setSaved(prev => [...prev, item]); removeFromCart(item._id); };
  const moveToCart = (item: any) => {
    setCartItems(prev => [...prev, { ...item, totalHours: 40, lectures: 150 }]);
    setSaved(prev => prev.filter(i => i._id !== item._id));
  };
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE20") {
      setAppliedPromo(promoCode);
      setDiscount(subtotal * 0.2);
    }
  };
  const removePromo = () => { setAppliedPromo(null); setDiscount(0); setPromoCode(""); };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-slate-200">
      <Header />
      <main className="flex-grow">
        {/* Banner Section - Swapped to a deep gradient */}
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
          {cartItems.length === 0 ? (
            /* Empty State - Dark Mode Themed */
            <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-[32px] border-2 border-dashed border-white/10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#2845D6]/10 mb-6">
                <ShoppingCart className="w-10 h-10 text-[#2845D6]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Your cart is feeling lonely.
              </h2>
              <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                When you add courses to your cart, they'll appear here. Let's
                find something to learn!
              </p>
              <Link href="/courses">
                <Button
                  size="lg"
                  className="bg-[#2845D6] hover:bg-[#1f38b0] rounded-full px-8 hover:scale-105 transition-all shadow-lg shadow-blue-900/20"
                >
                  Explore Courses <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              {/* Left Column: Cart & Saved */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      {cartItems.length} Courses in Cart
                      <span className="h-px w-12 bg-white/10" />
                    </h2>
                    <Button
                      variant="ghost"
                      className="text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                      onClick={() => setCartItems([])}
                    >
                      Clear All
                    </Button>
                  </div>

                  {cartItems.map((item) => (
                    /* Course Card - Glassmorphism */
                    <div
                      key={item._id}
                      className="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 hover:border-[#2845D6]/30 transition-all duration-300 shadow-xl shadow-black/20"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden shrink-0 border border-white/5">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start gap-4">
                            <Link href={`/courses/${item._id}`}>
                              <h3 className="font-bold text-white text-lg leading-snug group-hover:text-[#2845D6] transition-colors">
                                {item.title}
                              </h3>
                            </Link>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="p-2 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-400 mt-1 mb-3">
                            By{" "}
                            <span className="text-[#2845D6] font-semibold">
                              {item.instructor}
                            </span>
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                            <span className="flex items-center gap-1 text-[#06D001] font-bold bg-[#06D001]/10 px-2 py-0.5 rounded">
                              <Star className="w-3 h-3 fill-current" />{" "}
                              {item.rating}
                            </span>
                            <span>{item.totalHours} total hours</span>
                            <span className="text-white/10">•</span>
                            <span>{item.lectures} lectures</span>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl font-black text-white">
                                ${item.price}
                              </span>
                              <span className="text-sm text-slate-500 line-through">
                                ${item.originalPrice}
                              </span>
                            </div>
                            <button
                              onClick={() => moveToSaved(item)}
                              className="text-xs font-bold text-slate-400 hover:text-[#2845D6] flex items-center gap-1.5 transition-colors uppercase tracking-wider"
                            >
                              <Heart className="w-3.5 h-3.5" /> Save for Later
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {saved.length > 0 && (
                  <div className="pt-8 border-t border-white/5">
                    <h2 className="text-xl font-bold text-white mb-6">
                      Saved for later
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {saved.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 hover:bg-white/[0.08] transition-colors"
                        >
                          <div className="w-24 h-16 relative rounded-lg overflow-hidden shrink-0 grayscale group-hover:grayscale-0">
                            <Image
                              src={item.thumbnail}
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
                                ${item.price}
                              </span>
                              <button
                                onClick={() => moveToCart(item)}
                                className="text-xs font-bold text-[#2845D6] hover:text-white"
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

              {/* Right Column: Checkout Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-[#1E293B] rounded-[32px] shadow-2xl border border-white/10 p-8">
                    <h3 className="text-xl font-bold text-white mb-6">
                      Order Summary
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-slate-400 text-sm">
                        <span>Original Price</span>
                        <span className="line-through text-slate-500">
                          $
                          {cartItems
                            .reduce((s, i) => s + i.originalPrice, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Subtotal</span>
                        <span className="font-bold text-white">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#06D001] font-bold text-sm">
                        <span>Savings</span>
                        <span>-${savings.toFixed(2)}</span>
                      </div>
                      <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                        <span className="font-bold text-slate-400 uppercase tracking-tighter text-xs">
                          Total Amount
                        </span>
                        <span className="text-4xl font-black text-[#2845D6] tracking-tighter">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex gap-2">
                        <input
                          placeholder="Promo code"
                          className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-xl text-sm text-white focus:ring-2 ring-[#2845D6]/40 outline-none"
                        />
                        <Button
                          variant="outline"
                          className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full bg-[#2845D6] hover:bg-[#1f38b0] h-14 rounded-2xl text-lg font-bold shadow-lg shadow-[#2845D6]/20 transition-all hover:scale-[1.02]">
                      Checkout Now
                    </Button>
                    <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest font-bold">
                      Secure SSL Encryption
                    </p>
                  </div>

                  {/* Promo Card - Modern Dark Styling */}
                  <div className="bg-gradient-to-br from-[#2845D6] to-[#6366F1] rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/30">
                    <Sparkles className="absolute -top-2 -right-2 w-20 h-20 text-white/10 rotate-12" />
                    <h4 className="text-lg font-bold mb-2">Student Perk!</h4>
                    <p className="text-blue-50 text-sm leading-relaxed mb-4 opacity-90">
                      Complete your first course and get a 50% discount on your
                      next purchase.
                    </p>
                    <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                    </div>
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