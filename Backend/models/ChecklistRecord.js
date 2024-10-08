const mongoose = require("mongoose");

const checklistRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["header", "sub"],
  },
  fillable: {
    type: Boolean,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  deficient: {
    type: Boolean,
    default: false,
  },
  repaired_by: {
    type: String,
    default: "",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  remarks: {
    type: String,
    default: "",
  },
});

module.exports = checklistRecordSchema;
