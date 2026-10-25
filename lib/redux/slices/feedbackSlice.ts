import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type FeedbackStatus = "new" | "approved" | "rejected";
export type ReviewStatus = "approved" | "rejected";

export type Feedback = {
  id: string;
  name: string;
  designation: string;
  email: string;
  message: string;
  rating: number;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
};

type FeedbackState = {
  items: Feedback[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: FeedbackState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchFeedbacks = createAsyncThunk("feedback/fetch", async () => {
  const res = await fetch("/api/admin/feedback");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load feedback.");
  }

  return data.feedbacks as Feedback[];
});

export const setFeedbackStatus = createAsyncThunk(
  "feedback/setStatus",
  async ({ id, status }: { id: string; status: ReviewStatus }) => {
    const res = await fetch(`/api/admin/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to update feedback.");
    }

    return data.feedback as Feedback;
  },
);

export const deleteFeedback = createAsyncThunk("feedback/delete", async (id: string) => {
  const res = await fetch(`/api/admin/feedback/${id}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to delete feedback.");
  }

  return id;
});

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load feedback.";
      })
      .addCase(setFeedbackStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default feedbackSlice.reducer;
