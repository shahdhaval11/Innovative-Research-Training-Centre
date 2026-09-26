import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type EnquiryStatus = "unseen" | "seen";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

type EnquiriesState = {
  items: Enquiry[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: EnquiriesState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchEnquiries = createAsyncThunk("enquiries/fetch", async () => {
  const res = await fetch("/api/admin/enquiries");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load enquiries.");
  }

  return data.enquiries as Enquiry[];
});

export const markEnquirySeen = createAsyncThunk("enquiries/markSeen", async (id: string) => {
  const res = await fetch(`/api/admin/enquiries/${id}`, { method: "PATCH" });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to update enquiry.");
  }

  return data.enquiry as Enquiry;
});

const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load enquiries.";
      })
      .addCase(markEnquirySeen.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default enquiriesSlice.reducer;
