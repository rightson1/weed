import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const PediSchema = new Schema({
    username: str,
    password: str,
    email: str,
    name: str,
    ratings: {
        type: Number,
        default: 0,
    },
    code: {
        type: Array,
        default: [],
    },
    security: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default models.Pedi || model("Pedi", PediSchema);