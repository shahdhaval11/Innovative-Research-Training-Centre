import { configureStore } from "@reduxjs/toolkit";
import enquiriesReducer from "./slices/enquiriesSlice";
import internshipRegistrationsReducer from "./slices/internshipRegistrationsSlice";

export const store = configureStore({
  reducer: {
    enquiries: enquiriesReducer,
    internshipRegistrations: internshipRegistrationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
