import { model, models, Schema } from "mongoose";

const str = {
    type: String,
    required: true,
};
const BuyerSchema = new Schema({
    username: str,
    password: str,
    email: str,
    name: str,
    ratings: {
        type: Number,
        default: 0,
    },
    dealers: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

export default models.Buyer || model("Buyer", BuyerSchema);