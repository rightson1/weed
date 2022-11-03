import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const ReviewSchema = new Schema({
    text: str,
    sender: str,
    receiver: str,
}, { timestamps: true });

export default models.Review || model("Review", ReviewSchema);