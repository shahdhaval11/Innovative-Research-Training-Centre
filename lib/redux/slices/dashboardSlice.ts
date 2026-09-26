import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type KpiStat = {
  key: string;
  title: string;
  count: number;
  secondary?: {
    label: string;
    count: number;
  };
};

type DashboardState = {
  stats: KpiStat[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: DashboardState = {
  stats: [],
  status: "idle",
  error: null,
};

export const fetchDashboardStats = createAsyncThunk("dashboard/fetchStats", async () => {
  const res = await fetch("/api/admin/dashboard/stats");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load dashboard stats.");
  }

  return data.stats as KpiStat[];
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load dashboard stats.";
      });
  },
});

export default dashboardSlice.reducer;
