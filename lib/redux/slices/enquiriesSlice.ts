import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
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
      });
  },
});

export default enquiriesSlice.reducer;
