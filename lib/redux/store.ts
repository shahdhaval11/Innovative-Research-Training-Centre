import { configureStore } from "@reduxjs/toolkit";
import advisoryMembersReducer from "./slices/advisoryMembersSlice";
import dashboardReducer from "./slices/dashboardSlice";
import durationsReducer from "./slices/durationsSlice";
import enquiriesReducer from "./slices/enquiriesSlice";
import internshipsReducer from "./slices/internshipsSlice";
import internshipRegistrationsReducer from "./slices/internshipRegistrationsSlice";

export const store = configureStore({
  reducer: {
    advisoryMembers: advisoryMembersReducer,
    dashboard: dashboardReducer,
    durations: durationsReducer,
    enquiries: enquiriesReducer,
    internships: internshipsReducer,
    internshipRegistrations: internshipRegistrationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
