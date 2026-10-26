import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type EventType = "Event" | "Workshop";
export type EventStatus = "active" | "inactive";

export type ManagedEvent = {
  id: string;
  type: EventType;
  title: string;
  description: string;
  startAt: string; // ISO
  endAt: string; // ISO
  fees: number;
  banner: string;
  brochure: string;
  brochureName: string;
  status: EventStatus;
};

type EventsState = {
  items: ManagedEvent[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: EventsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
  const res = await fetch("/api/admin/events");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to load events.");
  }

  return data.events as ManagedEvent[];
});

export const createEvent = createAsyncThunk("events/create", async (formData: FormData) => {
  const res = await fetch("/api/admin/events", { method: "POST", body: formData });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to add event.");
  }

  return data.event as ManagedEvent;
});

export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await fetch(`/api/admin/events/${id}`, { method: "PUT", body: formData });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to update event.");
    }

    return data.event as ManagedEvent;
  },
);

export const setEventStatus = createAsyncThunk(
  "events/setStatus",
  async ({ id, status }: { id: string; status: EventStatus }) => {
    const res = await fetch(`/api/admin/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message ?? "Failed to update event status.");
    }

    return data.event as ManagedEvent;
  },
);

export const deleteEvent = createAsyncThunk("events/delete", async (id: string) => {
  const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to delete event.");
  }

  return id;
});

function replaceItem(state: EventsState, event: ManagedEvent) {
  const index = state.items.findIndex((item) => item.id === event.id);
  if (index !== -1) {
    state.items[index] = event;
  }
}

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load events.";
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => replaceItem(state, action.payload))
      .addCase(setEventStatus.fulfilled, (state, action) => replaceItem(state, action.payload))
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;
