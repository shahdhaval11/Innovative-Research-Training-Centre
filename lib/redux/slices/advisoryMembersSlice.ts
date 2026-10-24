import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type AdvisoryMember = {
  id: string;
  name: string;
  designation: string;
  affiliation: string;
  email: string;
  phone: string;
  photo: string;
};

type AdvisoryMembersState = {
  items: AdvisoryMember[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AdvisoryMembersState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchAdvisoryMembers = createAsyncThunk("advisoryMembers/fetch", async () => {
  const res = await fetch("/api/admin/advisory-members");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load advisory members.");
  }

  return data.members as AdvisoryMember[];
});

export const createAdvisoryMember = createAsyncThunk(
  "advisoryMembers/create",
  async (formData: FormData) => {
    const res = await fetch("/api/admin/advisory-members", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to add advisory member.");
    }

    return data.member as AdvisoryMember;
  },
);

export const updateAdvisoryMember = createAsyncThunk(
  "advisoryMembers/update",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await fetch(`/api/admin/advisory-members/${id}`, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to update advisory member.");
    }

    return data.member as AdvisoryMember;
  },
);

export const deleteAdvisoryMember = createAsyncThunk(
  "advisoryMembers/delete",
  async (id: string) => {
    const res = await fetch(`/api/admin/advisory-members/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to delete advisory member.");
    }

    return id;
  },
);

const advisoryMembersSlice = createSlice({
  name: "advisoryMembers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvisoryMembers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAdvisoryMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAdvisoryMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load advisory members.";
      })
      .addCase(createAdvisoryMember.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateAdvisoryMember.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAdvisoryMember.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default advisoryMembersSlice.reducer;
