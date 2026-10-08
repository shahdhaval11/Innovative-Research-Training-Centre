import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import enquiriesReducer from "./slices/enquiriesSlice";
import internshipsReducer from "./slices/internshipsSlice";
import internshipRegistrationsReducer from "./slices/internshipRegistrationsSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    enquiries: enquiriesReducer,
    internships: internshipsReducer,
    internshipRegistrations: internshipRegistrationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
