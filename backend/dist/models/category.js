"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
    },
    updated_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    deleted_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    deleted_at: {
        type: Date
    },
}, {
    timestamps: true
});
categorySchema.plugin(require('mongoose-autopopulate'));
exports.default = (0, mongoose_1.model)("Category", categorySchema);
