import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventType: string;
  status: string;
  venue: string;
  registrationUrl: string;
  imageName: string;
  imagePreview: string;
  pdfName: string;
  bannerPath: string;
  broucherPath: string;
  attendees: number;
}

const EventSchema = new Schema<IEvent>(
  {
    title:           { type: String, required: true },
    description:     { type: String, required: true },
    startDate:       { type: String, required: true },
    endDate:         { type: String, required: true },
    startTime:       { type: String, required: true },
    endTime:         { type: String, required: true },
    eventType:       { type: String, required: true },
    status:          { type: String, default: "Upcoming" },
    venue:           { type: String, default: "" },
    registrationUrl: { type: String, default: "" },
    imageName:       { type: String, default: "" },
    imagePreview:    { type: String, default: "" },
    pdfName:         { type: String, default: "" },
    bannerPath:      { type: String, default: "" },
    broucherPath:    { type: String, default: "" },
    attendees:       { type: Number, default: 0 },
  },
  { timestamps: true, collection: "nano_events" }
);

const Event: Model<IEvent> =
  mongoose.models.nano_events ?? mongoose.model<IEvent>("nano_events", EventSchema);

export default Event;
