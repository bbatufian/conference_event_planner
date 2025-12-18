// venueSlice.js - Updated and Corrected Version
import { createSlice } from "@reduxjs/toolkit";

// Constants for better maintainability
const MAX_AUDITORIUM = 3;
const MAX_OTHER_ROOMS = 10;

export const venueSlice = createSlice({
  name: "venue",
  initialState: [
    {
      img: "https://cdn.pixabay.com/photo/2017/08/06/12/52/chairs-2181916_640.jpg",
      name: "Conference Room (Capacity:15)",
      cost: 3500,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2016/11/21/13/29/event-venue-1597531_640.jpg",
      name: "Auditorium Hall (Capacity:200)",
      cost: 5500,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2014/11/24/23/39/convention-center-3908238_640.jpg",
      name: "Presentation Room (Capacity:50)",
      cost: 700,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2017/08/06/12/52/chairs-2181916_640.jpg",
      name: "Large Meeting Room (Capacity:10)",
      cost: 900,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2015/01/09/02/15/laptops-593296_640.jpg",
      name: "Small Meeting Room (Capacity:5)",
      cost: 1100,
      quantity: 0,
    },
  ],
  reducers: {
    incrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        const item = state[index];
        const isAuditorium = item.name === "Auditorium Hall (Capacity:200)";
        const maxQuantity = isAuditorium ? MAX_AUDITORIUM : MAX_OTHER_ROOMS;
        
        if (item.quantity >= maxQuantity) {
          return;
        }
        state[index].quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
    // Optional: Reset all quantities
    resetQuantities: (state) => {
      state.forEach(item => {
        item.quantity = 0;
      });
    },
  },
});

export const { incrementQuantity, decrementQuantity, resetQuantities } = venueSlice.actions;
export default venueSlice.reducer;
