import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, lowercase: true, trim: true },
    phone:   { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: "nano_enquiries" }
);

const Enquiry: Model<IEnquiry> =
  mongoose.models.nano_enquiries ??
  mongoose.model<IEnquiry>("nano_enquiries", EnquirySchema);

export default Enquiry;
