import { cartService } from "@/lib/services/api";
import { CartItem, CartSummary, WishlistItem } from "@/lib/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      return response.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart({ courseId });
      return response.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add course to cart",
      );
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(courseId);
      return response.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove course from cart",
      );
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.clearCart();
      return response.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);

export const moveToWishlist = createAsyncThunk(
  "cart/moveToWishlist",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await cartService.moveToWishlist({ courseId });
      return response.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to move course to wishlist",
      );
    }
  },
);

// WISHLIST THUNKS
export const fetchWishlist = createAsyncThunk(
  "cart/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getWishlist();
      return response.wishlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist",
      );
    }
  },
);

export const addToWishlist = createAsyncThunk(
  "cart/addToWishlist",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await cartService.addToWishlist({ courseId });
      return response.wishlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add course to wishlist",
      );
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "cart/removeFromWishlist",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromWishlist(courseId);
      return response.wishlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove course from wishlist",
      );
    }
  },
);

export const clearWishlist = createAsyncThunk(
  "cart/clearWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.clearWishlist();
      return response.wishlist;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear wishlist",
      );
    }
  },
);

export const moveToCart = createAsyncThunk(
  "cart/moveToCart",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await cartService.moveToCart({ courseId });
      return response.cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to move course to cart",
      );
    }
  },
);

// SUMMARY THUNK
export const fetchCartSummary = createAsyncThunk(
  "cart/fetchCartSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getSummary();
      return response.summary;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart summary",
      );
    }
  },
);


interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  summary: CartSummary | null;
  loading: boolean;
  cartLoading: boolean;
  wishlistLoading: boolean;
  summaryLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
  wishlistItems: [],
  wishlistCount: 0,
  summary: null,
  loading: false,
  cartLoading: false,
  wishlistLoading: false,
  summaryLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    updateSummary: (state, action: PayloadAction<CartSummary>) => {
      state.summary = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.cartLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.items = action.payload.items;
        state.itemCount = action.payload.itemCount;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.itemCount = action.payload.itemCount;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.itemCount = action.payload.itemCount;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.itemCount = 0;
        state.total = 0;
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(moveToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.itemCount = action.payload.itemCount;
        state.wishlistItems = action.payload.wishlistItems;
        state.wishlistCount = action.payload.wishlistCount;
        state.error = null;
      })
      .addCase(moveToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchWishlist.pending, (state) => {
        state.wishlistLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlistLoading = false;
        state.wishlistItems = action.payload.items;
        state.wishlistCount = action.payload.itemCount;
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload.items;
        state.wishlistCount = action.payload.itemCount;
        state.error = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload.items;
        state.wishlistCount = action.payload.itemCount;
        state.error = null;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.loading = false;
        state.wishlistItems = [];
        state.wishlistCount = 0;
        state.error = null;
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(moveToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.itemCount = action.payload.itemCount;
        state.wishlistItems = action.payload.wishlistItems;
        state.wishlistCount = action.payload.wishlistCount;
        state.error = null;
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCartSummary.pending, (state) => {
        state.summaryLoading = true;
      })
      .addCase(fetchCartSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchCartSummary.rejected, (state) => {
        state.summaryLoading = false;
      });
  },
});

export const { clearError, updateSummary } = cartSlice.actions;
const cartReducers =  cartSlice.reducer;
export default cartReducers;
