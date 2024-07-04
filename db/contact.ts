import mongoose from "npm:mongoose@8.4.4";
import { Contact } from "../types.ts";

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  capital: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
}, { timestamps: true });

export type ContactModelType =
  & mongoose.Document
  & Omit<Contact, "id" | "time">
  & {
    capital: string;
    latitude: string;
    longitude: string;
  };

export const ContactModel = mongoose.model<ContactModelType>(
  "Contact",
  contactSchema,
);
