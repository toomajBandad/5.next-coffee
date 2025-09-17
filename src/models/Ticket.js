import mongoose from "mongoose";
import "./User";
import "./Department";
import "./SubDepartment";

const ticketSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    department: { type: mongoose.Types.ObjectId, ref: "Department", required: true },
    subDepartment: { type: mongoose.Types.ObjectId, ref: "SubDepartment", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    priority: { type: Number, default: 1, enum: [1, 2, 3] },
  },
  { timestamps: true }
);

const Ticket =
  mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
