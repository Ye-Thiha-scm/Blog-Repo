import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  id: {
    type: String,
    required: true
  },
  catName: {
    type: String,
    required: true
  },
  catDesc: {
    type: String,
    required: true
  },
  catImgUrl: {
    type: String
  },
  catContent: {
    type: String,
    required: true
  },
  created_user_id: {
    type: Schema.Types.ObjectId,
  },
  updated_user_id: {
    type: Schema.Types.ObjectId,
  },
  deleted_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  deleted_at: {
    type: Date
  },
},
{
  timestamps: true
}
);

categorySchema.plugin(require('mongoose-autopopulate'));
export default model("Category", categorySchema);