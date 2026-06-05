import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmin extends Document {
  user_id: number;
  email: string;
  user_name: string;
  password: string;
  status: string;
  avtar: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    user_id: { type: Number },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "active" },
    avtar: { type: String, default: "" },
  },
  { timestamps: false, collection: "nano_users" }
);

const Admin: Model<IAdmin> =
  mongoose.models.nano_users ?? mongoose.model<IAdmin>("nano_users", AdminSchema);

export default Admin;
