const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CarSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
});

CarSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Cars", CarSchema);
