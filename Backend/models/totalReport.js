import mongoose from "mongoose";

const inspectionSchema = new mongoose.Schema({
  productScanned: {
    type: Number,
    default: 0
  },

  compliant: {
    type: Number,
    default: 0
  },

  potentialViolation: {
    type: Number,
    default: 0
  },

  pendingReview: {
    type: Number,
    default: 0
  },
});

const Inspection = mongoose.model("Inspection", inspectionSchema);

export default Inspection;