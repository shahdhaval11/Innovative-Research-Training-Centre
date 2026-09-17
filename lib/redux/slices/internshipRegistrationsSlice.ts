import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type InternshipRegistration = {
  id: string;
  type: string;
  internshipId: number;
  internshipName: string;
  programMode: string | null;
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
  paymentScreenshotPath: string;
  createdAt: string;
  status: string;
};

type InternshipRegistrationsState = {
  items: InternshipRegistration[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InternshipRegistrationsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchInternshipRegistrations = createAsyncThunk(
  "internshipRegistrations/fetch",
  async () => {
    const res = await fetch("/api/admin/internship-registrations");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to load internship registrations.");
    }

    return data.registrations as InternshipRegistration[];
  },
);

export const deleteInternshipRegistration = createAsyncThunk(
  "internshipRegistrations/delete",
  async (id: string) => {
    const res = await fetch(`/api/admin/internship-registrations/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to delete registration.");
    }

    return id;
  },
);

const internshipRegistrationsSlice = createSlice({
  name: "internshipRegistrations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInternshipRegistrations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchInternshipRegistrations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchInternshipRegistrations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load internship registrations.";
      })
      .addCase(deleteInternshipRegistration.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default internshipRegistrationsSlice.reducer;
