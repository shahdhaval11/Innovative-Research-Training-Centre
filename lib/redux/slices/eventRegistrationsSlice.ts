import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type EventRegistration = {
  id: string;
  type: string; // "Event" | "Workshop"
  eventId: string;
  eventName: string;
  fees: number;
  fullName: string;
  dob: string | null;
  gender: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  currentStatus: string;
  currentStatusOther: string | null;
  highestQualification: string;
  highestQualificationOther: string | null;
  subject: string;
  yearOrPassout: string | null;
  college: string;
  affiliation: string | null;
  consent: boolean;
  paymentScreenshotPath: string | null;
  createdAt: string;
  status: string;
};

type EventRegistrationsState = {
  items: EventRegistration[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: EventRegistrationsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchEventRegistrations = createAsyncThunk("eventRegistrations/fetch", async () => {
  const res = await fetch("/api/admin/event-registrations");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load event registrations.");
  }

  return data.registrations as EventRegistration[];
});

export const deleteEventRegistration = createAsyncThunk(
  "eventRegistrations/delete",
  async (id: string) => {
    const res = await fetch(`/api/admin/event-registrations/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to delete registration.");
    }

    return id;
  },
);

const eventRegistrationsSlice = createSlice({
  name: "eventRegistrations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventRegistrations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEventRegistrations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEventRegistrations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load event registrations.";
      })
      .addCase(deleteEventRegistration.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default eventRegistrationsSlice.reducer;
