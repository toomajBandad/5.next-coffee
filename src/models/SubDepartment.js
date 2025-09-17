import mongoose from "mongoose";
import "./Department";

const subdepartmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true }
);

const SubDepartment =
  mongoose.models.SubDepartment ||
  mongoose.model("SubDepartment", subdepartmentSchema);

export default SubDepartment;
