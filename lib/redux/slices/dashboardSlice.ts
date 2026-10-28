import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type KpiStat = {
  key: string;
  title: string;
  count: number;
  secondary?: {
    label: string;
    count: number;
  };
  // Optional per-category counts shown below the total, e.g. Online / Offline.
  breakdown?: {
    label: string;
    count: number;
  }[];
};

export type RegistrationTrendPoint = {
  date: string; // YYYY-MM-DD
  event: number;
  workshop: number;
};

type DashboardState = {
  stats: KpiStat[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  trend: RegistrationTrendPoint[];
  trendStatus: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: DashboardState = {
  stats: [],
  status: "idle",
  error: null,
  trend: [],
  trendStatus: "idle",
};

export const fetchDashboardStats = createAsyncThunk("dashboard/fetchStats", async () => {
  const res = await fetch("/api/admin/dashboard/stats");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load dashboard stats.");
  }

  return data.stats as KpiStat[];
});

export const fetchRegistrationTrend = createAsyncThunk("dashboard/fetchRegistrationTrend", async () => {
  const res = await fetch("/api/admin/dashboard/registrations-trend");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load registration trend.");
  }

  return data.trend as RegistrationTrendPoint[];
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
      })
      .addCase(fetchRegistrationTrend.pending, (state) => {
        state.trendStatus = "loading";
      })
      .addCase(fetchRegistrationTrend.fulfilled, (state, action) => {
        state.trendStatus = "succeeded";
        state.trend = action.payload;
      })
      .addCase(fetchRegistrationTrend.rejected, (state) => {
        state.trendStatus = "failed";
      });
  },
});

export default dashboardSlice.reducer;
