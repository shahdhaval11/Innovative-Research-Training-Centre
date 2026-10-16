import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type DurationType = "internship" | "course";

export type Duration = {
  id: string;
  duration: string;
  amount: string;
  type: DurationType;
  createdAt: string;
};

type DurationsState = {
  items: Duration[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: DurationsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchDurations = createAsyncThunk("durations/fetch", async (type: DurationType) => {
  const res = await fetch(`/api/admin/durations?type=${type}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load durations.");
  }

  return data.durations as Duration[];
});

export const createDuration = createAsyncThunk(
  "durations/create",
  async (payload: { duration: string; amount: string; type: DurationType }) => {
    const res = await fetch("/api/admin/durations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to add duration.");
    }

    return data.duration as Duration;
  },
);

const durationsSlice = createSlice({
  name: "durations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDurations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDurations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchDurations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load durations.";
      })
      .addCase(createDuration.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default durationsSlice.reducer;
