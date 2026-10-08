import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ManagedInternship } from "@/modules/admin/constData/internshipManage";

type InternshipsState = {
  items: ManagedInternship[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InternshipsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchInternships = createAsyncThunk("internships/fetch", async () => {
  const res = await fetch("/api/admin/internships");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load internships.");
  }

  return data.internships as ManagedInternship[];
});

export const createInternship = createAsyncThunk(
  "internships/create",
  async (formData: FormData) => {
    const res = await fetch("/api/admin/internships", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to add internship.");
    }

    return data.internship as ManagedInternship;
  },
);

export const updateInternship = createAsyncThunk(
  "internships/update",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await fetch(`/api/admin/internships/${id}`, { method: "PUT", body: formData });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to update internship.");
    }

    return data.internship as ManagedInternship;
  },
);

const internshipsSlice = createSlice({
  name: "internships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInternships.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchInternships.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchInternships.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load internships.";
      })
      .addCase(createInternship.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateInternship.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default internshipsSlice.reducer;
