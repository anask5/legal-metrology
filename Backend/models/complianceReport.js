import mongoose from "mongoose";

const complianceSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },

    extractedData: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },

    confidenceScore: {
      type: Number
    },

    complianceResult: {
      type: String,
      enum: ["COMPLIANT", "POTENTIAL_VIOLATIONS"],
      required: true
    },

    violations: [
      {
        field: String,
        message: String,
        confidence: Number
      }
    ],

    inspector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Compliance = mongoose.model("Compliance", complianceSchema);

export default Compliance;