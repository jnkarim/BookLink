import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addtoCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id // Accessing `_id` from payload correctly
      );

      if (!existingItem) {
        state.cartItems.push(action.payload); // Correct reference to `action.payload`
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Book Added",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Already added to the Cart",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

// Export the actions
export const { addtoCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
