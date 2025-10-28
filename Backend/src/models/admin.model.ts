import { Schema, model, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "moderator" | "finance" | "support";
  permissions: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "moderator", "finance", "support"],
      default: "moderator",
    },
    permissions: [{ type: String }],
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const Admin = model<IAdmin>("Admin", adminSchema);
